"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { urlFor } from "@/lib/sanity";
import type { SanityProduct } from "@/types/sanity";

const CATEGORY_LABELS: Record<string, string> = {
  "water-purifier": "Water Purifier / 가정용 정수기",
  "water-softener": "Water Purifier & Softener / 정수·연수기",
  "boiler": "Condensing Boiler / 콘덴싱 보일러",
  "hot-water-mat": "Hot Water Mat / 온수 매트",
  "hvac": "A/C · Heat Pump · HVAC",
  "air-purifier": "Air Purification / 공기정화",
};

export default function ProductGrid({ products }: { products: SanityProduct[] }) {
  const { addItem } = useCartStore();

  function handleAddToCart(product: SanityProduct) {
    const imageUrl =
      product.images?.length > 0
        ? urlFor(product.images[0]).width(400).height(400).url()
        : null;

    addItem({
      id: product._id,
      nameEN: product.nameEN,
      nameKR: product.nameKR,
      price: product.price,
      imageUrl,
      stripePriceId: product.stripePriceId,
    });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const imageUrl =
          product.images?.length > 0
            ? urlFor(product.images[0]).width(600).height(600).url()
            : null;

        return (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
          >
            {/* Image */}
            <div className="relative w-full aspect-square bg-gray-50">
              {imageUrl ? (
                <Image src={imageUrl} alt={product.nameEN} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-200">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5M21 12V5.25A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25V12" />
                  </svg>
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                  <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    Out of Stock / 품절
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col flex-1">
              <p className="text-xs text-gray-400 font-medium mb-1">
                {CATEGORY_LABELS[product.category] ?? product.category}
              </p>
              <h2 className="text-base font-bold text-primary leading-tight">{product.nameEN}</h2>
              <p className="text-sm font-semibold text-accent mb-2">{product.nameKR}</p>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-1">
                {product.descriptionEN}
              </p>
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
                {product.descriptionKR}
              </p>

              <div className="mt-auto flex items-center justify-between gap-3">
                <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="flex-1 bg-primary text-white py-2.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {product.inStock ? "Add to Cart / 담기" : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
