"use client";

import { useHover } from "@/context/hover-context";
import MarqueeGroup from "@/components/marquee-group";
import BackgroundVideoPlayer from "@/components/background-video-player";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function Home() {
  const { hoveredItem } = useHover();

  return (
    <div
      className={`flex flex-col items-start justify-between min-h-svh ${
        hoveredItem ? "text-white" : ""
      }`}
    >
      <BackgroundVideoPlayer />
      <MaxWidthWrapper>
        <div className="px-4 md:px-12 pb-8 pt-24 text-2xl md:text-[32px] font-bold w-full sm:max-w-[500px]">
          HI! MY NAME IS ELTONPIRIYE, POPULARLY KNOWN AS THE HOST WITH THE MOST.
        </div>
      </MaxWidthWrapper>
      <div className="marquee">
        <MarqueeGroup />
      </div>
    </div>
  );
}
