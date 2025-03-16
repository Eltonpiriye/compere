"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InitialLoadingScreen({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void;
}) {
  const [count, setCount] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [exitingLoader, setExitingLoader] = useState(false);

  useEffect(() => {
    // Step 1: Fade in background
    const backgroundTimer = setTimeout(() => {
      setBackgroundVisible(true);
    }, 500);

    // Step 2: Show text after background fades in
    const textTimer = setTimeout(() => {
      setTextVisible(true);
    }, 1500);

    // Step 3: Start counter after text appears
    const counterStart = setTimeout(() => {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Step 4: Start exit animations
            setTimeout(() => {
              setExitingLoader(true);
              // Wait for text to animate out before removing loader
              setTimeout(() => onLoadingComplete(), 800);
            }, 500);
            return 100;
          }
          return prev + 1;
        });
      }, 10); // Speed of counter (lower = faster)

      return () => clearInterval(interval);
    }, 2000);

    return () => {
      clearTimeout(backgroundTimer);
      clearTimeout(textTimer);
      clearTimeout(counterStart);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loader"
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: backgroundVisible ? 1 : 0 }}
          transition={{ duration: 1 }}
        />

        <div className="relative w-full h-full flex flex-col justify-end pb-8">
          {/* Company text */}
          <motion.div
            className="absolute bottom-8 left-8"
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: textVisible && !exitingLoader ? 0 : 100,
              opacity: textVisible && !exitingLoader ? 1 : 0,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
            }}
          >
            <h2 className="text-white text-2xl md:text-4xl font-bold tracking-tighter">
              THE HOST WITH THE MOST
            </h2>
          </motion.div>

          {/* Counter */}
          <motion.div
            className="absolute bottom-8 right-32 md:right-40"
            initial={{ opacity: 0 }}
            animate={{
              opacity: textVisible && !exitingLoader ? 1 : 0,
              y: exitingLoader ? 100 : 0,
            }}
            transition={{
              opacity: { delay: 0.3 },
              y: { type: "spring", damping: 20, stiffness: 100 },
            }}
          >
            <span className="text-[#ff00ff] text-6xl md:text-8xl font-bold">
              {count}
            </span>
          </motion.div>

          {/* Loading text */}
          <motion.div
            className="absolute bottom-8 right-8"
            initial={{ opacity: 0 }}
            animate={{
              opacity: textVisible && !exitingLoader ? 1 : 0,
              y: exitingLoader ? 100 : 0,
            }}
            transition={{
              opacity: { delay: 0.3 },
              y: { type: "spring", damping: 20, stiffness: 100 },
            }}
          >
            <span className="text-white text-xl md:text-2xl font-bold">
              LOADING
            </span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
