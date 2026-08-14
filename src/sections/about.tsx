"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Eye, Compass, ShieldCheck, Users, Building2 } from "lucide-react";

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

const STATS = [
  { icon: Building2, value: "12+", label: "Facilities supported" },
  { icon: Users, value: "20+", label: "Clients served" },
  { icon: ShieldCheck, value: "100%", label: "Renewal success rate" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-sm"
          >
            {/* Decorative ambient glow behind the photo */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(61,31,82,0.14) 0%, transparent 70%)",
              }}
            />
            {/* Decorative dot grid, offset behind the photo */}
            <div
              aria-hidden
              className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(61,31,82,0.4) 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />

            {/* Transparent cutout founder composition — no boxed background */}
            <Image
              src="/hurkify-founder.jpeg"
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

            {/* Floating credential badge over the photo */}
            {/* <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              className="absolute left-1/2 top-6 flex -translate-x-1/2 items-center gap-2 rounded-full border border-mist-200 bg-white/95 px-4 py-2 shadow-[0_12px_28px_-8px_rgba(61,31,82,0.25)] backdrop-blur"
            >
              <ShieldCheck size={14} className="text-primary" />
              <span className="text-[11px] font-semibold text-secondary">
                HEFAMAA-registered support
              </span>
            </motion.div> */}

            <div className="mt-2 text-center">
              <p className="font-display text-sm font-bold text-secondary">
                Founder &amp; CEO
              </p>
              <p className="text-xs text-mist-600">Hurkify Technology Limited</p>
            </div>

            {/* Stats strip under the photo */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-mist-200 pt-6">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <Icon size={16} className="mx-auto text-primary" />
                  <p className="mt-2 font-display text-lg font-extrabold text-secondary">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[10.5px] leading-tight text-mist-600">
                    {label}
                  </p>
                </div>
              ))}
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

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {VALUES.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-mist-200 bg-mist-50 p-5 transition-colors hover:border-primary/25 hover:bg-white hover:shadow-[0_16px_32px_-16px_rgba(61,31,82,0.18)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 font-display text-sm font-bold text-secondary">
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