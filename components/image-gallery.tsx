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
  const galleryX = useTransform(scrollProgress, [0, 100], [0, -100]);

  return (
    <motion.div
      className="py-12"
      ref={containerRef}
      style={{ x: galleryX }} // Apply the horizontal movement
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-5 gap-4 h-[300svh] md:h-svh md:w-[2000px] px-10">
        {images.map((image, index) => {
          const rowSpanClass =
            rowSpans[index] === 3 ? "md:row-span-3" : "md:row-span-2";

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
                className="object-cover h-full w-full"
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
