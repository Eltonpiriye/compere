"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useHover } from "@/context/hover-context";
import { EVENT_LIST } from "@/lib/consts";

export default function BackgroundVideoPlayer() {
  const { hoveredItem } = useHover();
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (!hoveredItem) {
      setVideoSrc(null);
      setImageSrc(null);
      return;
    }

    const item = EVENT_LIST.find((item) => item.eventName === hoveredItem);
    if (item) {
      setVideoSrc(item.mainVideo);
      setImageSrc(item.mainImage);
    }
  }, [hoveredItem]);

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

  if (!videoSrc && !imageSrc) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-[-1]">
      {/* Fallback Image */}
      {imageSrc && !isVideoLoaded && (
        <Image
          src={imageSrc}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
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
