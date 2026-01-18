import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { logger } from "@/lib/logger";

export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  try {
    const inquiries = await prisma.businessInquiry.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        inquiryProducts: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Convert Decimal to number for JSON serialization
    const serializedInquiries = inquiries.map((inquiry) => ({
      ...inquiry,
      inquiryProducts: inquiry.inquiryProducts.map((ip) => ({
        ...ip,
        product: {
          ...ip.product,
          price: Number(ip.product.price),
          pricePerGram: ip.product.pricePerGram ? Number(ip.product.pricePerGram) : null,
        },
      })),
    }));

    return NextResponse.json(serializedInquiries);
  } catch (error) {
    logger.error("Error fetching inquiries", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const {
      businessName,
      contactPersonName,
      email,
      phone,
      estimatedQuantity,
      deliveryFrequency,
      address,
      additionalNotes,
      businessNature,
      productInterest,
    } = body;

    // Validate phone number (remove leading zeros)
    const cleanPhone = phone.replace(/^0+/, "");

    // Create inquiry
    const inquiry = await prisma.businessInquiry.create({
      data: {
        businessName,
        contactPersonName,
        email,
        phone: cleanPhone,
        estimatedQuantity,
        deliveryFrequency,
        address,
        additionalNotes,
        businessNature,
        status: "new",
      },
    });

    // Create inquiry products
    if (productInterest && productInterest.length > 0) {
      await prisma.businessInquiryProduct.createMany({
        data: productInterest.map((productId: number) => ({
          inquiryId: inquiry.id,
          productId,
        })),
      });
    }

    // Create history entry
    await prisma.businessInquiryHistory.create({
      data: {
        inquiryId: inquiry.id,
        status: "new",
      },
    });

    return NextResponse.json(
      { success: true, inquiry },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Error creating inquiry", error);
    return NextResponse.json(
      { error: "Failed to create inquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    // Delete all inquiry products first (due to foreign key constraints)
    await prisma.businessInquiryProduct.deleteMany({});
    
    // Delete all inquiry history
    await prisma.businessInquiryHistory.deleteMany({});
    
    // Delete all inquiries
    await prisma.businessInquiry.deleteMany({});

    return NextResponse.json({ success: true, message: "All inquiries deleted successfully" });
  } catch (error) {
    logger.error("Error deleting all inquiries", error);
    return NextResponse.json(
      { error: "Failed to delete all inquiries" },
      { status: 500 }
    );
  }
}
