"use client";

import { motion } from "framer-motion";
import { HeartPulse, Store, GraduationCap, Landmark, HandHeart } from "lucide-react";

const INDUSTRIES = [
  { icon: HeartPulse, label: "Healthcare", body: "Hospitals, clinics, and diagnostic centers navigating HEFAMAA and EMR needs." },
  { icon: Store, label: "SMEs", body: "Growing businesses that need reliable software without an in-house engineering team." },
  { icon: GraduationCap, label: "Education", body: "Schools and training institutions digitizing records and operations." },
  { icon: Landmark, label: "Government", body: "Public institutions modernizing service delivery and internal systems." },
  { icon: HandHeart, label: "NGOs", body: "Nonprofits needing dependable systems for reporting, outreach, and compliance." },
];

export function Industries() {
  return (
    <section id="industries" className="scroll-mt-20 bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Who we work with
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
            Industries we build for
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-mist-200 bg-mist-200 sm:grid-cols-2 lg:grid-cols-5">
          {INDUSTRIES.map(({ icon: Icon, label, body }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex flex-col justify-between bg-white p-7 transition-colors hover:bg-mist-50"
            >
              <div>
                <Icon size={22} className="text-primary" />
                <h3 className="mt-4 font-display text-sm font-bold text-secondary">
                  {label}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-mist-600">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
