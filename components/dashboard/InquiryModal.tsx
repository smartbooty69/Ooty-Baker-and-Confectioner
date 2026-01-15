"use client";

import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";

interface Inquiry {
  id: number;
  businessName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  estimatedQuantity: string | null;
  deliveryFrequency: string | null;
  address: string | null;
  additionalNotes: string | null;
  businessNature: string | null;
  status: string;
  staffNote: string | null;
  createdAt: string;
  updatedAt: string;
  inquiryProducts: Array<{
    id: number;
    product: {
      id: number;
      name: string;
      price: number;
    };
  }>;
}

const ALLOWED_STATUSES = ["new", "inProgress", "completed", "cancelled"];

interface InquiryModalProps {
  inquiryId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function InquiryModal({ inquiryId, isOpen, onClose, onUpdate }: InquiryModalProps) {
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState("");
  const [staffNote, setStaffNote] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (isOpen && inquiryId) {
      fetchInquiry();
    }
  }, [isOpen, inquiryId]);

  // Auto-dismiss notification after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchInquiry = async () => {
    if (!inquiryId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/inquiries/${inquiryId}`);
      const data = await response.json();
      
      if (data.success && data.inquiry) {
        setInquiry(data.inquiry);
        setStatus(data.inquiry.status);
        setStaffNote(data.inquiry.staffNote || "");
      } else {
        setMessage({ type: "error", text: "Inquiry not found" });
      }
    } catch (error) {
      console.error("Error fetching inquiry:", error);
      setMessage({ type: "error", text: "Failed to load inquiry" });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inquiryId || !ALLOWED_STATUSES.includes(status)) {
      setMessage({ type: "error", text: "Invalid status selected" });
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(`/api/inquiries/${inquiryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, staffNote: staffNote.trim() }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: "success", text: "Inquiry status updated successfully" });
        fetchInquiry();
        onUpdate(); // Refresh the inquiries list
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update status" });
      }
    } catch (error) {
      console.error("Error updating inquiry:", error);
      setMessage({ type: "error", text: "Failed to update inquiry" });
    } finally {
      setUpdating(false);
    }
  };

  const getStatusClass = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "new") return "bg-yellow-400 text-black";
    if (statusLower === "inprogress" || statusLower === "in-progress") return "bg-blue-500 text-white";
    if (statusLower === "completed") return "bg-green-500 text-white";
    if (statusLower === "cancelled") return "bg-red-500 text-white";
    return "bg-gray-400 text-white";
  };

  if (!isOpen) {
    return (
      <>
        {message && (
          <div className="fixed top-4 right-4 z-[60]">
            <div
              className={`p-4 rounded-lg shadow-lg min-w-[300px] max-w-md ${
                message.type === "success"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{message.text}</p>
                <button
                  onClick={() => setMessage(null)}
                  className="ml-4 text-white hover:opacity-70 transition-opacity font-bold text-lg"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const interestedProducts = inquiry?.inquiryProducts || [];
  const quantityNumeric = parseFloat(
    ((inquiry?.estimatedQuantity || "0") as string).replace(/[^0-9.]/g, "")
  );
  const totalValue =
    quantityNumeric > 0
      ? interestedProducts.reduce(
          (sum, item) => sum + Number(item.product.price) * quantityNumeric,
          0
        )
      : 0;

  return (
    <>
      {/* Notification Toast - Top Right */}
      {message && (
        <div className="fixed top-4 right-4 z-[60]">
          <div
            className={`p-4 rounded-lg shadow-lg min-w-[300px] max-w-md ${
              message.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">{message.text}</p>
              <button
                onClick={() => setMessage(null)}
                className="ml-4 text-white hover:opacity-70 transition-opacity font-bold text-lg"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-green-500 text-white px-6 py-4 flex justify-between items-center">
              <h4 className="text-xl font-bold mb-0">Business Inquiry Details</h4>
              <button
                onClick={onClose}
                className="text-white hover:bg-green-600 rounded-full p-2 transition-colors"
              >
                <BiX className="text-2xl" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-4 text-primary-700">Loading inquiry...</p>
                </div>
              ) : !inquiry ? (
                <div className="text-center py-12">
                  <p className="text-primary-700">Inquiry not found</p>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex justify-between items-center">
                    <h5 className="text-lg font-semibold mb-0">
                      Status:{" "}
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusClass(
                          inquiry.status
                        )}`}
                      >
                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                      </span>
                    </h5>
                    <div className="text-gray-600">
                      Inquiry ID: #{String(inquiry.id).padStart(6, "0")}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="pb-4 border-b border-gray-200">
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Business Name
                        </div>
                        <div className="text-lg text-gray-800">{inquiry.businessName}</div>
                      </div>

                      <div className="pb-4 border-b border-gray-200">
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Contact Person
                        </div>
                        <div className="text-lg text-gray-800">{inquiry.contactPersonName}</div>
                      </div>

                      <div className="pb-4 border-b border-gray-200">
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Email
                        </div>
                        <div className="text-lg text-gray-800">
                          <a
                            href={`mailto:${inquiry.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            {inquiry.email}
                          </a>
                        </div>
                      </div>

                      <div className="pb-4 border-b border-gray-200">
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Phone
                        </div>
                        <div className="text-lg text-gray-800">
                          <a
                            href={`tel:${inquiry.phone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {inquiry.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="pb-4 border-b border-gray-200">
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Estimated Quantity
                        </div>
                        <div className="text-lg text-gray-800">
                          {inquiry.estimatedQuantity || "N/A"}
                        </div>
                      </div>

                      <div className="pb-4 border-b border-gray-200">
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Delivery Frequency
                        </div>
                        <div className="text-lg text-gray-800">
                          {inquiry.deliveryFrequency || "N/A"}
                        </div>
                      </div>

                      <div className="pb-4 border-b border-gray-200">
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Nature of Business
                        </div>
                        <div className="text-lg text-gray-800">
                          {inquiry.businessNature || "N/A"}
                        </div>
                      </div>

                      <div className="pb-4 border-b border-gray-200">
                        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Inquiry Date
                        </div>
                        <div className="text-lg text-gray-800">
                          {new Date(inquiry.createdAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {inquiry.address && (
                    <div className="mb-6 pb-4 border-b border-gray-200">
                      <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                        Address
                      </div>
                      <div className="text-lg text-gray-800 whitespace-pre-line">
                        {inquiry.address}
                      </div>
                    </div>
                  )}

                  {inquiry.additionalNotes && (
                    <div className="mb-6 pb-4 border-b border-gray-200">
                      <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                        Additional Notes
                      </div>
                      <div className="text-lg text-gray-800 whitespace-pre-line">
                        {inquiry.additionalNotes}
                      </div>
                    </div>
                  )}

                  {inquiry.staffNote && (
                    <div className="mb-6 pb-4 border-b border-gray-200">
                      <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                        Staff Notes (Internal)
                      </div>
                      <div className="text-lg text-gray-800 whitespace-pre-line">
                        {inquiry.staffNote}
                      </div>
                    </div>
                  )}

                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Interested Products
                    </div>
                    <div className="text-lg text-gray-800">
                      {interestedProducts.length > 0 ? (
                        <>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {interestedProducts.map((item) => (
                              <span
                                key={item.id}
                                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-green-500 hover:text-white transition-colors"
                              >
                                {item.product.name}
                                <small className="ml-2">
                                  (₹{Number(item.product.price).toFixed(2)})
                                </small>
                              </span>
                            ))}
                          </div>
                          {totalValue > 0 && (
                            <div className="mt-4">
                              <strong>Estimated Total Value:</strong> ₹
                              {totalValue.toFixed(2)}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-500">No products selected</span>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer with form */}
            {inquiry && (
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <form onSubmit={handleStatusUpdate} className="mb-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="flex items-center gap-2 flex-grow">
                      <label className="text-sm text-gray-600 whitespace-nowrap">
                        Status:
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        {ALLOWED_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-grow w-full md:w-auto">
                      <label className="text-sm text-gray-600 block md:hidden mb-1">
                        Internal Notes:
                      </label>
                      <textarea
                        value={staffNote}
                        onChange={(e) => setStaffNote(e.target.value)}
                        placeholder="Add internal staff note..."
                        rows={1}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-y min-h-[40px]"
                        style={{ height: "auto" }}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = "auto";
                          target.style.height = target.scrollHeight + "px";
                        }}
                      />
                    </div>
                  </div>
                </form>

                <div className="flex flex-col md:flex-row gap-2 justify-end">
                  <button
                    type="button"
                    onClick={handleStatusUpdate}
                    disabled={updating}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Update Status"}
                  </button>
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-900 transition-colors text-center"
                  >
                    Email Contact
                  </a>
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors text-center"
                  >
                    Call Contact
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
