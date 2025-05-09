"use client";

import { motion, useAnimationControls } from "framer-motion";
import MarqueeItem from "./marquee-item";
import { EVENT_LIST } from "@/lib/consts";
import { useHover } from "@/context/hover-context";
import { useEffect, useRef, useState } from "react";
import { useMobile } from "@/hooks/use-mobile";

export default function MarqueeGroup() {
  const { hoveredItem } = useHover();
  const controls = useAnimationControls();
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const isMobile = useMobile();
  const lastPositionRef = useRef(0);

  // Calculate the width of a single set of items
  useEffect(() => {
    if (containerRef.current) {
      const singleSetWidth = containerRef.current.scrollWidth / 2;
      setDragConstraints({ left: -singleSetWidth, right: 0 });
    }
  }, []);

  // Start or pause the animation based on hover state
  useEffect(() => {
    if (hoveredItem || isDragging) {
      // Store the current position before stopping
      controls.stop();
    } else {
      startAnimation();
    }
  }, [hoveredItem, isDragging, controls]);

  // Function to start the animation
  const startAnimation = () => {
    // Faster speed (reduced duration)
    controls.start({
      x: isMobile ? "-370%" : "-270%",
      transition: {
        duration: isMobile ? 3 : 12, // Faster speed (was 5 and 20)
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
      startAnimation();
    }
  };

  // Handle when the marquee needs to reset position for infinite loop
  const handleUpdate = (latest: { x: number }) => {
    if (containerRef.current) {
      const singleSetWidth = containerRef.current.scrollWidth / 2;

      // Store the current position for direction tracking
      lastPositionRef.current = latest.x;

      // If we've dragged past the first set, reset to create the illusion of infinity
      // if (latest.x < -singleSetWidth) {
      //   controls.set({ x: 0 });
      // }

      // If we've dragged too far right, reset to the left edge
      // if (latest.x > 0) {
      //   controls.set({ x: -singleSetWidth });
      // }
    }
  };

  return (
    <div
      className="w-screen pt-20 py-10 overflow-hidden marquee-content"
      ref={containerRef}
    >
      <motion.div
        className="flex whitespace-nowrap font-tusker-grotesk cursor-grab active:cursor-grabbing"
        animate={controls}
        drag="x"
        dragConstraints={dragConstraints}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onUpdate={handleUpdate}
        dragElastic={0.1}
        style={{ touchAction: "none" }}
      >
        {EVENT_LIST.map(({ href, eventName }, index) => (
          <MarqueeItem key={`first-${index}`} href={href} label={eventName} />
        ))}
        {/* Duplicate items for seamless looping */}
        {EVENT_LIST.map(({ href, eventName }, index) => (
          <MarqueeItem key={`second-${index}`} href={href} label={eventName} />
        ))}
      </motion.div>
    </div>
  );
}
