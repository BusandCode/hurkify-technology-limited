"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Stethoscope, Cpu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "HEFAMAA-aligned compliance" },
  { icon: Stethoscope, label: "Healthcare-grade EMR" },
  { icon: Cpu, label: "Enterprise IT delivery" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-20 items-center overflow-hidden bg-secondary pt-28 pb-20"
    >
      {/* Ambient background: subtle radial glow + grid, no loud gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 10%, rgba(255,111,97,0.14) 0%, transparent 60%), radial-gradient(50% 40% at 10% 90%, rgba(61,31,82,0.55) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70">
            IT Consulting &amp; Healthcare Technology
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Systems that hold up when
            <span className="text-accent"> healthcare and compliance</span>{" "}
            can&rsquo;t afford to fail.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            Hurkify builds and supports the software backbone for Nigerian
            businesses and healthcare providers — from HEFAMAA registration
            and EMR systems to cloud infrastructure and custom software.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className={cn(buttonVariants({ size: "lg" }), "group")}
            >
              Talk to our team
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#services"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" })
              )}
            >
              Explore services
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon size={16} className="shrink-0 text-accent" />
                <span className="text-xs font-medium text-white/55">
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
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-3 text-[11px] text-white/30">
                compliance.hurkify.app
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4">
              <div className="col-span-2 rounded-xl bg-gradient-to-br from-primary to-secondary p-4">
                <p className="text-[11px] font-medium uppercase tracking-wider text-white/50">
                  HEFAMAA Renewal Status
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  Compliant
                </p>
                <div className="mt-4 h-1.5 w-full rounded-full bg-white/10">
                  <div className="h-1.5 w-4/5 rounded-full bg-accent" />
                </div>
                <p className="mt-2 text-[11px] text-white/40">
                  Next renewal in 84 days
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <p className="text-[11px] font-medium uppercase tracking-wider text-white/50">
                  Facilities
                </p>
                <p className="mt-2 text-2xl font-bold text-white">12</p>
                <p className="mt-1 text-[11px] text-emerald-400/80">
                  +2 this quarter
                </p>
              </div>

              <div className="col-span-3 rounded-xl bg-white/5 p-4">
                <p className="text-[11px] font-medium uppercase tracking-wider text-white/50">
                  EMR Uptime
                </p>
                <div className="mt-3 flex items-end gap-1.5">
                  {[40, 55, 48, 70, 62, 80, 74, 90, 85, 96].map((h, i) => (
                    <div
                      key={i}
                      className="w-full rounded-sm bg-accent/70"
                      style={{ height: `${h * 0.4}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* floating badge */}
          <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-xl border border-white/10 bg-secondary/90 px-4 py-3 shadow-lg backdrop-blur sm:flex">
            <ShieldCheck size={18} className="text-accent" />
            <span className="text-xs font-semibold text-white">
              Audit-ready, always
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
