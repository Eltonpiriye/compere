"use client";

import { motion, useAnimationControls } from "framer-motion";
import MarqueeItem from "./marquee-item";
import { MARQUEE_LIST } from "@/lib/consts";
import { useHover } from "@/context/hover-context";
import { useEffect, useRef, useState } from "react";

export default function MarqueeGroup() {
  const { hoveredItem } = useHover();
  const controls = useAnimationControls();
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

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
      controls.stop();
    } else {
      startAnimation();
    }
  }, [hoveredItem, isDragging, controls]);

  // Function to start the animation
  const startAnimation = () => {
    controls.start({
      x: "-50%",
      transition: {
        duration: 20,
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

      // If we've dragged past the first set, reset to create the illusion of infinity
      if (latest.x < -singleSetWidth) {
        controls.set({ x: 0 });
      }

      // If we've dragged too far right, reset to the left edge
      if (latest.x > 0) {
        controls.set({ x: -singleSetWidth });
      }
    }
  };

  return (
    <div
      className="w-full py-5 overflow-hidden marquee-content"
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
        {MARQUEE_LIST.map(({ href, label }, index) => (
          <MarqueeItem key={index} href={href} label={label} />
        ))}
        {/* Duplicate items for seamless looping */}
        {MARQUEE_LIST.map(({ href, label }, index) => (
          <MarqueeItem key={`duplicate-${index}`} href={href} label={label} />
        ))}
      </motion.div>
    </div>
  );
}
