"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import type { SanityProduct, SanityVariant } from "@/types/sanity";

const CATEGORY_LABELS: Record<string, string> = {
  "water-purifier": "Water Purifier / 가정용 정수기",
  "water-softener": "Water Purifier & Softener / 정수·연수기",
  "boiler": "Condensing Boiler / 콘덴싱 보일러",
  "hot-water-mat": "Hot Water Mat / 온수 매트",
  "hvac": "A/C · Heat Pump · HVAC",
  "air-purifier": "Air Purification / 공기정화",
};

function ProductCard({ product }: { product: SanityProduct }) {
  const { addItem } = useCartStore();
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState<SanityVariant | null>(
    hasVariants ? product.variants![0] : null
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const isInStock = selectedVariant ? selectedVariant.inStock : product.inStock;

  const imageUrl = product.images?.length > 0 ? product.images[0].asset?.url ?? null : null;

  function handleAddToCart() {
    const cartId = selectedVariant
      ? `${product._id}-${selectedVariant._key}`
      : product._id;

    const nameEN = selectedVariant
      ? `${product.nameEN} — ${selectedVariant.nameEN}`
      : product.nameEN;

    const nameKR = selectedVariant
      ? `${product.nameKR} — ${selectedVariant.nameKR}`
      : product.nameKR;

    addItem({
      id: cartId,
      nameEN,
      nameKR,
      variantKey: selectedVariant?._key ?? null,
      variantNameEN: selectedVariant?.nameEN ?? null,
      variantNameKR: selectedVariant?.nameKR ?? null,
      price: displayPrice ?? 0,
      imageUrl,
      stripePriceId: selectedVariant?.stripePriceId ?? product.stripePriceId,
    });
  }

  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Image */}
      <div className="relative w-full aspect-square bg-gray-50">
        {imageUrl ? (
          <Image src={imageUrl} alt={product.nameEN} fill className="object-contain p-4 bg-white" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-200">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5M21 12V5.25A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25V12" />
            </svg>
          </div>
        )}
        {!isInStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Out of Stock / 품절
            </span>
          </div>
        )}
        {(product.originalPrice || product.variants?.some(v => v.originalPrice)) && (
          <div className="absolute top-3 left-3">
            <span className="bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
              10% OFF
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-sm text-gray-400 font-medium mb-1">
          {CATEGORY_LABELS[product.category] ?? product.category}
        </p>
        <h2 className="text-base font-bold text-primary leading-tight">{product.nameEN}</h2>
        <p className="text-sm font-semibold text-accent mb-2">{product.nameKR}</p>
        <p className={`text-gray-500 text-base leading-relaxed mb-1 ${isExpanded ? "" : "line-clamp-2"}`}>{product.descriptionEN}</p>
        <p className={`text-gray-400 text-base leading-relaxed mb-2 ${isExpanded ? "" : "line-clamp-2"}`}>{product.descriptionKR}</p>
        <button
          className="flex items-center gap-1 text-sm text-primary/50 hover:text-primary mb-2 self-start"
          onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {isExpanded ? "Show less" : "Read more"}
        </button>

        {/* Free taste testing notice + View Details for WUR500 */}
        {product.slug.current === "wur500-tankless-ro-water-system" && (
          <>
            <div className="mb-3 bg-accent/10 border border-accent/20 rounded-xl px-3 py-2.5">
              <p className="text-xs font-semibold text-accent">
                🎉 Free Taste Testing every Tuesday &amp; Saturday
              </p>
              <p className="text-xs text-accent/80 mt-0.5">
                매주 화·토요일 무료 시음회 — 230 E. Brinkerhoff Ave, Palisades Park, NJ
              </p>
            </div>
            <a
              href="/store/wur500"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent transition-colors mb-3 self-start"
            >
              View Full Details · 자세히 보기
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </>
        )}

        {/* Variant selector */}
        {hasVariants && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 font-semibold mb-2">Size / 사이즈</p>
            <div className="flex flex-wrap gap-2">
              {product.variants!.map((variant) => (
                <button
                  key={variant._key}
                  onClick={(e) => { e.stopPropagation(); setSelectedVariant(variant); }}
                  disabled={!variant.inStock}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors
                    ${selectedVariant?._key === variant._key
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-primary border-gray-200 hover:border-primary"
                    }
                    ${!variant.inStock ? "opacity-40 cursor-not-allowed" : ""}
                  `}
                >
                  {variant.nameEN}
                  {!variant.inStock && " (품절)"}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            {hasVariants && <p className="text-sm text-gray-400">Starting from</p>}
            {/* Show original crossed-out price if available */}
            {(() => {
              const origPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
              return origPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">${displayPrice?.toFixed(2) ?? "—"}</span>
                  <span className="text-sm text-gray-400 line-through">${origPrice.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-primary">${displayPrice?.toFixed(2) ?? "—"}</span>
              );
            })()}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            disabled={!isInStock}
            className="flex-1 bg-primary text-white py-2.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isInStock ? "Add to Cart / 담기" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({ products }: { products: SanityProduct[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
