import MarqueeGroup from "@/components/marquee-group";
import BackgroundVideoPlayer from "@/components/background-video-player";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import AnimatedButtons from "@/components/animated-buttons";

export default function Home() {
  return (
    <div
      className={`flex flex-col items-start justify-between min-h-svh text-white bg-foreground/10`}
    >
      <BackgroundVideoPlayer />
      <MaxWidthWrapper>
        <div className="grid gap-6 px-4 md:px-12 pb-8 pt-24 text-2xl md:text-[32px] font-bold w-full md:max-w-[500px] text-center md:text-left">
          <div className="text-left">
            Hi! My name is <span className="font-bold">ELTONPIRIYE</span>,
            popularly known as <br />
            &ldquo;HOST WITH THE MOST&rdquo; 😁.
          </div>
          <AnimatedButtons />
        </div>
      </MaxWidthWrapper>
      <div className="marquee">
        <MarqueeGroup />
      </div>
    </div>
  );
}
