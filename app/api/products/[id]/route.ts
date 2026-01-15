import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { validateFile, saveFile, deleteFile } from "@/lib/file-upload";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Public route - no auth required for viewing
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Convert Decimal to number for JSON serialization
    const serializedProduct = {
      ...product,
      price: Number(product.price),
      pricePerGram: product.pricePerGram ? Number(product.pricePerGram) : null,
    };

    return NextResponse.json({ success: true, product: serializedProduct });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    // Get existing product to check for old image
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

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

    let imagePath: string | null = existingProduct.imagePath;

    // Handle image upload if new image is provided
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

      // Delete old image if it exists
      if (existingProduct.imagePath) {
        await deleteFile(existingProduct.imagePath);
      }

      imagePath = uploadResult.filePath || null;
    }

    const product = await prisma.product.update({
      where: { id: parseInt(params.id) },
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

    return NextResponse.json({ success: true, product: serializedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    // Get product to delete associated image
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (product) {
      // Delete associated image file
      if (product.imagePath) {
        await deleteFile(product.imagePath);
      }

      // Delete product from database
      await prisma.product.delete({
        where: { id: parseInt(params.id) },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
