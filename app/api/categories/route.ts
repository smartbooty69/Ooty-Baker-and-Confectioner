import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: { variety: true },
      distinct: ["variety"],
      where: {
        variety: { not: null },
      },
    });

    const categories = products
      .map((p) => p.variety)
      .filter((v): v is string => v !== null);

    return NextResponse.json(categories);
  } catch (error) {
    logger.error("Error fetching categories", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
