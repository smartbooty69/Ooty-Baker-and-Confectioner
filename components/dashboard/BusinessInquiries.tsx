"use client";

import { useEffect, useState } from "react";
import { InquiryWithProducts } from "@/types";
import { BiShow } from "react-icons/bi";
import InquiryModal from "./InquiryModal";
import { TableRowSkeleton } from "./SkeletonLoader";

export default function BusinessInquiries() {
  const [inquiries, setInquiries] = useState<InquiryWithProducts[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<InquiryWithProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  const [selectedInquiryId, setSelectedInquiryId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchInquiries();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchInquiries, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterAndSortInquiries();
  }, [inquiries, searchQuery, statusFilter, sortBy]);

  const fetchInquiries = async () => {
    try {
      const response = await fetch("/api/inquiries");
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortInquiries = () => {
    let filtered = [...inquiries];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (inq) =>
          inq.businessName.toLowerCase().includes(query) ||
          inq.contactPersonName.toLowerCase().includes(query) ||
          inq.email.toLowerCase().includes(query) ||
          inq.phone.includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((inq) => inq.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "name":
          return a.businessName.localeCompare(b.businessName);
        default:
          return 0;
      }
    });

    setFilteredInquiries(filtered);
  };

  const handleQuickStatusUpdate = async (id: number, newStatus: string) => {
    if (!confirm(`Change status to ${newStatus}?`)) return;

    setUpdatingStatus(id);
    try {
      const inquiry = inquiries.find((inq) => inq.id === id);
      if (!inquiry) return;

      const response = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, staffNote: inquiry.staffNote || "" }),
      });

      if (response.ok) {
        await fetchInquiries();
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred");
    } finally {
      setUpdatingStatus(null);
    }
  };


  const handleExport = async () => {
    try {
      const response = await fetch("/api/inquiries/export");
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `business_inquiries_${new Date().toISOString().slice(0, 10)}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        showMessage("Inquiries exported successfully");
      }
    } catch (error) {
      console.error("Error exporting inquiries:", error);
      showMessage("Error exporting inquiries", false);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to delete all inquiries? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch("/api/inquiries", {
        method: "DELETE",
      });

      if (response.ok) {
        setInquiries([]);
        setFilteredInquiries([]);
        showMessage("All inquiries deleted successfully");
      } else {
        showMessage("Failed to delete all inquiries", false);
      }
    } catch (error) {
      console.error("Error deleting all inquiries:", error);
      showMessage("An error occurred while deleting inquiries", false);
    }
  };

  const showMessage = (message: string, isSuccess: boolean = true) => {
    const messageDiv = document.createElement("div");
    messageDiv.style.position = "fixed";
    messageDiv.style.top = "20px";
    messageDiv.style.right = "20px";
    messageDiv.style.padding = "15px 25px";
    messageDiv.style.borderRadius = "5px";
    messageDiv.style.color = "#fff";
    messageDiv.style.zIndex = "1000";
    messageDiv.style.transition = "opacity 0.5s ease-in-out";
    messageDiv.style.backgroundColor = isSuccess ? "#28a745" : "#dc3545";
    messageDiv.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    messageDiv.style.fontWeight = "500";
    messageDiv.style.fontSize = "14px";
    messageDiv.style.minWidth = "300px";
    messageDiv.style.textAlign = "center";
    messageDiv.textContent = message;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.style.opacity = "0";
      setTimeout(() => {
        if (document.body.contains(messageDiv)) {
          document.body.removeChild(messageDiv);
        }
      }, 500);
    }, 3000);
  };

  const getDaysRemaining = (updatedAt: string): number => {
    const updatedDate = new Date(updatedAt);
    const currentDate = new Date();
    const daysDiff = Math.floor((currentDate.getTime() - updatedDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, 15 - daysDiff);
  };

  const getStatusBadgeClass = (status: string) => {
    const baseClass = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case "new":
        return `${baseClass} bg-blue-100 text-blue-800`;
      case "inProgress":
        return `${baseClass} bg-yellow-100 text-yellow-800`;
      case "completed":
        return `${baseClass} bg-green-100 text-green-800`;
      case "cancelled":
        return `${baseClass} bg-red-100 text-red-800`;
      default:
        return `${baseClass} bg-gray-100 text-gray-800`;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary-800">Business</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary-800">Contact</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary-800">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary-800">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary-800">Frequency</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-primary-800">Status</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-primary-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-200">
              {[...Array(5)].map((_, i) => (
                <TableRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Separate cancelled and non-cancelled inquiries
  const activeInquiries = filteredInquiries.filter((inq) => inq.status !== "cancelled");
  const cancelledInquiries = filteredInquiries.filter((inq) => inq.status === "cancelled");

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-primary-800">Business Inquiries</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleDeleteAll}
            className="px-4 py-2 border border-primary-300 text-primary-800 rounded-lg hover:bg-primary-50 transition-colors"
          >
            Delete All
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 border border-primary-300 text-primary-800 rounded-lg hover:bg-primary-50 transition-colors"
          >
            Export
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "name")}
          className="px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      {filteredInquiries.length === 0 && inquiries.length > 0 && (
        <div className="text-center py-8 text-primary-600">
          No inquiries match your search criteria
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary-800">Business</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary-800">Contact</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary-800">Phone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary-800">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary-800">Frequency</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary-800">Status</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-primary-800 min-w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-200">
            {activeInquiries.map((inquiry) => (
              <tr key={inquiry.id} className="hover:bg-primary-50">
                <td className="px-4 py-3 text-sm text-primary-700">{inquiry.businessName}</td>
                <td className="px-4 py-3 text-sm text-primary-700">{inquiry.contactPersonName}</td>
                <td className="px-4 py-3 text-sm text-primary-700">{inquiry.phone}</td>
                <td className="px-4 py-3 text-sm text-primary-700">{inquiry.estimatedQuantity}</td>
                <td className="px-4 py-3 text-sm text-primary-700">{inquiry.deliveryFrequency}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <select
                      value={inquiry.status}
                      onChange={(e) => handleQuickStatusUpdate(inquiry.id, e.target.value)}
                      disabled={updatingStatus === inquiry.id}
                      className={`${getStatusBadgeClass(inquiry.status)} border-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-transparent`}
                    >
                      <option value="new">New</option>
                      <option value="inProgress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    {updatingStatus === inquiry.id && (
                      <span className="inline-block animate-spin text-primary-500">⟳</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end">
                    <button 
                      onClick={() => {
                        setSelectedInquiryId(inquiry.id);
                        setIsModalOpen(true);
                      }}
                      className="bg-[#0652dd] text-white border-none px-2.5 py-1.5 rounded-[5px] hover:opacity-90 transition-opacity inline-flex items-center justify-center"
                      title="View Details"
                    >
                      <BiShow className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {cancelledInquiries.map((inquiry) => (
              <tr key={inquiry.id} className="hover:bg-primary-50 opacity-60">
                <td className="px-4 py-3 text-sm text-primary-700">{inquiry.businessName}</td>
                <td className="px-4 py-3 text-sm text-primary-700">{inquiry.contactPersonName}</td>
                <td className="px-4 py-3 text-sm text-primary-700">{inquiry.phone}</td>
                <td className="px-4 py-3 text-sm text-primary-700">{inquiry.estimatedQuantity}</td>
                <td className="px-4 py-3 text-sm text-primary-700">{inquiry.deliveryFrequency}</td>
                <td className="px-4 py-3">
                  <span className={getStatusBadgeClass(inquiry.status)}>
                    {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1).replace(/([A-Z])/g, " $1")}
                    {inquiry.status === "cancelled" && (() => {
                      const daysRemaining = getDaysRemaining(inquiry.updatedAt.toString());
                      return daysRemaining > 0 ? (
                        <small className="ml-1">({daysRemaining} days left)</small>
                      ) : null;
                    })()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end">
                    <button 
                      onClick={() => {
                        setSelectedInquiryId(inquiry.id);
                        setIsModalOpen(true);
                      }}
                      className="bg-[#0652dd] text-white border-none px-2.5 py-1.5 rounded-[5px] hover:opacity-90 transition-opacity inline-flex items-center justify-center"
                      title="View Details"
                    >
                      <BiShow className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {inquiries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl text-primary-300 mb-4">📥</div>
          <p className="text-primary-600 text-lg">No inquiries found</p>
          <p className="text-primary-500 text-sm mt-2">New business inquiries will appear here</p>
        </div>
      )}

      <InquiryModal
        inquiryId={selectedInquiryId}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedInquiryId(null);
        }}
        onUpdate={() => {
          fetchInquiries();
        }}
      />
    </div>
  );
}
