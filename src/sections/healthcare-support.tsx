"use client";

import { motion } from "framer-motion";
import { FileCheck2, RefreshCcw, HeartPulse, ClipboardCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    icon: FileCheck2,
    title: "HEFAMAA Registration",
    body: "Full documentation, application, and inspection-readiness support for new facility registration.",
  },
  {
    icon: RefreshCcw,
    title: "Yearly Renewal Assistance",
    body: "We track deadlines and manage the renewal cycle so your license never lapses.",
  },
  {
    icon: HeartPulse,
    title: "EMR & Health-Tech Systems",
    body: "Electronic medical records and clinical workflow tools built for how Nigerian facilities actually operate.",
  },
  {
    icon: ClipboardCheck,
    title: "Operational Compliance",
    body: "Ongoing audits of records, staffing, and facility standards to keep you inspection-ready year-round.",
  },
];

export function HealthcareSupport() {
  return (
    <section
      id="healthcare-support"
      className="relative scroll-mt-20 overflow-hidden bg-primary py-24 sm:py-28"
    >
      {/* Decorative background — same visual language as Hero/Services/Contact */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "rgba(26,11,46,0.5)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Healthcare Support
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              HEFAMAA compliance and EMR, handled by people who&rsquo;ve done
              it before.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/75">
              Facility registration and renewal are recurring operational
              risk. We manage the paperwork and the systems, so your clinical
              team stays focused on patients.
            </p>
            <a
              href="#contact"
              className={cn(buttonVariants({ size: "lg" }), "mt-8")}
            >
              Get compliance support
            </a>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: i * 0.06,
                }}
                className="rounded-2xl border border-mist-200 bg-white p-6 shadow-[0_16px_36px_-20px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-sm font-bold text-secondary">
                  {title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-mist-600">
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}