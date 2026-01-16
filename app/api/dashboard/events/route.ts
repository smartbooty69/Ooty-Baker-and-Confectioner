import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";

export async function GET(request: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) {
    return auth.error;
  }

  // Set up SSE headers
  const headers = new Headers({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const sendEvent = (data: any) => {
        const message = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(message));
      };

      // Send initial connection message
      sendEvent({ type: "connected", timestamp: new Date().toISOString() });

      // Set up polling interval to check for updates
      const interval = setInterval(async () => {
        try {
          // Get latest stats
          const stats = await getDashboardStats();
          sendEvent({ type: "stats", data: stats });

          // Get latest inquiry count
          const inquiryCount = await prisma.businessInquiry.count({
            where: { isDeleted: false },
          });
          sendEvent({ type: "inquiry_count", data: { count: inquiryCount } });

          // Get latest product count
          const productCount = await prisma.product.count();
          sendEvent({ type: "product_count", data: { count: productCount } });
        } catch (error) {
          console.error("Error in SSE stream:", error);
          sendEvent({ type: "error", message: "Failed to fetch updates" });
        }
      }, 5000); // Update every 5 seconds

      // Clean up on client disconnect
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, { headers });
}

async function getDashboardStats() {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - 7);
  startOfWeek.setHours(0, 0, 0, 0);

  const [
    totalInquiries,
    newInquiries,
    inProgress,
    completed,
    cancelled,
    productCount,
  ] = await Promise.all([
    prisma.businessInquiry.count({ where: { isDeleted: false } }),
    prisma.businessInquiry.count({
      where: {
        isDeleted: false,
        status: "new",
        createdAt: { gte: startOfWeek },
      },
    }),
    prisma.businessInquiry.count({
      where: { isDeleted: false, status: "inProgress" },
    }),
    prisma.businessInquiry.count({
      where: {
        isDeleted: false,
        status: "completed",
        updatedAt: { gte: startOfWeek },
      },
    }),
    prisma.businessInquiry.count({
      where: {
        isDeleted: false,
        status: "cancelled",
        updatedAt: { gte: startOfWeek },
      },
    }),
    prisma.product.count(),
  ]);

  return {
    totalInquiries,
    newInquiries,
    inProgress,
    completed,
    cancelled,
    productCount,
  };
}
