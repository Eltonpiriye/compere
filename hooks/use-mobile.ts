"use client";

import { useState, useEffect } from "react";

/**
 * A hook that detects if the current device is a mobile device
 * based on screen width and user agent
 *
 * @returns {boolean} True if the current device is a mobile device
 */
export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check function
    const checkMobile = () => {
      // Check if window is defined (client-side)
      if (typeof window === "undefined") return false;

      // Check screen width (consider devices under 768px as mobile)
      const mobileByWidth = window.innerWidth < 768;

      // Check user agent for mobile devices
      const mobileByUserAgent =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      // Consider it mobile if either condition is true
      setIsMobile(mobileByWidth || mobileByUserAgent);
    };

    // Run the check immediately
    checkMobile();

    // Set up event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
}
