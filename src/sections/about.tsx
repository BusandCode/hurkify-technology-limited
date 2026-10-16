import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/count-up";

const STATS = [
  { value: 500, suffix: "+", label: "Facilities supported" },
  { value: 700, suffix: "+", label: "Clients served" },
  { value: 100, suffix: "%", label: "Renewal success rate" },
];
const PRINCIPLES = [
  {
    title: "Understand the business",
    text: "We start with your people, priorities, and everyday operations to understand where technology can make a difference.",
  },
  {
    title: "Build with purpose",
    text: "From software and websites to healthcare systems and automation, we create solutions around the work you need to do.",
  },
  {
    title: "Keep it practical",
    text: "Clear advice, useful tools, and thoughtful support help your team move forward with confidence.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <figure className="mx-auto w-full max-w-md lg:mx-0">
            <div className="relative isolate overflow-hidden rounded-t-[140px] bg-mist-100 px-6 pt-8 sm:px-10">
              <div
                aria-hidden
                className="absolute inset-x-6 bottom-0 top-6 -z-10 rounded-t-[120px] border border-primary/15 sm:inset-x-8 sm:top-8"
              />
              <Image
                src="/hurkify-founder.webp"
                alt="Olamide Sobowale, founder of Hurkify Technology Limited"
                width={800}
                height={960}
                sizes="(max-width: 768px) 85vw, 400px"
                className="relative mx-auto max-h-[420px] w-auto object-contain object-bottom"
              />
            </div>
            <figcaption className="border-b border-mist-200 py-5 text-center text-primary">
              <div>
                <p className="font-display text-base font-bold">
                  Olamide Sobowale
                </p>
                <p className="mt-1 text-xs">Founder &amp; CEO</p>
              </div>
            </figcaption>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist-600">
              Personal commitment. Practical expertise. A clear focus on the
              businesses we serve.
            </p>
          </figure>
          <div>
            <p className="eyebrow">About Hurkify</p>
            <h2 className="section-title max-w-xl">
              Technology with purpose.
              <br />
              People at its heart.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">
              We help businesses turn everyday challenges into better ways of
              working.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist-600">
              Hurkify Technology Limited is a Nigerian technology company
              bringing together software development, IT consulting, healthcare
              technology, and digital transformation. We connect business
              understanding with technical expertise to build solutions that fit
              your goals, operations, and budget.
            </p>
            <dl className="mt-8 divide-y divide-mist-200 border-y border-mist-200">
              {PRINCIPLES.map(({ title, text }) => (
                <div
                  key={title}
                  className="grid gap-2 py-5 sm:grid-cols-[160px_1fr] sm:gap-6"
                >
                  <dt className="font-display text-sm font-bold text-secondary">
                    {title}
                  </dt>
                  <dd className="text-sm leading-relaxed text-mist-600">
                    {text}
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href="/#contact"
              className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-primary/30 pb-1 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary"
            >
              Let&apos;s talk about your business{" "}
              <ArrowUpRight size={17} aria-hidden />
            </Link>
          </div>
        </div>
        <div className="mt-14 grid gap-8 border-t border-mist-200 pt-8 sm:grid-cols-[1.15fr_2fr] sm:gap-12 lg:mt-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Our work in numbers
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist-600">
              Supporting the people and organizations behind better business.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-3 sm:gap-6">
            {STATS.map(({ value, suffix, label }) => (
              <div
                key={label}
                className="border-l border-mist-200 pl-3 sm:pl-6"
              >
                <dt className="text-xs leading-relaxed text-mist-600">
                  {label}
                </dt>
                <dd className="mt-2 font-display text-3xl font-semibold tracking-tight text-secondary sm:text-4xl">
                  <CountUp value={value} suffix={suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
