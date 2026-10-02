"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Building2, Sparkles } from "lucide-react";

const STATS = [
  { icon: Building2, value: "500+", label: "Facilities supported" },
  { icon: Users, value: "700+", label: "Clients served" },
  { icon: ShieldCheck, value: "100%", label: "Renewal success rate" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="relative mx-auto w-full max-w-sm">
            <div
              aria-hidden
              className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(61,31,82,0.4) 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />

            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-x-4 bottom-0 top-12 -z-10 rounded-t-[999px] border border-b-0 border-primary/10 bg-linear-to-b from-primary/9 via-primary/4 to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-x-10 bottom-0 top-24 -z-10 rounded-t-[999px] border border-b-0 border-primary/[0.07]"
              />

              <Image
                src="/hurkify-founder.PNG"
                alt="Hurkify founder, a Black Nigerian tech professional, in a modern Lagos office"
                width={800}
                height={960}
                className="relative w-full object-contain"
              />
            </div>

            <div className="mt-4 text-center">
              <p className="font-display text-sm font-bold text-secondary">
                Founder &amp; CEO
              </p>
              <p className="text-xs text-mist-600">Hurkify Technology Limited</p>
            </div>

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
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            {/* <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              About
            </span> */}
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">
              About Hurkify Technology Limited
            </h2>

            <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-mist-600">
              <p>
                Hurkify Technology Limited is a Nigerian technology company
                helping businesses and organizations use technology to work
                smarter, faster, and more efficiently.
              </p>
              <p>
                We provide practical digital solutions, including IT
                consulting, software development, website development,
                healthcare technology, business automation, cloud solutions,
                and digital transformation.
              </p>
              <p>
                At Hurkify, we believe technology should make work easier, not
                more complicated. We take the time to understand each
                client&rsquo;s needs and build solutions that fit their goals,
                operations, and budget.
              </p>
              <p>
                Our focus is simple: solve real problems, build useful
                technology, and help businesses grow.
              </p>
            </div>

            <div className="mt-8">
              <p className="inline-flex items-center gap-2.5 rounded-full border border-primary/15 bg-primary/5 px-5 py-2.5 font-display text-sm font-bold text-secondary">
                {/* <Sparkles size={15} className="shrink-0 text-accent" /> */}
                Hurkify Technology Limited — Technology that works for you.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}