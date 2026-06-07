import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getProducts } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import type { SanityProduct } from "@/types/sanity";
import ProductGrid from "./ProductGrid";

export const revalidate = 60;

export default async function StorePage() {
  const products: SanityProduct[] = await getProducts();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar variant="store" />

      {/* Coming Soon Banner */}
      <div className="bg-accent/10 border-b border-accent/20 px-4 py-3 text-center">
        <p className="text-sm font-semibold text-accent">
          🚧 Our online store is currently a work in progress — purchasing is not yet available. / 온라인 스토어 준비 중입니다.
        </p>
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Shop</h1>
          <p className="text-xl font-semibold text-primary/70 mt-1">쇼핑하기</p>
          <p className="text-gray-500 text-sm mt-2">
            Premium K Navien products for your home · K나비엔 프리미엄 제품
          </p>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-4">
            <svg className="w-20 h-20 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <p className="text-gray-500 font-semibold text-lg">Products coming soon</p>
            <p className="text-gray-400 text-sm">제품이 곧 추가됩니다</p>
            <Link
              href="/"
              className="mt-2 bg-primary text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1a2550] text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Image src="/logo.svg" alt="Wellbeing Korea USA" width={120} height={35} className="h-8 w-auto mx-auto mb-3 brightness-0 invert" />
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Wellbeing Korea LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
