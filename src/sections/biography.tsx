"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, HeartPulse, Workflow, BookOpen, PenLine, Music } from "lucide-react";

const FOCUS_AREAS = [
  { icon: Code2, label: "Software development" },
  { icon: Workflow, label: "ICT operations & digital transformation" },
  { icon: HeartPulse, label: "Healthcare technology" },
];

const CREATIVE_AREAS = [
  { icon: BookOpen, label: "Reading" },
  { icon: PenLine, label: "Poetry & creative writing" },
  { icon: Music, label: "Songwriting" },
];

const THEMES = ["Hope", "Perseverance", "Spirituality", "Love", "Personal growth"];

export function Biography() {
  return (
    <section id="biography" className="scroll-mt-20 bg-mist-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-sm lg:self-start"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-mist-200 bg-mist-100 shadow-xl shadow-secondary/10">
              <Image
                src="/hurkify-founder.PNG"
                alt="Olamide Sobowale, founder of Hurkify Technology Limited"
                fill
                priority
                quality={100}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 60vw, 90vw"
                className="object-contain object-bottom"
              />
            </div>
            <div className="mt-5 lg:absolute lg:left-0 lg:top-full">
              <p className="font-display text-lg font-bold text-secondary">
                Olamide Sobowale
              </p>
              <p className="text-sm text-mist-600">
                Founder &amp; CEO, Hurkify Technology Limited
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="flex flex-col gap-3 lg:absolute lg:inset-0 lg:justify-between lg:gap-0">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Biography
                </span>
                <h2 className="mt-1 text-xl font-extrabold leading-snug tracking-tight text-secondary sm:text-2xl">
                  An engineer who writes songs, and a writer who ships software.
                </h2>
              </div>

              <div className="space-y-2 text-[12.5px] leading-normal text-mist-600">
                <p>
                  Olamide Sobowale is a Nigerian software engineer and technology
                  enthusiast with a passion for using technology to solve
                  real-world problems. He holds a master&rsquo;s degree and has
                  experience in software development, ICT operations, digital
                  transformation, and healthcare technology.
                </p>
                <p>
                  He is the founder of Hurkify Technology Limited, where he helps
                  businesses and organizations adopt practical digital solutions
                  that improve their operations and connect them with their
                  audiences.
                </p>
                <p>
                  Beyond technology, Olamide is a songwriter and creative writer.
                  He loves reading, writes poetry, and uses his writing to
                  explore the themes below.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {THEMES.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-full border border-mist-200 bg-white px-2.5 py-0.5 text-[10.5px] font-semibold text-secondary"
                  >
                    {theme}
                  </span>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-mist-200 bg-white p-3">
                  <h3 className="font-display text-xs font-bold text-secondary">
                    Professional focus
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {FOCUS_AREAS.map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-center gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                          <Icon size={11} />
                        </span>
                        <span className="text-[12px] leading-tight text-mist-600">
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-mist-200 bg-white p-3">
                  <h3 className="font-display text-xs font-bold text-secondary">
                    Beyond the code
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {CREATIVE_AREAS.map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-center gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent/15 text-accent">
                          <Icon size={11} />
                        </span>
                        <span className="text-[12px] leading-tight text-mist-600">
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}