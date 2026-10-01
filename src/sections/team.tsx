"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

// PLACEHOLDER: only Olamide Sobowale is a real entry. Replace the other
// names, roles, bios, and Unsplash photos with your actual team.
const TEAM: TeamMember[] = [
  {
    name: "Olamide Sobowale",
    role: "Founder & CEO",
    bio: "Software engineer focused on practical digital solutions for businesses and healthcare providers.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Adaeze Okafor",
    role: "Head of Compliance",
    bio: "Leads HEFAMAA registration, renewals, and operational compliance for client facilities.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Tunde Bakare",
    role: "Lead Software Engineer",
    bio: "Builds and maintains the web, mobile, and EMR systems Hurkify delivers.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ngozi Eze",
    role: "Client Success Manager",
    bio: "Your first point of contact for onboarding, support, and ongoing delivery.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
];

export function Team() {
  return (
    <section id="team" className="scroll-mt-20 bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our team
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
            The people behind Hurkify
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mist-600">
            Engineers and compliance specialists you can speak to directly,
            from first call to long-term support.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map(({ name, role, bio, image }, i) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.06 }}
              className="group overflow-hidden rounded-2xl border border-mist-200 bg-mist-50"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-mist-200">
                <Image
                  src={image}
                  alt={`${name}, ${role}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-base font-bold text-secondary">
                  {name}
                </h3>
                <p className="mt-0.5 text-xs font-semibold text-accent">{role}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-mist-600">
                  {bio}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}