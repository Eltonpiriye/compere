"use client";

import { motion, useAnimationControls } from "framer-motion";
import MarqueeItem from "./marquee-item";
import { MARQUEE_LIST } from "@/lib/consts";
import { useHover } from "@/context/hover-context";
import { useEffect } from "react";

export default function MarqueeGroup() {
  const { hoveredItem } = useHover();
  const controls = useAnimationControls();

  useEffect(() => {
    if (hoveredItem) {
      // Pause the animation when hovering
      controls.stop();
    } else {
      // Resume the animation when not hovering
      controls.start({
        x: ["0%", "-200%"],
        transition: {
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          duration: 20,
        },
      });
    }
  }, [hoveredItem, controls]);

  // Start the animation on initial render
  useEffect(() => {
    controls.start({
      x: ["0%", "-200%"],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        duration: 20,
      },
    });
  }, [controls]);

  return (
    <div className="w-full py-5">
      <motion.div
        className="flex whitespace-nowrap font-tusker-grotesk"
        animate={controls}
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
