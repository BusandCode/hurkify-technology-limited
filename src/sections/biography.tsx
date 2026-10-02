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
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-mist-200 bg-mist-100 shadow-xl shadow-secondary/10">
              <Image
                src="/hurkify-founder.png"
                alt="Olamide Sobowale, founder of Hurkify Technology Limited"
                fill
                priority
                quality={100}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 60vw, 90vw"
                className="object-contain object-bottom"
              />
            </div>
            <div className="mt-6">
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
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Biography
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
              An engineer who writes songs, and a writer who ships software.
            </h2>

            <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-mist-600">
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

            <div className="mt-6 flex flex-wrap gap-2">
              {THEMES.map((theme) => (
                <span
                  key={theme}
                  className="rounded-full border border-mist-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-secondary"
                >
                  {theme}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-mist-200 bg-white p-6">
                <h3 className="font-display text-sm font-bold text-secondary">
                  Professional focus
                </h3>
                <ul className="mt-4 space-y-3">
                  {FOCUS_AREAS.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon size={15} />
                      </span>
                      <span className="text-[13.5px] text-mist-600">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-mist-200 bg-white p-6">
                <h3 className="font-display text-sm font-bold text-secondary">
                  Beyond the code
                </h3>
                <ul className="mt-4 space-y-3">
                  {CREATIVE_AREAS.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                        <Icon size={15} />
                      </span>
                      <span className="text-[13.5px] text-mist-600">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}