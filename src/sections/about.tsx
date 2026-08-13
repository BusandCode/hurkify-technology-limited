"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Eye, Compass } from "lucide-react";

const VALUES = [
  {
    icon: Target,
    title: "Mission",
    body: "Give Nigerian businesses and healthcare providers software and compliance support that matches global standards, without the overhead of a global vendor.",
  },
  {
    icon: Eye,
    title: "Vision",
    body: "A Nigeria where every clinic, SME, and public institution runs on systems that are secure, compliant, and built to last.",
  },
  {
    icon: Compass,
    title: "Values",
    body: "Direct communication, technical honesty, and delivery that holds up under audit — not just under demo.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          {/* Transparent cutout founder composition — no boxed background */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(61,31,82,0.14) 0%, transparent 70%)",
              }}
            />
            <Image
              src="https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800&auto=format&fit=crop"
              alt="Hurkify founder, a Black Nigerian tech professional, in a modern Lagos office"
              width={800}
              height={960}
              className="w-full object-contain"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 82%, transparent 100%)",
              }}
            />
            <div className="mt-2 text-center">
              <p className="font-display text-sm font-bold text-secondary">
                Founder &amp; CEO
              </p>
              <p className="text-xs text-mist-600">Hurkify Technology Limited</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              About Hurkify
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
              Built by engineers who understand Nigerian compliance, not just
              Nigerian code.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-mist-600">
              Hurkify started from a simple observation: most software vendors
              serving Nigerian healthcare providers understood the tech, but
              not HEFAMAA. We built the reverse — a team fluent in both
              regulatory process and production engineering, so clients get
              systems that pass inspection and scale.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {VALUES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="border-l-2 border-primary/15 pl-4">
                  <Icon size={18} className="text-primary" />
                  <h3 className="mt-3 font-display text-sm font-bold text-secondary">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-mist-600">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
