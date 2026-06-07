import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar variant="store" />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          {/* Checkmark */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-primary mb-1">Order Confirmed!</h1>
          <p className="text-lg font-semibold text-accent mb-6">주문이 완료되었습니다</p>

          <p className="text-gray-500 text-sm leading-relaxed mb-2">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            구매해 주셔서 감사합니다. 곧 확인 이메일을 받으실 것입니다.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/store"
              className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Continue Shopping / 계속 쇼핑하기
            </Link>
            <Link
              href="/"
              className="text-primary/60 hover:text-primary text-sm font-medium transition-colors"
            >
              Back to Home / 홈으로
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-[#1a2550] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Image src="/logo.svg" alt="Wellbeing Korea USA" width={120} height={35} className="h-8 w-auto mx-auto mb-3 brightness-0 invert" />
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Wellbeing Korea LLC.</p>
        </div>
      </footer>
    </div>
  );
}
