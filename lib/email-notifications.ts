import nodemailer from "nodemailer";
import { logger } from "./logger";

interface InquiryEmailData {
  email: string;
  businessName: string;
  contactPersonName: string;
  status: string;
  staffNote?: string | null;
}

/**
 * Send email notification when inquiry status changes
 */
export async function sendInquiryStatusEmail(data: InquiryEmailData): Promise<boolean> {
  // Check if SMTP is configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    logger.info("[Email] SMTP not configured, skipping email notification");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const statusMessages: Record<string, { subject: string; message: string }> = {
      new: {
        subject: "Thank You for Your Inquiry - Ooty Baker & Confectioner",
        message: "We have received your inquiry and our team will review it shortly.",
      },
      inProgress: {
        subject: "Your Inquiry is Being Processed - Ooty Baker & Confectioner",
        message: "We are currently processing your inquiry and will get back to you soon.",
      },
      completed: {
        subject: "Your Inquiry Has Been Completed - Ooty Baker & Confectioner",
        message: "Your inquiry has been completed. Thank you for your business!",
      },
      cancelled: {
        subject: "Inquiry Update - Ooty Baker & Confectioner",
        message: "Your inquiry has been cancelled as requested.",
      },
    };

    const statusInfo = statusMessages[data.status] || {
      subject: "Inquiry Status Update - Ooty Baker & Confectioner",
      message: `Your inquiry status has been updated to: ${data.status}`,
    };

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #40aad1 0%, #2d7a9a 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Ooty Baker & Confectioner</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-top: 0;">Hello ${data.contactPersonName},</h2>
          
          <p style="color: #666; line-height: 1.6;">
            ${statusInfo.message}
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #40aad1;">
            <p style="margin: 0; color: #333;"><strong>Business Name:</strong> ${data.businessName}</p>
            <p style="margin: 5px 0 0 0; color: #333;"><strong>Status:</strong> <span style="text-transform: capitalize; color: #40aad1; font-weight: bold;">${data.status}</span></p>
          </div>
          
          ${data.staffNote ? `
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <p style="margin: 0; color: #856404;"><strong>Note from our team:</strong></p>
              <p style="margin: 5px 0 0 0; color: #856404;">${data.staffNote}</p>
            </div>
          ` : ""}
          
          <p style="color: #666; line-height: 1.6;">
            If you have any questions or need further assistance, please don't hesitate to contact us.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              Best regards,<br />
              <strong>Ooty Baker & Confectioner Team</strong><br />
              Ooty, Tamil Nadu, India
            </p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: data.email,
      subject: statusInfo.subject,
      html: emailHtml,
    });

    logger.info(`[Email] Status notification sent to ${data.email} for inquiry status: ${data.status}`);
    return true;
  } catch (error: any) {
    logger.error("[Email] Error sending inquiry status notification", error);
    // Don't throw error - email failure shouldn't break the status update
    return false;
  }
}
