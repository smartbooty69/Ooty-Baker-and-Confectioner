"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { logger } from "@/lib/logger";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BusinessInquiries from "@/components/dashboard/BusinessInquiries";
import ProductManagement from "@/components/dashboard/ProductManagement";
import BannerManagement from "@/components/dashboard/BannerManagement";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import Analytics from "@/components/dashboard/Analytics";

type DashboardSection = "overview" | "business-inquiries" | "product" | "product-edit" | "banners" | "analytics";

export default function DashboardPage() {
  const [currentSection, setCurrentSection] = useState<DashboardSection>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      
      if (!data.success || !data.user) {
        router.push("/auth");
      }
    } catch (error) {
      logger.error("Auth check error", error);
      router.push("/auth");
    }
  }, [router]);

  useEffect(() => {
    // Check authentication
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col lg:ml-64">
        <DashboardHeader setIsSidebarOpen={setIsSidebarOpen} currentSection={currentSection} />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-background">
          {currentSection === "overview" && (
            <DashboardOverview onNavigate={setCurrentSection} />
          )}
          {currentSection === "business-inquiries" && <BusinessInquiries />}
          {(currentSection === "product" || currentSection === "product-edit") && (
            <ProductManagement />
          )}
          {currentSection === "banners" && <BannerManagement />}
          {currentSection === "analytics" && <Analytics />}
        </main>
      </div>
    </div>
  );
}
