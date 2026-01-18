"use client";

import { logger } from "@/lib/logger";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Banner {
  id: number;
  imagePath: string;
  altText: string | null;
  order: number;
  isActive: boolean;
}

export default function BannerSlider() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch("/api/banners");
      if (response.ok) {
        const data = await response.json();
        setBanners(data);
        if (data.length > 0) {
          setCurrentSlide(0);
        }
      }
    } catch (error) {
      logger.error("Error fetching banners", error);
      // Fallback to default banners if API fails
      setBanners([
        { id: 1, imagePath: "/images/Banne2.jpg", altText: "Banner Image 1", order: 0, isActive: true },
        { id: 2, imagePath: "/images/banner3.jpg", altText: "Banner Image 2", order: 1, isActive: true },
        { id: 3, imagePath: "/images/banner.png", altText: "Banner Image 3", order: 2, isActive: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  const nextSlide = () => {
    if (banners.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }
  };

  const prevSlide = () => {
    if (banners.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-primary-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={banner.imagePath}
            alt={banner.altText || `Banner Image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}
      
      {/* Navigation Buttons */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-accent hover:text-white text-primary-800 p-3 rounded-full transition-all z-10 shadow-xl border-2 border-primary-200 hover:border-accent"
            aria-label="Previous slide"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-accent hover:text-white text-primary-800 p-3 rounded-full transition-all z-10 shadow-xl border-2 border-primary-200 hover:border-accent"
            aria-label="Next slide"
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  );
}
