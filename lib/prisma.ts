import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Note: For Supabase in serverless environments (Vercel), use the connection pooler URL
// Direct connection URL format: postgresql://user:pass@host:5432/db
// Pooler URL format: postgresql://user:pass@host:6543/db?pgbouncer=true
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
