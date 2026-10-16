import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardCheck,
  FileCheck2,
  HeartPulse,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HEFAMAA_PATH } from "@/lib/site";

const SERVICES = [
  {
    icon: FileCheck2,
    title: "HEFAMAA registration",
    body: "Prepare your facility documents, understand the application steps, and organise the information needed for a new registration.",
    href: HEFAMAA_PATH,
    action: "Learn More",
    number: "01",
  },
  {
    icon: RefreshCcw,
    title: "Annual renewal support",
    body: "Review your current records, identify documents that need updating, and plan ahead for your facility's next renewal.",
    href: `${HEFAMAA_PATH}#annual-renewal`,
    action: "Plan your renewal",
    number: "02",
  },
  {
    icon: HeartPulse,
    title: "EMR & clinical workflows",
    body: "Bring patient records and everyday workflows into practical digital systems designed around the way your facility operates.",
    href: "/#contact",
    action: "Discuss your EMR needs",
    number: "03",
  },
  {
    icon: ClipboardCheck,
    title: "Compliance readiness",
    body: "Get an organised view of documentation, operational gaps, and preparation tasks before the next stage of your compliance journey.",
    href: `${HEFAMAA_PATH}#consultation`,
    action: "Request a consultation",
    number: "04",
  },
];

export function HealthcareSupport() {
  return (
    <section
      id="healthcare-support"
      className="relative scroll-mt-24 overflow-hidden bg-secondary py-20 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c9b2ff]">
              <HeartPulse size={15} />
              Healthcare support
            </p>
            <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[44px]">
              Better systems behind
              <br />
              <span className="text-[#c9b2ff]">better healthcare.</span>
            </h2>
          </div>
          <p className="max-w-lg border-l-2 border-white/20 pl-5 text-base leading-relaxed text-white/75 lg:mb-1">
            From facility registration to digital records, we help healthcare
            owners and administrators bring more clarity to the work behind
            patient care.
          </p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <figure className="flex flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/5">
            <div className="relative aspect-[4/3] min-h-64 lg:aspect-auto lg:flex-1">
              <Image
                src="/visuals/healthcare-workspace.webp"
                alt="Illustrative clinic administration workspace with organised folders and a digital calendar"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-secondary/50 via-transparent to-transparent"
              />
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-secondary/60 px-4 py-2 text-xs font-medium text-white backdrop-blur">
                <ShieldCheck size={15} />
                Organised support. Practical technology.
              </span>
            </div>
            <figcaption className="p-6">
              <p className="font-display text-lg font-bold leading-snug text-white">
                Built around your facility.
                <br />
                Focused on the people using it.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                We start with your facility&apos;s needs, the systems you use,
                and the support your team requires.
              </p>
              <p className="mt-4 text-[10px] text-white/50">
                Illustrative healthcare administration visual
              </p>
            </figcaption>
          </figure>

          <div className="healthcare-services-grid grid gap-5 sm:grid-cols-2">
            {SERVICES.map(
              ({ icon: Icon, title, body, href, action, number }) => (
                <article
                  key={title}
                  className="healthcare-card group flex flex-col rounded-2xl border border-white/15 bg-white p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/7 text-primary">
                      <Icon size={21} />
                    </span>
                    <span
                      aria-hidden
                      className="text-[11px] font-semibold tracking-widest text-primary/45"
                    >
                      {number}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold leading-snug tracking-tight text-secondary">
                    {title}
                  </h3>
                  <p className="mb-6 mt-3 text-sm leading-relaxed text-mist-600">
                    {body}
                  </p>
                  <Link
                    href={href}
                    className="mt-auto inline-flex min-h-10 items-center justify-between gap-3 border-t border-mist-200 pt-4 text-xs font-bold text-primary hover:text-secondary"
                  >
                    {action}
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </article>
              ),
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-white/15 bg-white/5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-white/70">
            <strong className="font-semibold text-white">
              Independent support from Hurkify.
            </strong>{" "}
            Regulatory approvals and certificates are issued by the relevant
            authorities. We help you prepare and navigate the process.
          </p>
          <Link
            href={HEFAMAA_PATH}
            className={`${buttonVariants({ size: "sm" })} shrink-0`}
          >
            Explore HEFAMAA support
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
