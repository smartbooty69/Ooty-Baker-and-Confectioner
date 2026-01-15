"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import ProductImage from "./ProductImage";

type SerializedProduct = {
  id: number;
  name: string;
  description: string | null;
  imagePath: string | null;
  price: number;
  variety: string | null;
  pricePerGram: number | null;
  vegStatus: string;
  createdAt: Date;
};

interface ProductsSectionProps {
  productsByCategory: Record<string, SerializedProduct[]>;
}

export default function ProductsSection({ productsByCategory }: ProductsSectionProps) {
  return (
    <section 
      id="products" 
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white"
      style={{
        background: "linear-gradient(to right, #1b6e49, #34C759)"
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          {/* Decorative background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          
          {/* Main Header Container */}
          <div className="relative">
            {/* Main Title */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 tracking-tight relative"
              style={{
                animation: "fadeInUp 0.6s ease-out both",
                textShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              PRODUCTS
            </h1>

            {/* Decorative Divider */}
            <div 
              className="flex items-center justify-center gap-4 mb-6"
              style={{
                animation: "fadeInUp 0.6s ease-out 0.2s both",
              }}
            >
              <div className="w-16 h-1 bg-white/60 rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-32 h-1.5 bg-white/90 rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-16 h-1 bg-white/60 rounded-full"></div>
            </div>

            {/* Subtitle */}
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl text-white/95 font-semibold mb-2 relative"
              style={{
                animation: "fadeInUp 0.6s ease-out 0.4s both",
              }}
            >
              Our Premium Collection
            </h2>
            
            {/* Description */}
            <p 
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mt-4 relative"
              style={{
                animation: "fadeInUp 0.6s ease-out 0.6s both",
              }}
            >
              Handcrafted with love and the finest ingredients
            </p>
          </div>
        </div>

        {Object.entries(productsByCategory).map(([category, products]) => (
          <CategorySection key={category} category={category} products={products} />
        ))}
      </div>
    </section>
  );
}

function CategorySection({ category, products }: { category: string; products: SerializedProduct[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector(".product-card")?.clientWidth || 320;
      const gap = 16;
      const scrollAmount = cardWidth + gap;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    checkScrollability();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);

      // Check if carousel can scroll (has overflow)
      const canScroll = carousel.scrollWidth > carousel.clientWidth;

      // Auto-scroll function
      const startAutoScroll = () => {
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current);
        }

        if (canScroll && !isHovered) {
          autoScrollIntervalRef.current = setInterval(() => {
            if (carouselRef.current) {
              const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
              
              // If reached the end, reset to beginning
              if (scrollLeft >= scrollWidth - clientWidth - 10) {
                carouselRef.current.scrollTo({
                  left: 0,
                  behavior: "smooth",
                });
              } else {
                // Otherwise, scroll right
                scroll("right");
              }
            }
          }, 3000); // Auto-scroll every 3 seconds
        }
      };

      // Start auto-scroll if not hovered
      if (canScroll) {
        startAutoScroll();
      }

      return () => {
        carousel.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current);
        }
      };
    }
  }, [products, isHovered]);

  // Pause/resume auto-scroll on hover
  useEffect(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }

    if (!isHovered && carouselRef.current) {
      const canScroll = carouselRef.current.scrollWidth > carouselRef.current.clientWidth;
      if (canScroll) {
        autoScrollIntervalRef.current = setInterval(() => {
          if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            
            if (scrollLeft >= scrollWidth - clientWidth - 10) {
              carouselRef.current.scrollTo({
                left: 0,
                behavior: "smooth",
              });
            } else {
              scroll("right");
            }
          }
        }, 3000);
      }
    }
  }, [isHovered]);

  return (
    <div className="mb-20" data-aos="fade-up">
      <div className="text-center mb-8">
        <div className="inline-block bg-white/15 backdrop-blur-sm px-6 py-2 rounded-full mb-3 border border-white/20">
          <span className="text-white font-bold text-sm uppercase tracking-wider">{category}</span>
        </div>
      </div>

      <div 
        className="relative carousel-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Navigation Button */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-all duration-300 ${
            canScrollLeft && isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          } disabled:opacity-0 disabled:cursor-not-allowed hover:scale-110`}
          aria-label="Previous items"
        >
          <BiChevronLeft className="text-2xl text-primary-700" />
        </button>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={checkScrollability}
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white transition-all duration-300 ${
            canScrollRight && isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          } disabled:opacity-0 disabled:cursor-not-allowed hover:scale-110`}
          aria-label="Next items"
        >
          <BiChevronRight className="text-2xl text-primary-700" />
        </button>

        {/* Gradient Overlays */}
        <div className={`absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-[#1b6e49] to-transparent pointer-events-none transition-opacity duration-300 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`} />
        <div className={`absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-[#34C759] to-transparent pointer-events-none transition-opacity duration-300 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`} />
      </div>

      <div className="text-center mt-8">
        <Link
          href={`/products/${encodeURIComponent(category)}`}
          className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent-dark transition-all duration-300 font-semibold hover:scale-105 shadow-md hover:shadow-lg"
        >
          <span>View More {category}</span>
          <BiChevronRight className="text-xl" />
        </Link>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-16"></div>
    </div>
  );
}

function ProductCard({ product, index }: { product: SerializedProduct; index: number }) {
  return (
    <div 
      className="card__article relative bg-white rounded-[40px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 min-w-[280px] max-w-[320px]"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* Veg Badge */}
      <div
        className={`veg-badge absolute top-4 right-4 w-10 h-10 rounded-full z-20 flex items-center justify-center shadow-lg ${
          product.vegStatus === "Veg" ? "bg-green-500" : "bg-red-500"
        }`}
        title={product.vegStatus}
      >
        <div className="w-4 h-4 rounded-full bg-white" />
      </div>

      {/* Card Container */}
      <div className="card relative block h-full w-full rounded-[20px] overflow-hidden group">
        {/* Product Image */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden bg-primary-100">
          {product.imagePath ? (
            <ProductImage
              src={product.imagePath}
              alt={product.name}
              width={320}
              height={320}
              className="card__image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-primary-200 flex items-center justify-center">
              <span className="text-primary-500 text-lg">No Image</span>
            </div>
          )}
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          
          {/* Product Info Overlay - Appears on Hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out pointer-events-none">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-bold text-[#6A515E] mb-1 line-clamp-1">
                {product.name}
              </h3>
              {product.description && (
                <p className="text-sm text-[#D7BDCA] mb-3 line-clamp-2">
                  {product.description}
                </p>
              )}
                    {product.pricePerGram ? (
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <span className="px-3 py-1.5 text-white bg-accent rounded-lg whitespace-nowrap font-semibold shadow-md">
                          ₹{Number(product.pricePerGram).toFixed(2)}/g
                        </span>
                        <span className="px-3 py-1.5 text-white bg-accent rounded-lg whitespace-nowrap font-semibold shadow-md">
                          ₹{Number(product.price).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm font-medium">
                        <span className="px-4 py-2 text-white bg-accent rounded-lg font-semibold shadow-md">
                          ₹{Number(product.price).toFixed(2)}
                        </span>
                      </div>
                    )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
