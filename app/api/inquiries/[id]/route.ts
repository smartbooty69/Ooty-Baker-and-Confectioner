import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";
import { sendInquiryStatusEmail } from "@/lib/email-notifications";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const inquiry = await prisma.businessInquiry.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        inquiryProducts: {
          include: {
            product: true,
          },
        },
        history: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!inquiry) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      );
    }

    // Convert Decimal to number for JSON serialization
    const serializedInquiry = {
      ...inquiry,
      inquiryProducts: inquiry.inquiryProducts.map((ip) => ({
        ...ip,
        product: {
          ...ip.product,
          price: Number(ip.product.price),
          pricePerGram: ip.product.pricePerGram ? Number(ip.product.pricePerGram) : null,
        },
      })),
    };

    return NextResponse.json({ success: true, inquiry: serializedInquiry });
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiry" },
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
    const body = await request.json();
    const { status, staffNote } = body;

    // Get existing inquiry to check if status changed
    const existingInquiry = await prisma.businessInquiry.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!existingInquiry) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      );
    }

    const inquiry = await prisma.businessInquiry.update({
      where: { id: parseInt(params.id) },
      data: {
        status,
        staffNote,
      },
    });

    // Create history entry
    await prisma.businessInquiryHistory.create({
      data: {
        inquiryId: inquiry.id,
        status,
      },
    });

    // Send email notification if status changed
    if (existingInquiry.status !== status) {
      sendInquiryStatusEmail({
        email: inquiry.email,
        businessName: inquiry.businessName,
        contactPersonName: inquiry.contactPersonName,
        status: inquiry.status,
        staffNote: inquiry.staffNote,
      }).catch((error) => {
        console.error("Failed to send status email notification:", error);
        // Don't fail the request if email fails
      });
    }

    // Fetch updated inquiry with relations for response
    const updatedInquiry = await prisma.businessInquiry.findUnique({
      where: { id: inquiry.id },
      include: {
        inquiryProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    // Convert Decimal to number for JSON serialization
    const serializedInquiry = updatedInquiry ? {
      ...updatedInquiry,
      inquiryProducts: updatedInquiry.inquiryProducts.map((ip) => ({
        ...ip,
        product: {
          ...ip.product,
          price: Number(ip.product.price),
          pricePerGram: ip.product.pricePerGram ? Number(ip.product.pricePerGram) : null,
        },
      })),
    } : inquiry;

    return NextResponse.json({ success: true, inquiry: serializedInquiry });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to update inquiry" },
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
    await prisma.businessInquiry.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
