"use client";

import CartDrawer from "./CartDrawer";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}
