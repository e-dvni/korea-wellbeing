"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore, cartItemCount } from "@/store/cart";

const NAVIEN_PRODUCTS_URL = "https://www.navieninc.com/products-accessories";

interface NavbarProps {
  variant?: "home" | "store";
}

export default function Navbar({ variant = "home" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, openCart } = useCartStore();
  const itemCount = cartItemCount(items);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Wellbeing Korea USA"
              width={150}
              height={44}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {variant === "home" ? (
              <>
                <Link href="/store" className="text-primary/80 hover:text-primary font-medium transition-colors">
                  Products / 제품
                </Link>
                <a href="#contact" className="text-primary/80 hover:text-primary font-medium transition-colors">
                  Contact / 연락처
                </a>
              </>
            ) : (
              <>
                <Link href="/" className="text-primary/80 hover:text-primary font-medium transition-colors">
                  Home / 홈
                </Link>
                <Link href="/#contact" className="text-primary/80 hover:text-primary font-medium transition-colors">
                  Contact / 연락처
                </Link>
              </>
            )}
            <a
              href={NAVIEN_PRODUCTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#c05e1e] transition-colors"
            >
              K Navien Site ↗
            </a>
            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative text-primary/80 hover:text-primary transition-colors"
              aria-label="Open cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {mounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative text-primary/80"
              aria-label="Open cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {mounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              className="text-primary p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {variant === "home" ? (
            <>
              <Link href="/store" className="block text-primary py-2 font-medium border-b border-gray-100 pb-3" onClick={() => setMenuOpen(false)}>
                Products / 제품
              </Link>
              <a href="#contact" className="block text-primary py-2 font-medium border-b border-gray-100 pb-3" onClick={() => setMenuOpen(false)}>
                Contact / 연락처
              </a>
            </>
          ) : (
            <>
              <Link href="/" className="block text-primary py-2 font-medium border-b border-gray-100 pb-3" onClick={() => setMenuOpen(false)}>
                Home / 홈
              </Link>
              <Link href="/#contact" className="block text-primary py-2 font-medium border-b border-gray-100 pb-3" onClick={() => setMenuOpen(false)}>
                Contact / 연락처
              </Link>
            </>
          )}
          <a
            href={NAVIEN_PRODUCTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-accent text-white px-5 py-2.5 rounded-full font-semibold hover:bg-[#c05e1e] transition-colors mt-2"
          >
            K Navien Site ↗
          </a>
        </div>
      )}
    </nav>
  );
}
