import type { Metadata } from "next";
import { Geist } from "next/font/google";
import ClientShell from "@/components/ClientShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wellbeing Korea USA | K Navien Products",
  description: "Authorized K Navien dealer bringing premium Korean wellness products to America — water purifiers, condensing boilers, hot water mats, HVAC systems, and air purification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
