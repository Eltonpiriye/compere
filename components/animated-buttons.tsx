"use client";

import { useHover } from "@/context/hover-context";
import { EVENT_LIST } from "@/lib/consts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AnimatedEventText from "./animated-event-text";
import { useMobile } from "@/hooks/use-mobile";

export default function AnimatedButtons() {
  const { hoveredItem, visibleItem } = useHover();
  const activeItem = hoveredItem || visibleItem;
  const isMobile = useMobile();

  const [currentEvent, setCurrentEvent] = useState<{
    href: string;
    eventName: string;
  } | null>(null);

  const [isChanging, setIsChanging] = useState(false);

  // Update current event when active item changes
  useEffect(() => {
    if (!activeItem) return;

    const event = EVENT_LIST.find((event) => event.eventName === activeItem);
    if (event && event.eventName !== currentEvent?.eventName) {
      setIsChanging(true);

      // Short delay before changing the event to allow for animation
      const timer = setTimeout(() => {
        setCurrentEvent(event);
        setIsChanging(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [activeItem, currentEvent]);

  return (
    <div
      className={`flex text-lg px-4 ${
        isMobile
          ? "bottom-4 right-4 flex-col gap-2"
          : "bottom-8 right-8 flex-col gap-2 md:gap-3"
      }`}
    >
      {/* Contact Us Button - Attention-grabbing with pulse effect */}
      <motion.div
        className="relative"
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut",
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-50 animate-pulse"></div>

        <Link
          href="/contact"
          className={`relative flex items-center justify-center ${
            isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"
          } font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors duration-300`}
        >
          <span className="mr-2">CONTACT US</span>
          <ArrowUpRight size={isMobile ? 14 : 18} />
        </Link>
      </motion.div>

      {/* View Event Button - Dynamic based on current event */}
      {currentEvent && (
        <div className="relative overflow-hidden rounded-full">
          <Link
            href={currentEvent.href}
            className={`flex items-center justify-center ${
              isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"
            } font-bold text-white bg-black/80 backdrop-blur-sm rounded-full hover:bg-black transition-colors duration-300 border border-white/20`}
          >
            <span className="mr-2 flex">
              <span className="mr-1">VIEW</span>
              <AnimatedEventText
                text={currentEvent.eventName}
                isChanging={isChanging}
              />
            </span>
            <ArrowUpRight size={isMobile ? 14 : 18} />
          </Link>
        </div>
      )}
    </div>
  );
}
