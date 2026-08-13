"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Our HEFAMAA renewal used to take weeks of back and forth. Hurkify turned it into a process we barely think about anymore.",
    name: "Facility Administrator",
    role: "Multi-branch clinic network, Lagos",
  },
  {
    quote:
      "They understood our compliance obligations as well as our engineering needs. That combination is rare.",
    name: "Operations Director",
    role: "Healthcare provider, Abuja",
  },
  {
    quote:
      "The dashboard they built replaced three spreadsheets and a WhatsApp group. Genuinely changed how we run the business.",
    name: "Founder",
    role: "Distribution SME, Lagos",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 bg-white py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Client feedback
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
            What clients say
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map(({ quote, name, role }, i) => (
            <motion.figure
              key={name + role}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="rounded-2xl border border-mist-200 bg-mist-50 p-7"
            >
              <Quote size={20} className="text-primary/40" />
              <blockquote className="mt-4 text-[14.5px] leading-relaxed text-secondary">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-mist-200 pt-4">
                <p className="font-display text-sm font-bold text-secondary">
                  {name}
                </p>
                <p className="text-xs text-mist-600">{role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
