"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageGallery from "@/components/image-gallery";
import { useParams } from "next/navigation";
import MarqueeGroupNoAnimation from "@/components/marquee-group-no-animaition";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function SingleEventPageFromCms() {
  const params = useParams();
  const slug = params.slug;
  console.log(slug);
  const mainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Specific scroll progress for the oversized text
  const { scrollYProgress: textScrollProgress } = useScroll({
    target: textRef,
    offset: ["start center", "end start"],
  });

  // Specific scroll progress for the gallery
  const { scrollYProgress: galleryScrollProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress into animation values
  const textX = useTransform(galleryScrollProgress, [0, 1], [0, -3000]);
  const textOpacity = useTransform(
    textScrollProgress,
    [0, 0.2, 0.8, 1],
    [1, 1, 0.7, 0.5]
  );

  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section with Play Button */}
      <section className="relative w-svw overflow-clip h-svh">
        <Image
          src="/images/arm/main.jpg"
          alt="ARM LABS Event"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center flex-col">
          <motion.h1
            className="text-white text-7xl font-bold mb-4 font-tusker-grotesk tracking-wider video-player"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Play
          </motion.h1>
        </div>
      </section>
      <div className="marquee">
        <MarqueeGroupNoAnimation />
      </div>

      {/* Main content container */}
      <MaxWidthWrapper>
        <div className="relative" ref={mainRef}>
          {/* Oversized ARM LABS text that becomes sticky */}
          <div className=" overflow-clip sticky top-10 " ref={textRef}>
            <motion.div
              className="px-8 flex items-center whitespace-nowrap "
              style={{
                x: textX,
                opacity: textOpacity,
              }}
            >
              <Image
                src={"/images/arm/techstars-logo.png"}
                alt="Techstars Logo"
                width={400}
                height={150}
                className="object-contain"
              />
              <h1 className="font-tusker-grotesk-bold text-[300px] font-black whitespace-nowrap">
                ARM LABS - TECHSTARS
              </h1>
            </motion.div>
            <p className="px-4 md:px-12 pb-8 md:text-[32px] font-bold">
              I WAS THE COMPERE FOR AN EXCLUSIVE GATHERING OF OVER 100 TOP
              INVESTORS AND MENTORS, AND 150+ AMBITIOUS FOUNDERS FROM ACROSS
              AFRICA. THE DEMO DAY HIGHLIGHTED 12 STARTUPS WITH EMERGING
              SOLUTIONS IN FINTECH, HEALTH-TECH, B2B SaaS AND MORE - CAPPING OFF
              A 13-WEEK ACCELERATOR GEARED TOWARS FUELING THE CONTINENTS NEXT
              WAVE OF INNOVATION.
            </p>
          </div>

          {/* Description Text */}
          <motion.div
            className="px-8 py-12 max-w-4xl relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          ></motion.div>

          {/* Image Gallery that scrolls over the text */}
          <div ref={galleryRef} className="relative z-50">
            <ImageGallery scrollProgress={galleryScrollProgress} />
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Final Marquee */}
      <div className="marquee">
        <MarqueeGroupNoAnimation />
      </div>
    </div>
  );
}
