import MarqueeGroup from "@/components/marquee-group";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div
      className={`flex flex-col items-start justify-between min-h-svh text-white`}
    >
      {/* <BackgroundVideoPlayer /> */}
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full h-full pt-32">
          {/* Left Column: Contact Information */}
          <div className="flex flex-col justify-center space-y-8 md:space-y-12 px-4 md:px-0">
            {/* Email */}
            <div className="grid">
              <div className="bg-blue-600 p-3 mb-1 h-12 w-12 mr-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold uppercase text-gray-800 mb-1">
                  Email
                </p>
                <a
                  href="mailto:eltonoshodipe@gmail.com"
                  className="text-2xl text-gray-700 hover:underline"
                >
                  eltonoshodipe@gmail.com
                </a>
              </div>
            </div>

            {/* Phone Number */}
            <div className="grid">
              <div className="bg-blue-600 p-3 mb-1 h-12 w-12 mr-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold uppercase text-gray-800 mb-1">
                  Phone Number
                </p>
                <a
                  href="tel:+2348034735029"
                  className="text-2xl text-gray-700 hover:underline"
                >
                  +2348034735029
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="grid">
              <div className="bg-blue-600 p-3 mb-1 h-12 w-12 mr-4">
                <Linkedin className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold uppercase text-gray-800 mb-1">
                  LinkedIn
                </p>
                <a
                  href="https://www.linkedin.com/in/elton-oshodipe-84064116"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-700 hover:underline break-all"
                >
                  https://www.linkedin.com/in/elton-oshodipe-84064116
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative h-[350px] lg:h-[500px] w-full rounded-lg overflow-hidden">
            <Image
              src="/images/elton.png"
              alt="Elton Piriye"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="marquee">
        <MarqueeGroup isBlack />
      </div>
    </div>
  );
}
