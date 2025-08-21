"use client";

import { motion, useAnimationControls } from "framer-motion";
import MarqueeItem from "./marquee-item";
import { EVENT_LIST } from "@/lib/consts";
import { useHover } from "@/context/hover-context";
import { useEffect, useRef, useState } from "react";
import { useMobile } from "@/hooks/use-mobile";

export default function MarqueeGroup({isBlack = false}:{isBlack?: boolean}) {
  const { hoveredItem } = useHover();
  const controls = useAnimationControls();
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const isMobile = useMobile();
  const lastPositionRef = useRef(0);
  const [singleSetWidth, setSingleSetWidth] = useState(0);

  // Constants: tweak these to change base speed / hover slowdown
  const DESKTOP_SPEED_PX_PER_SEC = 150; // px per second
  const MOBILE_SPEED_PX_PER_SEC = 120;
  const HOVER_SLOW_FACTOR = 3; // multiply duration by this on hover

  // Calculate the width of a single set of items
  useEffect(() => {
    if (containerRef.current) {
      const singleWidth = containerRef.current.scrollWidth / 2;
      setSingleSetWidth(singleWidth);
      setDragConstraints({ left: -singleWidth, right: 0 });
    }
  }, []);

  // Helper to normalize any x into the visible cycle range [-singleSetWidth, 0]
  const normalizeXToCycle = (x: number, width: number) => {
    if (!width) return 0;
    const offset = ((-x % width) + width) % width; // 0 .. width-1
    return -offset;
  };

  // Start or adjust the animation based on hover/drag state
  useEffect(() => {
    if (isDragging) {
      // let dragging control the motion
      return;
    }
    if (!singleSetWidth) return;

    const slowFactor = hoveredItem ? HOVER_SLOW_FACTOR : 1;
    startAnimation(slowFactor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredItem, isDragging, singleSetWidth, isMobile]);

  // Function to start the animation; slowFactor >1 slows the marquee
  const startAnimation = (slowFactor = 1) => {
    if (!singleSetWidth) return;
    const currentX = lastPositionRef.current ?? 0;
    const normalizedX = normalizeXToCycle(currentX, singleSetWidth);

    // snap to normalized position to ensure every cycle covers exactly singleSetWidth
    controls.set({ x: normalizedX });

    const speed = isMobile ? MOBILE_SPEED_PX_PER_SEC : DESKTOP_SPEED_PX_PER_SEC;
    const durationPerCycle = (singleSetWidth / speed) * slowFactor;

    // animate exactly one cycle (singleSetWidth) and loop it. linear ensures uniform speed.
    controls.start({
      x: normalizedX - singleSetWidth,
      transition: {
        duration: durationPerCycle,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    });
  };

  // Handle drag start
  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    if (!hoveredItem) {
      startAnimation(1);
    } else {
      startAnimation(HOVER_SLOW_FACTOR);
    }
  };

  // Handle when the marquee needs to reset position for infinite loop
  const handleUpdate = (latest: { x: number }) => {
    if (!containerRef.current) return;
    const width = singleSetWidth || containerRef.current.scrollWidth / 2;

    // store latest
    lastPositionRef.current = latest.x;

    // if user dragged way out of the cycle, snap it back into the cycle so resume is smooth
    if (latest.x < -width || latest.x > 0) {
      const normalized = normalizeXToCycle(latest.x, width);
      controls.set({ x: normalized });
      lastPositionRef.current = normalized;
    }
  };

  return (
    <div
      className="w-screen pt-20 py-10 overflow-hidden marquee-content"
      ref={containerRef}
    >
      <motion.div
        className="flex w-fit whitespace-nowrap font-tusker-grotesk cursor-grab active:cursor-grabbing"
        animate={controls}
        drag="x"
        dragConstraints={dragConstraints}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onUpdate={handleUpdate}
        dragElastic={0.1}
        style={{ touchAction: "none" }}
      >
        {[...EVENT_LIST, ...EVENT_LIST].map(({ href, eventName }, index) => (
          <MarqueeItem isBlack={isBlack} key={`first-${index}`} href={href} label={eventName} />
        ))}
      </motion.div>
    </div>
  );
}
