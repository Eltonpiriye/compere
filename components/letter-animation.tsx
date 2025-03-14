"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type LetterAnimationProps = {
  text: string;
  className?: string;
  isHovered: boolean;
};

export default function LetterAnimation({
  text,
  className = "",
  isHovered,
}: LetterAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const letters = text.split("");

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMouseX(e.clientX - rect.left);
      }
    };

    if (isHovered) {
      window.addEventListener("mousemove", updateMousePosition);
    }

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [isHovered]);

  return (
    <div ref={containerRef} className={`flex ${className}`}>
      {letters.map((letter, index) => {
        const letterWidth = 0.78; // em units - approximate width of a letter
        const letterPosition = index * letterWidth;

        let distanceFromMouse = 100; // Default large value

        if (mouseX !== null && isHovered) {
          const fontSizeInPx = Number.parseInt(
            className.includes("text-9xl") ? "144" : "96"
          );
          const mouseXInEm = mouseX / fontSizeInPx;
          distanceFromMouse = Math.abs(mouseXInEm - letterPosition);
        }

        let stretchFactor = 1; // Default 100%
        if (isHovered && mouseX !== null) {
          if (distanceFromMouse < 0.3) {
            stretchFactor = 1.5;
          } else if (distanceFromMouse < 0.6) {
            stretchFactor = 1.35;
          } else if (distanceFromMouse < 0.9) {
            stretchFactor = 1.18;
          }
        }

        return (
          <motion.span
            key={index}
            animate={{
              scaleY: stretchFactor,
            }}
            style={{
              display: "inline-block",
              transformOrigin: "bottom",
            }}
            transition={{
              type: "easeOut",
              stiffness: 300,
              damping: 10,
            }}
            className=""
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        );
      })}
    </div>
  );
}
