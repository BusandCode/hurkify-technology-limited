"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  ClipboardCheck,
  Pause,
  Play,
  ScanLine,
  ShieldCheck,
} from "lucide-react";

const SLIDES = [
  {
    label: "The agency",
    title: "What does HEFAMAA stand for?",
    text: "The Health Facilities Monitoring and Accreditation Agency oversees public and private healthcare facilities in Lagos State.",
    detail: "A Lagos State healthcare regulator",
    icon: Building2,
  },
  {
    label: "Standards",
    title: "A foundation for quality care.",
    text: "HEFAMAA sets minimum operating standards for health facilities across the public and private sectors.",
    detail: "Standards that guide facility operations",
    icon: ShieldCheck,
  },
  {
    label: "Registration & licensing",
    title: "A recognised regulatory process.",
    text: "Its functions include registration, accreditation, and licensing of health facilities. Requirements depend on the facility and services provided.",
    detail: "Know the requirements for your facility",
    icon: ClipboardCheck,
  },
  {
    label: "Monitoring",
    title: "Oversight beyond registration.",
    text: "HEFAMAA inspects and monitors facilities, evaluating their performance against established standards.",
    detail: "Ongoing attention to healthcare standards",
    icon: ScanLine,
  },
];

export function HefamaaExplainer() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const visible = useInView(root, { amount: 0.35 });
  useEffect(() => {
    if (paused || interacting || reduced || !visible) return;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((v) => (v + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [paused, interacting, reduced, visible, index]);
  const slide = SLIDES[index];
  const Icon = slide.icon;
  function move(next: number) {
    setIndex((next + SLIDES.length) % SLIDES.length);
    setPaused(true);
  }

  return (
    <section
      ref={root}
      aria-label="Understanding HEFAMAA"
      aria-roledescription="carousel"
      className="bg-white py-16 sm:py-20"
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setInteracting(false);
      }}
    >
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        <div>
          <p className="eyebrow">Understanding HEFAMAA</p>
          <h2 className="section-title">
            Know the regulator.
            <br />
            <span className="text-primary">Prepare with confidence.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-mist-600">
            A short introduction to the agency and its role in healthcare
            facilities across Lagos State.
          </p>
          <p className="mt-6 max-w-md border-l-2 border-primary/25 pl-4 text-xs leading-relaxed text-mist-600">
            <strong className="text-secondary">
              Hurkify is an independent service provider.
            </strong>{" "}
            We are not HEFAMAA or a Lagos State Government agency. We do not
            issue regulatory certificates or guarantee approval.
          </p>
          <a
            href="https://hefamaa.lagosstate.gov.ng/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-primary"
          >
            Source: official HEFAMAA website{" "}
            <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>
        <div className="min-w-0 overflow-hidden rounded-2xl border border-primary/10 bg-linear-to-br from-primary/5 via-mist-50 to-white p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
              The role of HEFAMAA
            </p>
            <span className="text-xs tabular-nums text-mist-600">
              0{index + 1} / 0{SLIDES.length}
            </span>
          </div>
          <div className="grid" aria-live={paused ? "polite" : "off"}>
            {SLIDES.map((item) => (
              <div
                key={item.label}
                aria-hidden
                className="invisible col-start-1 row-start-1 pointer-events-none"
              >
                <div className="h-12" />
                <p className="mt-5 text-xs">{item.label}</p>
                <h3 className="mt-2 text-xl leading-snug sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed">{item.text}</p>
                <p className="mt-5 text-xs leading-relaxed">{item.detail}</p>
              </div>
            ))}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${SLIDES.length}: ${slide.label}`}
                className="col-start-1 row-start-1"
                initial={reduced ? false : { opacity: 0, x: 45 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, x: -45 }}
                transition={{
                  duration: reduced ? 0 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-white text-primary">
                  <Icon size={24} strokeWidth={1.5} aria-hidden />
                </div>
                <p className="mt-5 text-xs font-medium text-primary">
                  {slide.label}
                </p>
                <h3 className="mt-2 text-xl leading-snug text-secondary sm:text-2xl">
                  {slide.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-mist-600">
                  {slide.text}
                </p>
                <p className="mt-5 text-xs leading-relaxed text-primary">
                  {slide.detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-primary/10 pt-4">
            <div className="flex items-center" aria-label="Choose a slide">
              {SLIDES.map((item, i) => (
                <button
                  key={item.label}
                  aria-label={`Show ${item.label}`}
                  aria-pressed={index === i}
                  onClick={() => move(i)}
                  className="flex h-11 w-8 items-center justify-center"
                >
                  <span
                    className={`h-1.5 rounded-full transition-all motion-reduce:transition-none ${index === i ? "w-6 bg-primary" : "w-1.5 bg-primary/20"}`}
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => move(index - 1)}
                className="flex h-11 w-10 items-center justify-center text-primary"
              >
                <ArrowLeft size={17} aria-hidden />
              </button>
              {!reduced && (
                <button
                  type="button"
                  aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                  onClick={() => setPaused((v) => !v)}
                  className="flex h-11 w-10 items-center justify-center text-primary"
                >
                  {paused ? (
                    <Play size={15} aria-hidden />
                  ) : (
                    <Pause size={15} aria-hidden />
                  )}
                </button>
              )}
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => move(index + 1)}
                className="flex h-11 w-10 items-center justify-center text-primary"
              >
                <ArrowRight size={17} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
