import MaxWidthWrapper from "@/components/max-width-wrapper";
import { UserCircle } from "lucide-react";

export default function TestimonialsPage() {
  return (
    <MaxWidthWrapper>
      <div className="grid min-h-svh pt-24 py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((item, index) => (
          <div
            key={index}
            className="aspect-video bg-foreground text-background p-8 grid gap-1"
          >
            <div className="flex gap-3">
              <UserCircle className="h-12 w-12" />
              <div className="grid">
                <div className="">Eric L. Barnes</div>
                <div className="">Owner of Laravel News</div>
              </div>
            </div>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat."
            </p>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
