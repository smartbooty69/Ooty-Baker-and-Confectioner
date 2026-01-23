import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Note: For Supabase in serverless environments (Vercel), use the connection pooler URL
// Session mode (port 5432): Limited connections, good for long-running connections
// Transaction mode (port 6543): More connections, better for serverless (recommended)
// Direct connection URL format: postgresql://user:pass@host:5432/db
// Transaction pooler URL format: postgresql://user:pass@host:6543/db?pgbouncer=true
console.log("[PRISMA] Initializing Prisma client...");
console.log("[PRISMA] DATABASE_URL exists:", !!process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
  const url = process.env.DATABASE_URL;
  const portMatch = url.match(/:\d+\//);
  const port = portMatch ? portMatch[0].slice(1, -1) : "unknown";
  console.log("[PRISMA] Database port:", port, port === "6543" ? "(Transaction mode ✓)" : port === "5432" ? "(Session mode - limited connections)" : "");
  console.log("[PRISMA] Has pgbouncer param:", url.includes("pgbouncer=true"));
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

console.log("[PRISMA] Prisma client initialized");

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Properly disconnect Prisma on process termination
if (process.env.NODE_ENV === "production") {
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
  });
}
