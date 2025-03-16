"use client";

import { useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { cn } from "@/lib/utils";

const marqueeItems = [
  { text: "ARM LABS", active: true },
  { text: "AFRICA TECHNOLOGY EVENT", active: false },
  { text: "TECHSTARS", active: false },
  { text: "DEMO DAY", active: false },
];

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  // Create a duplicate array for continuous scrolling
  const allItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div
      className="w-screen overflow-hidden py-6 bg-white border-t border-b border-black"
      ref={containerRef}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -2000],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        {allItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              "text-6xl font-black uppercase px-4 flex-shrink-0",
              item.active ? "text-blue-500" : "text-black"
            )}
          >
            {item.text} <span className="mx-4">-</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
