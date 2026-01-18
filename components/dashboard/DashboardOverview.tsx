"use client";

import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";

type DashboardSection = "overview" | "business-inquiries" | "product" | "product-edit" | "banners" | "analytics";

interface DashboardOverviewProps {
  onNavigate: (section: DashboardSection) => void;
}

export default function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Header Section with Welcome */}
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-heading">Welcome Back!</h1>
            <p className="text-body/70 text-base md:text-lg">
              Here&apos;s what&apos;s happening with your business today
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-heading hover:bg-heading/90 text-white rounded-lg transition-all flex items-center space-x-2"
            >
              <i className="bx bx-link-external text-lg"></i>
              <span className="font-medium">View Site</span>
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions - Prominent placement */}
      <QuickActions onNavigate={onNavigate} />

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column - Stats (8 columns) */}
        <div className="xl:col-span-8">
          <DashboardStats />
        </div>

        {/* Right Column - Recent Activity (4 columns) */}
        <div className="xl:col-span-4">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
