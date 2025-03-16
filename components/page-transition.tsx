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

  // Cyan head comes first, then black head
  const cyanHeadHeight = useTransform(
    springProgress,
    [0, 0.2, 0.3, 0.5, 0.75, 1],
    [0, 150, 75, 0, 0, 0]
  );

  const blackHeadHeight = useTransform(
    springProgress,
    [0, 0.2, 0.3, 0.5, 0.75, 1],
    [0, 80, 40, 0, 0, 0]
  );

  // Black tail comes first, then cyan tail
  const blackTailHeight = useTransform(
    springProgress,
    [0, 0.25, 0.5, 0.7, 0.8, 1],
    [0, 0, 0, 40, 80, 0]
  );

  const cyanTailHeight = useTransform(
    springProgress,
    [0, 0.25, 0.5, 0.7, 0.8, 1],
    [0, 0, 0, 75, 150, 0]
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
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0">
            {/* Cyan head - leads the sliding in */}
            <motion.div
              className="bg-cyan-500"
              style={{ height: cyanHeadHeight }}
            />

            {/* Black head - follows the cyan head */}
            <motion.div
              className="bg-black"
              style={{ height: blackHeadHeight }}
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            {/* Black tail - appears first when sliding out */}
            <motion.div
              className="bg-black"
              style={{ height: blackTailHeight }}
            />

            {/* Cyan tail - follows the black tail */}
            <motion.div
              className="bg-cyan-500"
              style={{ height: cyanTailHeight }}
            />
          </div>
        </div>

        {/* Logo with white background and black text */}
        <motion.div
          style={{ opacity: logoOpacity }}
          className="relative z-10 bg-white px-8 py-4 rounded-md"
        >
          <h1 className="text-5xl text-black font-tusker-grotesk">
            ELTON PIRIYE
          </h1>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
