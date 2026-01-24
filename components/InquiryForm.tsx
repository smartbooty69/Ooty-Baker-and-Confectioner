"use client";

import { logger } from "@/lib/logger";

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
        logger.error("Error fetching products", error);
      }
    }
    fetchProducts();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      productInterest: [],
    },
  });

  const selectedProducts = watch("productInterest") || [];

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
      id="inquiry" 
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: "#F9F7F2" // Warm Cream
      }}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-heading mb-3">Inquiry Details</h2>
          <div className="w-32 h-1 bg-heading/60 mx-auto rounded-full"></div>
          <p className="text-body/80 mt-4 text-lg">Fill out the form below and we&apos;ll get back to you soon!</p>
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
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-heading/10">
            <h3 className="text-xl font-semibold text-heading mb-4">Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-body mb-1">
                  Business Name
                </label>
                <input
                  {...register("businessName")}
                  type="text"
                  placeholder="e.g. CandyCo Pvt. Ltd"
                  className="w-full px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.businessName && (
                  <p className="text-red-600 text-sm mt-1">{errors.businessName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-body mb-1">
                  Contact Person
                </label>
                <input
                  {...register("contactPersonName")}
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.contactPersonName && (
                  <p className="text-red-600 text-sm mt-1">{errors.contactPersonName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-body mb-1">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-body mb-1">Phone</label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="Mobile number"
                  maxLength={10}
                  className="w-full px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-body mb-1">
                  Estimated Quantity
                </label>
                <input
                  {...register("estimatedQuantity")}
                  type="text"
                  placeholder="e.g. 100kg / 500 units"
                  className="w-full px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.estimatedQuantity && (
                  <p className="text-red-600 text-sm mt-1">{errors.estimatedQuantity.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-body mb-1">
                  Delivery Frequency
                </label>
                <select
                  {...register("deliveryFrequency")}
                  className="w-full px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
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
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-heading/10">
            <h3 className="text-xl font-semibold text-heading mb-4">Product Interest</h3>
            {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
              <div key={category} className="mb-6">
                <h4 className="text-lg font-semibold text-heading mb-3">{category}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categoryProducts.map((product) => (
                    <label
                      key={product.id}
                      className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-primary/5 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => {
                          const currentValues = selectedProducts;
                          if (e.target.checked) {
                            setValue("productInterest", [...currentValues, product.id], {
                              shouldValidate: true,
                            });
                          } else {
                            setValue(
                              "productInterest",
                              currentValues.filter((id) => id !== product.id),
                              { shouldValidate: true }
                            );
                          }
                        }}
                        className="w-4 h-4 text-primary focus:ring-primary border-heading/30 rounded"
                      />
                      <span className="text-body">{product.name}</span>
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
          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-heading/10">
            <h3 className="text-xl font-semibold text-heading mb-4">Address & Notes</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-body mb-1">
                  Full Address
                </label>
                <input
                  {...register("address")}
                  type="text"
                  placeholder="Enter address"
                  className="w-full px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.address && (
                  <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-body mb-1">
                  Additional Notes
                </label>
                <input
                  {...register("additionalNotes")}
                  type="text"
                  placeholder="Anything else to add?"
                  className="w-full px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-body mb-1">
                  Nature of Business
                </label>
                <select
                  {...register("businessNature")}
                  className="w-full px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
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
              className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-[#007f4d] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
