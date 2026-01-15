"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  categories: string[];
}

export default function Header({ categories }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);

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
                className="text-[1.2em] font-semibold text-text-medium uppercase transition-colors relative pb-[5px] whitespace-nowrap hover:text-text-dark after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-text-medium after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
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
            <Link 
              href="#contact" 
              className="text-[1.2em] font-semibold text-gimme-light uppercase transition-colors relative pb-[5px] whitespace-nowrap hover:text-gimme-dark after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gimme-light after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
            >
              Inquiry
            </Link>
            <button
              onClick={() => (window.location.href = "/auth")}
              className="bg-transparent border-2 border-text-medium px-[22px] py-[10px] rounded-[25px] text-[1.05em] text-text-medium transition-all flex items-center gap-2 font-medium whitespace-nowrap hover:bg-text-medium hover:text-surface hover:border-text-medium"
            >
              <span>Login</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M9 5L16 12L9 19" />
              </svg>
            </button>
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

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-surface shadow-2xl transform transition-transform duration-300 z-50 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-text-dark">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-text-medium font-bold uppercase"
            >
              CLOSE
            </button>
          </div>
          <nav className="space-y-4">
            <div>
              <button
                onClick={() => setIsProductsMenuOpen(!isProductsMenuOpen)}
                className="flex items-center justify-between w-full text-text-medium font-semibold uppercase py-2"
              >
                <span>PRODUCTS</span>
                <span>{isProductsMenuOpen ? "−" : "+"}</span>
              </button>
              {isProductsMenuOpen && (
                <ul className="mt-2 space-y-2 pl-4">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        href={`/products/${encodeURIComponent(category)}`}
                        className="block text-text-medium hover:text-text-dark py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category} ↗
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link
              href="/about"
              className="block text-text-medium font-semibold uppercase py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ABOUT US ↗
            </Link>
            <Link
              href="#contact"
              className="block text-text-medium font-semibold uppercase py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              INQUIRY ↗
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Spacer for fixed header */}
      <div className="h-[100px]" />
    </>
  );
}
