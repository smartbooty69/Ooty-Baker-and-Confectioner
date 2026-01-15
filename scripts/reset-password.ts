import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function resetPassword() {
  const email = process.argv[2];
  const newPassword = process.argv[3];

  if (!email || !newPassword) {
    console.error('Usage: tsx scripts/reset-password.ts <email> <new-password>');
    console.error('Example: tsx scripts/reset-password.ts clancymendonca@gmail.com mynewpassword123');
    process.exit(1);
  }

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user password
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    console.log(`✅ Password reset successfully for ${user.email}`);
  } catch (error: any) {
    if (error.code === 'P2025') {
      console.error(`❌ User with email ${email} not found`);
    } else {
      console.error('❌ Error resetting password:', error);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword();
