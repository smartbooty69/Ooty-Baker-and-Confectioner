import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const prisma = new PrismaClient();

async function createUser() {
  const email = process.argv[2] || 'clancymendonca@gmail.com';
  const password = process.argv[3] || 'admin123'; // Default password

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`⚠️  User with email ${email} already exists.`);
      console.log('💡 To reset the password, use: npm run reset-password <email> <new-password>');
      process.exit(0);
    }

    // Hash the password using bcryptjs (compatible with Node.js)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log('✅ User created successfully!');
    console.log(`   Email: ${user.email}`);
    console.log(`   Password: ${password}`);
    console.log(`   ID: ${user.id}`);
    console.log('\n💡 You can now log in with these credentials.');
  } catch (error: any) {
    console.error('❌ Error creating user:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
