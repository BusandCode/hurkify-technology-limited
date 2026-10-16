import {
  ArrowDown,
  ArrowUpRight,
  Check,
  HeartPulse,
  Workflow,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { InteractiveVisual } from "@/components/interactive-visual";
import {
  BrandBillboard,
  BillboardPicture,
  BillboardProvider,
} from "@/components/brand-billboard";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-mist-50 pb-16 pt-32 sm:pb-24 sm:pt-40"
    >
      <div
        aria-hidden
        className="hero-ambient absolute -right-40 -top-40 h-[650px] w-[650px] rounded-full bg-primary/10 blur-3xl"
      />
      <BillboardProvider>
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:px-10">
          <div>
            <p className="eyebrow">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Technology that works for you
            </p>
            <BrandBillboard />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist-600 sm:text-lg">
              Practical software and IT solutions for Nigerian businesses. We
              build websites, custom applications, and business systems, with
              specialist support for healthcare technology and compliance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "nav-cta bg-primary text-white hover:bg-secondary",
                )}
              >
                Discuss your project
                <ArrowUpRight size={18} />
              </a>
              <a
                href="#projects"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                View our work
                <ArrowDown size={17} />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-mist-600">
              {["Based in Lagos, Nigeria", "Direct access to our team"].map(
                (text) => (
                  <span key={text} className="flex items-center gap-2">
                    <Check size={14} className="text-primary" />
                    {text}
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl pb-6 pt-4">
            <div aria-hidden className="hero-orbit" />
            <InteractiveVisual>
              <BillboardPicture />
              <div
                className="hero-floating-tag hero-floating-tag-top"
                aria-hidden="true"
              >
                <Workflow size={17} className="text-primary" />
                <span>Smarter workflows</span>
              </div>
              <div
                className="hero-floating-tag hero-floating-tag-bottom"
                aria-hidden="true"
              >
                <HeartPulse size={17} className="text-primary" />
                <span>Connected healthcare</span>
              </div>
            </InteractiveVisual>
            <div className="hero-cube-wrap" aria-hidden="true">
              <div className="hero-cube">
                {["front", "back", "right", "left", "top", "bottom"].map(
                  (face) => (
                    <span
                      key={face}
                      className={`hero-cube-face hero-cube-${face}`}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </BillboardProvider>
    </section>
  );
}
