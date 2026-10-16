"use client";

import Image from "next/image";
import { useState } from "react";
import { Pause, Play } from "lucide-react";

const PLATFORMS = [
  {
    name: "OLITT",
    image: "/logos/olitt.webp",
    wordmark: true,
  },
  {
    name: "Truehost",
    image: "/logos/truehost.png",
    wordmark: true,
  },
  {
    name: "Google",
    image: "/logos/google.png",
    wordmark: true,
  },
];
const STACK = [
  {
    name: "Next.js",
    image: "/logos/nextjs.svg",
  },
  {
    name: "React",
    image: "/logos/react.svg",
  },
  {
    name: "TypeScript",
    image: "/logos/typescript.svg",
  },
  {
    name: "Tailwind CSS",
    image: "/logos/tailwindcss.svg",
  },
  {
    name: "Node.js",
    image: "/logos/nodejs.svg",
  },
  {
    name: "Formspree",
    image: "/logos/formspree.svg",
    wordmark: true,
  },
];
type Brand = {
  name: string;
  image: string;
  wordmark?: boolean;
};
function LogoRow({
  brands,
  reverse = false,
}: {
  brands: Brand[];
  reverse?: boolean;
}) {
  const visualBrands = brands.length < 6 ? [...brands, ...brands] : brands;
  return (
    <div
      className={`logo-marquee${reverse ? " logo-marquee-reverse" : ""}${brands.length < 6 ? " logo-marquee-platforms" : ""}`}
    >
      <ul className="sr-only">
        {brands.map((brand) => (
          <li key={brand.name}>{brand.name}</li>
        ))}
      </ul>
      <div className="logo-marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="logo-marquee-group" key={copy}>
            {visualBrands.map((brand, i) => (
              <div className="brand-logo" key={`${brand.name}-${i}`}>
                <Image
                  src={brand.image}
                  alt=""
                  width={brand.wordmark ? 144 : 48}
                  height={48}
                  className={
                    brand.wordmark
                      ? "max-h-10 w-auto max-w-36 object-contain"
                      : "h-12 w-12 object-contain"
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechnologyStrip() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      aria-labelledby="technology-heading"
      className={`technology-section border-y border-mist-200 bg-white py-12 sm:py-16${paused ? " is-paused" : ""}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Our technology ecosystem</p>
            <h2
              id="technology-heading"
              className="mt-3 text-2xl font-bold tracking-tight text-secondary sm:text-3xl"
            >
              Good ideas. The right tools.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-mist-600">
              The platforms and development tools we use to build practical
              digital solutions.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            className="motion-toggle inline-flex items-center gap-2 rounded-full border border-mist-200 px-4 py-2 text-xs font-semibold text-mist-600 hover:border-primary hover:text-primary"
            aria-label={
              paused ? "Resume logo animation" : "Pause logo animation"
            }
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
            {paused ? "Resume motion" : "Pause motion"}
          </button>
        </div>
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-600">
          Tools &amp; platforms we use
        </h3>
        <LogoRow brands={PLATFORMS} />
        <h3 className="mb-4 mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-600">
          Our technology development stack
        </h3>
        <LogoRow brands={STACK} reverse />
      </div>
    </section>
  );
}
