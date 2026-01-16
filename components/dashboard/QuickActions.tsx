"use client";

import { useRouter } from "next/navigation";
import { BiPackage, BiImage, BiRefresh, BiLineChart } from "react-icons/bi";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

type DashboardSection = "overview" | "business-inquiries" | "product" | "product-edit" | "banners" | "analytics";

export default function QuickActions({
  onNavigate,
}: {
  onNavigate: (section: DashboardSection) => void;
}) {
  const router = useRouter();

  const actions: QuickAction[] = [
    {
      id: "view-inquiries",
      label: "View Inquiries",
      icon: <BiRefresh className="text-2xl" />,
      action: () => onNavigate("business-inquiries" as DashboardSection),
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      id: "manage-products",
      label: "Manage Products",
      icon: <BiPackage className="text-2xl" />,
      action: () => onNavigate("product-edit" as DashboardSection),
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BiLineChart className="text-2xl" />,
      action: () => onNavigate("analytics" as DashboardSection),
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      id: "manage-banners",
      label: "Manage Banners",
      icon: <BiImage className="text-2xl" />,
      action: () => onNavigate("banners" as DashboardSection),
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-heading">Quick Actions</h2>
          <p className="text-sm text-body/70 mt-1">Access frequently used features</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="bg-heading hover:bg-heading/90 text-white p-3 sm:p-5 rounded-lg sm:rounded-xl transition-all transform hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center space-y-1 sm:space-y-2 group"
          >
            <div className="group-hover:scale-110 transition-transform">
              {action.icon}
            </div>
            <span className="font-medium text-xs sm:text-sm text-center leading-tight">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
