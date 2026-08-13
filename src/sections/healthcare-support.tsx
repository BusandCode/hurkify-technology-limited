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
      className="scroll-mt-20 bg-secondary py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Healthcare Support
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              HEFAMAA compliance and EMR, handled by people who&rsquo;ve done
              it before.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60">
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
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-accent/30 hover:bg-white/[0.06]"
              >
                <Icon size={20} className="text-accent" />
                <h3 className="mt-4 font-display text-sm font-bold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/55">
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
