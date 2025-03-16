"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

type CursorState =
  | "default"
  | "marquee"
  | "marquee-hover"
  | "link"
  | "button"
  | "input"
  | "video"
  | "scrollable"
  | "copy"
  | "loading";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [cursorText, setCursorText] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  useEffect(() => {
    // Function to check what element the cursor is over
    const updateCursorState = (e: MouseEvent) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);

      if (!element) return;

      // Check if hovering over a link
      if (element.tagName === "A" || element.closest("a")) {
        setCursorState("link");
        setCursorText("Click");
        return;
      }

      // Check if hovering over a button
      if (
        element.tagName === "BUTTON" ||
        element.closest("button") ||
        element.getAttribute("role") === "button" ||
        element.closest('[role="button"]')
      ) {
        setCursorState("button");
        setCursorText("Click");
        return;
      }

      // Check if hovering over an input
      if (
        element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA" ||
        element.closest("input") ||
        element.closest("textarea")
      ) {
        setCursorState("input");
        setCursorText("Type");
        return;
      }

      // Check if hovering over video
      if (
        element.tagName === "VIDEO" ||
        element.closest("video") ||
        element.classList.contains("video-player") ||
        element.closest(".video-player")
      ) {
        setCursorState("video");
        setCursorText("Play");
        return;
      }

      // Check if hovering over scrollable content
      // if (
      //   element.scrollHeight > element.clientHeight ||
      //   element.classList.contains("scrollable") ||
      //   element.closest(".scrollable")
      // ) {
      //   setCursorState("scrollable");
      //   setCursorText("Scroll");
      //   return;
      // }

      // Check if hovering over copyable text
      if (
        element.classList.contains("copyable") ||
        element.closest(".copyable")
      ) {
        setCursorState("copy");
        setCursorText("Copy");
        return;
      }

      // Check if hovering over the marquee
      if (
        element.classList.contains("marquee") ||
        element.closest(".marquee")
      ) {
        // If already in marquee area but now hovering directly over draggable content
        setCursorState("marquee-hover");
        setCursorText("Drag");
        return;
      }

      // Default state
      setCursorState("default");
      setCursorText("");
    };

    window.addEventListener("mousemove", updateCursorState);

    return () => {
      window.removeEventListener("mousemove", updateCursorState);
    };
  }, []);

  // Determine cursor size based on state
  const getCursorSize = () => {
    switch (cursorState) {
      case "default":
        return 16; // 8px radius
      case "marquee":
        return 60; // 30px radius
      case "marquee-hover":
        return 80; // 40px radius
      case "link":
        return 60; // 30px radius
      case "button":
        return 70; // 35px radius
      case "input":
        return 40; // 20px radius
      case "video":
        return 80; // 40px radius
      case "scrollable":
        return 50; // 25px radius
      case "marquee-hover":
        return 80; // 25px radius
      case "copy":
        return 60; // 30px radius
      case "loading":
        return 60; // 30px radius
      default:
        return 16;
    }
  };

  // Get cursor background based on state
  const getCursorBackground = () => {
    switch (cursorState) {
      case "default":
        return "bg-blue-500";
      case "marquee":
        return "bg-blue-500/30 backdrop-blur-sm";
      case "marquee-hover":
        return "bg-blue-500/20 backdrop-grayscale backdrop-blur-sm";
      case "link":
        return "bg-blue-500/30 backdrop-blur-sm";
      case "button":
        return "bg-blue-500/30 backdrop-blur-sm";
      case "input":
        return "bg-blue-500/30 backdrop-blur-sm";
      case "video":
        return "bg-blue-500/30 backdrop-blur-sm";
      case "scrollable":
        return "bg-blue-500/30 backdrop-blur-sm";
      case "marquee-hover":
        return "bg-blue-500/30 backdrop-blur-sm";
      case "copy":
        return "bg-blue-500/30 backdrop-blur-sm";
      case "loading":
        return "bg-blue-500/30 backdrop-blur-sm";
      default:
        return "bg-blue-500";
    }
  };

  const size = getCursorSize();
  const background = getCursorBackground();

  return (
    <>
      <motion.div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center ${background}`}
        style={{
          width: size,
          height: size,
        }}
        animate={{
          x: mousePosition.x - size / 2,
          y: mousePosition.y - size / 2,
          scale: cursorState === "default" ? 1 : 1.2,
          opacity: 1,
        }}
        initial={{ opacity: 0 }}
        // transition={{
        //   x: { type: "spring", stiffness: 120, damping: 25, mass: 0.3 }, // Smoother tracking
        //   y: { type: "spring", stiffness: 120, damping: 25, mass: 0.3 }, // Smoother tracking
        //   width: { type: "spring", stiffness: 200, damping: 30 },
        //   height: { type: "spring", stiffness: 200, damping: 30 },
        //   scale: { type: "spring", stiffness: 200, damping: 30 },
        // }}
      >
        {cursorText && (
          <motion.span
            className="text-white text-xs font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {cursorText}
          </motion.span>
        )}

        {/* Loading spinner for loading state */}
        {cursorState === "loading" && (
          <motion.div
            className="absolute inset-0 border-2 border-transparent border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1,
              ease: "linear",
            }}
          />
        )}
      </motion.div>
    </>
  );
}
