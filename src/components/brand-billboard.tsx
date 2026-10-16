"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Code2, Pause, Play } from "lucide-react";
import {
  BILLBOARD_SLIDES,
  BILLBOARD_INTERVAL_MS,
} from "@/lib/billboard-slides";

const MESSAGES = BILLBOARD_SLIDES.map((slide) => slide.headline);
const BillboardContext = createContext<{
  index: number;
  setIndex: (next: number) => void;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  markReady: (index: number) => void;
} | null>(null);

export function BillboardProvider({ children }: { children: ReactNode }) {
  const [index, commitIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ready = useRef(new Set<number>([0]));
  const pending = useRef<number | null>(null);
  const setIndex = useCallback((next: number) => {
    pending.current = null;
    if (ready.current.has(next)) commitIndex(next);
    else pending.current = next;
  }, []);
  const markReady = useCallback((next: number) => {
    ready.current.add(next);
    if (pending.current === next) {
      pending.current = null;
      commitIndex(next);
    }
  }, []);
  return (
    <BillboardContext.Provider
      value={{ index, setIndex, paused, setPaused, markReady }}
    >
      {children}
    </BillboardContext.Provider>
  );
}

function useBillboard() {
  const context = useContext(BillboardContext);
  if (!context)
    throw new Error("Billboard components require a shared BillboardProvider.");
  return context;
}

export function BillboardPicture() {
  const { index, markReady } = useBillboard();
  const reducedMotion = useReducedMotion();
  const slide = BILLBOARD_SLIDES[index];
  const sizes = "(min-width: 1024px) 45vw, 100vw";
  return (
    <figure className="hero-photo-frame relative overflow-hidden rounded-[28px] border-[6px] border-white bg-white shadow-2xl shadow-primary/15">
      <div className="relative aspect-[5/4] bg-mist-100">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0"
        >
          {BILLBOARD_SLIDES.slice(1).map((item, i) => (
            <Image
              key={item.image}
              src={item.image}
              alt=""
              fill
              sizes={sizes}
              loading="eager"
              fetchPriority="low"
              onLoad={() => markReady(i + 1)}
              className="object-cover"
            />
          ))}
        </div>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={reducedMotion ? false : { y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { y: -24, opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              preload={index === 0}
              sizes={sizes}
              onLoad={() => markReady(index)}
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-secondary/80 via-transparent to-transparent"
            />
            <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 text-white">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/15 backdrop-blur">
                <Code2 size={22} />
              </span>
              <p className="font-display text-lg font-bold leading-snug">
                {slide.caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <figcaption className="px-4 py-2 text-[10px] text-mist-600">
        Illustrative workspace visual
      </figcaption>
    </figure>
  );
}

export function BrandBillboard() {
  const { index, setIndex, paused, setPaused } = useBillboard();
  const reducedMotion = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const visible = useInView(container, { amount: 0.4 });

  useEffect(() => {
    if (paused || reducedMotion || !visible) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      const candidate = Math.floor(Math.random() * (MESSAGES.length - 1));
      setIndex(candidate >= index ? candidate + 1 : candidate);
    }, BILLBOARD_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, visible, index, setIndex]);

  return (
    <div ref={container}>
      <h1
        id="brand-billboard-heading"
        aria-live="off"
        className="billboard-heading mt-8 grid max-w-3xl overflow-hidden text-4xl font-extrabold leading-[1.12] tracking-tight text-secondary sm:text-5xl lg:text-[64px]"
      >
        {MESSAGES.map(([first, second]) => (
          <span
            key={first}
            aria-hidden="true"
            className="invisible col-start-1 row-start-1 block select-none text-balance pb-2"
          >
            {first}
            <span className="block">{second}</span>
          </span>
        ))}
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={index}
            className="col-start-1 row-start-1 block self-end text-balance pb-2"
            initial={
              reducedMotion
                ? false
                : { y: "35%", opacity: 0, filter: "blur(4px)" }
            }
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { y: "-30%", opacity: 0, filter: "blur(3px)" }
            }
            transition={{
              duration: reducedMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {MESSAGES[index][0]}
            <span className="hero-gradient-text block">
              {MESSAGES[index][1]}
            </span>
          </motion.span>
        </AnimatePresence>
      </h1>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <div
          role="group"
          aria-label="Choose a Hurkify brand message"
          className="flex items-center"
        >
          {MESSAGES.map(([first, second], i) => (
            <button
              key={first}
              type="button"
              aria-label={`Show message ${i + 1}: ${first} ${second}`}
              aria-pressed={i === index}
              aria-controls="brand-billboard-heading"
              onClick={() => {
                setIndex(i);
              }}
              className="flex h-10 w-8 items-center justify-center rounded-lg hover:bg-primary/5"
            >
              <span
                aria-hidden
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-primary" : "w-1.5 bg-primary/25"}`}
              />
            </button>
          ))}
        </div>
        <span aria-hidden className="h-4 w-px bg-mist-200" />
        <button
          type="button"
          onClick={() => {
            setPaused(!paused);
          }}
          aria-label={
            paused
              ? "Resume automatic brand messages"
              : "Pause automatic brand messages"
          }
          className="billboard-motion-toggle inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-[11px] font-medium text-mist-600 hover:bg-primary/5 hover:text-primary"
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
          {paused ? "Play ideas" : "Pause ideas"}
        </button>
      </div>
    </div>
  );
}
