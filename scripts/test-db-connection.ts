import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

async function testConnection() {
  try {
    console.log("🔍 Testing database connection...");
    console.log("📡 Connection string:", process.env.DATABASE_URL?.replace(/:[^:@]+@/, ":****@") || "Not set");
    
    // Test connection by querying the database
    await prisma.$connect();
    console.log("✅ Successfully connected to database!");
    
    // Try a simple query
    const userCount = await prisma.user.count();
    console.log(`📊 Found ${userCount} user(s) in database`);
    
    // Test a simple query
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Database query test passed!");
    
    console.log("\n🎉 Database connection is working correctly!");
  } catch (error: any) {
    console.error("\n❌ Database connection failed!");
    console.error("Error:", error.message);
    
    if (error.message.includes("Can't reach database server")) {
      console.error("\n💡 Possible solutions:");
      console.error("1. Check if your Supabase project is paused (resume it in the dashboard)");
      console.error("2. Verify the DATABASE_URL uses the Session pooler connection string");
      console.error("3. Check your network connection");
      console.error("4. Verify the region in your connection string matches your Supabase project region");
      console.error("\n📝 To get the correct connection string:");
      console.error("   - Go to Supabase Dashboard → Settings → Database");
      console.error("   - Select 'Session pooler' → 'URI' tab");
      console.error("   - Copy the connection string and update .env.local");
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
