"use client";

import type React from "react";
import { useHover } from "@/context/hover-context";
import LetterAnimation from "./letter-animation";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useMobile } from "@/hooks/use-mobile";

function getScrollParent(el: Element | null): Element | Window {
  let node = el?.parentElement || null;
  while (node) {
    const style = window.getComputedStyle(node);
    const overflowX = style.overflowX;
    const scrollable =
      (overflowX === "auto" || overflowX === "scroll" || overflowX === "overlay") &&
      node.scrollWidth > node.clientWidth;
    if (scrollable) return node;
    node = node.parentElement;
  }
  return window; // fallback
}

export default function MarqueeItem({
  href,
  label,
  isBlack = false,
}: {
  href: string;
  label: string;
  isBlack?: boolean;
}) {
  const router = useRouter();
  const { hoveredItem, setHoveredItem, setVisibleItem } = useHover();
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const isMobile = useMobile();
  const elementRef = useRef<HTMLDivElement>(null);

  // Mobile double-tap with timestamp to avoid stale state
  const lastTapRef = useRef<number>(0);

  const isHovered = hoveredItem === label;
  const isAnyHovered = hoveredItem !== null;

  // Detect when this item’s left edge touches the start of the scroll root
  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const root = getScrollParent(el);
    const scrollTarget: Element | Window = root === window ? window : (root as Element);

    // Tolerance (px) around the left edge — accounts for margins like mx-10 (~40px)
    const TOL = 48;

    let rafId: number | null = null;
    let loopId: number | null = null;

    const check = () => {
      const rect = el.getBoundingClientRect();
      const rootRect =
        root === window
          ? { left: 0, right: window.innerWidth }
          : (root as Element).getBoundingClientRect();

      // Distance of the item’s left edge from the root’s left edge
      const leftDist = rect.left - rootRect.left;

      // Consider "visible" if the item’s left edge is within [0, TOL] of the root’s left
      if (leftDist >= 0 && leftDist <= TOL && rect.right > rootRect.left) {
        setVisibleItem(label);
      }
    };

    const onScrollOrResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(check);
    };

    // Initial check + listeners
    check();
    scrollTarget.addEventListener("scroll", onScrollOrResize as any, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    // Fallback loop for CSS transform-based marquee animations (no scroll events)
    const loop = () => {
      check();
      loopId = requestAnimationFrame(loop);
    };
    loopId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (loopId) cancelAnimationFrame(loopId);
      scrollTarget.removeEventListener("scroll", onScrollOrResize as any);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [label, setVisibleItem]);

  // Track pointer for drag detection
  const handlePointerDown = (e: React.PointerEvent) => {
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!startPosRef.current) return;
    const deltaX = Math.abs(e.clientX - startPosRef.current.x);
    const deltaY = Math.abs(e.clientY - startPosRef.current.y);
    if (deltaX > 5 || deltaY > 5) setIsDragging(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }

    if (isMobile) {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        // second tap within threshold
        lastTapRef.current = 0;
        router.push(href);
      } else {
        lastTapRef.current = now;
      }
    } else {
      router.push(href);
    }
  };

  const handlePointerUp = () => {
    startPosRef.current = null;
  };

  return (
    <div
      ref={elementRef}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="flex items-center mx-10 cursor-pointer"
      onMouseEnter={() => setHoveredItem(label)} // hover state (independent)
      onMouseLeave={() => setHoveredItem(null)}
    >
      <LetterAnimation
        text={label}
        className={`text-7xl md:text-[120px] font-bold transition-all duration-300 ${
          isBlack
            ? "text-black"
            : isHovered
            ? "text-blue-500"
            : isAnyHovered
            ? "text-gray-500/30"
            : ""
        }`}
        isHovered={isHovered}
      />
    </div>
  );
}
