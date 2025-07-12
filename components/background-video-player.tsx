"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useHover } from "@/context/hover-context";
import { EVENT_LIST } from "@/lib/consts";
import { motion } from "framer-motion";

export default function BackgroundVideoPlayer() {
  const { hoveredItem, visibleItem } = useHover()
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null)
  const [nextImageSrc, setNextImageSrc] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null) // Ref for the main video
  const backgroundVideoRef = useRef<HTMLVideoElement>(null) // Ref for the blurred background video
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const activeItem = hoveredItem || visibleItem

  // Handle image/video source changes based on active item
  useEffect(() => {
    if (!activeItem) {
      // If no active item, clear all media
      setVideoSrc(null)
      setCurrentImageSrc(null)
      setNextImageSrc(null)
      setIsTransitioning(false)
      return
    }

    const item = EVENT_LIST.find((item) => item.eventName === activeItem)

    if (item) {
      // Prioritize video if hovered, otherwise use image
      if (hoveredItem && item.mainVideo) {
        setVideoSrc(item.mainVideo)
        // When video is active, ensure images are cleared
        setCurrentImageSrc(null)
        setNextImageSrc(null)
        setIsTransitioning(false)
      } else {
        setVideoSrc(null) // Stop video if not hovered or no video available
        // Handle image transitions
        if (currentImageSrc !== item.mainImage) {
          setIsTransitioning(true)
          setNextImageSrc(item.mainImage)
          // After a short delay, complete the transition
          const timer = setTimeout(() => {
            setCurrentImageSrc(item.mainImage)
            setNextImageSrc(null)
            setIsTransitioning(false)
          }, 500) // 500ms transition time
          return () => clearTimeout(timer)
        }
      }
    }
  }, [activeItem, hoveredItem, currentImageSrc])

  // Handle video loading and playing for both main and background videos
  useEffect(() => {
    const mainVideoElement = videoRef.current
    const bgVideoElement = backgroundVideoRef.current

    if (mainVideoElement && bgVideoElement) {
      if (videoSrc) {
        // Set sources for both videos
        mainVideoElement.src = videoSrc
        bgVideoElement.src = videoSrc

        // Load and play both videos
        mainVideoElement.load()
        bgVideoElement.load()

        mainVideoElement.play().catch((e) => {
          console.error("Main video play failed:", e)
          setIsVideoLoaded(false)
        })
        bgVideoElement.play().catch((e) => {
          console.error("Background video play failed:", e)
        })

        // Set loaded state for main video
        mainVideoElement.onloadeddata = () => {
          setIsVideoLoaded(true)
        }
      } else {
        // Pause and clear sources if no videoSrc
        mainVideoElement.pause()
        bgVideoElement.pause()
        mainVideoElement.src = ""
        bgVideoElement.src = ""
        setIsVideoLoaded(false)
      }
    }
  }, [videoSrc])

  // If no content to display, return null
  if (!videoSrc && !currentImageSrc && !nextImageSrc) return null

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-[-1] bg-black">
      {/* Blurred background video (only renders if videoSrc is available) */}
      {videoSrc && (
        <video
          ref={backgroundVideoRef}
          className="absolute inset-0 w-full h-full object-cover filter blur-xl scale-110"
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
        />
      )}

      {/* Main video (only renders if videoSrc is available) */}
      {videoSrc && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
            isVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
        />
      )}

      {/* Current Image (renders if no videoSrc and currentImageSrc is available) */}
      {!videoSrc && currentImageSrc && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: isTransitioning ? 0 : 1,
            transition: { duration: 0.3 },
          }}
          className="absolute inset-0"
        >
          <Image src={currentImageSrc || "/placeholder.svg"} alt="Background" fill className="object-cover" priority />
        </motion.div>
      )}

      {/* Next Image (for transition, renders if no videoSrc and nextImageSrc is available) */}
      {!videoSrc && nextImageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isTransitioning ? 1 : 0,
            transition: { duration: 0.3 },
          }}
          className="absolute inset-0"
        >
          <Image src={nextImageSrc || "/placeholder.svg"} alt="Background" fill className="object-cover" priority />
        </motion.div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}
