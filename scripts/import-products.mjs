/**
 * Product import script for Wellbeing Korea USA
 *
 * Setup:
 * 1. Go to sanity.io → korea-wellbeing project → Settings → API → Tokens
 * 2. Create a new token with "Editor" permissions, name it "import-script"
 * 3. Run: SANITY_WRITE_TOKEN=your_token node scripts/import-products.mjs
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
    nameEN: "WUR500 Tankless RO Water System",
    nameKR: "WUR500 탱크리스 역삼투압 정수 시스템",
    slug: { _type: "slug", current: "wur500-tankless-ro-water-system" },
    price: 612,
    originalPrice: original(612),
    descriptionEN: `The WUR500 is Navien's compact, high-performance reverse osmosis system for under-sink installation. Delivers freshly filtered drinking water on-demand without a storage tank. Features dual-stage filtration with a 3-in-1 PCT carbon filter and 0.0001 micron RO membrane, 2:1 filtered-to-drain ratio, digital TDS display, and 600 gallons per day capacity. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `WUR500은 싱크대 하부에 설치되는 나비엔의 소형 고성능 역삼투압 정수 시스템입니다. 탱크 없이 즉시 깨끗한 음용수를 제공합니다. 3in1 PCT 카본 필터와 0.0001 마이크론 RO 멤브레인의 이중 필터, 2:1 정수 대 폐수 비율, 디지털 TDS 표시, 하루 600갤런 용량이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "water-purifier",
    inStock: true,
    active: true,
    imageUrl: "https://navien-production-3.s3-us-west-2.amazonaws.com/2025/08/29/20/02/04/ce6776bc-3ce5-4d75-8b74-d1f31c1c69c5/WUR500-unit-front-2.png",
  },
  {
    nameEN: "WEC600 Whole-House Water Treatment System",
    nameKR: "WEC600 전체 가정용 정수 시스템",
    slug: { _type: "slug", current: "wec600-whole-house-water-treatment" },
    price: 4620,
    originalPrice: original(4620),
    descriptionEN: `The WEC600 is Navien's saltless, tankless whole-house water treatment system using advanced electro-membrane technology to reduce TDS, hardness minerals, and contaminants — no salt required. Features automatic self-cleaning (CIP) technology, dual NDI modules for continuous treatment, NaviLink Lite Wi-Fi monitoring, and an intuitive digital control panel. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `WEC600은 나비엔의 무염 탱크리스 전체 가정용 정수 시스템으로 첨단 전기막 기술을 사용해 소금 없이 TDS, 경수 미네랄 및 오염 물질을 제거합니다. 자동 자가 세척(CIP) 기술, 중단 없는 처리를 위한 이중 NDI 모듈, NaviLink Lite Wi-Fi 모니터링 및 직관적인 디지털 제어 패널이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "water-softener",
    inStock: true,
    active: true,
    imageUrl: "https://navien-production-3.s3-us-west-2.amazonaws.com/2025/06/30/20/39/36/a241acc9-2e80-4569-a674-240d931657b4/WEC-front-RedDot-IDEA.png",
  },
  {
    nameEN: "Water Heated Mattress Pad",
    nameKR: "온수 매트",
    slug: { _type: "slug", current: "water-heated-mattress-pad" },
    price: 332,
    originalPrice: original(332),
    descriptionEN: `Premium Korean-style hot water circulation mattress pad that maintains an even, consistent temperature throughout the night for deep, comfortable sleep. Uses safe water heating technology with no electromagnetic radiation. Energy-efficient with precise temperature control. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `프리미엄 한국식 온수 순환 매트로 수면 중 균일하고 일정한 온도를 유지하여 깊고 편안한 수면을 도와줍니다. 전자파 없는 안전한 온수 가열 방식을 사용하며 정밀한 온도 조절과 에너지 효율성이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "hot-water-mat",
    inStock: true,
    active: true,
    imageUrl: null, // no image on Navien US site — add manually in Studio
    variants: [
      { _key: "single", nameEN: "Single", nameKR: "싱글", price: 332, originalPrice: original(332), inStock: true },
      { _key: "queen",  nameEN: "Queen",  nameKR: "퀸",   price: 443, originalPrice: original(443), inStock: true },
      { _key: "king",   nameEN: "King",   nameKR: "킹",   price: 449, originalPrice: original(449), inStock: true },
    ],
  },
  {
    nameEN: "NPE-A2 Advanced Condensing Tankless Water Heater",
    nameKR: "NPE-A2 고급형 콘덴싱 탱크리스 온수기",
    slug: { _type: "slug", current: "npe-a2-condensing-tankless-water-heater" },
    price: 1750,
    originalPrice: original(1750),
    descriptionEN: `Navien's ultra-high efficiency condensing tankless water heater with built-in ComfortFlow® recirculation pump, eliminating the cold-water sandwich effect. Features up to 0.95 UEF, dual stainless steel heat exchangers, EZNav™ control panel with self-diagnostics, and Ready-Link® cascading for up to 32 units. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `내장 ComfortFlow® 재순환 펌프로 냉수 샌드위치 현상을 해결하는 나비엔의 초고효율 콘덴싱 탱크리스 온수기입니다. 최대 0.95 UEF, 듀얼 스테인리스 스틸 열교환기, 자가 진단 기능의 EZNav™ 제어 패널, Ready-Link®로 최대 32대 연결이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    imageUrl: "https://navien-production-3.s3-us-west-2.amazonaws.com/2021/02/23/20/14/12/8a6ec42c-35f6-408d-95da-6565cdee6030/NPE2-unit-novents.png",
    variants: [
      { _key: "180", nameEN: "NPE-180A2 (150,000 BTU/h)", nameKR: "NPE-180A2 (150,000 BTU/h)", price: 1750, originalPrice: original(1750), inStock: true },
      { _key: "210", nameEN: "NPE-210A2 (180,000 BTU/h)", nameKR: "NPE-210A2 (180,000 BTU/h)", price: 1960, originalPrice: original(1960), inStock: true },
      { _key: "240", nameEN: "NPE-240A2 (199,900 BTU/h)", nameKR: "NPE-240A2 (199,900 BTU/h)", price: 2170, originalPrice: original(2170), inStock: true },
    ],
  },
  {
    nameEN: "NPE-S2 Condensing Tankless Water Heater",
    nameKR: "NPE-S2 콘덴싱 탱크리스 온수기",
    slug: { _type: "slug", current: "npe-s2-condensing-tankless-water-heater" },
    price: 1300,
    originalPrice: original(1300),
    descriptionEN: `Navien's standard ultra-high efficiency condensing tankless water heater with up to 0.96 UEF, dual stainless steel heat exchangers, EZNav™ multi-line control panel, and Ready-Link® cascading for up to 32 units. Available for indoor or outdoor wall-hung installation. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `최대 0.96 UEF의 초고효율, 듀얼 스테인리스 스틸 열교환기, EZNav™ 다중 라인 제어 패널, Ready-Link®로 최대 32대 연결이 가능한 나비엔의 표준 콘덴싱 탱크리스 온수기입니다. 실내외 벽걸이 설치 가능. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    imageUrl: "https://navien-production-3.s3-us-west-2.amazonaws.com/2021/03/23/23/06/04/a9e97347-2dd6-466c-9ec1-9451e5416d60/NPE-S2-CoverON-NV.png",
    variants: [
      { _key: "150", nameEN: "NPE-150S2 (120,000 BTU/h)", nameKR: "NPE-150S2 (120,000 BTU/h)", price: 1300, originalPrice: original(1300), inStock: true },
      { _key: "180", nameEN: "NPE-180S2 (150,000 BTU/h)", nameKR: "NPE-180S2 (150,000 BTU/h)", price: 1500, originalPrice: original(1500), inStock: true },
      { _key: "210", nameEN: "NPE-210S2 (180,000 BTU/h)", nameKR: "NPE-210S2 (180,000 BTU/h)", price: 1600, originalPrice: original(1600), inStock: true },
      { _key: "240", nameEN: "NPE-240S2 (199,900 BTU/h)", nameKR: "NPE-240S2 (199,900 BTU/h)", price: 1750, originalPrice: original(1750), inStock: true },
    ],
  },
  {
    nameEN: "NCB-H Condensing Combi-Boiler",
    nameKR: "NCB-H 콘덴싱 콤비 보일러",
    slug: { _type: "slug", current: "ncb-h-condensing-combi-boiler" },
    price: 2520,
    originalPrice: original(2520),
    descriptionEN: `The NCB-H delivers endless hot water and space heating in one compact, wall-hung unit. Features 210,000 BTU/h max DHW output (5.4 GPM at 70°F rise), dual stainless steel heat exchangers, 15:1 DHW and 11:1 heating turndown ratios, integrated zone controls for up to 3 zones, and high-altitude certification up to 10,100 ft. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `NCB-H는 소형 벽걸이 장치 하나로 무한 온수 공급과 공간 난방을 동시에 해결합니다. 최대 210,000 BTU/h DHW 출력, 듀얼 스테인리스 스틸 열교환기, 15:1 DHW 및 11:1 난방 턴다운 비율, 최대 3개 존 제어, 해발 10,100피트 고고도 인증이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "boiler",
    inStock: true,
    active: true,
    imageUrl: "https://navien-production-3.s3-us-west-2.amazonaws.com/2022/07/25/15/29/22/f992030a-46b2-4b9b-ad8d-2e68dc2e5db3/NCB-H-2021.png",
    variants: [
      { _key: "190-060", nameEN: "NCB-190/060 (60,000 BTU heating)", nameKR: "NCB-190/060 (60,000 BTU 난방)", price: 2520, originalPrice: original(2520), inStock: true },
      { _key: "190-080", nameEN: "NCB-190/080 (80,000 BTU heating)", nameKR: "NCB-190/080 (80,000 BTU 난방)", price: 2730, originalPrice: original(2730), inStock: true },
      { _key: "240-110", nameEN: "NCB-240/110 (110,000 BTU heating)", nameKR: "NCB-240/110 (110,000 BTU 난방)", price: 2940, originalPrice: original(2940), inStock: true },
      { _key: "240-130", nameEN: "NCB-240/130 (130,000 BTU heating)", nameKR: "NCB-240/130 (130,000 BTU 난방)", price: 3080, originalPrice: original(3080), inStock: true },
      { _key: "250-150", nameEN: "NCB-250/150 (150,000 BTU heating)", nameKR: "NCB-250/150 (150,000 BTU 난방)", price: 3290, originalPrice: original(3290), inStock: true },
    ],
  },
  {
    nameEN: "NAZ Series Heat Pump",
    nameKR: "NAZ 시리즈 히트펌프",
    slug: { _type: "slug", current: "naz-series-heat-pump" },
    price: 2770,
    originalPrice: original(2770),
    descriptionEN: `Navien's residential air-to-air heat pump engineered for precise, energy-efficient heating and cooling. Features capacity-matching technology, R-454B low-GWP refrigerant, up to 19.5 SEER2 efficiency, operation from -4°F to 124°F, quiet compressor blanket, and Bluetooth diagnostics via the Navien Multikit App. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `정밀하고 에너지 효율적인 냉난방을 위한 나비엔의 주거용 공기열 히트펌프입니다. 용량 매칭 기술, 저지구온난화지수 R-454B 냉매, 최대 19.5 SEER2 효율, -4°F에서 124°F까지 저온 작동, 조용한 압축기 블랭킷, Navien Multikit 앱을 통한 블루투스 진단이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    imageUrl: "https://navien-production-3.s3-us-west-2.amazonaws.com/2025/03/19/18/45/12/77319812-7f0e-446b-9a43-10549f3b692d/NAZ-front-shadow.png",
    variants: [
      { _key: "17v36", nameEN: "NAZ-17V36 (2–3 ton)", nameKR: "NAZ-17V36 (2–3톤)", price: 2770, originalPrice: original(2770), inStock: true },
      { _key: "17v60", nameEN: "NAZ-17V60 (4–5 ton)", nameKR: "NAZ-17V60 (4–5톤)", price: 3540, originalPrice: original(3540), inStock: true },
    ],
  },
  {
    nameEN: "NAA Series High-Efficiency Air Conditioner",
    nameKR: "NAA 시리즈 고효율 에어컨",
    slug: { _type: "slug", current: "naa-series-air-conditioner" },
    price: 2000,
    originalPrice: original(2000),
    descriptionEN: `Variable-capacity air conditioner with an inverter-driven compressor that continuously adjusts cooling output to match demand. Features up to 18 SEER2 efficiency, R-454B low-GWP refrigerant, operation from 5°F to 124°F, and compatibility with Navien NAM coils, NPF furnaces, and NAS air handlers. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `인버터 구동 압축기로 냉방 출력을 수요에 맞게 지속적으로 조정하는 가변 용량 에어컨입니다. 최대 18 SEER2 효율, 저지구온난화지수 R-454B 냉매, 5°F에서 124°F까지 작동, 나비엔 NAM 코일·NPF 난방기·NAS 에어 핸들러와 완벽한 호환성이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    imageUrl: "https://navien-production-3.s3-us-west-2.amazonaws.com/2026/02/26/17/29/27/022ffd0d-569e-4c51-8f49-8f64aac03294/NAA-front-shadow.png",
    variants: [
      { _key: "17v36", nameEN: "NAA-17V36 (1.5–3 ton)", nameKR: "NAA-17V36 (1.5–3톤)", price: 2000, originalPrice: original(2000), inStock: true },
      { _key: "17v60", nameEN: "NAA-17V60 (3.5–5 ton)", nameKR: "NAA-17V60 (3.5–5톤)", price: 2695, originalPrice: original(2695), inStock: true },
    ],
  },
  {
    nameEN: "NAM Series Cased Indoor Coils",
    nameKR: "NAM 시리즈 케이스드 실내 코일",
    slug: { _type: "slug", current: "nam-series-cased-indoor-coils" },
    price: 850,
    originalPrice: original(850),
    descriptionEN: `Cased indoor evaporator coils engineered for seamless use with Navien heat pumps, furnaces, and air conditioners. Features R-454B refrigerant optimization, multi-position design (upflow, downflow, horizontal), factory-mounted TXV and A2L leak sensor, corrosion-resistant aluminum DX coil, and AHRI-matched certification. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `나비엔 히트펌프, 난방기 및 에어컨과 완벽하게 통합되는 케이스드 실내 증발 코일입니다. R-454B 냉매 최적화, 다방향 설계(상향·하향·수평), 공장 장착 TXV 및 A2L 누설 감지기, 내식성 알루미늄 DX 코일, AHRI 인증이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    imageUrl: "https://navien-production-3.s3-us-west-2.amazonaws.com/2025/03/18/19/51/18/d262e142-d0c5-430b-89b3-d1c1fef1df5f/NAM-Cover-On-front.png",
    variants: [
      { _key: "36c", nameEN: "NAM36C (3 ton)", nameKR: "NAM36C (3톤)", price: 850,  originalPrice: original(850),  inStock: true },
      { _key: "59c", nameEN: "NAM59C (5 ton)", nameKR: "NAM59C (5톤)", price: 1080, originalPrice: original(1080), inStock: true },
    ],
  },
  {
    nameEN: "NASS Series Air Handler",
    nameKR: "NASS 시리즈 에어 핸들러",
    slug: { _type: "slug", current: "nass-series-air-handler" },
    price: 1700,
    originalPrice: original(1700),
    descriptionEN: `Air handlers designed for seamless integration with Navien NAZ high-SEER heat pumps. Features R-454B refrigerant support, one SKU supporting upflow, horizontal, and downflow installations, integrated refrigerant detection, optional 5–20kW electric heat kits, and corrosion-resistant polymer drain pans. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `나비엔 NAZ 고효율 히트펌프와의 완벽한 통합을 위해 설계된 에어 핸들러입니다. R-454B 냉매 지원, 상향·수평·하향 설치를 모두 지원하는 단일 SKU, 냉매 감지 시스템 내장, 선택적 5–20kW 전기 히트 키트, 내식성 폴리머 배수 팬이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    imageUrl: "https://navien-production-3.s3-us-west-2.amazonaws.com/2025/03/18/19/54/26/7956522c-bd26-4f74-9a97-cbb551090995/NAS-CoverOn-front.png",
    variants: [
      { _key: "36c", nameEN: "NASS36C (3 ton)", nameKR: "NASS36C (3톤)", price: 1700, originalPrice: original(1700), inStock: true },
      { _key: "59d", nameEN: "NASS59D (5 ton)", nameKR: "NASS59D (5톤)", price: 1800, originalPrice: original(1800), inStock: true },
    ],
  },
  {
    nameEN: "NPF700 Condensing Hydronic Furnace",
    nameKR: "NPF700 콘덴싱 수력 강제 공기 난방기",
    slug: { _type: "slug", current: "npf700-condensing-hydronic-furnace" },
    price: 2150,
    originalPrice: original(2150),
    descriptionEN: `97% AFUE high-efficiency hydronic forced-air furnace with variable capacity operation (15–100%), variable-speed ECM blower motor, modulating gas burner, ultra-low NOx emissions, dual-fuel heat pump compatibility, and supply/return air sensors. Available in upflow, downflow, and horizontal configurations. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `97% AFUE 고효율 수력 강제 공기 난방기로 가변 용량 작동(15–100%), 가변 속도 ECM 블로어 모터, 모듈레이팅 가스 버너, 초저 NOx 배출, 이중 연료 히트펌프 호환성, 공급/환기 공기 센서를 갖추고 있습니다. 상향·하향·수평 구성 가능. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    imageUrl: "https://navien-production-3.s3-us-west-2.amazonaws.com/2026/02/25/20/06/13/ae6c6e14-4059-4aef-a924-404be3ae8f4a/NPF700-DownFlow-front.png",
    variants: [
      { _key: "700-060", nameEN: "NPF700-060 (60,000 BTU/h)",  nameKR: "NPF700-060 (60,000 BTU/h)",  price: 2150, originalPrice: original(2150), inStock: true },
      { _key: "700-080", nameEN: "NPF700-080 (80,000 BTU/h)",  nameKR: "NPF700-080 (80,000 BTU/h)",  price: 2385, originalPrice: original(2385), inStock: true },
      { _key: "700-100", nameEN: "NPF700-100 (100,000 BTU/h)", nameKR: "NPF700-100 (100,000 BTU/h)", price: 2615, originalPrice: original(2615), inStock: true },
    ],
  },
];

async function importProducts() {
  console.log(`\n🚀 Starting import of ${products.length} products...\n`);

  for (const { imageUrl, variants, ...product } of products) {
    try {
      console.log(`\n📦 ${product.nameEN}`);

      // Skip if a product with this slug already exists
      const existing = await client.fetch(
        `*[_type == "product" && slug.current == $slug][0]._id`,
        { slug: product.slug.current }
      );
      if (existing) {
        console.log(`  ⏭  Skipped — already exists (${existing})`);
        continue;
      }

      // Upload main image
      const images = imageUrl ? await uploadImageFromUrl(imageUrl, product.nameEN) : [];

      // Build document
      const doc = {
        _type: "product",
        ...product,
        images,
        ...(variants ? { variants } : {}),
      };

      const result = await client.create(doc);
      console.log(`  ✅ Created (${result._id})`);
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
    }
  }

  console.log("\n\n✅ Import complete! Open wellbeingkoreausa.com/studio to review.\n");
  console.log("⚠️  Note: The Water Heated Mattress Pad has no image — add it manually in Studio.");
}

importProducts();
