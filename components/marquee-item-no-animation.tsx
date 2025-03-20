"use client";

import type React from "react";

import { useHover } from "@/context/hover-context";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useMobile } from "@/hooks/use-mobile";

export default function MarqueeItemNoAnimation({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { hoveredItem, setHoveredItem } = useHover();
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const isMobile = useMobile();
  const active = pathname.startsWith(href);

  // Double click handling
  const [clickCount, setClickCount] = useState(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isHovered = hoveredItem === label;

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  // Track mouse/touch down position
  const handlePointerDown = (e: React.PointerEvent) => {
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(false);
  };

  // Track mouse/touch move to detect dragging
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!startPosRef.current) return;

    const deltaX = Math.abs(e.clientX - startPosRef.current.x);
    const deltaY = Math.abs(e.clientY - startPosRef.current.y);

    // If moved more than 5px in any direction, consider it a drag
    if (deltaX > 5 || deltaY > 5) {
      setIsDragging(true);
    }
  };

  // Handle click/navigation with double-click support for mobile
  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }

    if (isMobile) {
      // Implement double-click for mobile
      setClickCount((prev) => prev + 1);

      if (clickCount === 0) {
        // First click - set timer
        if (clickTimerRef.current) {
          clearTimeout(clickTimerRef.current);
        }

        clickTimerRef.current = setTimeout(() => {
          setClickCount(0);
        }, 300); // 300ms double-click threshold
      } else {
        // Second click - navigate
        clearTimeout(clickTimerRef.current as NodeJS.Timeout);
        setClickCount(0);
        router.push(href);
      }
    } else {
      // Desktop behavior - single click
      router.push(href);
    }
  };

  // Reset on pointer up
  const handlePointerUp = () => {
    startPosRef.current = null;
  };

  return (
    <div
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="flex items-center mx-10 cursor-pointer"
      onMouseEnter={() => setHoveredItem(label)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div
        className={`text-7xl md:text-[120px] md:text-[200px] font-bold transition-all duration-300 ${
          isHovered || active ? "text-blue-500" : ""
        }`}
      >
        {label}
      </div>
    </div>
  );
}
