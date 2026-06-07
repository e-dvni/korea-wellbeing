import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Fetch all active products
export async function getProducts() {
  return sanityClient.fetch(
    `*[_type == "product" && active == true] | order(_createdAt asc) {
      _id,
      nameEN,
      nameKR,
      slug,
      price,
      images,
      descriptionEN,
      descriptionKR,
      category,
      inStock,
      stripePriceId
    }`
  );
}

// Fetch a single product by slug
export async function getProduct(slug: string) {
  return sanityClient.fetch(
    `*[_type == "product" && slug.current == $slug && active == true][0] {
      _id,
      nameEN,
      nameKR,
      slug,
      price,
      images,
      descriptionEN,
      descriptionKR,
      category,
      inStock,
      stripePriceId
    }`,
    { slug }
  );
}
