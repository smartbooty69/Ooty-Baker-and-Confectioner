import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { validateFile, saveFile } from "@/lib/file-upload";
import { logger } from "@/lib/logger";

// Increase body size limit for file uploads (10MB)
export const maxDuration = 30;
export const runtime = 'nodejs';

export async function GET() {
  // Public route - no auth required
  console.log("[PRODUCTS GET] Starting products fetch");
  try {
    console.log("[PRODUCTS GET] Attempting to connect to database...");
    console.log("[PRODUCTS GET] DATABASE_URL exists:", !!process.env.DATABASE_URL);
    const portMatch = process.env.DATABASE_URL?.match(/:\d+\//);
    console.log("[PRODUCTS GET] DATABASE_URL port:", portMatch ? portMatch[0] : "unknown");
    
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.log("[PRODUCTS GET] Products fetched successfully, count:", products.length);

    // Convert Decimal to number for JSON serialization
    const serializedProducts = products.map((product) => ({
      ...product,
      price: Number(product.price),
      pricePerGram: product.pricePerGram ? Number(product.pricePerGram) : null,
    }));

    console.log("[PRODUCTS GET] Returning serialized products");
    return NextResponse.json(serializedProducts, { status: 200 });
  } catch (error: any) {
    console.error("[PRODUCTS GET] Error fetching products:", {
      message: error?.message,
      code: error?.code,
      name: error?.name,
      stack: error?.stack,
      error: error
    });
    
    // Ensure we always return valid JSON
    try {
      logger.error("Error fetching products", error);
    } catch (logError) {
      console.error("[PRODUCTS GET] Failed to log error:", logError);
    }
    
    const errorMessage = error?.message || "Failed to fetch products";
    const errorCode = error?.code || "UNKNOWN";
    
    // Check for specific database connection errors
    let userFriendlyMessage = errorMessage;
    if (errorMessage?.includes("MaxClientsInSessionMode") || errorMessage?.includes("max clients")) {
      userFriendlyMessage = "Database connection limit reached. Please use Transaction mode (port 6543) instead of Session mode (port 5432).";
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: userFriendlyMessage, 
        code: errorCode,
        ...(process.env.NODE_ENV === "development" && { details: error?.stack })
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log("[PRODUCTS POST] Starting product creation");
  console.log("[PRODUCTS POST] Checking authentication...");
  
  // Check for session cookie first
  const cookies = request.cookies;
  const sessionCookie = cookies.get("auth_session");
  console.log("[PRODUCTS POST] Session cookie exists:", !!sessionCookie);
  console.log("[PRODUCTS POST] Session cookie value length:", sessionCookie?.value?.length || 0);
  
  const auth = await requireAuth();
  if (auth.error) {
    console.error("[PRODUCTS POST] Auth error:", {
      status: auth.error.status,
      error: await auth.error.json().catch(() => "Could not parse error"),
    });
    return auth.error;
  }
  console.log("[PRODUCTS POST] Auth successful, user:", auth.session?.email);

  try {
    const formData = await request.formData();
    console.log("[PRODUCTS POST] FormData received");
    logger.info("Received product creation request");
    const name = formData.get("name") as string;
    const description = (formData.get("description") as string) || null;
    const variety = formData.get("variety") as string;
    const priceStr = formData.get("price") as string;
    const pricePerGramStr = formData.get("pricePerGram") as string | null;
    const vegStatus = formData.get("vegStatus") as string;
    const imageFile = formData.get("image") as File | null;

    // Validate required fields
    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Product name is required" }, { status: 400 });
    }

    if (!priceStr || isNaN(parseFloat(priceStr))) {
      return NextResponse.json({ error: "Valid price is required" }, { status: 400 });
    }

    const price = parseFloat(priceStr);
    if (price < 0) {
      return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
    }

    const pricePerGram = pricePerGramStr && pricePerGramStr.trim() !== ""
      ? parseFloat(pricePerGramStr)
      : null;

    if (pricePerGram !== null && (isNaN(pricePerGram) || pricePerGram < 0)) {
      return NextResponse.json({ error: "Price per gram must be a positive number" }, { status: 400 });
    }

    // Normalize vegStatus - accept both "NonVeg" and "Non-Veg"
    const normalizedVegStatus = vegStatus === "NonVeg" ? "Non-Veg" : vegStatus;
    
    if (!normalizedVegStatus || (normalizedVegStatus !== "Veg" && normalizedVegStatus !== "Non-Veg")) {
      return NextResponse.json({ error: "Veg status must be 'Veg' or 'Non-Veg'" }, { status: 400 });
    }

    let imagePath: string | null = null;

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
      try {
        // Check if Supabase is configured (required on Vercel)
        const { isSupabaseConfigured } = await import("@/lib/supabase-storage");
        if (process.env.VERCEL && !isSupabaseConfigured()) {
          return NextResponse.json(
            { 
              error: "File uploads require Supabase Storage to be configured",
              hint: "Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your Vercel environment variables. Go to your Vercel project → Settings → Environment Variables."
            },
            { status: 500 }
          );
        }

        const validation = validateFile({
          size: imageFile.size,
          mimetype: imageFile.type,
        });

        if (!validation.valid) {
          return NextResponse.json({ error: validation.error }, { status: 400 });
        }

        logger.info("Uploading image", { 
          filename: imageFile.name, 
          size: imageFile.size,
          type: imageFile.type,
          supabaseConfigured: isSupabaseConfigured()
        });

        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const uploadResult = await saveFile({
          buffer,
          originalFilename: imageFile.name,
          mimetype: imageFile.type,
        });

        if (!uploadResult.success) {
          console.error("[PRODUCTS POST] File upload failed:", {
            error: uploadResult.error,
            hint: uploadResult.hint,
            filename: imageFile.name,
            size: imageFile.size,
            isVercel: !!process.env.VERCEL,
            supabaseConfigured: isSupabaseConfigured()
          });
          logger.error("File upload failed", { 
            error: uploadResult.error,
            hint: uploadResult.hint,
            filename: imageFile.name,
            size: imageFile.size
          });
          return NextResponse.json(
            { 
              error: uploadResult.error || "Failed to upload image",
              hint: uploadResult.hint || (process.env.VERCEL && !isSupabaseConfigured()
                ? "On Vercel, file uploads require Supabase Storage. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your Vercel environment variables."
                : undefined)
            },
            { status: 500 }
          );
        }

        imagePath = uploadResult.filePath || null;
        logger.info("Image uploaded successfully", { imagePath });
      } catch (error: any) {
        logger.error("Error uploading image", error);
        return NextResponse.json(
          { 
            error: `Image upload failed: ${error?.message || "Unknown error"}`,
            hint: process.env.VERCEL 
              ? "Make sure Supabase Storage is configured in Vercel environment variables."
              : undefined
          },
          { status: 500 }
        );
      }
    }

    try {
      // Normalize empty strings to null for optional fields
      const normalizedDescription = description && description.trim() !== "" ? description.trim() : null;
      const normalizedVariety = variety && variety.trim() !== "" ? variety.trim() : null;
      
      logger.info("Creating product", {
        name: name.trim(),
        variety: normalizedVariety,
        price,
        pricePerGram,
        vegStatus: normalizedVegStatus,
        hasImage: !!imagePath,
      });
      
      console.log("[PRODUCTS POST] Creating product in database:", {
        name: name.trim(),
        variety: normalizedVariety,
        price,
        pricePerGram,
        vegStatus: normalizedVegStatus,
        hasImage: !!imagePath
      });
      
      const product = await prisma.product.create({
        data: {
          name: name.trim(),
          description: normalizedDescription,
          variety: normalizedVariety,
          price,
          pricePerGram,
          vegStatus: normalizedVegStatus,
          imagePath,
        },
      });
      
      console.log("[PRODUCTS POST] Product created successfully:", { productId: product.id });
      logger.info("Product created successfully", { productId: product.id });

      // Convert Decimal to number for JSON serialization
      const serializedProduct = {
        ...product,
        price: Number(product.price),
        pricePerGram: product.pricePerGram ? Number(product.pricePerGram) : null,
      };

      return NextResponse.json({ success: true, product: serializedProduct }, { status: 201 });
    } catch (dbError: any) {
      console.error("[PRODUCTS POST] Database error creating product:", {
        code: dbError?.code,
        message: dbError?.message,
        meta: dbError?.meta,
        error: dbError
      });
      try {
        logger.error("Database error creating product", dbError);
      } catch (logError) {
        console.error("[PRODUCTS POST] Failed to log error:", logError);
      }
      
      // Check for Prisma-specific errors
      if (dbError?.code === "P2002") {
        return NextResponse.json(
          { success: false, error: "A product with this name already exists" },
          { status: 400 }
        );
      }
      
      // Check for database connection errors
      let userFriendlyMessage = dbError?.message || "Failed to create product";
      if (userFriendlyMessage?.includes("MaxClientsInSessionMode") || userFriendlyMessage?.includes("max clients")) {
        userFriendlyMessage = "Database connection limit reached. Please use Transaction mode (port 6543) instead of Session mode (port 5432).";
      }
      
      // Return more detailed error for debugging
      return NextResponse.json(
        { 
          success: false,
          error: `Database error: ${userFriendlyMessage}`,
          code: dbError?.code || "UNKNOWN",
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("[PRODUCTS POST] Unexpected error:", {
      message: error?.message,
      stack: error?.stack,
      code: error?.code,
      name: error?.name,
      error: error
    });
    
    // Ensure we always return valid JSON
    try {
      logger.error("Error in POST /api/products", error);
    } catch (logError) {
      console.error("[PRODUCTS POST] Failed to log error:", logError);
    }
    
    const errorMessage = error?.message || "Failed to create product";
    const errorCode = error?.code || "UNKNOWN";
    
    // Check for specific database connection errors
    let userFriendlyMessage = errorMessage;
    if (errorMessage?.includes("MaxClientsInSessionMode") || errorMessage?.includes("max clients")) {
      userFriendlyMessage = "Database connection limit reached. Please use Transaction mode (port 6543) instead of Session mode (port 5432).";
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: userFriendlyMessage,
        code: errorCode,
        ...(process.env.NODE_ENV === "development" && { details: error?.stack }),
      },
      { status: 500 }
    );
  }
}
