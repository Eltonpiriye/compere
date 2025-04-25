"use client";

import BackgroundVideoPlayer from "@/components/background-video-player";
import MarqueeGroup from "@/components/marquee-group";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useHover } from "@/context/hover-context";
import { SERVICES } from "@/lib/consts";

export default function ServicesPage() {
  const { hoveredItem } = useHover();
  return (
    <div
      className={`flex flex-col items-start justify-between min-h-svh text-white bg-foreground/10`}
    >
      <BackgroundVideoPlayer />
      <MaxWidthWrapper>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-12 pb-8 pt-24 text-center md:text-left text-xl md:text-[32px] font-bold w-full">
          {SERVICES.map((item, index) => (
            <div key={index} className="flex flex-col gap-6">
              <h2 className="font-product-sans-bold uppercase">{item.name}</h2>
              <p className="">{item.description}</p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
      <div className="marquee">
        <MarqueeGroup />
      </div>
    </div>
  );
}
