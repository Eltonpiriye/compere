"use client";

import { useHover } from "@/context/hover-context";
import MarqueeGroup from "@/components/marquee-group";
import BackgroundVideoPlayer from "@/components/background-video-player";

export default function Home() {
  const { hoveredItem } = useHover();

  return (
    <div
      className={`flex flex-col items-start justify-between h-svh font-[family-name:var(--font-product-sans)] relative transition-colors duration-300 ${
        hoveredItem ? "text-white" : ""
      }`}
    >
      <BackgroundVideoPlayer />
      <div className="px-12 pb-8 pt-24 text-[32px] font-bold w-full sm:max-w-[500px]">
        HI! MY NAME IS ELTONPIRIYE, POPULARLY KNOWN AS THE HOST WITH THE MOST.
      </div>
      <div className="marquee">
        <MarqueeGroup />
      </div>
    </div>
  );
}
