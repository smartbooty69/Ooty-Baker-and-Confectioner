"use client";

import { useEffect, useState, useCallback, memo } from "react";
import Image from "next/image";
import { BiEdit, BiTrash, BiX, BiPlus, BiChevronUp, BiChevronDown } from "react-icons/bi";

interface Banner {
  id: number;
  imagePath: string;
  altText: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Notification Toast Component
const NotificationToast = memo(
  ({
    message,
    onClose,
  }: {
    message: { type: "success" | "error"; text: string };
    onClose: () => void;
  }) => (
    <div className="fixed top-4 right-4 z-[60] animate-in slide-in-from-top-2">
      <div
        className={`p-4 rounded-lg shadow-lg min-w-[300px] max-w-md ${
          message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="font-medium">{message.text}</p>
          <button
            onClick={onClose}
            className="ml-4 text-white hover:opacity-70 transition-opacity font-bold text-lg"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
);

NotificationToast.displayName = "NotificationToast";

export default function BannerManagement() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isAddingBanner, setIsAddingBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [altText, setAltText] = useState("");
  const [order, setOrder] = useState(0);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const showMessage = useCallback((text: string, type: "success" | "error" = "success") => {
    setMessage({ type, text });
  }, []);

  const fetchBanners = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/banners");
      if (response.ok) {
        const data = await response.json();
        // Sort by order
        const sorted = data.sort((a: Banner, b: Banner) => a.order - b.order);
        setBanners(sorted);
      } else {
        showMessage("Failed to fetch banners", "error");
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      showMessage("Failed to fetch banners", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showMessage]);

  const handleAddBanner = useCallback(() => {
    setIsAddingBanner(true);
    setEditingBanner(null);
    setSelectedImage(null);
    setImagePreview(null);
    setAltText("");
    setOrder(banners.length);
  }, [banners.length]);

  const handleEdit = useCallback((banner: Banner) => {
    setEditingBanner(banner);
    setIsAddingBanner(false);
    setSelectedImage(null);
    setImagePreview(banner.imagePath);
    setAltText(banner.altText || "");
    setOrder(banner.order);
  }, []);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      showMessage("Only JPG, JPEG, PNG, and GIF images are allowed", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage("Image size must be less than 5MB", "error");
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.onerror = () => {
      showMessage("Error reading image file", "error");
    };
    reader.readAsDataURL(file);
  }, [showMessage]);

  const handleSubmit = useCallback(async () => {
    if (!imagePreview && !selectedImage) {
      showMessage("Please select an image", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      formData.append("altText", altText);
      formData.append("order", order.toString());

      const url = editingBanner ? `/api/banners/${editingBanner.id}` : "/api/banners";
      const method = editingBanner ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        showMessage(
          editingBanner ? "Banner updated successfully" : "Banner added successfully",
          "success"
        );
        handleCloseModal();
        fetchBanners();
      } else {
        const errorData = await response.json();
        showMessage(errorData.error || "Failed to save banner", "error");
      }
    } catch (error) {
      console.error("Error saving banner:", error);
      showMessage("An error occurred while saving", "error");
    } finally {
      setIsSubmitting(false);
    }
  }, [editingBanner, selectedImage, altText, order, imagePreview, showMessage, fetchBanners]);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("Are you sure you want to delete this banner?")) return;

      try {
        const response = await fetch(`/api/banners/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          showMessage("Banner deleted successfully", "success");
          fetchBanners();
        } else {
          showMessage("Failed to delete banner", "error");
        }
      } catch (error) {
        console.error("Error deleting banner:", error);
        showMessage("An error occurred", "error");
      }
    },
    [showMessage, fetchBanners]
  );

  const handleOrderChange = useCallback(
    async (id: number, direction: "up" | "down") => {
      const bannerIndex = banners.findIndex((b) => b.id === id);
      if (bannerIndex === -1) return;

      const newOrder = direction === "up" ? bannerIndex - 1 : bannerIndex + 1;
      if (newOrder < 0 || newOrder >= banners.length) return;

      // Swap orders
      const updatedBanners = [...banners];
      const temp = updatedBanners[bannerIndex].order;
      updatedBanners[bannerIndex].order = updatedBanners[newOrder].order;
      updatedBanners[newOrder].order = temp;

      setBanners(updatedBanners);

      // Update in database
      try {
        await fetch(`/api/banners/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: updatedBanners[bannerIndex].order }),
        });
        await fetch(`/api/banners/${updatedBanners[newOrder].id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: updatedBanners[newOrder].order }),
        });
        fetchBanners();
      } catch (error) {
        console.error("Error updating order:", error);
        fetchBanners(); // Revert on error
      }
    },
    [banners, fetchBanners]
  );

  const handleCloseModal = useCallback(() => {
    setEditingBanner(null);
    setIsAddingBanner(false);
    setSelectedImage(null);
    setImagePreview(null);
    setAltText("");
    setOrder(0);
  }, []);

  const isModalOpen = editingBanner !== null || isAddingBanner;

  return (
    <>
      {message && <NotificationToast message={message} onClose={() => setMessage(null)} />}

      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-primary-800">Manage Banners</h2>
          <div className="flex gap-3">
            <button
              onClick={handleAddBanner}
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors flex items-center space-x-2"
            >
              <BiPlus className="text-xl" />
              <span>Add Banner</span>
            </button>
            <button
              onClick={fetchBanners}
              disabled={isLoading}
              className="px-4 py-2 border border-primary-300 text-primary-800 rounded-lg hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {isLoading && banners.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
              <p className="mt-4 text-primary-600">Loading banners...</p>
            </div>
          </div>
        ) : banners.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-12">
              <div className="text-6xl text-primary-300 mb-4">🖼️</div>
              <p className="text-primary-600 text-lg">No banners found</p>
              <p className="text-primary-500 text-sm mt-2 mb-4">Add your first banner to get started</p>
              <button
                onClick={handleAddBanner}
                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors flex items-center space-x-2 mx-auto"
              >
                <BiPlus className="text-xl" />
                <span>Add Banner</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className="bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-lg transition-shadow"
              >
                {/* Action Buttons */}
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all z-10 opacity-90 hover:opacity-100 hover:scale-110"
                  title="Delete Banner"
                >
                  <BiTrash className="text-lg" />
                </button>
                <button
                  onClick={() => handleEdit(banner)}
                  className="absolute top-14 right-3 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all z-10 opacity-90 hover:opacity-100 hover:scale-110"
                  title="Edit Banner"
                >
                  <BiEdit className="text-lg" />
                </button>

                {/* Order Controls */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                  {index > 0 && (
                    <button
                      onClick={() => handleOrderChange(banner.id, "up")}
                      className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                      title="Move Up"
                    >
                      <BiChevronUp className="text-lg text-primary-800" />
                    </button>
                  )}
                  {index < banners.length - 1 && (
                    <button
                      onClick={() => handleOrderChange(banner.id, "down")}
                      className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                      title="Move Down"
                    >
                      <BiChevronDown className="text-lg text-primary-800" />
                    </button>
                  )}
                </div>

                {/* Banner Image */}
                <div className="relative w-full h-64 bg-primary-200">
                  <Image
                    src={banner.imagePath}
                    alt={banner.altText || "Banner"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Banner Info */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-primary-600">Order: {banner.order}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        banner.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {banner.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  {banner.altText && (
                    <p className="text-sm text-primary-600 line-clamp-2">{banner.altText}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div
                className={`px-6 py-4 flex justify-between items-center ${
                  isAddingBanner ? "bg-blue-500" : "bg-green-500"
                } text-white`}
              >
                <h3 className="text-xl font-bold mb-0">
                  {isAddingBanner ? "Add New Banner" : "Edit Banner"}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:opacity-80 rounded-full p-2 transition-colors"
                >
                  <BiX className="text-2xl" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Banner Image {!isAddingBanner && "(leave empty to keep current)"}
                    </label>
                    <div className="border-2 border-dashed border-primary-300 rounded-lg p-4">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif"
                        onChange={handleImageChange}
                        className="w-full text-sm text-primary-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent-dark"
                      />
                      {imagePreview && (
                        <div className="mt-4">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            width={600}
                            height={300}
                            className="rounded-lg object-cover w-full"
                          />
                        </div>
                      )}
                      <p className="text-xs text-primary-500 mt-2">
                        Max file size: 5MB. Allowed formats: JPG, JPEG, PNG, GIF
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Alt Text (for accessibility)
                    </label>
                    <input
                      type="text"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      placeholder="Describe the banner image"
                      className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={order}
                      onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                      min="0"
                      className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                    <p className="text-xs text-primary-500 mt-1">
                      Lower numbers appear first in the slider
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-primary-200 text-primary-800 rounded-lg hover:bg-primary-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || (!imagePreview && !selectedImage)}
                  className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Saving..."
                    : isAddingBanner
                    ? "Add Banner"
                    : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
