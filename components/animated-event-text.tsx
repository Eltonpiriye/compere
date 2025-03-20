"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedEventTextProps {
  text: string;
  isChanging: boolean;
}

export default function AnimatedEventText({
  text,
  isChanging,
}: AnimatedEventTextProps) {
  const [letters, setLetters] = useState<string[]>([]);

  useEffect(() => {
    // Split the text into individual letters for animation
    setLetters(text.split(""));
  }, [text]);

  return (
    <AnimatePresence mode="wait">
      <div className="flex overflow-hidden">
        {letters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            initial={{
              y: isChanging ? 40 : 0,
              opacity: isChanging ? 0 : 1,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -40,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              delay: index * 0.03, // Stagger the animation
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>
    </AnimatePresence>
  );
}
