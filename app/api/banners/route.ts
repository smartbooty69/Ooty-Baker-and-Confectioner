import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { saveFile, validateFile } from "@/lib/file-upload";

export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json({ error: "Failed to fetch banners" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const altText = (formData.get("altText") as string) || null;
    const order = parseInt((formData.get("order") as string) || "0");

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Validate file
    const validation = validateFile({
      size: image.size,
      mimetype: image.type,
    });

    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Save file
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult = await saveFile({
      buffer,
      originalFilename: image.name,
    });

    if (!uploadResult.success || !uploadResult.filePath) {
      return NextResponse.json({ error: uploadResult.error || "Failed to upload image" }, { status: 500 });
    }

    // Create banner
    const banner = await prisma.banner.create({
      data: {
        imagePath: uploadResult.filePath,
        altText: altText || `Banner Image`,
        order,
        isActive: true,
      },
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json({ error: "Failed to create banner" }, { status: 500 });
  }
}
