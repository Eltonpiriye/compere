"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";

const galleryImages = [
  {
    src: "/images/arm/1.jpg",
    alt: "Speaker at ARM LABS event",
  },
  {
    src: "/images/arm/2.jpg",
    alt: "Group celebration at Demo Day",
  },
  {
    src: "/images/arm/3.jpg",
    alt: "Team members at ARM LABS",
  },
  {
    src: "/images/arm/4.jpg",
    alt: "Audience at Demo Day",
  },
  {
    src: "/images/arm/main.jpg",
    alt: "Audience at Demo Day",
  },
  {
    src: "/images/arm/5.jpg",
    alt: "Audience at Demo Day",
  },
  {
    src: "/images/arm/6.jpg",
    alt: "Audience at Demo Day",
  },
  {
    src: "/images/arm/7.jpg",
    alt: "Audience at Demo Day",
  },
];

// Define row spans for each image
const rowSpans = [3, 2, 3, 2, 3, 2, 3, 3];

interface ImageGalleryProps {
  scrollProgress: MotionValue<number>;
}

export default function ImageGallery({ scrollProgress }: ImageGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Transform scroll progress into horizontal movement for the gallery
  const galleryX = useTransform(scrollProgress, [0, 100], [0, -100]);

  return (
    <motion.div
      className="py-12"
      ref={containerRef}
      style={{ x: galleryX }} // Apply the horizontal movement
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-5 gap-4 h-svh w-[2000px]">
        {galleryImages.map((image, index) => {
          const rowSpanClass =
            rowSpans[index] === 3 ? "row-span-3" : "row-span-2";

          return (
            <motion.div
              key={index}
              className={`relative ${rowSpanClass}`}
              style={{ x: galleryX }}
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
                className="object-cover"
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
