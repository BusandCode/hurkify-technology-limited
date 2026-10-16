"use client";

import { useEffect, useRef } from "react";

export function CountUp({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const number = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = number.current;
    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1800, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = `${Math.round(value * eased)}${suffix}`;
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, suffix]);

  return (
    <>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span ref={number} aria-hidden className="tabular-nums">
        {value}
        {suffix}
      </span>
    </>
  );
}
