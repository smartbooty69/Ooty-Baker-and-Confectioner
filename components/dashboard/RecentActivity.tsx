"use client";

import { useEffect, useState } from "react";
import { BiCheckCircle, BiXCircle, BiEdit, BiPlus, BiTrash } from "react-icons/bi";

interface Activity {
  id: number;
  type: "inquiry" | "product" | "banner";
  action: "created" | "updated" | "deleted" | "status_changed";
  description: string;
  timestamp: Date;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching recent activities
    // In a real app, this would come from an API
    const mockActivities: Activity[] = [
      {
        id: 1,
        type: "inquiry",
        action: "created",
        description: "New inquiry from ABC Company",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      },
      {
        id: 2,
        type: "product",
        action: "updated",
        description: "Product 'Chocolate Candy' was updated",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      },
      {
        id: 3,
        type: "inquiry",
        action: "status_changed",
        description: "Inquiry #123 status changed to 'In Progress'",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
    ];

    setTimeout(() => {
      setActivities(mockActivities);
      setIsLoading(false);
    }, 500);
  }, []);

  const getActivityIcon = (action: string) => {
    switch (action) {
      case "created":
        return <BiPlus className="text-primary" />; // Success - Gimmie Vibrant Green
      case "updated":
        return <BiEdit className="text-heading" />; // Primary Action - Ooty Forest Green
      case "deleted":
        return <BiTrash className="text-danger" />; // Danger - Berry Red
      case "status_changed":
        return <BiCheckCircle className="text-secondary" />; // Warning - Golden Crust
      default:
        return <BiCheckCircle className="text-body/50" />; // Neutral - Deep Charcoal at 50%
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-heading mb-4">Recent Activity</h2>
        <p className="text-body/70 text-center py-8">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-heading mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="mt-1">{getActivityIcon(activity.action)}</div>
            <div className="flex-1">
              <p className="text-sm text-body">{activity.description}</p>
              <p className="text-xs text-body/60 mt-1">{formatTime(activity.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
