"use client";

import { motion } from "framer-motion";
import {
  Workflow,
  Code2,
  ShieldCheck,
  Globe,
  Cloud,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: Workflow,
    title: "IT Consulting & Digital Transformation",
    body: "Process audits, systems strategy, and roadmaps that move legacy operations onto reliable digital infrastructure.",
  },
  {
    icon: Code2,
    title: "Software Development",
    body: "Custom web and mobile applications built for Nigerian operating conditions — from bandwidth to payments.",
  },
  {
    icon: ShieldCheck,
    title: "Healthcare Compliance Support",
    body: "HEFAMAA registration and yearly renewal handled end to end, alongside ongoing operational compliance.",
  },
  {
    icon: Globe,
    title: "Website Development",
    body: "Corporate and product websites engineered for performance, SEO, and conversion — not just aesthetics.",
  },
  {
    icon: Cloud,
    title: "Cloud & Technical Support",
    body: "Infrastructure setup, monitoring, and responsive technical support that keeps critical systems online.",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-mist-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            What we do
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
            Enterprise services, delivered without enterprise overhead.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-mist-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_20px_40px_-16px_rgba(61,31,82,0.18)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon size={20} />
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-mist-400 opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
              <h3 className="mt-5 font-display text-base font-bold text-secondary">
                {title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-mist-600">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
