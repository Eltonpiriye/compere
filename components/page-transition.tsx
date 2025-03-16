"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function PageTransition() {
  // Use a spring for smooth, natural animation
  const springProgress = useSpring(0, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Transform the spring value to different properties
  const slideY = useTransform(
    springProgress,
    [0, 0.5, 1],
    ["100%", "0%", "-100%"]
  );
  const cyanHeadHeight = useTransform(
    springProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 100, 0, 0, 0]
  );
  const cyanTailHeight = useTransform(
    springProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0, 0, 100, 0]
  );
  const logoOpacity = useTransform(
    springProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  // Animate the spring
  useEffect(() => {
    // Reset and start the animation
    springProgress.set(0);

    // Animate to midpoint and hold
    const animateIn = setTimeout(() => {
      springProgress.set(0.5);
    }, 50);

    // For initial load, hold longer to give content time to load
    const holdTime = 1500;

    // Animate to completion after a delay
    const animateOut = setTimeout(() => {
      springProgress.set(1);
    }, holdTime);

    return () => {
      clearTimeout(animateIn);
      clearTimeout(animateOut);
    };
  }, [springProgress]);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: slideY }}
      >
        {/* Black background */}
        <div className="absolute inset-0 bg-black">
          {/* Cyan head - leads the sliding in */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-cyan-500"
            style={{ height: cyanHeadHeight }}
          />

          {/* Cyan tail - appears when sliding out */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-cyan-500"
            style={{ height: cyanTailHeight }}
          />
        </div>

        {/* Logo */}
        <motion.div style={{ opacity: logoOpacity }} className="relative z-10">
          <h1 className="text-5xl text-white font-tusker-grotesk">
            ELTON PIRIYE
          </h1>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
