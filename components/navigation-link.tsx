"use client";

import type React from "react";

import Link from "next/link";
import { useTransition } from "./providers/page-transition-provider";

interface NavigationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavigationLink({
  href,
  children,
  className = "",
}: NavigationLinkProps) {
  const { startTransition } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
