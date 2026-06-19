import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { getProduct } from "@/lib/sanity";
import type { SanityProduct } from "@/types/sanity";
import WUR500AddToCart from "./WUR500AddToCart";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "WUR500 Tankless RO Water Purifier",
  description:
    "Navien WUR500 Tankless Reverse Osmosis Water Purification System. No tank, no waiting — 600 GPD production, 99% TDS reduction, 0.0001 micron filtration. Available in Palisades Park, NJ with delivery across Bergen, Essex & Hudson County.",
  openGraph: {
    title: "Navien WUR500 Tankless RO Water Purifier | Wellbeing Korea USA",
    description:
      "600 GPD, 99% TDS reduction, smart faucet with live TDS display. Shop the WUR500 with free delivery to Essex, Hudson, Bergen County NJ & New York City.",
    url: "https://www.wellbeingkoreausa.com/store/wur500",
    type: "website",
  },
};

const wur500JsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Navien WUR500 Tankless RO Water Purification System",
  description:
    "Compact under-sink tankless reverse osmosis system. 600 GPD production, 99% TDS reduction, 0.0001 micron filtration, smart faucet with live TDS display and filter alerts.",
  brand: { "@type": "Brand", name: "K Navien" },
  category: "Water Purifier",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://www.wellbeingkoreausa.com/store/wur500",
    seller: { "@type": "Organization", name: "Wellbeing Korea USA" },
  },
};

export default async function WUR500Page() {
  const product: SanityProduct | null = await getProduct("wur500-tankless-ro-water-system");
  const imageUrl = product?.images?.[0]?.asset?.url ?? null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wur500JsonLd) }}
      />
      <Navbar variant="product" />

      {/* ── Hero ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Breadcrumb */}
          <Link
            href="/store"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-primary text-sm font-semibold mb-10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Store · 스토어로 돌아가기
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Product image */}
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 flex items-center justify-center aspect-square max-w-sm mx-auto lg:max-w-none w-full">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="WUR500 Tankless RO System"
                  width={420}
                  height={420}
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-28 h-28 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 2.25c0 0-7.5 8.25-7.5 12a7.5 7.5 0 0015 0c0-3.75-7.5-12-7.5-12z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/8 rounded-full px-4 py-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                <span className="text-primary/70 text-sm font-semibold">Water Purifier · 정수기</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold text-primary leading-none mb-1">WUR500</h1>
              <p className="text-2xl font-semibold text-gray-500 mb-1">Tankless RO System</p>
              <p className="text-xl text-accent font-semibold mb-6">탱크리스 역삼투압 정수기</p>

              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
                Advanced under-sink reverse osmosis — no tank, no waiting, no wasted space. Compact, high-performance filtration for fresher, cleaner water right from your tap.
              </p>

              {/* Key stats */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { label: "Daily Production", value: "600 GPD" },
                  { label: "TDS Reduction", value: "Up to 99%" },
                  { label: "Filtration Size", value: "0.0001 μm" },
                  { label: "Efficiency Ratio", value: "2:1" },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-100 rounded-xl px-4 py-3">
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-0.5">
                      {s.label}
                    </p>
                    <p className="text-primary font-bold text-xl">{s.value}</p>
                  </div>
                ))}
              </div>

              {product ? (
                <WUR500AddToCart product={product} />
              ) : (
                <p className="text-gray-400 text-sm">
                  Product details currently unavailable. Please contact us to order.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Why the WUR500?</h2>
            <p className="text-xl font-semibold text-primary/60 mt-1">왜 WUR500인가요?</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "💧",
                titleEN: "No Tank, No Waiting",
                titleKR: "탱크 없이 즉시 공급",
                descEN: "Tankless design eliminates bulky storage tanks and slow refill cycles. Get clean water the moment you turn on the tap.",
                descKR: "탱크 없는 설계로 거추장스러운 저장 탱크와 느린 보충 사이클을 없앴습니다. 수도꼭지를 틀면 즉시 깨끗한 물이 나옵니다.",
              },
              {
                icon: "⚡",
                titleEN: "600 GPD Production",
                titleKR: "일일 600갤런 생산",
                descEN: "Produces up to 600 gallons of purified water per day — well beyond what any household could ever need.",
                descKR: "하루 최대 600갤런의 정수를 생산합니다. 어떤 가정의 수요도 충분히 충족합니다.",
              },
              {
                icon: "🔬",
                titleEN: "99% TDS Reduction",
                titleKR: "총용존고형물 99% 제거",
                descEN: "The RO membrane filters down to 0.0001 microns, achieving up to 99% reduction in total dissolved solids.",
                descKR: "역삼투압 멤브레인이 0.0001마이크론까지 걸러내 총용존고형물을 최대 99% 제거합니다.",
              },
              {
                icon: "📱",
                titleEN: "Smart Alerts",
                titleKR: "스마트 알림",
                descEN: "Real-time TDS display and automatic filter replacement reminders so you always know your water quality.",
                descKR: "실시간 TDS 표시와 자동 필터 교체 알림으로 항상 수질 상태를 확인할 수 있습니다.",
              },
              {
                icon: "🔧",
                titleEN: "Tool-Free Maintenance",
                titleKR: "도구 없이 간편 교체",
                descEN: "Twist-lock cartridge design makes filter replacements quick and completely hassle-free — no plumber required.",
                descKR: "트위스트 잠금 카트리지 설계로 필터 교체가 빠르고 간편합니다. 전문가 없이도 직접 교체 가능합니다.",
              },
              {
                icon: "🌿",
                titleEN: "Water Efficient",
                titleKR: "물 절약 설계",
                descEN: "An industry-leading 2:1 water-to-drain ratio minimizes wastewater while maximizing your usable filtered output.",
                descKR: "2:1 용수 대 배수 비율로 폐수를 최소화하면서 사용 가능한 정수 출력을 극대화합니다.",
              },
            ].map((b) => (
              <div key={b.titleEN} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-base font-bold text-primary mb-0.5">{b.titleEN}</h3>
                <p className="text-sm font-semibold text-accent mb-3">{b.titleKR}</p>
                <p className="text-gray-600 text-base leading-relaxed mb-2">{b.descEN}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{b.descKR}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">2-Stage Filtration</h2>
            <p className="text-xl font-semibold text-primary/60 mt-1">2단계 정수 시스템</p>
            <p className="text-gray-500 text-base mt-3 max-w-2xl mx-auto">
              Two precisely engineered filter stages work in sequence to deliver the cleanest, best-tasting water.
            </p>
          </div>

          {/* Flow diagram */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 flex-wrap">
            {[
              { label: "Tap Water", sub: "수돗물", accent: false },
              { label: "→", sub: "", arrow: true },
              { label: "PCT Filter", sub: "Stage 1", accent: true },
              { label: "→", sub: "", arrow: true },
              { label: "RO Membrane", sub: "Stage 2", accent: true },
              { label: "→", sub: "", arrow: true },
              { label: "Pure Water", sub: "정수", accent: false },
            ].map((s, i) =>
              s.arrow ? (
                <span key={i} className="text-gray-300 font-bold text-2xl hidden sm:block">→</span>
              ) : (
                <div
                  key={i}
                  className={`rounded-2xl px-5 py-3 text-center min-w-28 ${
                    s.accent
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-200 text-primary"
                  }`}
                >
                  <p className="font-bold text-sm">{s.label}</p>
                  <p className={`text-xs mt-0.5 ${s.accent ? "text-white/60" : "text-gray-400"}`}>{s.sub}</p>
                </div>
              )
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Stage 1 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">PCT Composite Filter</h3>
                  <p className="text-accent text-sm font-semibold">복합 필터 (PCT)</p>
                </div>
              </div>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                A 3-in-1 filter combining PP sediment, activated carbon, and post carbon block — removing sediment, chlorine, and organic compounds while improving taste and odor before water reaches the RO membrane.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                PP 세디먼트, 활성탄, 포스트 카본 블록을 결합한 3-in-1 필터. 역삼투압 멤브레인 전 이물질, 염소, 유기화합물을 제거하고 맛과 냄새를 개선합니다.
              </p>
              <div className="bg-gray-50 rounded-xl px-5 py-4 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-semibold">Replacement interval</span>
                  <span className="text-primary font-bold">8–12 months</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">교체 주기</span>
                  <span className="text-gray-400">8–12개월</span>
                </div>
                <div className="flex justify-between text-sm pt-1 border-t border-gray-200 mt-1">
                  <span className="text-gray-400">Part number</span>
                  <span className="text-gray-500 font-semibold">#30035162</span>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-accent font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">RO Membrane</h3>
                  <p className="text-accent text-sm font-semibold">역삼투압 멤브레인</p>
                </div>
              </div>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Filters contaminants down to 0.0001 microns, removing dissolved salts, heavy metals, bacteria, viruses, and other impurities. Achieves up to 99% TDS reduction with a 57.2% average recovery rate under standard test conditions.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                0.0001마이크론까지 오염물질 제거. 용해된 염류, 중금속, 세균, 바이러스 등을 걸러냅니다. 표준 시험 조건에서 TDS 최대 99% 감소, 평균 회수율 57.2%.
              </p>
              <div className="bg-gray-50 rounded-xl px-5 py-4 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-semibold">Replacement interval</span>
                  <span className="text-primary font-bold">12–24 months</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">교체 주기</span>
                  <span className="text-gray-400">12–24개월</span>
                </div>
                <div className="flex justify-between text-sm pt-1 border-t border-gray-200 mt-1">
                  <span className="text-gray-400">Part number</span>
                  <span className="text-gray-500 font-semibold">#30035163</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Smart Features ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Smart Features</h2>
            <p className="text-xl font-semibold text-primary/60 mt-1">스마트 기능</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "🚿",
                titleEN: "Smart Faucet",
                titleKR: "스마트 수전",
                descEN: "3 modes: RO + PCT filtered water, PCT-only filtered water, or Off. Polished metal finish for modern kitchens.",
                descKR: "3가지 모드: RO+PCT, PCT 전용, 끄기. 현대적인 주방을 위한 금속 마감 디자인.",
              },
              {
                icon: "📊",
                titleEN: "Live TDS Display",
                titleKR: "실시간 TDS 표시",
                descEN: "Real-time water quality readout on the faucet display — always know the purity level of your water.",
                descKR: "수전 디스플레이에서 실시간으로 수질을 확인. 항상 정수 순도를 파악할 수 있습니다.",
              },
              {
                icon: "🔔",
                titleEN: "Filter Alerts",
                titleKR: "필터 교체 알림",
                descEN: "Automatic reminders when it's time to replace either cartridge. No guesswork, no missed changes.",
                descKR: "교체 시기가 되면 자동으로 알림. 필터 교체 시기를 절대 놓치지 않습니다.",
              },
              {
                icon: "💦",
                titleEN: "Smart Flushing",
                titleKR: "스마트 플러싱",
                descEN: "Auto flush runs only when needed — on startup, after extended use, or after filter replacement (~18 seconds).",
                descKR: "시동 시, 장시간 사용 후, 필터 교체 후에만 자동 세척 작동 (약 18초).",
              },
            ].map((f) => (
              <div key={f.titleEN} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-base font-bold text-primary mb-0.5">{f.titleEN}</h3>
                <p className="text-xs font-semibold text-accent mb-3">{f.titleKR}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">{f.descEN}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{f.descKR}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specifications ── */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Technical Specifications</h2>
            <p className="text-xl font-semibold text-primary/60 mt-1">기술 사양</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {[
              ["Flow Rate (RO)", "0.4 GPM · 분당 0.4갤런"],
              ["Flow Rate (Filtered)", "0.8 GPM · 분당 0.8갤런"],
              ["Daily Production", "600 GPD · 일일 600갤런"],
              ["Water Efficiency", "2:1 RO water-to-drain ratio"],
              ["TDS Reduction", "Up to 99% (57.2% avg. recovery rate)"],
              ["Filtration Level", "0.0001 microns"],
              ["Dimensions (W × D × H)", "17.1 × 5.4 × 15.9 in (434 × 137 × 403 mm)"],
              ["Power Input", "AC 120V / 50–60 Hz"],
              ["Rated Power", "95W · DC 24V output"],
              ["Water Temperature", "40–100°F (cold water only) · 냉수 전용"],
              ["Ambient Temperature", "40–113°F"],
              ["Water Pressure", "14.5–58.0 psi (100–400 kPa)"],
              ["Feed Water pH", "6.5–8.5"],
              ["Humidity", "≤90% (indoor use only)"],
              ["Water Source", "Municipal tap water · 수돗물"],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={`flex gap-4 px-6 py-4 border-b border-gray-100 last:border-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <span className="text-gray-500 font-semibold text-sm w-52 shrink-0">{label}</span>
                <span className="text-primary font-semibold text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Certifications</h2>
            <p className="text-xl font-semibold text-primary/60 mt-1">인증</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                badge: "NSF/ANSI 58 & 372",
                descEN: "Unit certified by IAPMO R&T for reverse osmosis performance and lead-free compliance.",
                descKR: "역삼투압 성능 및 납 없음 기준을 IAPMO R&T가 인증.",
              },
              {
                badge: "NSF/ANSI/CAN 61 & 372",
                descEN: "Smart faucet certified for drinking water system components and lead-free requirements.",
                descKR: "스마트 수전이 음용수 시스템 부품 및 납 없음 기준을 충족함을 인증.",
              },
              {
                badge: "NSF/ANSI/CAN 372",
                descEN: "Inlet T-valve certified for lead-free compliance throughout the entire water path.",
                descKR: "인렛 T밸브가 전체 수로의 납 없음 기준을 충족함을 인증.",
              },
            ].map((c) => (
              <div key={c.badge} className="bg-gray-50 border border-gray-200 rounded-2xl p-7">
                <div className="bg-primary text-white font-bold text-sm rounded-lg px-3 py-2 inline-block mb-4">
                  {c.badge}
                </div>
                <p className="text-gray-600 text-base leading-relaxed mb-2">{c.descEN}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{c.descKR}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Applications ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Ideal For</h2>
            <p className="text-xl font-semibold text-primary/60 mt-1">활용 용도</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: "🥤", en: "Drinking Water", kr: "음용수" },
              { icon: "🍳", en: "Cooking", kr: "조리용" },
              { icon: "🤲", en: "Handwashing", kr: "손 세정" },
              { icon: "🥦", en: "Washing Produce", kr: "식재료 세척" },
            ].map((a) => (
              <div key={a.en} className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                <div className="text-4xl mb-3">{a.icon}</div>
                <p className="font-bold text-primary text-sm">{a.en}</p>
                <p className="text-gray-400 text-xs mt-0.5">{a.kr}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">
            Especially effective in high-TDS regions and all municipal water sources. · 높은 TDS 지역 및 모든 수돗물에 특히 효과적입니다.
          </p>
        </div>
      </section>

      {/* ── Warranty ── */}
      <section className="py-10 bg-white border-t border-gray-100 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm leading-relaxed">
            <span className="font-bold text-primary">Limited Warranty: </span>
            2 years on parts (registered) · 1 year on parts (non-registered). Cartridge filters excluded.&nbsp;
            <span className="text-gray-400">· 보증: 등록 제품 부품 2년, 미등록 1년 (카트리지 필터 제외)</span>
          </p>
        </div>
      </section>

      {/* ── Taste Testing CTA ── */}
      <section className="py-20 sm:py-28 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-5">🎉</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Try It Before You Buy</h2>
          <p className="text-xl font-semibold text-white/80 mb-5">구매 전 직접 맛보세요</p>
          <p className="text-white/70 text-lg leading-relaxed mb-2">
            Free water taste testing every{" "}
            <strong className="text-white">Tuesday &amp; Saturday</strong>{" "}
            at our Palisades Park location.
          </p>
          <p className="text-white/55 text-base mb-10">
            매주 <strong className="text-white/80">화요일 &amp; 토요일</strong> 무료 시음회 — 팰리세이즈 파크 매장 방문
          </p>
          <div className="bg-white/15 rounded-2xl px-8 py-5 inline-block mb-8">
            <p className="text-white font-bold text-lg">230 E. Brinkerhoff Ave</p>
            <p className="text-white/70 text-base">Palisades Park, NJ 07650</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+12014292632"
              className="bg-white text-accent font-bold px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors"
            >
              Call Us · 전화하기
            </a>
            <Link
              href="/#contact"
              className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors"
            >
              Visit Us · 방문하기
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2550] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Image
            src="/logo.svg"
            alt="Wellbeing Korea USA"
            width={120}
            height={35}
            className="h-8 w-auto mx-auto mb-3 brightness-0 invert"
          />
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Wellbeing Korea LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
