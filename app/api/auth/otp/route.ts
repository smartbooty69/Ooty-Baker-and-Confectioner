import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, updateUserOTP, verifyOTP, updatePassword } from "@/lib/auth";
import nodemailer from "nodemailer";
import { logger } from "@/lib/logger";

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

      let user;
      try {
        user = await getUserByEmail(email);
      } catch (dbError: any) {
        logger.error("Database error fetching user", dbError);
        // Check if it's a connection error
        if (dbError.code === 'P1001' || dbError.message?.includes('Can\'t reach database')) {
          return NextResponse.json(
            { error: "Database connection error. Please try again later." },
            { status: 503 }
          );
        }
        return NextResponse.json(
          { error: "Database error. Please try again later." },
          { status: 500 }
        );
      }

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      const otpCode = generateOTP();
      const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Always save OTP to database first
      try {
        await updateUserOTP(email, otpCode, expiry);
      } catch (dbError: any) {
        logger.error("Database error saving OTP", dbError);
        // Check if it's a connection error
        if (dbError.code === 'P1001' || dbError.message?.includes('Can\'t reach database')) {
          return NextResponse.json(
            { error: "Database connection error. Please try again later." },
            { status: 503 }
          );
        }
        return NextResponse.json(
          { error: "Failed to generate OTP. Please try again later." },
          { status: 500 }
        );
      }

      // Try to send email, but don't fail the request if email fails
      // The OTP is already saved, so the user can still use it if they have access to it
      try {
        await sendOTPEmail(email, otpCode);
        return NextResponse.json({ success: true, message: "OTP sent to your email" });
      } catch (emailError: any) {
        logger.error("Error sending email", emailError);
        
        // Log the OTP for debugging (only in development or if explicitly enabled)
        if (process.env.NODE_ENV === "development" || process.env.LOG_OTP_IN_PRODUCTION === "true") {
          logger.info(`[OTP] Generated OTP for ${email}: ${otpCode}`);
        }
        
        // Return success even if email fails - OTP is saved and can be retrieved
        // In production, you might want to return a generic message for security
        return NextResponse.json({ 
          success: true, 
          message: process.env.NODE_ENV === "development" 
            ? "OTP generated (email not configured - check logs for OTP)"
            : "OTP generated. Please check your email or contact support if you don't receive it.",
          // Only include devOtp in development
          ...(process.env.NODE_ENV === "development" && { devOtp: otpCode })
        });
      }
    }

    if (action === "verify-otp") {
      if (!email || !otp) {
        return NextResponse.json(
          { error: "Email and OTP are required" },
          { status: 400 }
        );
      }

      let isValid;
      try {
        isValid = await verifyOTP(email, otp);
      } catch (dbError: any) {
        logger.error("Database error verifying OTP", dbError);
        // Check if it's a connection error
        if (dbError.code === 'P1001' || dbError.message?.includes('Can\'t reach database')) {
          return NextResponse.json(
            { error: "Database connection error. Please try again later." },
            { status: 503 }
          );
        }
        return NextResponse.json(
          { error: "Database error. Please try again later." },
          { status: 500 }
        );
      }

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

      if (password.length < 8) {
        return NextResponse.json(
          { error: "Password must be at least 8 characters long" },
          { status: 400 }
        );
      }

      try {
        await updatePassword(email, password);
        return NextResponse.json({ success: true, message: "Password reset successful" });
      } catch (dbError: any) {
        logger.error("Database error updating password", dbError);
        // Check if it's a connection error
        if (dbError.code === 'P1001' || dbError.message?.includes('Can\'t reach database')) {
          return NextResponse.json(
            { error: "Database connection error. Please try again later." },
            { status: 503 }
          );
        }
        return NextResponse.json(
          { error: "Failed to reset password. Please try again later." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error: any) {
    logger.error("OTP handler error", error);
    
    // Provide more specific error messages when possible
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }
    
    // Generic error response
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
