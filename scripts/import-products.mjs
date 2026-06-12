/**
 * Product import script for Wellbeing Korea USA
 *
 * Setup:
 * 1. Go to sanity.io → korea-wellbeing project → Settings → API → Tokens
 * 2. Create a new token with "Editor" permissions, name it "import-script"
 * 3. Run: SANITY_WRITE_TOKEN=your_token node scripts/import-products.mjs
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "fzlkp2w7",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

function toSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/, "");
}

// All prices: given prices are 10% off. original = price / 0.9 (rounded)
function original(salePrice) {
  return Math.round(salePrice / 0.9);
}

const PICKUP_DELIVERY_EN = "Available for local pickup at 230 E. Brinkerhoff Ave, Palisades Park, NJ 07650. Free delivery on orders over $2,000 to Bergen County, Essex County, and Hudson County, NJ.";
const PICKUP_DELIVERY_KR = "230 E. Brinkerhoff Ave, Palisades Park, NJ 07650에서 방문 수령 가능합니다. 버겐 카운티, 에식스 카운티, 허드슨 카운티(뉴저지) $2,000 이상 주문 시 무료 배송.";

const products = [
  // ── Water Treatment ──────────────────────────────────────
  {
    nameEN: "WUR500 Tankless RO Water System",
    nameKR: "WUR500 탱크리스 역삼투압 정수 시스템",
    slug: { _type: "slug", current: "wur500-tankless-ro-water-system" },
    price: 612,
    originalPrice: original(612),
    descriptionEN: `The WUR500 is Navien's compact, high-performance reverse osmosis system for under-sink installation. It delivers freshly filtered drinking water on-demand without requiring a storage tank. Features dual-stage filtration with a 3-in-1 PCT carbon filter and 0.0001 micron RO membrane, 2:1 filtered-to-drain ratio, digital TDS display, and 600 gallons per day capacity. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `WUR500은 나비엔의 소형 고성능 역삼투압 시스템으로 싱크대 하부에 설치됩니다. 탱크 없이 즉시 깨끗한 음용수를 제공합니다. 3in1 PCT 카본 필터와 0.0001 마이크론 RO 멤브레인의 이중 필터 방식, 2:1 정수 대 폐수 비율, 디지털 TDS 표시 및 하루 600갤런 용량을 자랑합니다. ${PICKUP_DELIVERY_KR}`,
    category: "water-purifier",
    inStock: true,
    active: true,
  },
  {
    nameEN: "WEC600 Whole-House Water Treatment System",
    nameKR: "WEC600 전체 가정용 정수 시스템",
    slug: { _type: "slug", current: "wec600-whole-house-water-treatment" },
    price: 4620,
    originalPrice: original(4620),
    descriptionEN: `The WEC600 is Navien's saltless, tankless whole-house water treatment system using advanced electro-membrane technology to reduce TDS, hardness minerals, and contaminants — no salt required. Features automatic self-cleaning (CIP) technology, dual NDI modules for continuous treatment, pre- and post-filtration, NaviLink Lite Wi-Fi monitoring, and an intuitive digital control panel. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `WEC600은 나비엔의 무염 탱크리스 전체 가정용 정수 시스템으로 첨단 전기막 기술을 사용해 소금 없이 TDS, 경수 미네랄 및 오염 물질을 제거합니다. 자동 자가 세척(CIP) 기술, 중단 없는 처리를 위한 이중 NDI 모듈, 전후 필터링, NaviLink Lite Wi-Fi 모니터링 및 직관적인 디지털 제어 패널이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "water-softener",
    inStock: true,
    active: true,
  },

  // ── Hot Water Mat ─────────────────────────────────────────
  {
    nameEN: "Water Heated Mattress Pad",
    nameKR: "온수 매트",
    slug: { _type: "slug", current: "water-heated-mattress-pad" },
    price: 332,
    originalPrice: original(332),
    descriptionEN: `Premium Korean-style hot water circulation mattress pad that maintains an even, consistent temperature throughout the night for deep, comfortable sleep. Uses safe water heating technology — no electromagnetic radiation. Energy-efficient with precise temperature control. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `프리미엄 한국식 온수 순환 매트로 수면 중 균일하고 일정한 온도를 유지하여 깊고 편안한 수면을 도와줍니다. 전자파 없는 안전한 온수 가열 방식을 사용하며 정밀한 온도 조절과 에너지 효율성이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "hot-water-mat",
    inStock: true,
    active: true,
    variants: [
      { _key: "single", nameEN: "Single", nameKR: "싱글", price: 332, originalPrice: original(332), inStock: true },
      { _key: "queen", nameEN: "Queen", nameKR: "퀸", price: 443, originalPrice: original(443), inStock: true },
      { _key: "king", nameEN: "King", nameKR: "킹", price: 449, originalPrice: original(449), inStock: true },
    ],
  },

  // ── NPE-A2 Water Heater ───────────────────────────────────
  {
    nameEN: "NPE-A2 Advanced Condensing Tankless Water Heater",
    nameKR: "NPE-A2 고급형 콘덴싱 탱크리스 온수기",
    slug: { _type: "slug", current: "npe-a2-condensing-tankless-water-heater" },
    price: 1750,
    originalPrice: original(1750),
    descriptionEN: `Navien's ultra-high efficiency condensing tankless water heater with built-in ComfortFlow® recirculation pump, eliminating cold-water sandwich effect. Features up to 0.95 UEF rating, dual stainless steel heat exchangers, EZNav™ control panel with self-diagnostics, and Ready-Link® cascading for up to 32 units. Available in 180, 210, and 240 BTU/h models. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `내장 ComfortFlow® 재순환 펌프로 냉수 샌드위치 현상을 해결하는 나비엔의 초고효율 콘덴싱 탱크리스 온수기입니다. 최대 0.95 UEF 등급, 듀얼 스테인리스 스틸 열교환기, 자가 진단 기능의 EZNav™ 제어 패널, Ready-Link® 기술로 최대 32대 연결이 특징입니다. 180, 210, 240 BTU/h 모델 선택 가능. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    variants: [
      { _key: "180", nameEN: "NPE-180A2 (150,000 BTU/h)", nameKR: "NPE-180A2 (150,000 BTU/h)", price: 1750, originalPrice: original(1750), inStock: true },
      { _key: "210", nameEN: "NPE-210A2 (180,000 BTU/h)", nameKR: "NPE-210A2 (180,000 BTU/h)", price: 1960, originalPrice: original(1960), inStock: true },
      { _key: "240", nameEN: "NPE-240A2 (199,900 BTU/h)", nameKR: "NPE-240A2 (199,900 BTU/h)", price: 2170, originalPrice: original(2170), inStock: true },
    ],
  },

  // ── NPE-S2 Water Heater ───────────────────────────────────
  {
    nameEN: "NPE-S2 Condensing Tankless Water Heater",
    nameKR: "NPE-S2 콘덴싱 탱크리스 온수기",
    slug: { _type: "slug", current: "npe-s2-condensing-tankless-water-heater" },
    price: 1300,
    originalPrice: original(1300),
    descriptionEN: `Navien's standard ultra-high efficiency condensing tankless water heater with up to 0.96 UEF, dual stainless steel heat exchangers, EZNav™ multi-line control panel, and Ready-Link® cascading for up to 32 units. Designed for indoor or outdoor wall-hung installation. Available in 150, 180, 210, and 240 BTU/h models. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `최대 0.96 UEF의 초고효율, 듀얼 스테인리스 스틸 열교환기, EZNav™ 다중 라인 제어 패널, Ready-Link® 기술로 최대 32대 연결이 가능한 나비엔의 표준 콘덴싱 탱크리스 온수기입니다. 실내외 벽걸이 설치 가능. 150, 180, 210, 240 BTU/h 모델 선택 가능. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    variants: [
      { _key: "150", nameEN: "NPE-150S2 (120,000 BTU/h)", nameKR: "NPE-150S2 (120,000 BTU/h)", price: 1300, originalPrice: original(1300), inStock: true },
      { _key: "180", nameEN: "NPE-180S2 (150,000 BTU/h)", nameKR: "NPE-180S2 (150,000 BTU/h)", price: 1500, originalPrice: original(1500), inStock: true },
      { _key: "210", nameEN: "NPE-210S2 (180,000 BTU/h)", nameKR: "NPE-210S2 (180,000 BTU/h)", price: 1600, originalPrice: original(1600), inStock: true },
      { _key: "240", nameEN: "NPE-240S2 (199,900 BTU/h)", nameKR: "NPE-240S2 (199,900 BTU/h)", price: 1750, originalPrice: original(1750), inStock: true },
    ],
  },

  // ── NCB-H Combi-Boiler ────────────────────────────────────
  {
    nameEN: "NCB-H Condensing Combi-Boiler",
    nameKR: "NCB-H 콘덴싱 콤비 보일러",
    slug: { _type: "slug", current: "ncb-h-condensing-combi-boiler" },
    price: 2520,
    originalPrice: original(2520),
    descriptionEN: `The NCB-H delivers endless hot water and space heating in one compact, wall-hung unit. Features 210,000 BTU/h max DHW output (5.4 GPM at 70°F rise), dual stainless steel heat exchangers, superior 15:1 DHW and 11:1 heating turndown ratios, integrated zone controls for up to 3 zones, and high-altitude certification up to 10,100 ft. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `NCB-H는 소형 벽걸이 장치 하나로 무한 온수 공급과 공간 난방을 동시에 해결합니다. 최대 210,000 BTU/h DHW 출력(70°F 상승 기준 5.4 GPM), 듀얼 스테인리스 스틸 열교환기, 우수한 15:1 DHW 및 11:1 난방 턴다운 비율, 최대 3개 존 제어 통합, 해발 10,100피트까지 고고도 인증이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "boiler",
    inStock: true,
    active: true,
    variants: [
      { _key: "190-060", nameEN: "NCB-190/060 (60,000 BTU heating)", nameKR: "NCB-190/060 (60,000 BTU 난방)", price: 2520, originalPrice: original(2520), inStock: true },
      { _key: "190-080", nameEN: "NCB-190/080 (80,000 BTU heating)", nameKR: "NCB-190/080 (80,000 BTU 난방)", price: 2730, originalPrice: original(2730), inStock: true },
      { _key: "240-110", nameEN: "NCB-240/110 (110,000 BTU heating)", nameKR: "NCB-240/110 (110,000 BTU 난방)", price: 2940, originalPrice: original(2940), inStock: true },
      { _key: "240-130", nameEN: "NCB-240/130 (130,000 BTU heating)", nameKR: "NCB-240/130 (130,000 BTU 난방)", price: 3080, originalPrice: original(3080), inStock: true },
      { _key: "250-150", nameEN: "NCB-250/150 (150,000 BTU heating)", nameKR: "NCB-250/150 (150,000 BTU 난방)", price: 3290, originalPrice: original(3290), inStock: true },
    ],
  },

  // ── NAZ Heat Pump ─────────────────────────────────────────
  {
    nameEN: "NAZ Series Heat Pump",
    nameKR: "NAZ 시리즈 히트펌프",
    slug: { _type: "slug", current: "naz-series-heat-pump" },
    price: 2770,
    originalPrice: original(2770),
    descriptionEN: `The NAZ Series is Navien's residential air-to-air heat pump engineered for precise, energy-efficient heating and cooling. Features capacity-matching technology, R-454B low-GWP refrigerant, up to 19.5 SEER2 efficiency, cold-weather operation from -4°F to 124°F, compressor blanket and swept-wing fan for quiet operation, and Bluetooth diagnostics via the Navien Multikit App. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `NAZ 시리즈는 정밀하고 에너지 효율적인 냉난방을 위한 나비엔의 주거용 공기열 히트펌프입니다. 용량 매칭 기술, 저지구온난화지수 R-454B 냉매, 최대 19.5 SEER2 효율, -4°F에서 124°F까지 저온 작동, 컴프레서 블랭킷과 스윕 윙 팬으로 조용한 작동, Navien Multikit 앱을 통한 블루투스 진단이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    variants: [
      { _key: "17v36", nameEN: "NAZ-17V36 (2–3 ton)", nameKR: "NAZ-17V36 (2–3톤)", price: 2770, originalPrice: original(2770), inStock: true },
      { _key: "17v60", nameEN: "NAZ-17V60 (4–5 ton)", nameKR: "NAZ-17V60 (4–5톤)", price: 3540, originalPrice: original(3540), inStock: true },
    ],
  },

  // ── NAA Air Conditioner ───────────────────────────────────
  {
    nameEN: "NAA Series High-Efficiency Air Conditioner",
    nameKR: "NAA 시리즈 고효율 에어컨",
    slug: { _type: "slug", current: "naa-series-air-conditioner" },
    price: 2000,
    originalPrice: original(2000),
    descriptionEN: `The NAA Series is a variable-capacity air conditioner with an inverter-driven compressor that continuously adjusts cooling output to match demand. Features up to 18 SEER2 efficiency, operation from 5°F to 124°F, R-454B low-GWP refrigerant, and seamless compatibility with Navien NAM coils, NPF furnaces, and NAS air handlers. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `NAA 시리즈는 인버터 구동 압축기로 냉방 출력을 수요에 맞게 지속적으로 조정하는 가변 용량 에어컨입니다. 최대 18 SEER2 효율, 5°F에서 124°F까지 작동, 저지구온난화지수 R-454B 냉매, 나비엔 NAM 코일, NPF 난방기, NAS 에어 핸들러와 완벽한 호환성이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    variants: [
      { _key: "17v36", nameEN: "NAA-17V36 (1.5–3 ton)", nameKR: "NAA-17V36 (1.5–3톤)", price: 2000, originalPrice: original(2000), inStock: true },
      { _key: "17v60", nameEN: "NAA-17V60 (3.5–5 ton)", nameKR: "NAA-17V60 (3.5–5톤)", price: 2695, originalPrice: original(2695), inStock: true },
    ],
  },

  // ── NAM Cased Coils ───────────────────────────────────────
  {
    nameEN: "NAM Series Cased Indoor Coils",
    nameKR: "NAM 시리즈 케이스드 실내 코일",
    slug: { _type: "slug", current: "nam-series-cased-indoor-coils" },
    price: 850,
    originalPrice: original(850),
    descriptionEN: `The NAM Series cased indoor evaporator coils are engineered to work seamlessly with Navien heat pumps, furnaces, and air conditioners. Features R-454B refrigerant optimization, multi-position design (upflow, downflow, horizontal), factory-mounted TXV and A2L leak sensor, corrosion-resistant aluminum DX coil, and AHRI-matched certification. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `NAM 시리즈 케이스드 실내 증발 코일은 나비엔 히트펌프, 난방기 및 에어컨과 완벽하게 통합되도록 설계되었습니다. R-454B 냉매 최적화, 다방향 설계(상향, 하향, 수평), 공장 장착 TXV 및 A2L 누설 감지기, 내식성 알루미늄 DX 코일, AHRI 인증이 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    variants: [
      { _key: "36c", nameEN: "NAM36C (3 ton)", nameKR: "NAM36C (3톤)", price: 850, originalPrice: original(850), inStock: true },
      { _key: "59c", nameEN: "NAM59C (5 ton)", nameKR: "NAM59C (5톤)", price: 1080, originalPrice: original(1080), inStock: true },
    ],
  },

  // ── NASS Air Handlers ─────────────────────────────────────
  {
    nameEN: "NASS Series Air Handler",
    nameKR: "NASS 시리즈 에어 핸들러",
    slug: { _type: "slug", current: "nass-series-air-handler" },
    price: 1700,
    originalPrice: original(1700),
    descriptionEN: `The NASS Series air handlers are designed for seamless integration with Navien NAZ high-SEER heat pumps. Features R-454B refrigerant, one SKU supporting upflow, horizontal, and downflow installations, integrated refrigerant detection system, optional 5–20kW electric heat kits, corrosion-resistant polymer drain pans, and slide-out blower for easy service. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `NASS 시리즈 에어 핸들러는 나비엔 NAZ 고효율 히트펌프와의 완벽한 통합을 위해 설계되었습니다. R-454B 냉매, 상향·수평·하향 설치를 모두 지원하는 단일 SKU, 냉매 감지 시스템 내장, 선택적 5–20kW 전기 히트 키트, 내식성 폴리머 배수 팬, 쉬운 유지보수를 위한 슬라이드 아웃 블로어가 특징입니다. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    variants: [
      { _key: "36c", nameEN: "NASS36C (3 ton)", nameKR: "NASS36C (3톤)", price: 1700, originalPrice: original(1700), inStock: true },
      { _key: "59d", nameEN: "NASS59D (5 ton)", nameKR: "NASS59D (5톤)", price: 1800, originalPrice: original(1800), inStock: true },
    ],
  },

  // ── NPF Hydronic Furnace ──────────────────────────────────
  {
    nameEN: "NPF700 Condensing Hydronic Furnace",
    nameKR: "NPF700 콘덴싱 수력 강제 공기 난방기",
    slug: { _type: "slug", current: "npf700-condensing-hydronic-furnace" },
    price: 2150,
    originalPrice: original(2150),
    descriptionEN: `The NPF700 Series is a 97% AFUE high-efficiency hydronic forced-air furnace with variable capacity operation (15–100%), variable-speed ECM blower motor, modulating gas burner, ultra-low NOx emissions, dual-fuel heat pump compatibility, and supply/return air sensors. Available in upflow, downflow, and horizontal configurations. ${PICKUP_DELIVERY_EN}`,
    descriptionKR: `NPF700 시리즈는 97% AFUE 고효율 수력 강제 공기 난방기로 가변 용량 작동(15–100%), 가변 속도 ECM 블로어 모터, 모듈레이팅 가스 버너, 초저 NOx 배출, 이중 연료 히트펌프 호환성, 공급/환기 공기 센서를 갖추고 있습니다. 상향, 하향, 수평 구성 가능. ${PICKUP_DELIVERY_KR}`,
    category: "hvac",
    inStock: true,
    active: true,
    variants: [
      { _key: "700-060", nameEN: "NPF700-060 (60,000 BTU/h)", nameKR: "NPF700-060 (60,000 BTU/h)", price: 2150, originalPrice: original(2150), inStock: true },
      { _key: "700-080", nameEN: "NPF700-080 (80,000 BTU/h)", nameKR: "NPF700-080 (80,000 BTU/h)", price: 2385, originalPrice: original(2385), inStock: true },
      { _key: "700-100", nameEN: "NPF700-100 (100,000 BTU/h)", nameKR: "NPF700-100 (100,000 BTU/h)", price: 2615, originalPrice: original(2615), inStock: true },
    ],
  },
];

async function importProducts() {
  console.log(`Starting import of ${products.length} products...\n`);

  for (const product of products) {
    try {
      const doc = {
        _type: "product",
        ...product,
      };
      const result = await client.create(doc);
      console.log(`✓ Created: ${product.nameEN} (${result._id})`);
    } catch (err) {
      console.error(`✗ Failed: ${product.nameEN}`, err.message);
    }
  }

  console.log("\n✅ Import complete! Check your Sanity Studio to review the products.");
}

importProducts();
