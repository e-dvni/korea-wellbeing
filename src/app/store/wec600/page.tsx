import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getProduct } from "@/lib/sanity";
import type { SanityProduct } from "@/types/sanity";
import WEC600AddToCart from "./WEC600AddToCart";

export const revalidate = 60;

export default async function WEC600Page() {
  const product: SanityProduct | null = await getProduct("wec600-deionization-water-treatment-system")
    ?? await getProduct("wec600")
    ?? await getProduct("wec-series-deionization-water-treatment-system");
  const imageUrl = product?.images?.[0]?.asset?.url ?? null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
                  alt="WEC600 Deionization Water Treatment System"
                  width={420}
                  height={420}
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-28 h-28 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 12l8.954-8.955a1.5 1.5 0 012.092 0L21.75 12M4.5 9.75v9.75a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V14.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v5.25a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V9.75" />
                  </svg>
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/8 rounded-full px-4 py-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                <span className="text-primary/70 text-sm font-semibold">Water Purifier &amp; Softener · 정수·연수기</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold text-primary leading-none mb-1">WEC600</h1>
              <p className="text-2xl font-semibold text-gray-500 mb-1">Deionization Water Treatment System</p>
              <p className="text-xl text-accent font-semibold mb-6">전해 이온화 수처리 시스템</p>

              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
                Point-of-entry whole-home water protection — no salt, no hassle, and no limits. Advanced electro-membrane technology removes hardness, TDS, and contaminants from every tap in your home.
              </p>

              {/* Key stats */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { label: "Coverage", value: "Whole Home" },
                  { label: "Salt Required", value: "None" },
                  { label: "Downtime", value: "Zero" },
                  { label: "Monitoring", value: "NaviLink Lite™" },
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
                <WEC600AddToCart product={product} />
              ) : (
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm">
                    Product details currently unavailable online.
                  </p>
                  <a
                    href="tel:+12014292632"
                    className="inline-flex items-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-full hover:bg-[#c05e1e] transition-colors"
                  >
                    Call to Order · 전화 주문
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Why the WEC600?</h2>
            <p className="text-xl font-semibold text-primary/60 mt-1">왜 WEC600인가요?</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🚫",
                titleEN: "No Salt Required",
                titleKR: "소금 불필요",
                descEN: "Unlike traditional water softeners, the WEC600 uses electro-membrane technology — no salt bags to buy, carry, or store.",
                descKR: "기존 연수기와 달리 전해막 기술을 사용합니다. 소금 포대를 구입하거나 보관할 필요가 없습니다.",
              },
              {
                icon: "🏠",
                titleEN: "Whole-Home Protection",
                titleKR: "전체 가정 보호",
                descEN: "Point-of-entry installation at your water main treats every drop — drinking, cooking, showering, laundry, and appliances.",
                descKR: "수도 본관에 설치하여 음용, 조리, 샤워, 세탁, 가전 등 모든 물을 처리합니다.",
              },
              {
                icon: "⏰",
                titleEN: "Zero Downtime",
                titleKR: "무중단 운영",
                descEN: "Dual NDI module design ensures at least one module is always treating water while the other regenerates.",
                descKR: "이중 NDI 모듈 설계로 하나가 재생 중일 때도 항상 다른 모듈이 수처리를 유지합니다.",
              },
              {
                icon: "📱",
                titleEN: "Smart Monitoring",
                titleKR: "스마트 모니터링",
                descEN: "NaviLink Lite™ Wi-Fi app tracks daily water usage, incoming and outgoing water quality, and maintenance reminders in real time.",
                descKR: "NaviLink Lite™ Wi-Fi 앱으로 일일 사용량, 입출수 수질, 유지보수 알림을 실시간으로 확인합니다.",
              },
              {
                icon: "🔄",
                titleEN: "Self-Cleaning CIP",
                titleKR: "자동 세정 기술",
                descEN: "Built-in Clean-In-Place (CIP) technology automatically flushes contaminants from internal membranes — no manual cleaning needed.",
                descKR: "내장된 CIP(Clean-In-Place) 기술이 멤브레인의 오염물질을 자동으로 세척합니다.",
              },
              {
                icon: "🌿",
                titleEN: "Eco-Friendly",
                titleKR: "친환경 설계",
                descEN: "No salt or chloride discharge into waterways. Low energy consumption and minimal wastewater compared to traditional softeners.",
                descKR: "염화물 방류 없음. 기존 연수기 대비 낮은 에너지 소비와 최소화된 폐수로 환경을 보호합니다.",
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
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">How It Works</h2>
            <p className="text-xl font-semibold text-primary/60 mt-1">작동 원리</p>
            <p className="text-gray-500 text-base mt-3 max-w-2xl mx-auto">
              The WEC600 uses electro-membrane deionization — a continuous two-phase process that never stops treating your water.
            </p>
          </div>

          {/* Phase flow */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 flex-wrap">
            {[
              { label: "Tap Water", sub: "수돗물", accent: false },
              { label: "→", arrow: true },
              { label: "Pre-Filter", sub: "Sediment", accent: true },
              { label: "→", arrow: true },
              { label: "NDI Modules", sub: "Electro-Membrane", accent: true },
              { label: "→", arrow: true },
              { label: "Post-Filter", sub: "Carbon Polish", accent: true },
              { label: "→", arrow: true },
              { label: "Pure Water", sub: "정수", accent: false },
            ].map((s, i) =>
              s.arrow ? (
                <span key={i} className="text-gray-300 font-bold text-2xl hidden sm:block">→</span>
              ) : (
                <div
                  key={i}
                  className={`rounded-2xl px-4 py-3 text-center min-w-24 ${
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
            {/* Phase 1 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">Adsorption Phase</h3>
                  <p className="text-accent text-sm font-semibold">흡착 단계</p>
                </div>
              </div>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Water flows through the NDI module's charged electro-membrane. The electric charge attracts and captures dissolved minerals, heavy metals, salts, and other contaminants directly onto the membrane surface.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                물이 NDI 모듈의 하전된 전해막을 통과하면서, 전기 전하가 용해된 미네랄, 중금속, 염류 및 기타 오염물질을 멤브레인 표면에 포착합니다.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-accent font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">Regeneration Phase</h3>
                  <p className="text-accent text-sm font-semibold">재생 단계</p>
                </div>
              </div>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                When the membrane is saturated, the polarity automatically reverses to release the captured contaminants, which are then flushed out through the wastewater line. The dual-module design means the other module keeps treating water during this process — no interruption to your supply.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                멤브레인이 포화 상태가 되면 극성이 자동으로 역전되어 오염물질이 배수관으로 배출됩니다. 이중 모듈 설계로 수처리가 중단 없이 지속됩니다.
              </p>
            </div>
          </div>

          {/* CIP callout */}
          <div className="mt-6 bg-primary/5 border border-primary/10 rounded-2xl p-6 flex gap-4 items-start">
            <div className="text-2xl shrink-0">🔄</div>
            <div>
              <h4 className="font-bold text-primary mb-1">Clean-In-Place (CIP) Technology</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-1">
                The WEC600's built-in CIP system automatically deep-cleans the internal membranes using a specialized solution — extending membrane life and maintaining peak performance without manual intervention.
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                내장 CIP 시스템이 특수 세정액으로 멤브레인을 자동 세척하여 수명을 연장하고 최상의 성능을 유지합니다.
              </p>
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
                icon: "📱",
                titleEN: "NaviLink Lite™ App",
                titleKR: "NaviLink Lite™ 앱",
                descEN: "iOS and Android app for real-time monitoring of water usage, incoming/outgoing quality, and maintenance alerts.",
                descKR: "iOS·Android 앱으로 실시간 사용량, 수질, 유지보수 알림을 모니터링합니다.",
              },
              {
                icon: "📊",
                titleEN: "Digital Control Panel",
                titleKR: "디지털 제어판",
                descEN: "Intuitive onboard display for easy setup, status monitoring, and troubleshooting without needing a technician.",
                descKR: "직관적인 디스플레이로 간편한 설정, 상태 확인, 문제 해결이 가능합니다.",
              },
              {
                icon: "💧",
                titleEN: "Usage Tracking",
                titleKR: "사용량 추적",
                descEN: "Monitor your daily water consumption and quality metrics to stay informed about your home's water health.",
                descKR: "일일 물 사용량과 수질 지표를 추적하여 가정의 수질 상태를 항상 파악합니다.",
              },
              {
                icon: "🔔",
                titleEN: "Maintenance Alerts",
                titleKR: "유지보수 알림",
                descEN: "Automatic reminders when the CIP solution needs topping off or filters need replacement.",
                descKR: "CIP 용액 보충이나 필터 교체 시기가 되면 자동으로 알림을 보냅니다.",
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

      {/* ── What It Removes ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">What It Removes</h2>
            <p className="text-xl font-semibold text-primary/60 mt-1">제거 대상 오염물질</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { icon: "🧪", en: "Total Dissolved Solids (TDS)", kr: "총 용존 고형물" },
              { icon: "🪨", en: "Hardness Minerals (Ca, Mg)", kr: "경도 미네랄 (칼슘·마그네슘)" },
              { icon: "☢️", en: "Heavy Metals", kr: "중금속" },
              { icon: "🟢", en: "Chlorine", kr: "염소" },
              { icon: "🔬", en: "Dissolved Salts", kr: "용존 염류" },
              { icon: "⚗️", en: "Other Dissolved Contaminants", kr: "기타 용존 오염물질" },
            ].map((a) => (
              <div key={a.en} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-3">
                <span className="text-2xl shrink-0">{a.icon}</span>
                <div>
                  <p className="font-bold text-primary text-sm leading-tight">{a.en}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{a.kr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Home Benefits ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Home Benefits</h2>
            <p className="text-xl font-semibold text-primary/60 mt-1">가정 내 혜택</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: "🚿",
                titleEN: "Better Hair & Skin",
                titleKR: "더 건강한 모발·피부",
                descEN: "Soft, treated water is gentler on hair and skin — less dryness, less irritation, and a noticeably softer feel in the shower.",
                descKR: "연수화된 물은 모발과 피부에 더 부드럽습니다. 건조함과 자극이 줄고 샤워 후 느낌이 달라집니다.",
              },
              {
                icon: "🍽️",
                titleEN: "Spotless Dishes & Glassware",
                titleKR: "얼룩 없는 식기·유리",
                descEN: "Eliminating hardness minerals means no more white spots or film on dishes, glasses, and shower doors.",
                descKR: "경도 미네랄 제거로 식기, 유리컵, 샤워 도어의 하얀 물때가 사라집니다.",
              },
              {
                icon: "🔧",
                titleEN: "Protects Pipes & Appliances",
                titleKR: "배관·가전 보호",
                descEN: "Reduced scale buildup extends the life of water heaters, dishwashers, washing machines, and all plumbing fixtures.",
                descKR: "스케일 감소로 온수기, 식기세척기, 세탁기, 배관 설비의 수명이 연장됩니다.",
              },
              {
                icon: "👕",
                titleEN: "Cleaner Laundry",
                titleKR: "더 깨끗한 세탁",
                descEN: "Soft water requires less detergent, leaves clothes feeling softer, and keeps colors brighter for longer.",
                descKR: "연수는 세제 사용량을 줄이고 옷감을 부드럽게 하며 색상을 더 오래 선명하게 유지합니다.",
              },
            ].map((b) => (
              <div key={b.titleEN} className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex gap-4">
                <span className="text-3xl shrink-0">{b.icon}</span>
                <div>
                  <h3 className="font-bold text-primary mb-0.5">{b.titleEN}</h3>
                  <p className="text-sm font-semibold text-accent mb-2">{b.titleKR}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-1">{b.descEN}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{b.descKR}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compatibility ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Compatible With</h2>
            <p className="text-xl font-semibold text-primary/60 mt-1">호환 제품</p>
            <p className="text-gray-500 text-base mt-3">
              The WEC600 pairs seamlessly with Navien water heating systems for complete home water management.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: "🔥", en: "Tankless Water Heaters", kr: "순간 온수기" },
              { icon: "💧", en: "Heat Pump Water Heaters", kr: "히트펌프 온수기" },
              { icon: "🏠", en: "Combi-Boilers", kr: "콤비 보일러" },
              { icon: "🛢️", en: "Traditional Tank Systems", kr: "기존 탱크 시스템" },
            ].map((c) => (
              <div key={c.en} className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
                <div className="text-3xl mb-2">{c.icon}</div>
                <p className="font-bold text-primary text-sm leading-tight">{c.en}</p>
                <p className="text-gray-400 text-xs mt-0.5">{c.kr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Maintenance ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Easy Maintenance</h2>
            <p className="text-xl font-semibold text-primary/60 mt-1">간편한 유지보수</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                step: "1",
                titleEN: "Top Off CIP Solution",
                titleKR: "CIP 용액 보충",
                descEN: "Periodically top off the Clean-In-Place solution reservoir. The app tells you exactly when.",
                descKR: "앱 알림에 따라 주기적으로 CIP 세정액을 보충합니다.",
              },
              {
                step: "2",
                titleEN: "Replace Pre-Filter",
                titleKR: "프리필터 교체",
                descEN: "Replace the sediment pre-filter as needed to protect the NDI modules from larger particles.",
                descKR: "NDI 모듈 보호를 위해 세디먼트 프리필터를 필요 시 교체합니다.",
              },
              {
                step: "3",
                titleEN: "Replace Post-Filter",
                titleKR: "포스트필터 교체",
                descEN: "Replace the carbon post-filter periodically to ensure water is polished to the highest purity.",
                descKR: "최상의 수질 유지를 위해 카본 포스트필터를 주기적으로 교체합니다.",
              },
            ].map((m) => (
              <div key={m.titleEN} className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-sm">{m.step}</span>
                </div>
                <h3 className="font-bold text-primary mb-0.5">{m.titleEN}</h3>
                <p className="text-sm font-semibold text-accent mb-3">{m.titleKR}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-1">{m.descEN}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{m.descKR}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-28 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Ready for Whole-Home Pure Water?
          </h2>
          <p className="text-xl font-semibold text-white/70 mb-5">
            온 집안에 깨끗한 물을, 지금 시작하세요
          </p>
          <p className="text-white/55 text-lg leading-relaxed mb-10">
            Contact us to learn more about the WEC600 or to schedule a consultation for your home.
            <br />
            <span className="text-sm">WEC600 상담 및 설치 문의는 아래로 연락주세요.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+12014292632"
              className="bg-accent text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#c05e1e] transition-colors"
            >
              Call Us · 전화하기
            </a>
            <a
              href="mailto:sales@wellbeingkoreausa.com"
              className="border-2 border-white/40 text-white font-bold px-8 py-3.5 rounded-full hover:border-white hover:bg-white/10 transition-colors"
            >
              Email Us · 이메일 문의
            </a>
            <Link
              href="/store"
              className="border-2 border-white/20 text-white/70 font-bold px-8 py-3.5 rounded-full hover:border-white/40 transition-colors"
            >
              View All Products · 전체 제품
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
