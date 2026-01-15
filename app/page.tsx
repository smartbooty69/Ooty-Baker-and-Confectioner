import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import BannerSlider from "@/components/BannerSlider";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";
import NotificationPopup from "@/components/NotificationPopup";
import { Suspense } from "react";

export const revalidate = 60; // Revalidate every 60 seconds

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Convert Decimal to number for client components
    const serializedProducts = products.map((product) => ({
      ...product,
      price: Number(product.price),
      pricePerGram: product.pricePerGram ? Number(product.pricePerGram) : null,
    }));

    // Group products by variety
    const productsByCategory: Record<string, Array<{
      id: number;
      name: string;
      description: string | null;
      imagePath: string | null;
      price: number;
      variety: string | null;
      pricePerGram: number | null;
      vegStatus: string;
      createdAt: Date;
    }>> = {};
    
    serializedProducts.forEach((product) => {
      const category = product.variety || "Uncategorized";
      if (!productsByCategory[category]) {
        productsByCategory[category] = [];
      }
      productsByCategory[category].push(product);
    });

    return productsByCategory;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {};
  }
}

export default async function HomePage() {
  const productsByCategory = await getProducts();
  const categories = Object.keys(productsByCategory);

  return (
    <main className="min-h-screen">
      <Suspense fallback={null}>
        <NotificationPopup />
      </Suspense>
      <Header categories={categories} />
      <BannerSlider />
      <AboutSection />
      <ProductsSection productsByCategory={productsByCategory} />
      <InquiryForm categories={categories} />
      <Footer />
    </main>
  );
}
