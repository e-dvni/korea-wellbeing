import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "nameEN",
      title: "Product Name (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameKR",
      title: "제품명 (한국어)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: 'Click "Generate" to auto-fill from the English name.',
      options: { source: "nameEN", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Sale Price (USD $)",
      type: "number",
      description: "The discounted/sale price shown to customers.",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "originalPrice",
      title: "Original Price (USD $)",
      type: "number",
      description: "The original full price — shown crossed out next to the sale price.",
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: "variants",
      title: "Size / Model Variants (옵션)",
      type: "array",
      description: "Add variants if this product comes in different sizes or models (e.g. Single, Queen, King). Leave empty for single-price products.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "inStock",
              title: "In Stock / 재고 있음",
              type: "boolean",
              description: "Turn OFF to mark this specific size/model as sold out.",
              initialValue: true,
              options: { layout: "switch" },
            }),
            defineField({
              name: "nameEN",
              title: "Variant Name (English)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "nameKR",
              title: "옵션명 (한국어)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: "Sale Price (USD $)",
              type: "number",
              validation: (Rule) => Rule.required().positive(),
            }),
            defineField({
              name: "originalPrice",
              title: "Original Price (USD $)",
              type: "number",
              description: "Full price — shown crossed out.",
              validation: (Rule) => Rule.positive(),
            }),
            defineField({
              name: "stripePriceId",
              title: "Stripe Price ID",
              type: "string",
              description: "Leave blank for now.",
            }),
          ],
          preview: {
            select: { title: "nameEN", price: "price", inStock: "inStock" },
            prepare(value: Record<string, any>) {
              const stock = value.inStock === false ? "⛔ Out of Stock" : "✅ In Stock";
              const price = value.price ? `$${value.price}` : "";
              return { title: value.title, subtitle: [price, stock].filter(Boolean).join(" · ") };
            },
          },
        },
      ],
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Image description (for accessibility)",
              type: "string",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).error("At least one image is required."),
    }),
    defineField({
      name: "descriptionEN",
      title: "Description (English)",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descriptionKR",
      title: "제품 설명 (한국어)",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category / 카테고리",
      type: "string",
      options: {
        list: [
          { title: "Home Water Purifier / 가정용 정수기", value: "water-purifier" },
          { title: "Water Purifier & Softener / 주택용 정수·연수기", value: "water-softener" },
          { title: "Condensing Boiler / 콘덴싱 보일러", value: "boiler" },
          { title: "Hot Water Mat / 온수 매트", value: "hot-water-mat" },
          { title: "A/C · Heat Pump · HVAC / 냉난방 시스템", value: "hvac" },
          { title: "Air Purification System / 공기정화 시스템", value: "air-purifier" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "inStock",
      title: "In Stock / 재고 있음",
      type: "boolean",
      description: "Uncheck if this product is temporarily unavailable.",
      initialValue: true,
    }),
    defineField({
      name: "active",
      title: "Show on Website / 웹사이트에 표시",
      type: "boolean",
      description: "Uncheck to hide this product without deleting it.",
      initialValue: true,
    }),
    defineField({
      name: "stripePriceId",
      title: "Stripe Price ID",
      type: "string",
      description: "Leave blank — this will be filled in automatically when the online store launches.",
    }),
  ],
  preview: {
    select: {
      title: "nameEN",
      subtitle: "nameKR",
      media: "images.0",
    },
  },
});
