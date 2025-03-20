"use client";

import Navbar from "@/components/navbar";
import { useHover } from "@/context/hover-context";
import { usePathname } from "next/navigation";
import React from "react";

export default function WithNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { hoveredItem } = useHover();
  const pathname = usePathname();

  const shouldHaveWhiteNavbar = ["/", "/about"];
  return (
    <div className="font-[family-name:var(--font-product-sans)] relative transition-colors duration-300 min-h-svh">
      <Navbar
        // isWhite={!!hoveredItem && shouldHaveWhiteNavbar.includes(pathname)}
        isWhite={shouldHaveWhiteNavbar.includes(pathname)}
      />
      {children}
    </div>
  );
}
