"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useHover } from "@/context/hover-context";
import { EVENT_LIST } from "@/lib/consts";
import { motion } from "framer-motion";

export default function BackgroundVideoPlayer() {
  const { hoveredItem, visibleItem } = useHover();
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
  const [nextImageSrc, setNextImageSrc] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const activeItem = hoveredItem || visibleItem;

  // Handle image transitions when the active item changes
  useEffect(() => {
    if (!activeItem) {
      // If no active item, keep the current image but stop video
      setVideoSrc(null);
      return;
    }

    const item = EVENT_LIST.find((item) => item.eventName === activeItem);
    if (item) {
      // If hovering, prioritize video
      if (hoveredItem) {
        setVideoSrc(item.mainVideo);
      } else {
        setVideoSrc(null);
      }

      // For image transitions
      if (currentImageSrc !== item.mainImage) {
        setIsTransitioning(true);
        setNextImageSrc(item.mainImage);

        // After a short delay, complete the transition
        const timer = setTimeout(() => {
          setCurrentImageSrc(item.mainImage);
          setNextImageSrc(null);
          setIsTransitioning(false);
        }, 500); // 500ms transition time

        return () => clearTimeout(timer);
      }
    }
  }, [activeItem, hoveredItem, currentImageSrc]);

  // Handle video loading and playing
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoSrc) {
        videoElement.src = videoSrc;
        videoElement.load();
        videoElement.play().catch((e) => {
          console.error("Video play failed:", e);
          setIsVideoLoaded(false);
        });

        videoElement.onloadeddata = () => {
          setIsVideoLoaded(true);
        };
      } else {
        videoElement.pause();
        videoElement.src = "";
        setIsVideoLoaded(false);
      }
    }
  }, [videoSrc]);

  // If no content to display, return null
  if (!videoSrc && !currentImageSrc && !nextImageSrc) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-[-1] bg-foreground">
      {/* Current Image */}
      {currentImageSrc && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: isTransitioning ? 0 : 1,
            transition: { duration: 0.3 },
          }}
          className="absolute inset-0"
        >
          <Image
            src={currentImageSrc || "/placeholder.svg"}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      )}

      {/* Next Image (for transition) */}
      {nextImageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          // animate={{
          //   opacity: isTransitioning ? 1 : 0,
          //   transition: { duration: 0.3 },
          // }}
          className="absolute inset-0"
        >
          <Image
            src={nextImageSrc || "/placeholder.svg"}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
