import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { validateFile, saveFile } from "@/lib/file-upload";
import { logger } from "@/lib/logger";

export async function GET() {
  // Public route - no auth required
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Convert Decimal to number for JSON serialization
    const serializedProducts = products.map((product) => ({
      ...product,
      price: Number(product.price),
      pricePerGram: product.pricePerGram ? Number(product.pricePerGram) : null,
    }));

    return NextResponse.json(serializedProducts);
  } catch (error: any) {
    logger.error("Error fetching products", error);
    const errorMessage = error?.message || "Failed to fetch products";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const formData = await request.formData();
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
        const validation = validateFile({
          size: imageFile.size,
          mimetype: imageFile.type,
        });

        if (!validation.valid) {
          return NextResponse.json({ error: validation.error }, { status: 400 });
        }

        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const uploadResult = await saveFile({
          buffer,
          originalFilename: imageFile.name,
          mimetype: imageFile.type,
        });

        if (!uploadResult.success) {
          return NextResponse.json(
            { error: uploadResult.error || "Failed to upload image" },
            { status: 500 }
          );
        }

        imagePath = uploadResult.filePath || null;
      } catch (error: any) {
        logger.error("Error uploading image", error);
        return NextResponse.json(
          { error: `Image upload failed: ${error?.message || "Unknown error"}` },
          { status: 500 }
        );
      }
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description ? description.trim() : null,
        variety: variety ? variety.trim() : null,
        price,
        pricePerGram,
        vegStatus: normalizedVegStatus,
        imagePath,
      },
    });

    // Convert Decimal to number for JSON serialization
    const serializedProduct = {
      ...product,
      price: Number(product.price),
      pricePerGram: product.pricePerGram ? Number(product.pricePerGram) : null,
    };

    return NextResponse.json({ success: true, product: serializedProduct }, { status: 201 });
  } catch (error: any) {
    logger.error("Error creating product", error);
    const errorMessage = error?.message || "Failed to create product";
    // Check for Prisma-specific errors
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "A product with this name already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
