/**
 * Import script for NHB-H and NFB-H boiler series
 * Run: SANITY_WRITE_TOKEN=your_token node scripts/import-new-products.mjs
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: "fzlkp2w7",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

function original(salePrice) {
  return Math.round(salePrice / 0.9);
}

async function uploadImageFromUrl(imageUrl, altText) {
  try {
    console.log(`  📷 Downloading image...`);
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get("content-type") || "image/png";
    const filename = imageUrl.split("/").pop().split("?")[0];
    const asset = await client.assets.upload("image", buffer, { filename, contentType });
    console.log(`  ✓ Image uploaded: ${filename}`);
    return [{
      _type: "image",
      _key: randomUUID(),
      asset: { _type: "reference", _ref: asset._id },
      alt: altText,
    }];
  } catch (err) {
    console.warn(`  ⚠ Image upload failed: ${err.message} — skipping image`);
    return [];
  }
}

const PICKUP_DELIVERY_EN = "Available for local pickup at 230 E. Brinkerhoff Ave, Palisades Park, NJ 07650. Free delivery on orders over $2,000 to Bergen County, Essex County, and Hudson County, NJ.";
const PICKUP_DELIVERY_KR = "230 E. Brinkerhoff Ave, Palisades Park, NJ 07650에서 방문 수령 가능합니다. 버겐 카운티, 에식스 카운티, 허드슨 카운티(뉴저지) $2,000 이상 주문 시 무료 배송.";

const products = [
  {
    nameEN: "NHB-H Series Condensing Heating Boiler",
    nameKR: "NHB-H 시리즈 콘덴싱 난방 보일러",
    slug: { _type: "slug", current: "nhb-h-series-condensing-heating-boiler" },
    price: 1872,
    originalPrice: original(1872),
    descriptionEN: `Navien's #1 selling wall-hung condensing boiler in North America. Features 95% AFUE (ENERGY STAR rated), dual stainless steel heat exchangers, up to 15:1 turndown ratio, built-in controls for boiler pump and up to 3 zone pumps or valves, advanced backlit color-coded control panel, and cascading capability for up to 16 units. Compact wall-hung design saves space. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `북미 판매 1위 벽걸이형 콘덴싱 보일러입니다. 95% AFUE(에너지스타 인증), 듀얼 스테인리스 스틸 열교환기, 최대 15:1 턴다운 비율, 보일러 펌프 및 최대 3개 존 펌프/밸브 내장 제어, 고급 백라이트 컬러 표시 제어판, 최대 16대 연결 지원이 특징입니다. 소형 벽걸이 디자인으로 공간을 절약합니다. ${PICKUP_DELIVERY_KR}`,
    category: "boiler",
    inStock: true,
    active: true,
    imageUrl: "https://navien-production-3.s3-us-west-2.amazonaws.com/2023/11/08/09/12/50/7e5a0ac7-3c65-448a-b924-bef1a2563f89/NHB-H-unit-front.png",
    variants: [
      { _key: "55h",  nameEN: "NHB-55H (55,000 BTU/h)",  nameKR: "NHB-55H (55,000 BTU/h)",  price: 1872, originalPrice: original(1872), inStock: true },
      { _key: "80h",  nameEN: "NHB-80H (80,000 BTU/h)",  nameKR: "NHB-80H (80,000 BTU/h)",  price: 2186, originalPrice: original(2186), inStock: true },
      { _key: "110h", nameEN: "NHB-110H (110,000 BTU/h)", nameKR: "NHB-110H (110,000 BTU/h)", price: 2372, originalPrice: original(2372), inStock: true },
      { _key: "150h", nameEN: "NHB-150H (150,000 BTU/h)", nameKR: "NHB-150H (150,000 BTU/h)", price: 2256, originalPrice: original(2256), inStock: true },
    ],
  },
  {
    nameEN: "NFB-H Series Condensing Heating Boiler",
    nameKR: "NFB-H 시리즈 콘덴싱 난방 보일러",
    slug: { _type: "slug", current: "nfb-h-series-condensing-heating-boiler" },
    price: 2618,
    originalPrice: original(2618),
    descriptionEN: `High-efficiency wall-hung condensing boiler featuring Navien's patented stainless steel fire tube heat exchanger that reduces high-stress point welds for greater durability. Features 95% AFUE (ENERGY STAR rated), up to 15:1 turndown ratio, built-in connections for 3 zone pumps or valves, optional NaviLink Wi-Fi remote control, and cascading support for up to 16 units. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `나비엔의 특허 스테인리스 스틸 파이어 튜브 열교환기를 적용한 고효율 벽걸이형 콘덴싱 보일러입니다. 고응력 용접 부위를 줄여 내구성이 뛰어납니다. 95% AFUE(에너지스타 인증), 최대 15:1 턴다운 비율, 3개 존 펌프/밸브 내장 연결, 선택적 NaviLink Wi-Fi 원격 제어, 최대 16대 연결 지원이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "boiler",
    inStock: true,
    active: true,
    imageUrl: "https://navien-production-3.s3-us-west-2.amazonaws.com/2021/03/04/18/58/13/f084e26d-931a-4870-aca2-c9ee84a66968/NFB-H-left-angled.png",
    variants: [
      { _key: "175h", nameEN: "NFB-175H (175,000 BTU/h)", nameKR: "NFB-175H (175,000 BTU/h)", price: 2618, originalPrice: original(2618), inStock: true },
      { _key: "200h", nameEN: "NFB-200H (199,900 BTU/h)", nameKR: "NFB-200H (199,900 BTU/h)", price: 2956, originalPrice: original(2956), inStock: true },
    ],
  },
];

async function importProducts() {
  console.log(`\n🚀 Importing ${products.length} products...\n`);

  for (const { imageUrl, variants, ...product } of products) {
    try {
      console.log(`\n📦 ${product.nameEN}`);

      // Skip if already exists
      const existing = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]._id`,
        { slug: product.slug.current }
      );
      if (existing) {
        console.log(`  ⏭  Skipped — already exists (${existing})`);
        continue;
      }

      const images = imageUrl ? await uploadImageFromUrl(imageUrl, product.nameEN) : [];

      const result = await client.create({
        _type: "product",
        ...product,
        images,
        variants,
      });
      console.log(`  ✅ Created (${result._id})`);
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
    }
  }

  console.log("\n✅ Done! Check wellbeingkoreausa.com/studio to review.\n");
}

importProducts();
