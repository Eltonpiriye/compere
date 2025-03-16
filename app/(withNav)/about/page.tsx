"use client";

import { useHover } from "@/context/hover-context";
import MarqueeGroup from "@/components/marquee-group";
import BackgroundVideoPlayer from "@/components/background-video-player";

export default function AboutPage() {
  const { hoveredItem } = useHover();

  return (
    <div
      className={`flex flex-col items-start justify-between min-h-svh ${
        hoveredItem ? "text-white" : ""
      }`}
    >
      <BackgroundVideoPlayer />
      <div className="px-4 md:px-12 pb-8 pt-24 text-[32px] font-bold w-full ">
        <p className="">
          I’M YOUR GO-TO COMPERE FOR TECH EVENTS AND CONFERENCES - ENERGIZING
          THE CROWD, CREATING A WELCOMING ATMOSPHERE AND TRANSFORMING ORDINARY
          GATHERINGS INTO UNFORGETTABLE EXPERIENCES.
        </p>
        <p>
          MY DEEP PASSION IS CREATING DEEPLY MEMORABLE MOMENTS THAT MEANINGFULLY
          BRING PEOPLE TOGETHER AND THIS HOLDS TRUE WHETHER I COMMAND A MASSIVE
          STAGE OR LEAD A VIRTUAL EVENT.
        </p>
      </div>
      <div className="marquee">
        <MarqueeGroup />
      </div>
    </div>
  );
}
