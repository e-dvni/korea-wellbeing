"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";

const products = [
  {
    id: 1,
    nameEN: "Home Water Purifier",
    nameKR: "가정용 정수기",
    descEN: "Advanced multi-stage filtration delivers clean, pure drinking water directly from your tap, removing harmful contaminants and improving taste.",
    descKR: "다단계 첨단 필터링으로 수도꼭지에서 바로 깨끗하고 순수한 음용수를 제공하며, 유해 물질을 제거하고 맛을 개선합니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c0 0-7.5 8.25-7.5 12a7.5 7.5 0 0015 0c0-3.75-7.5-12-7.5-12z" />
      </svg>
    ),
    color: "#23356e",
  },
  {
    id: 2,
    nameEN: "Water Purifier & Softener",
    nameKR: "주택용 정수·연수기",
    descEN: "Whole-home water treatment that purifies and softens water throughout your entire house for drinking, cooking, and bathing.",
    descKR: "가정 전체의 물을 정화하고 연수화하는 시스템으로 음용, 조리, 목욕 등 모든 용도에 최적의 수질을 제공합니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.092 0L21.75 12M4.5 9.75v9.75a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V14.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v5.25a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V9.75" />
      </svg>
    ),
    color: "#1a5276",
  },
  {
    id: 3,
    nameEN: "Condensing Boiler",
    nameKR: "콘덴싱 보일러",
    descEN: "High-efficiency condensing boilers that maximize heat recovery, providing reliable whole-home heating with significantly reduced energy costs.",
    descKR: "열회수를 극대화하는 고효율 콘덴싱 보일러로 에너지 비용을 크게 절감하면서 안정적인 가정 난방을 제공합니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.618a8.983 8.983 0 003.361-6.867 8.21 8.21 0 003 2.463z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.468 5.99 5.99 0 00-1.925 3.547 5.975 5.975 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
      </svg>
    ),
    color: "#dd6e26",
  },
  {
    id: 4,
    nameEN: "Hot Water Mat",
    nameKR: "온수 매트",
    descEN: "Korean-style hot water circulation mat that provides even, radiant warmth for deep, comfortable sleep — energy-efficient and safe.",
    descKR: "한국식 온수 순환 매트로 균일한 복사열을 제공하여 깊고 편안한 수면을 도와줍니다. 에너지 효율적이고 안전합니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    color: "#b7580e",
  },
  {
    id: 5,
    nameEN: "A/C · Heat Pump · HVAC",
    nameKR: "냉난방 · 열펌프 · HVAC",
    descEN: "Comprehensive climate control: air conditioning, heat pumps, tankless water heaters, and full HVAC systems for year-round comfort.",
    descKR: "에어컨, 열펌프, 순간온수기, HVAC 시스템을 포함한 종합 냉난방 솔루션으로 연중 쾌적한 환경을 만들어 드립니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    color: "#0e6fa8",
  },
  {
    id: 6,
    nameEN: "Air Purification System",
    nameKR: "공기정화 시스템",
    descEN: "Whole-home air purification that continuously filters allergens, fine dust, VOCs, and bacteria for a healthier living environment.",
    descKR: "알레르겐, 미세먼지, VOC, 세균을 지속적으로 걸러내는 가정용 공기정화 시스템으로 더 건강한 주거 환경을 만들어 드립니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    color: "#1e7a45",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar variant="home" />

      {/* ── Hero ── */}
      <section className="relative bg-primary text-white overflow-hidden">
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/2 translate-x-1/3"
          style={{ background: "#dd6e26" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 translate-y-1/2 -translate-x-1/3"
          style={{ background: "#dd6e26" }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-28 lg:pb-44">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-3">
              Bringing Korean
              <br />
              <span className="text-accent">Wellness</span> to America
            </h1>
            <p className="text-2xl sm:text-3xl font-semibold text-white/75 mb-6">
              한국의 웰빙을 미국으로
            </p>
            <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-2 max-w-xl">
              Wellbeing Korea USA is your trusted source for the full line of premium K Navien products — clean water, efficient heating, and healthy air for American homes.
            </p>
            <p className="text-white/45 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
              웰빙코리아 USA는 K나비엔 전 제품을 취급하는 공식 딜러로, 깨끗한 물, 효율적인 난방, 건강한 공기를 미국 가정에 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/store"
                className="inline-flex items-center justify-center bg-accent text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-[#c05e1e] transition-colors"
              >
                View Products · 제품 보기
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center border-2 border-white/40 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:border-white hover:bg-white/10 transition-colors"
              >
                Contact Us · 연락하기
              </a>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" className="w-full block">
            <path
              d="M0,64L80,56C160,48,320,32,480,26.7C640,21,800,27,960,32C1120,37,1280,43,1360,45.3L1440,48V64H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── Photo Showcase ── */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white">
              <Image src="/webPhotos-01.svg" alt="Wellbeing Korea product showcase" width={420} height={520} className="w-full h-auto" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white">
              <Image src="/webPhotos-02.svg" alt="Wellbeing Korea product showcase" width={420} height={520} className="w-full h-auto" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white">
              <Image src="/windowLayout.jpg" alt="Wellbeing Korea product showcase" width={420} height={520} className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Overview ── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 p-7 sm:p-10 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-6">
              <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" fill="none">
                <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="#4285F4"/>
                <path d="M19 2L19.75 5.25L23 6L19.75 6.75L19 10L18.25 6.75L15 6L18.25 5.25L19 2Z" fill="#4285F4" opacity="0.6"/>
              </svg>
              <span className="text-xl font-bold text-gray-800">AI Overview</span>
            </div>

            {/* Korean */}
            <p className="text-lg sm:text-xl leading-relaxed text-gray-800 mb-4">
              경동나비엔(Navien)은{" "}
              <mark className="bg-blue-100 text-gray-800 rounded px-0.5">북미 콘덴싱 온수기 및 보일러 시장</mark>
              에서{" "}
              <mark className="bg-blue-100 text-gray-800 rounded px-0.5">시장 점유율 1위</mark>
              를 차지하며 현지 냉난방 시스템 산업을 선도하고 있습니다.
            </p>

            {/* English */}
            <p className="text-base sm:text-lg leading-relaxed text-gray-600">
              Kyung Dong Navien (Navien) holds the{" "}
              <mark className="bg-blue-100 text-gray-600 rounded px-0.5">#1 market share in the North American condensing water heater and boiler market</mark>
              , leading the local heating and cooling systems industry.
            </p>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Our Products</h2>
            <p className="text-xl font-semibold text-primary/70 mt-1 mb-4">제품 소개</p>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
              We carry the complete K Navien lineup — trusted Korean technology for clean water, efficient heating, and healthy living.
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base mt-1">
              K나비엔 전 제품을 취급합니다. 각 제품을 클릭하면 나비엔 공식 홈페이지로 이동합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <a
                key={product.id}
                href="/store"
                className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: product.color + "18", color: product.color }}
                >
                  {product.icon}
                </div>
                <h3
                  className="text-base font-bold mb-0.5"
                  style={{ color: product.color }}
                >
                  {product.nameEN}
                </h3>
                <p className="text-base font-semibold text-accent mb-3">{product.nameKR}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-2 flex-1">{product.descEN}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{product.descKR}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-primary/50 group-hover:text-accent transition-colors mt-auto">
                  View Store
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Online Store Coming Soon ── */}
      <section className="bg-primary py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-10 sm:px-12 text-center">
            <span className="inline-block bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-5">
              In Progress · 준비 중
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Online Store In Progress
            </h2>
            <p className="text-xl font-semibold text-white/55 mb-4">온라인 스토어 준비 중</p>
            <p className="text-white/45 max-w-lg mx-auto text-sm sm:text-base">
              We&apos;re currently building our online store. Check back soon to purchase K Navien products directly from home.
            </p>
            <p className="text-white/30 max-w-lg mx-auto text-sm sm:text-base mt-1">
              현재 온라인 스토어를 구축 중입니다. 곧 K나비엔 제품을 온라인으로 구매하실 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">Contact Us</h2>
            <p className="text-xl font-semibold text-primary/70 mt-1">연락처</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">Phone · 전화</p>
              <a
                href="tel:+12014292632"
                className="text-primary font-bold text-lg hover:text-accent transition-colors"
              >
                201-429-2632
              </a>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">Email · 이메일</p>
              <a
                href="mailto:sales@wellbeingkoreausa.com"
                className="text-primary font-bold hover:text-accent transition-colors text-sm break-all"
              >
                sales@wellbeingkoreausa.com
              </a>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-2">Address · 주소</p>
              <p className="text-primary font-bold text-sm leading-relaxed">
                230 E. Brinkerhoff Ave
                <br />
                Palisades Park, NJ 07650
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#1a2550] text-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Image
            src="/logo.svg"
            alt="Wellbeing Korea USA"
            width={130}
            height={38}
            className="h-9 w-auto mx-auto mb-4 brightness-0 invert"
          />
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Wellbeing Korea LLC. All rights reserved.
          </p>
          <p className="text-white/25 text-xs mt-1">
            230 E. Brinkerhoff Ave, Palisades Park, NJ 07650
          </p>
        </div>
      </footer>

    </div>
  );
}
