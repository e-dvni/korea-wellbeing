export interface SanityImageAsset {
  _ref: string;
  _type: "reference";
}

export interface SanityImage {
  _key: string;
  _type: "image";
  asset: SanityImageAsset;
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
}

export interface SanityVariant {
  _key: string;
  nameEN: string;
  nameKR: string;
  price: number;
  inStock: boolean;
  stripePriceId: string | null;
}

export interface SanityProduct {
  _id: string;
  nameEN: string;
  nameKR: string;
  slug: { current: string };
  price: number | null;
  images: SanityImage[];
  descriptionEN: string;
  descriptionKR: string;
  category: string;
  inStock: boolean;
  variants: SanityVariant[] | null;
  stripePriceId: string | null;
}
