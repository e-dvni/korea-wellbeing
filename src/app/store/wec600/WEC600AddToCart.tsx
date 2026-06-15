"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import type { SanityProduct, SanityVariant } from "@/types/sanity";

export default function WEC600AddToCart({ product }: { product: SanityProduct }) {
  const { addItem } = useCartStore();
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState<SanityVariant | null>(
    hasVariants ? product.variants![0] : null
  );
  const [added, setAdded] = useState(false);

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const origPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
  const isInStock = selectedVariant ? selectedVariant.inStock : product.inStock;
  const imageUrl = product.images?.[0]?.asset?.url ?? null;

  function handleAddToCart() {
    const cartId = selectedVariant ? `${product._id}-${selectedVariant._key}` : product._id;
    const nameEN = selectedVariant ? `${product.nameEN} — ${selectedVariant.nameEN}` : product.nameEN;
    const nameKR = selectedVariant ? `${product.nameKR} — ${selectedVariant.nameKR}` : product.nameKR;

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
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div>
      {hasVariants && (
        <div className="mb-6">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">
            Select Model · 모델 선택
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants!.map((v) => (
              <button
                key={v._key}
                onClick={() => setSelectedVariant(v)}
                disabled={!v.inStock}
                className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors
                  ${selectedVariant?._key === v._key
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-primary border-gray-200 hover:border-primary"
                  }
                  ${!v.inStock ? "opacity-40 cursor-not-allowed" : ""}
                `}
              >
                {v.nameEN}
                {!v.inStock && " (품절)"}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        {origPrice ? (
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-4xl font-bold text-primary">${displayPrice?.toFixed(2)}</span>
            <span className="text-xl text-gray-400 line-through">${origPrice.toFixed(2)}</span>
            <span className="bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">10% OFF</span>
          </div>
        ) : (
          <span className="text-4xl font-bold text-primary">${displayPrice?.toFixed(2) ?? "—"}</span>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!isInStock}
        className={`w-full py-4 rounded-full font-bold text-base transition-all
          ${added
            ? "bg-green-500 text-white"
            : isInStock
              ? "bg-accent text-white hover:bg-[#c05e1e] active:scale-95"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        {added
          ? "✓ Added to Cart / 담겼습니다!"
          : isInStock
            ? "Add to Cart · 장바구니 담기"
            : "Out of Stock / 품절"}
      </button>
    </div>
  );
}
