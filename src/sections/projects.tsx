"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    tag: "Healthcare",
    title: "Facility Compliance Portal",
    body: "A HEFAMAA compliance tracker used by facility administrators to manage renewals and documentation.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    tag: "Fintech-adjacent",
    title: "SME Operations Dashboard",
    body: "An internal operations tool for a Lagos-based distribution SME, replacing spreadsheet workflows.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
  },
  {
    tag: "Health-Tech",
    title: "Clinic EMR System",
    body: "Electronic medical records platform for a multi-branch clinic network, built for offline-first reliability.",
    image:
      "https://images.unsplash.com/photo-1631507623334-4b1e1a8f9d1f?q=80&w=1200&auto=format&fit=crop",
  },
];

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 bg-mist-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Our work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
              Recent projects
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PROJECTS.map(({ tag, title, body, image }, i) => (
            <motion.a
              href="#contact"
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className="group block overflow-hidden rounded-2xl border border-mist-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(61,31,82,0.2)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-mist-200">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {tag}
                </span>
                <div className="mt-2 flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-secondary">
                    {title}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 text-mist-400 transition-colors group-hover:text-primary"
                  />
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-mist-600">
                  {body}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
