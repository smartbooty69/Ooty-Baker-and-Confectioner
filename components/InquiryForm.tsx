"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InquiryFormData } from "@/types";

const inquirySchema = z.object({
  businessName: z.string().min(2).max(100).regex(/^[A-Za-z0-9\s\.&]+$/),
  contactPersonName: z.string().min(2).max(50).regex(/^[A-Za-z\s]+$/),
  email: z.string().email().max(100),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),
  estimatedQuantity: z.string().max(50).regex(/^[0-9]+(kg|units|pieces|boxes|packs|dozens|g|ml|L)$/i),
  deliveryFrequency: z.enum(["One-time", "Weekly", "Monthly"]),
  address: z.string().min(10).max(200),
  additionalNotes: z.string().max(500).optional(),
  businessNature: z.enum(["Customer", "Consumer", "Dealer"]),
  productInterest: z.array(z.number()).min(1, "Please select at least one product"),
});

interface InquiryFormProps {
  categories: string[];
}

export default function InquiryForm({ categories }: InquiryFormProps) {
  const [products, setProducts] = useState<Array<{ id: number; name: string; variety: string | null }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: "success", message: "Inquiry submitted successfully!" });
        reset();
        // Update URL with success message
        window.history.replaceState({}, "", window.location.pathname + "?status=success&message=" + encodeURIComponent("Inquiry submitted successfully."));
      } else {
        setSubmitStatus({ type: "error", message: result.error || "Failed to submit inquiry" });
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const productsByCategory = products.reduce((acc, product) => {
    const category = product.variety || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <section 
      id="contact" 
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white"
      style={{
        background: "linear-gradient(to right, #1b6e49, #34C759)"
      }}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Inquiry Details</h2>
          <div className="w-32 h-1 bg-white/80 mx-auto rounded-full"></div>
          <p className="text-white/90 mt-4 text-lg">Fill out the form below and we'll get back to you soon!</p>
        </div>

        {submitStatus && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              submitStatus.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Business Details */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-primary-100">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Business Name
                </label>
                <input
                  {...register("businessName")}
                  type="text"
                  placeholder="e.g. CandyCo Pvt. Ltd"
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                {errors.businessName && (
                  <p className="text-red-600 text-sm mt-1">{errors.businessName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Contact Person
                </label>
                <input
                  {...register("contactPersonName")}
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                {errors.contactPersonName && (
                  <p className="text-red-600 text-sm mt-1">{errors.contactPersonName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">Phone</label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="Mobile number"
                  maxLength={10}
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Estimated Quantity
                </label>
                <input
                  {...register("estimatedQuantity")}
                  type="text"
                  placeholder="e.g. 100kg / 500 units"
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                {errors.estimatedQuantity && (
                  <p className="text-red-600 text-sm mt-1">{errors.estimatedQuantity.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Delivery Frequency
                </label>
                <select
                  {...register("deliveryFrequency")}
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="One-time">One-time</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
                {errors.deliveryFrequency && (
                  <p className="text-red-600 text-sm mt-1">{errors.deliveryFrequency.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Product Interest */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-primary-100">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">Product Interest</h3>
            {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
              <div key={category} className="mb-6">
                <h4 className="text-lg font-semibold text-primary-700 mb-3">{category}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categoryProducts.map((product) => (
                    <label
                      key={product.id}
                      className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-primary-100 rounded"
                    >
                      <input
                        type="checkbox"
                        value={product.id}
                        {...register("productInterest")}
                        className="w-4 h-4 text-accent focus:ring-accent border-primary-300 rounded"
                      />
                      <span className="text-primary-700">{product.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            {errors.productInterest && (
              <p className="text-red-600 text-sm mt-1">{errors.productInterest.message}</p>
            )}
          </div>

          {/* Address and Notes */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-primary-100">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">Address & Notes</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Full Address
                </label>
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Enter address"
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                {errors.address && (
                  <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Additional Notes
                </label>
                <input
                  {...register("additionalNotes")}
                  type="text"
                  placeholder="Anything else to add?"
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Nature of Business
                </label>
                <select
                  {...register("businessNature")}
                  className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="Customer">Customer</option>
                  <option value="Consumer">Consumer</option>
                  <option value="Dealer">Dealer</option>
                </select>
                {errors.businessNature && (
                  <p className="text-red-600 text-sm mt-1">{errors.businessNature.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
