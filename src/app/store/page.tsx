import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getProducts } from "@/lib/sanity";
import type { SanityProduct } from "@/types/sanity";
import ProductGrid from "./ProductGrid";

export const revalidate = 60;

export default async function StorePage() {
  const products: SanityProduct[] = await getProducts();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar variant="store" />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Promotion banner */}
        <div className="bg-primary rounded-2xl px-6 py-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-white font-bold text-lg">🎉 Limited Time: 10% OFF All Products</p>
            <p className="text-white/70 text-base">전 제품 10% 할인 프로모션 진행 중</p>
          </div>
          <span className="bg-accent text-white text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap self-start sm:self-auto">
            Limited Time · 한정 기간
          </span>
        </div>

        {/* Shipping & pickup notice */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 mb-10 space-y-1.5">
          <p className="text-primary font-semibold text-base flex items-center gap-2">
            🚚 Free delivery on orders over $2,000 to Bergen, Essex & Hudson County, NJ
          </p>
          <p className="text-primary/70 text-sm">
            버겐, 에식스, 허드슨 카운티(뉴저지) — $2,000 이상 주문 시 무료 배송
          </p>
          <p className="text-primary font-semibold text-base flex items-center gap-2">
            🏪 Local pickup available for all items · 모든 제품 방문 수령 가능
          </p>
          <p className="text-primary/70 text-sm">
            230 E. Brinkerhoff Ave, Palisades Park, NJ 07650
          </p>
        </div>

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
