import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { validateFile, saveFile } from "@/lib/file-upload";

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
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
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
    const price = parseFloat(formData.get("price") as string);
    const pricePerGram = formData.get("pricePerGram")
      ? parseFloat(formData.get("pricePerGram") as string)
      : null;
    const vegStatus = formData.get("vegStatus") as string;
    const imageFile = formData.get("image") as File | null;

    let imagePath: string | null = null;

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
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
      });

      if (!uploadResult.success) {
        return NextResponse.json(
          { error: uploadResult.error || "Failed to upload image" },
          { status: 500 }
        );
      }

      imagePath = uploadResult.filePath || null;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        variety,
        price,
        pricePerGram,
        vegStatus: vegStatus === "Veg" ? "Veg" : "Non-Veg",
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
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
