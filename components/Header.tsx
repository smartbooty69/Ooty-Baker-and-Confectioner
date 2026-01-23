"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface HeaderProps {
  categories: string[];
}

export default function Header({ categories }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const scrollToHash = useCallback((hashId: string) => {
    const element = document.getElementById(hashId);
    if (element) {
      // Add offset for fixed header
      const headerHeight = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const hashId = hash.replace('#', '');
    
    // If we're on the home page, scroll to the element
    if (pathname === '/') {
      scrollToHash(hashId);
      // Update URL hash
      window.history.pushState(null, '', hash);
    } else {
      // If not on home page, redirect to full URL with hash
      window.location.href = `https://ooty-baker-and-confectioner.vercel.app/${hash}`;
    }
  };

  // Handle hash scrolling when page loads with hash in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hashId = window.location.hash.replace('#', '');
      
      if (hashId && pathname === '/') {
        // On home page with hash, scroll to the element
        const scrollTimeout = setTimeout(() => {
          scrollToHash(hashId);
        }, 100);
        
        return () => clearTimeout(scrollTimeout);
      } else if (hashId && pathname !== '/') {
        // On other pages with hash (like /about#inquiry), redirect to full URL with hash
        window.location.href = `https://ooty-baker-and-confectioner.vercel.app/#${hashId}`;
      }
    }
  }, [pathname, scrollToHash]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface rounded-surface mx-auto my-5 max-w-[1200px] px-[30px] py-[10px] shadow-surface">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/brand-logo.png"
                alt="Brand Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <Image
                src="/images/gimmie-logo.jpg"
                alt="Gimmie Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            <div className="relative group">
              <a 
                href="#products" 
                onClick={(e) => handleHashLink(e, '#products')}
                className="text-[1.2em] font-semibold text-text-medium uppercase transition-colors relative pb-[5px] whitespace-nowrap hover:text-text-dark after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-text-medium after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left cursor-pointer"
              >
                Products +
              </a>
              <div className="absolute top-full left-0 bg-surface min-w-[220px] shadow-surface-lg rounded-lg py-[10px] z-[100] mt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 before:content-[''] before:absolute before:-top-2.5 before:left-0 before:w-full before:h-2.5 before:bg-transparent">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products/${encodeURIComponent(category)}`}
                    className="block text-[0.95em] font-medium text-text-medium px-5 py-3 whitespace-nowrap transition-all hover:bg-gray-200 hover:text-text-dark hover:translate-x-1"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link 
              href="/about" 
              className="text-[1.2em] font-semibold text-gimme-light uppercase transition-colors relative pb-[5px] whitespace-nowrap hover:text-gimme-dark after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gimme-light after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
            >
              About Us
            </Link>
            <a 
              href="#inquiry" 
              onClick={(e) => handleHashLink(e, '#inquiry')}
              className="text-[1.2em] font-semibold text-gimme-light uppercase transition-colors relative pb-[5px] whitespace-nowrap hover:text-gimme-dark after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gimme-light after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left cursor-pointer"
            >
              Inquiry
            </a>
            <Link
              href="/auth"
              className="bg-transparent border-2 border-text-medium px-[22px] py-[10px] rounded-[25px] text-[1.05em] text-text-medium transition-all flex items-center gap-2 font-medium whitespace-nowrap hover:bg-text-medium hover:text-surface hover:border-text-medium"
            >
              <span>Login</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M9 5L16 12L9 19" />
              </svg>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-[1.1em] font-medium text-text-medium uppercase tracking-[0.05em] px-[10px] py-[10px]"
          >
            MENU
          </button>
        </div>
      </header>

      {/* Mobile Sidebar - Old UI Style */}
      <div
        className="fixed top-0 h-full w-[85%] max-w-[380px] bg-background shadow-[-8px_0_20px_rgba(0,0,0,0.2)] z-50 lg:hidden flex flex-col p-[30px_25px] box-border"
        style={{
          right: isMobileMenuOpen ? "0" : "-100%",
          transition: "right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        }}
      >
        {/* Sidebar Header */}
        <div className="text-right mb-10">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base text-body uppercase font-medium px-[10px] py-[10px]"
          >
            CLOSE
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-grow">
          {/* Products Dropdown */}
          <div className="border-b border-gray-300">
            <button
              onClick={() => setIsProductsMenuOpen(!isProductsMenuOpen)}
              className="flex justify-between items-center w-full py-5 cursor-pointer text-xl text-body font-medium uppercase"
            >
              <span>PRODUCTS</span>
              <span className="text-base text-body/70">{isProductsMenuOpen ? "−" : "+"}</span>
            </button>
            <ul
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isProductsMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
              style={{
                maxHeight: isProductsMenuOpen ? `${categories.length * 60 + 20}px` : "0px",
                transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out"
              }}
            >
              {categories.map((category) => (
                <li key={category} className="border-b border-gray-200 last:border-b-0">
                  <Link
                    href={`/products/${encodeURIComponent(category)}`}
                    className="block text-lg text-body font-medium uppercase py-4 px-0 hover:text-heading transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category} <span className="text-body/70">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div className="flex justify-between items-center py-5 border-b border-gray-300">
            <Link
              href="/about"
              className="text-xl text-body font-medium uppercase w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ABOUT US
            </Link>
            <span className="text-xl text-body/70 ml-4">↗</span>
          </div>

          {/* Inquiry */}
          <div className="flex justify-between items-center py-5 border-b border-gray-300">
            <a
              href="#inquiry"
              onClick={(e) => {
                handleHashLink(e, '#inquiry');
                setIsMobileMenuOpen(false);
              }}
              className="text-xl text-body font-medium uppercase w-full cursor-pointer"
            >
              INQUIRY
            </a>
            <span className="text-xl text-body/70 ml-4">↗</span>
          </div>
        </nav>
      </div>

      {/* Mobile Overlay - Old Style */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Spacer for fixed header */}
      <div className="h-[100px]" />
    </>
  );
}
