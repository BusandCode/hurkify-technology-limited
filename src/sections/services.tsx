"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Workflow,
  Code2,
  ShieldCheck,
  Globe,
  Cloud,
  Palette,
  ArrowUpRight,
  Clock,
  Headset,
  Repeat,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  body: string;
  image?: string;
};

const SERVICES: Service[] = [
  {
    icon: Workflow,
    title: "IT Consulting & Digital Transformation",
    body: "Process audits, systems strategy, and roadmaps that move legacy operations onto reliable digital infrastructure.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Code2,
    title: "Software Development",
    body: "Custom web and mobile applications built for Nigerian operating conditions — from bandwidth to payments.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: ShieldCheck,
    title: "Healthcare Compliance Support",
    body: "HEFAMAA registration and yearly renewal handled end to end, alongside ongoing operational compliance.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Globe,
    title: "Website Development",
    body: "Corporate and product websites engineered for performance, SEO, and conversion — not just aesthetics.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Cloud,
    title: "Cloud & Technical Support",
    body: "Infrastructure setup, monitoring, and responsive technical support that keeps critical systems online.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Palette,
    title: "Branding",
    body: "Company branding — visual identity, logo systems, and brand guidelines that make your business instantly recognizable across every touchpoint.",
    image:
      "https://images.unsplash.com/photo-1690228254548-31ef53e40cd1?q=80&w=800&auto=format&fit=crop",
  },
];

const DELIVERY_STATS = [
  { icon: Clock, value: "< 24h", label: "First response time" },
  { icon: Repeat, value: "Ongoing", label: "Compliance monitoring" },
  { icon: Headset, value: "Direct", label: "Access to engineers" },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-20 overflow-hidden bg-mist-50 py-24 sm:py-28"
    >
      {/* Decorative background: dot grid + soft glow, consistent with Hero's ambient style */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(61,31,82,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(60% 50% at 85% 0%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(60% 50% at 85% 0%, black 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,111,97,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              What we do
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
              Enterprise services, delivered without enterprise overhead.
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, body, image }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.05 }}
              className="group relative rounded-2xl border border-mist-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_20px_40px_-16px_rgba(61,31,82,0.18)]"
            >
              {/* Photo strip — overflow-hidden lives here, not on the card */}
              <div className="relative h-36 w-full overflow-hidden rounded-t-2xl">
                {image ? (
                  <>
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/10 to-transparent" />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-secondary">
                    <Icon
                      size={32}
                      strokeWidth={1.5}
                      className="text-white/25 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
              </div>

              {/* Icon badge — a sibling of the photo, so it isn't clipped by it */}
              <div className="absolute left-6 top-28 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-[0_10px_20px_-8px_rgba(61,31,82,0.45)] ring-4 ring-white transition-transform duration-300 group-hover:scale-105">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "8px 8px",
                  }}
                />
                <Icon size={22} className="relative" />
              </div>

              <div className="relative p-7 pt-10">
                {/* Faint numbered watermark, purely decorative */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 top-2 font-display text-7xl font-extrabold text-primary/[0.04] transition-colors group-hover:text-primary/[0.07]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-secondary">
                    {title}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 text-mist-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </div>
                <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-mist-600">
                  {body}
                </p>

                {/* Accent underline that grows on hover */}
                <div className="relative mt-5 h-px w-full bg-mist-200">
                  <div className="h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delivery stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-mist-200 bg-mist-200 sm:grid-cols-3"
        >
          {DELIVERY_STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-white p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <Icon size={16} />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-secondary">
                  {value}
                </p>
                <p className="text-[11px] text-mist-600">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}