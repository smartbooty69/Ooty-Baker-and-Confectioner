"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logger } from "@/lib/logger";

interface DashboardHeaderProps {
  setIsSidebarOpen: (open: boolean) => void;
  currentSection?: string;
}

export default function DashboardHeader({ setIsSidebarOpen, currentSection }: DashboardHeaderProps) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
      if (data.success && data.user) {
        setUser(data.user);
      }
    } catch (error) {
      logger.error("Error fetching user", error);
    }
  };

  const getSectionTitle = () => {
    switch (currentSection) {
      case "overview":
        return "Dashboard Overview";
      case "business-inquiries":
        return "Business Inquiries";
      case "product":
      case "product-edit":
        return "Products";
      case "banners":
        return "Banners";
      case "analytics":
        return "Analytics";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-heading hover:text-heading/80 transition-colors"
            aria-label="Open menu"
          >
            <i className="bx bx-menu-alt-right text-3xl"></i>
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-heading truncate">{getSectionTitle()}</h1>
            <p className="text-xs sm:text-sm text-body/70 hidden md:block">
              {currentSection === "overview" && "Overview of your business performance and quick actions"}
              {currentSection === "business-inquiries" && "Manage and track business inquiries"}
              {currentSection === "product" && "Manage your product catalog"}
              {currentSection === "product-edit" && "Manage your product catalog"}
              {currentSection === "banners" && "Manage homepage banners"}
              {currentSection === "analytics" && "View insights and performance metrics"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {user && (
            <div className="hidden sm:flex items-center space-x-2 px-2 sm:px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
              <div className="w-8 h-8 bg-heading rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-body">{user.email}</p>
              </div>
            </div>
          )}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 sm:px-4 py-2 bg-heading text-white rounded-lg hover:bg-heading/90 transition-colors flex items-center space-x-2"
            title="View Website"
          >
            <i className="bx bx-link-external text-lg"></i>
            <span className="hidden sm:inline">View Site</span>
          </a>
        </div>
      </div>
    </header>
  );
}
