export interface SanityImage {
  _key: string;
  alt?: string;
  asset: {
    _id: string;
    url: string;
  };
}

export interface SanityVariant {
  _key: string;
  nameEN: string;
  nameKR: string;
  price: number;
  originalPrice: number | null;
  inStock: boolean;
  stripePriceId: string | null;
}

export interface SanityProduct {
  _id: string;
  nameEN: string;
  nameKR: string;
  slug: { current: string };
  price: number | null;
  originalPrice: number | null;
  images: SanityImage[];
  descriptionEN: string;
  descriptionKR: string;
  category: string;
  inStock: boolean;
  variants: SanityVariant[] | null;
  stripePriceId: string | null;
}
