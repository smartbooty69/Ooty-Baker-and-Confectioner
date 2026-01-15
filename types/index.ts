import { Product, BusinessInquiry, User } from "@prisma/client";

// Re-export Prisma types
export type { Product, BusinessInquiry, User };

// Type aliases for status values (SQLite uses strings instead of enums)
export type VegStatus = "Veg" | "Non-Veg";
export type InquiryStatus = "new" | "in-progress" | "completed" | "cancelled";

export type ProductWithRelations = Product;

export type InquiryWithProducts = BusinessInquiry & {
  inquiryProducts: Array<{
    id: number;
    product: Product;
  }>;
};

export type DashboardStats = {
  totalInquiries: number;
  newInquiries: number;
  inProgressInquiries: number;
  completedInquiries: number;
  cancelledInquiries: number;
  avgResponseTime: number;
  conversionRate: number;
  estimatedValue: number;
  trends: {
    totalInquiriesTrend: number;
    newInquiriesTrend: number;
    completedTrend: number;
    cancelledTrend: number;
    valueTrend: number;
  };
};

export type ProductFormData = {
  name: string;
  description?: string;
  variety: string;
  price: number;
  pricePerGram: number;
  vegStatus: VegStatus;
  image?: File;
};

export type InquiryFormData = {
  businessName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  estimatedQuantity: string;
  deliveryFrequency: string;
  address: string;
  additionalNotes?: string;
  businessNature: string;
  productInterest: number[];
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type OTPRequest = {
  email: string;
};

export type OTPVerify = {
  otp: string;
};

export type ResetPassword = {
  password: string;
  confirmPassword: string;
};
