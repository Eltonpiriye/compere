"use client";

import Link from "next/link";
import { useHover } from "@/context/hover-context";
import LetterAnimation from "./letter-animation";

export default function MarqueeItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const { hoveredItem, setHoveredItem } = useHover();

  const isHovered = hoveredItem === label;
  const isAnyHovered = hoveredItem !== null;

  return (
    <Link
      href={href}
      className="flex items-center mx-10"
      onMouseEnter={() => setHoveredItem(label)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <LetterAnimation
        text={label}
        className={`text-7xl sm:text-[120px] md:text-[250px] font-bold transition-all duration-300 ${
          isHovered ? "text-blue-500" : isAnyHovered ? "text-gray-500/30" : ""
        }`}
        isHovered={isHovered}
      />
    </Link>
  );
}
