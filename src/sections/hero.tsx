"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowRight, ShieldCheck, Stethoscope, Cpu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "HEFAMAA-aligned compliance" },
  { icon: Stethoscope, label: "Healthcare-grade EMR" },
  { icon: Cpu, label: "Enterprise IT delivery" },
];

// PLACEHOLDER SLOTS — drop real photos into /public/hero/ with these
// exact filenames. Per brief: Black Nigerian professionals, Lagos
// corporate aesthetic, modern African tech environment. No stock photo
// substitute is wired in here since it can't be verified against that
// requirement — see the note in the chat reply for details.
const SLIDES = [
  { src: "/hero/slide-1.png", alt: "Hurkify team at work in a Lagos office" },
  { src: "/hero/slide-2.png", alt: "Hurkify engineers reviewing a system" },
  { src: "/hero/slide-3.png", alt: "Hurkify team in a client meeting" },
];

const SWIPE_THRESHOLD = 60;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function goTo(next: number) {
    if (next === index) return;
    setDirection(next > index ? 1 : -1);
    setIndex((next + SLIDES.length) % SLIDES.length);
  }

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    if (info.offset.x <= -SWIPE_THRESHOLD) {
      goTo(index + 1);
    } else if (info.offset.x >= SWIPE_THRESHOLD) {
      goTo(index - 1);
    }
  }

  // Auto-advance the background slide every 5s.
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] scroll-mt-20 items-center bg-primary pb-16 pt-24 sm:pb-20 sm:pt-28 lg:min-h-screen"
    >
      {/* Swipeable background image carousel — overflow-hidden lives HERE,
          scoped to just this layer, so it clips the drag/slide animation
          without ever clipping (and scroll-locking) the text content below
          on mobile. Putting overflow-hidden on the section itself is what
          was cutting content off and killing scroll on phones. */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            // Lets the browser take over the gesture the moment it reads as
            // vertical, so mobile scrolling never gets stuck behind the
            // horizontal swipe carousel.
            dragDirectionLock
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          >
            <Image
              src={SLIDES[index].src}
              alt={SLIDES[index].alt}
              fill
              priority={index === 0}
              className="pointer-events-none object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay: solid on mobile/tablet (text spans full width, stacked
            layout), fading gradient only once the two-column layout kicks
            in at lg, where the mockup can safely sit over a lighter area */}
        <div className="absolute inset-0 bg-primary/80 lg:bg-gradient-to-r lg:from-primary lg:via-primary/85 lg:to-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
      </div>

      {/* Faint static grid, sits above the photo/overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium tracking-wide text-white/70 sm:text-xs">
            IT Consulting &amp; Healthcare Technology
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:mt-6 sm:text-5xl sm:leading-[1.08] lg:text-6xl">
            Systems that hold up when
            <span className="text-white/90"> healthcare and compliance</span>{" "}
            can&rsquo;t afford to fail.
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/65 sm:mt-6 sm:text-base lg:text-lg">
            Hurkify builds and supports the software backbone for Nigerian
            businesses and healthcare providers — from HEFAMAA registration
            and EMR systems to cloud infrastructure and custom software.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <Link
              href="#contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group w-full sm:w-auto"
              )}
            >
              Talk to our team
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="#services"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-auto"
              )}
            >
              Explore services
            </Link>
          </div>

          <div className="mt-10 flex flex-col lg:flex-row items-center lg:items-start lg:flex-nowrap gap-3 overflow-x-auto pb-1 sm:mt-12 scrollbar-none [&::-webkit-scrollbar]:hidden">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex shrink-0 items-center justify-center text-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm"
              >
                <Icon size={15} className="shrink-0 text-white" />
                <span className="whitespace-nowrap text-xs font-semibold text-white text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-2xl border border-mist-200 bg-white p-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-1.5 border-b border-mist-200 px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-mist-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-mist-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-mist-200" />
              <span className="ml-3 truncate text-[11px] text-mist-400">
                compliance.hurkify.app
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 sm:gap-3 sm:p-4">
              <div className="col-span-2 rounded-xl bg-gradient-to-br from-primary to-secondary p-3.5 sm:p-4">
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/50 sm:text-[11px]">
                  HEFAMAA Renewal Status
                </p>
                <p className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Compliant
                </p>
                <div className="mt-4 h-1.5 w-full rounded-full bg-white/10">
                  <div className="h-1.5 w-4/5 rounded-full bg-white/50" />
                </div>
                <p className="mt-2 text-[10px] text-white/40 sm:text-[11px]">
                  Next renewal in 84 days
                </p>
              </div>

              <div className="col-span-2 rounded-xl bg-mist-50 p-3.5 sm:col-span-1 sm:p-4">
                <p className="text-[10px] font-medium uppercase tracking-wider text-mist-600 sm:text-[11px]">
                  Facilities
                </p>
                <p className="mt-2 text-xl font-bold text-secondary sm:text-2xl">
                  12
                </p>
                <p className="mt-1 text-[10px] text-emerald-600 sm:text-[11px]">
                  +2 this quarter
                </p>
              </div>

              <div className="col-span-2 rounded-xl bg-mist-50 p-3.5 sm:col-span-3 sm:p-4">
                <p className="text-[10px] font-medium uppercase tracking-wider text-mist-600 sm:text-[11px]">
                  EMR Uptime
                </p>
                <div className="mt-3 flex items-end gap-1 sm:gap-1.5">
                  {[40, 55, 48, 70, 62, 80, 74, 90, 85, 96].map((h, i) => (
                    <div
                      key={i}
                      className="w-full rounded-sm bg-primary/30"
                      style={{ height: `${h * 0.32}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* floating badge — desktop only, no room for it on mobile */}
          <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-xl border border-white/10 bg-secondary/90 px-4 py-3 shadow-lg backdrop-blur sm:flex">
            <ShieldCheck size={18} className="text-white/70" />
            <span className="text-xs font-semibold text-white">
              Audit-ready, always
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}