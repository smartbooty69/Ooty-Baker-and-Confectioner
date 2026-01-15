import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, updateUserOTP, verifyOTP, updatePassword } from "@/lib/auth";
import nodemailer from "nodemailer";

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP email
async function sendOTPEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Password Reset OTP - Ooty Baker",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Your OTP for password reset is:</p>
        <h1 style="color: #40aad1; font-size: 32px; letter-spacing: 4px;">${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { action, email, otp, password } = await request.json();

    if (action === "send-otp") {
      if (!email) {
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 }
        );
      }

      const user = await getUserByEmail(email);
      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      const otpCode = generateOTP();
      const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      await updateUserOTP(email, otpCode, expiry);

      // Try to send email, but don't fail if email is not configured
      try {
        await sendOTPEmail(email, otpCode);
      } catch (emailError: any) {
        console.error("Error sending email:", emailError);
        // In development, allow OTP to be generated even if email fails
        // Log the OTP to console for testing
        if (process.env.NODE_ENV === "development") {
          console.log(`[DEV] OTP for ${email}: ${otpCode}`);
          return NextResponse.json({ 
            success: true, 
            message: "OTP generated (email not configured - check console for OTP)",
            devOtp: process.env.NODE_ENV === "development" ? otpCode : undefined
          });
        }
        return NextResponse.json(
          { error: "Failed to send OTP email. Please check your SMTP configuration." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, message: "OTP sent to your email" });
    }

    if (action === "verify-otp") {
      if (!email || !otp) {
        return NextResponse.json(
          { error: "Email and OTP are required" },
          { status: 400 }
        );
      }

      const isValid = await verifyOTP(email, otp);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid or expired OTP" },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true, message: "OTP verified" });
    }

    if (action === "reset-password") {
      if (!email || !password) {
        return NextResponse.json(
          { error: "Email and password are required" },
          { status: 400 }
        );
      }

      await updatePassword(email, password);
      return NextResponse.json({ success: true, message: "Password reset successful" });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("OTP handler error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
