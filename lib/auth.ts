import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}

export async function updateUserOTP(email: string, otpCode: string, expiry: Date) {
  return prisma.user.update({
    where: { email },
    data: {
      otpCode,
      otpExpiry: expiry,
    },
  });
}

export async function verifyOTP(email: string, otp: string) {
  const user = await getUserByEmail(email);
  if (!user || !user.otpCode || !user.otpExpiry) {
    return false;
  }

  if (user.otpCode !== otp) {
    return false;
  }

  if (new Date() > user.otpExpiry) {
    return false;
  }

  return true;
}

export async function updatePassword(email: string, newPassword: string) {
  const hashedPassword = await hashPassword(newPassword);
  return prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      otpCode: null,
      otpExpiry: null,
    },
  });
}
