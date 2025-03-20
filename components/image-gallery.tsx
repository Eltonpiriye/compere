"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";

// Define row spans for each image
const rowSpans = [3, 2, 3, 2, 3, 2, 3, 3];

interface ImageGalleryProps {
  scrollProgress: MotionValue<number>;
  images: { src: string; alt: string }[];
}

export default function ImageGallery({
  scrollProgress,
  images,
}: ImageGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Transform scroll progress into horizontal movement for the gallery
  // const galleryX = useTransform(scrollProgress, [0, 1], [0, -1000]);

  // Transform scroll progress into blur amount (0px to 12px)
  const blurAmount = useTransform(
    scrollProgress,
    [0, 0.2, 0.4, 0.7, 1],
    [0, 1, 4, 8, 16]
  );

  // Transform scroll progress into background opacity
  const bgOpacity = useTransform(
    scrollProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.5, 0.7, 0.8]
  );

  return (
    <div className="relative">
      <motion.div
        className="py-12"
        ref={containerRef}
        style={{
          backdropFilter: useTransform(
            blurAmount,
            (value) => `blur(${value}px)`
          ),
          WebkitBackdropFilter: useTransform(
            blurAmount,
            (value) => `blur(${value}px)`
          ),
          // backgroundColor: useTransform(
          //   bgOpacity,
          //   (value) => `rgba(255, 255, 255, ${value})`
          // ),
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-5 gap-4 h-[300svh] lg:h-svh lg:w-[2000px] px-10">
          {images.map((image, index) => {
            const rowSpanClass =
              rowSpans[index] === 3 ? "md:row-span-3" : "md:row-span-2";

            return (
              <motion.div
                key={index}
                className={`relative ${rowSpanClass}`}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover h-full w-full"
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
