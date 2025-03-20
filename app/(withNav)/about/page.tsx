"use client";

import { useHover } from "@/context/hover-context";
import MarqueeGroup from "@/components/marquee-group";
import BackgroundVideoPlayer from "@/components/background-video-player";
import AnimatedButtons from "@/components/animated-buttons";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function AboutPage() {
  const { hoveredItem } = useHover();

  return (
    <div
      className={`flex flex-col items-start justify-between min-h-svh text-white bg-foreground/10`}
    >
      <BackgroundVideoPlayer />
      <MaxWidthWrapper>
        <div className="grid gap-6 px-4 md:px-12 pb-8 pt-24 text-center md:text-left text-xl md:text-[32px] font-bold w-full">
          <p className="">
            I’m your go-to compere for tech events and conferences – energizing
            the crowd, creating a welcoming atmosphere, and transforming
            ordinary gatherings into unforgettable experiences.
          </p>
          <p>
            My deep passion is creating deeply memorable moments that
            meaningfully bring people together, and this holds true whether I
            command a massive stage or lead a virtual event.
          </p>
          <div className="max-w-[400px]">
            <AnimatedButtons />
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="marquee">
        <MarqueeGroup />
      </div>
    </div>
  );
}
