"use client";

import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { Product, ProductFormData, VegStatus } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { BiEdit, BiTrash, BiX, BiPlus, BiDownload, BiFilter, BiCheckSquare, BiSquare } from "react-icons/bi";
import { CardSkeleton } from "./SkeletonLoader";
import { logger } from "@/lib/logger";

const productSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[A-Za-z0-9\s\-]+$/),
  description: z.string().max(500).optional(),
  variety: z.enum(["Candy", "Coated Candy", "Jelly"]),
  price: z.number().positive(),
  pricePerGram: z.number().positive(),
  vegStatus: z.enum(["Veg", "Non-Veg"]),
});

interface ProductManagementProps {
  mode?: "add" | "edit";
}

// Memoized Product Card Component
const ProductCard = memo(
  ({
    product,
    onEdit,
    onDelete,
    isSelected,
    onSelect,
  }: {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
    isSelected: boolean;
    onSelect: (id: number) => void;
  }) => {
    const price = useMemo(() => Number(product.price).toFixed(2), [product.price]);
    const pricePerGram = useMemo(
      () => (product.pricePerGram ? Number(product.pricePerGram).toFixed(2) : null),
      [product.pricePerGram]
    );

    return (
      <div
        className={`bg-white rounded-xl shadow-sm overflow-hidden relative hover:shadow-md transition-shadow border-2 ${
          isSelected ? "border-primary" : "border-gray-100"
        }`}
      >
        {/* Action Buttons - Right Side */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Selection Checkbox */}
          <button
            onClick={() => onSelect(product.id)}
            className="w-8 h-8 bg-white rounded border-2 border-gray-300 flex items-center justify-center hover:border-primary transition-all opacity-90 hover:opacity-100 hover:scale-110"
            title={isSelected ? "Deselect" : "Select"}
            aria-label={isSelected ? "Deselect product" : "Select product"}
          >
            {isSelected ? (
              <BiCheckSquare className="text-xl text-primary" />
            ) : (
              <BiSquare className="text-xl text-gray-400" />
            )}
          </button>
          
          {/* Edit Button */}
          <button
            onClick={() => onEdit(product)}
            className="w-8 h-8 bg-heading text-white rounded-full flex items-center justify-center hover:bg-heading/90 transition-all opacity-90 hover:opacity-100 hover:scale-110"
            title="Edit Product"
            aria-label="Edit product"
          >
            <BiEdit className="text-lg" />
          </button>
          
          {/* Delete Button */}
          <button
            onClick={() => onDelete(product.id)}
            className="w-8 h-8 bg-danger text-white rounded-full flex items-center justify-center hover:bg-danger/90 transition-all opacity-90 hover:opacity-100 hover:scale-110"
            title="Delete Product"
            aria-label="Delete product"
          >
            <BiTrash className="text-lg" />
          </button>
        </div>

        {/* Veg Badge */}
        <div
          className={`absolute top-3 left-3 w-9 h-9 bg-white rounded border-2 flex items-center justify-center z-10 ${
            product.vegStatus === "Veg" ? "border-primary" : "border-danger"
          }`}
          title={product.vegStatus === "Veg" ? "Vegetarian" : "Non-Vegetarian"}
        >
          <div
            className={`w-5 h-5 rounded-full ${
              product.vegStatus === "Veg" ? "bg-primary" : "bg-danger"
            }`}
          />
        </div>

        {/* Product Image */}
        <div className="relative w-full h-64 bg-gray-100">
          {product.imagePath ? (
            <Image
              src={product.imagePath}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-body/60">No Image</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-heading flex-1">{product.name}</h3>
          </div>

          {product.variety && (
            <p className="text-sm text-body/70 mb-2">
              <span className="font-medium">Variety:</span> {product.variety}
            </p>
          )}

          {product.description && (
            <p className="text-sm text-body/70 mb-3 line-clamp-2">{product.description}</p>
          )}

          <div className="space-y-1 pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-body/70">Price:</span>
              <span className="font-bold text-body">₹{price}</span>
            </div>
            {pricePerGram && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-body/70">Price/g:</span>
                <span className="font-semibold text-body">₹{pricePerGram}/g</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

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
          message.type === "success" ? "bg-primary text-white" : "bg-danger text-white"
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

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function ProductManagement({ mode }: ProductManagementProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [varietyFilter, setVarietyFilter] = useState<string>("all");
  const [vegStatusFilter, setVegStatusFilter] = useState<string>("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [isExporting, setIsExporting] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // Debounce search query to reduce filtering operations
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          (product.description && product.description.toLowerCase().includes(query)) ||
          (product.variety && product.variety.toLowerCase().includes(query))
      );
    }

    // Apply variety filter
    if (varietyFilter !== "all") {
      filtered = filtered.filter((product) => product.variety === varietyFilter);
    }

    // Apply veg status filter
    if (vegStatusFilter !== "all") {
      filtered = filtered.filter((product) => product.vegStatus === vegStatusFilter);
    }

    // Apply price range filter
    if (priceRangeFilter.min || priceRangeFilter.max) {
      filtered = filtered.filter((product) => {
        const price = Number(product.price);
        const min = priceRangeFilter.min ? parseFloat(priceRangeFilter.min) : 0;
        const max = priceRangeFilter.max ? parseFloat(priceRangeFilter.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    return filtered;
  }, [products, debouncedSearchQuery, varietyFilter, vegStatusFilter, priceRangeFilter]);

  // Auto-dismiss notification after 3 seconds
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

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        showMessage("Failed to fetch products", "error");
      }
    } catch (error) {
      logger.error("Error fetching products", error);
      showMessage("Failed to fetch products", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showMessage]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      logger.error("Error fetching categories", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const onSubmit = useCallback(
    async (data: ProductFormData) => {
      setIsSubmitting(true);
      try {
        const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
        const method = editingProduct ? "PUT" : "POST";

        // Create FormData for file upload
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description || "");
        formData.append("variety", data.variety);
        formData.append("price", data.price.toString());
        formData.append("pricePerGram", data.pricePerGram.toString());
        formData.append("vegStatus", data.vegStatus);

        // Add image if selected
        if (selectedImage) {
          formData.append("image", selectedImage);
        }

        const response = await fetch(url, {
          method,
          body: formData,
        });

        if (response.ok) {
          showMessage(
            editingProduct ? "Product updated successfully" : "Product created successfully",
            "success"
          );

          reset();
          setEditingProduct(null);
          setIsAddingProduct(false);
          setSelectedImage(null);
          setImagePreview(null);
          // Refresh products
          fetchProducts();
        } else {
          const errorData = await response.json();
          showMessage(errorData.error || "Failed to save product", "error");
        }
      } catch (error) {
        logger.error("Error saving product", error);
        showMessage("An error occurred while saving", "error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [editingProduct, selectedImage, reset, showMessage, fetchProducts]
  );

  const handleEdit = useCallback(
    (product: Product) => {
      setEditingProduct(product);
      setIsAddingProduct(false);
      setValue("name", product.name);
      setValue("description", product.description || "");
      setValue("variety", (product.variety || "Candy") as "Candy" | "Coated Candy" | "Jelly");
      setValue("price", Number(product.price));
      setValue("pricePerGram", Number(product.pricePerGram || 0));
      setValue("vegStatus", (product.vegStatus === "Veg" ? "Veg" : "Non-Veg") as VegStatus);
      setSelectedImage(null);
      setImagePreview(product.imagePath || null);
    },
    [setValue]
  );

  const handleAddProduct = useCallback(() => {
    setIsAddingProduct(true);
    setEditingProduct(null);
    reset();
    setSelectedImage(null);
    setImagePreview(null);
  }, [reset]);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        showMessage("Only JPG, JPEG, PNG, and GIF images are allowed", "error");
        return;
      }

      // Validate file size (5MB max)
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
        logger.error("Error reading file");
        showMessage("Error reading image file", "error");
      };
      reader.readAsDataURL(file);
    },
    [showMessage]
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm("Are you sure you want to delete this product?")) return;

      // Optimistic update
      const previousProducts = products;
      setProducts((prev) => prev.filter((p) => p.id !== id));

      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          showMessage("Product deleted successfully", "success");
        } else {
          // Revert on error
          setProducts(previousProducts);
          showMessage("Failed to delete product", "error");
        }
      } catch (error) {
        logger.error("Error deleting product", error);
        // Revert on error
        setProducts(previousProducts);
        showMessage("An error occurred", "error");
      }
    },
    [products, showMessage]
  );

  const handleCloseModal = useCallback(() => {
    setEditingProduct(null);
    setIsAddingProduct(false);
    setSelectedImage(null);
    setImagePreview(null);
    reset();
  }, [reset]);

  const handleExportProducts = useCallback(async () => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/products/export");
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `products_${new Date().toISOString().slice(0, 10)}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        showMessage("Products exported successfully", "success");
      } else {
        showMessage("Failed to export products", "error");
      }
    } catch (error) {
      logger.error("Error exporting products", error);
      showMessage("An error occurred while exporting", "error");
    } finally {
      setIsExporting(false);
    }
  }, [showMessage]);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setVarietyFilter("all");
    setVegStatusFilter("all");
    setPriceRangeFilter({ min: "", max: "" });
  }, []);

  const handleSelectProduct = useCallback((productId: number) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(filteredProducts.map((p) => p.id)));
    }
  }, [selectedProducts.size, filteredProducts]);

  const handleBulkDelete = useCallback(async () => {
    if (selectedProducts.size === 0) {
      showMessage("Please select products to delete", "error");
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedProducts.size} product(s)?`)) {
      return;
    }

    setIsBulkDeleting(true);
    try {
      const deletePromises = Array.from(selectedProducts).map((id) =>
        fetch(`/api/products/${id}`, { method: "DELETE" })
      );

      const results = await Promise.allSettled(deletePromises);
      const successCount = results.filter(
        (r) => r.status === "fulfilled" && r.value.ok
      ).length;
      const failCount = results.length - successCount;

      if (successCount > 0) {
        showMessage(
          `Successfully deleted ${successCount} product(s)${failCount > 0 ? `, ${failCount} failed` : ""}`,
          successCount === results.length ? "success" : "error"
        );
        setSelectedProducts(new Set());
        fetchProducts();
      } else {
        showMessage("Failed to delete products", "error");
      }
    } catch (error) {
      logger.error("Error bulk deleting products", error);
      showMessage("An error occurred while deleting", "error");
    } finally {
      setIsBulkDeleting(false);
    }
  }, [selectedProducts, showMessage, fetchProducts]);

  const isModalOpen = editingProduct !== null || isAddingProduct;

  return (
    <>
      {message && <NotificationToast message={message} onClose={() => setMessage(null)} />}

      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-heading">Edit Products</h2>
          <div className="flex gap-3 flex-wrap items-center">
            {selectedProducts.size === 0 && (
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-heading text-white rounded-lg hover:bg-heading/90 transition-colors flex items-center space-x-2"
                title="Add New Product"
              >
                <BiPlus className="text-xl" />
                <span>Add Product</span>
              </button>
            )}
            {selectedProducts.size > 0 && (
              <button
                onClick={handleBulkDelete}
                disabled={isBulkDeleting}
                className="px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger/90 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete Selected"
              >
                <BiTrash className="text-xl" />
                <span>
                  {isBulkDeleting
                    ? "Deleting..."
                    : `Delete (${selectedProducts.size})`}
                </span>
              </button>
            )}
            {selectedProducts.size > 0 && (
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleSelectAll}
                  className="px-4 py-2 border border-heading/20 text-body rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                  title={selectedProducts.size === filteredProducts.length ? "Deselect All" : "Select All"}
                >
                  {selectedProducts.size === filteredProducts.length && filteredProducts.length > 0 ? (
                    <BiCheckSquare className="text-xl text-primary" />
                  ) : (
                    <BiSquare className="text-xl" />
                  )}
                  <span>
                    {selectedProducts.size === filteredProducts.length && filteredProducts.length > 0
                      ? "Deselect All"
                      : "Select All"}
                  </span>
                </button>
                <span className="text-sm text-body/70">
                  {selectedProducts.size} selected
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white"
              />
            </div>
            <select
              value={varietyFilter}
              onChange={(e) => setVarietyFilter(e.target.value)}
              className="px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white"
            >
              <option value="all">All Varieties</option>
              <option value="Candy">Candy</option>
              <option value="Coated Candy">Coated Candy</option>
              <option value="Jelly">Jelly</option>
            </select>
            <select
              value={vegStatusFilter}
              onChange={(e) => setVegStatusFilter(e.target.value)}
              className="px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white"
            >
              <option value="all">All Types</option>
              <option value="Veg">Vegetarian</option>
              <option value="Non-Veg">Non-Vegetarian</option>
            </select>
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-heading/20 text-body rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              title="Clear Filters"
            >
              <BiFilter className="text-lg" />
              <span>Clear</span>
            </button>
          </div>
          {/* Price Range Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-body mb-2">Min Price (₹)</label>
              <input
                type="number"
                placeholder="0"
                value={priceRangeFilter.min}
                onChange={(e) =>
                  setPriceRangeFilter({ ...priceRangeFilter, min: e.target.value })
                }
                className="w-full px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-body mb-2">Max Price (₹)</label>
              <input
                type="number"
                placeholder="No limit"
                value={priceRangeFilter.max}
                onChange={(e) =>
                  setPriceRangeFilter({ ...priceRangeFilter, max: e.target.value })
                }
                className="w-full px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                min="0"
                step="0.01"
              />
            </div>
            <div className="text-sm text-body/70">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </div>

        {isLoading && products.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 && products.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="text-center py-8 text-body/70">
              No products match your search criteria
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="text-center py-12">
              <div className="text-6xl text-body/30 mb-4">📦</div>
              <p className="text-body/80 text-lg">No products found</p>
              <p className="text-body/60 text-sm mt-2 mb-4">
                Add your first product to get started
              </p>
              <button
                onClick={handleAddProduct}
                className="px-6 py-2 bg-heading text-white rounded-lg hover:bg-heading/90 transition-colors flex items-center space-x-2 mx-auto"
              >
                <BiPlus className="text-xl" />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isSelected={selectedProducts.has(product.id)}
                onSelect={handleSelectProduct}
              />
            ))}
          </div>
        )}

        {/* Add/Edit Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col m-2 sm:m-0">
              {/* Header */}
              <div className="px-6 py-4 flex justify-between items-center bg-heading text-white">
                <h3 className="text-xl font-bold mb-0">
                  {isAddingProduct ? "Add New Product" : "Edit Product"}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:bg-heading/90 rounded-full p-2 transition-colors"
                  aria-label="Close modal"
                >
                  <BiX className="text-2xl" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-body mb-2">
                        Product Name
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                      {errors.name && (
                        <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-body mb-2">
                        Variety
                      </label>
                      <select
                        {...register("variety")}
                        className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      >
                        <option value="Candy">Candy</option>
                        <option value="Coated Candy">Coated Candy</option>
                        <option value="Jelly">Jelly</option>
                      </select>
                      {errors.variety && (
                        <p className="text-red-600 text-sm mt-1">{errors.variety.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-body mb-2">
                        Description
                      </label>
                      <textarea
                        {...register("description")}
                        rows={4}
                        className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-body mb-2">Price</label>
                      <input
                        {...register("price", { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        min="0.01"
                        className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                      {errors.price && (
                        <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-body mb-2">
                        Price per Gram
                      </label>
                      <input
                        {...register("pricePerGram", { valueAsNumber: true })}
                        type="number"
                        step="0.01"
                        min="0.01"
                        className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                      {errors.pricePerGram && (
                        <p className="text-red-600 text-sm mt-1">{errors.pricePerGram.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-body mb-2">
                        Vegetarian Status
                      </label>
                      <select
                        {...register("vegStatus")}
                        className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      >
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-body mb-2">
                        Product Image{" "}
                        {editingProduct && !isAddingProduct && "(leave empty to keep current)"}
                      </label>
                      <div className="border-2 border-dashed border-primary-300 rounded-lg p-4">
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/gif"
                          onChange={handleImageChange}
                          className="w-full text-sm text-body/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-heading file:text-white hover:file:bg-heading/90"
                        />
                        {imagePreview && (
                          <div className="mt-4">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              width={200}
                              height={200}
                              className="rounded-lg object-cover"
                            />
                          </div>
                        )}
                        <p className="text-xs text-primary-500 mt-2">
                          Max file size: 5MB. Allowed formats: JPG, JPEG, PNG, GIF
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-heading/20 text-body rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-heading text-white rounded-lg hover:bg-heading/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Saving..."
                    : isAddingProduct
                    ? "Add Product"
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
