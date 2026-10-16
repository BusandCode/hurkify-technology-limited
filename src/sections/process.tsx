import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    title: "Discovery & alignment",
    text: "We listen to your goals, understand the people using your systems, and identify the business problem before recommending a solution.",
    focus: "Your priorities, requirements, and definition of success",
  },
  {
    title: "Scope & planning",
    text: "Together, we define what needs to be delivered, how the work will be approached, and the responsibilities on both sides.",
    focus: "An agreed scope, timeline, and project direction",
  },
  {
    title: "Design, build & review",
    text: "We develop the solution in stages, with clear opportunities to review progress, ask questions, and give feedback as the work takes shape.",
    focus: "Shared checkpoints and informed decisions",
  },
  {
    title: "Launch & ongoing support",
    text: "We prepare for release and handover, help your team understand the solution, and agree on the support needed after launch.",
    focus: "A thoughtful handover and a practical support plan",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-24 border-y border-mist-200 bg-mist-50 py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow">How we work</p>
          <h2 className="section-title max-w-lg">
            Good work starts
            <br />
            with a clear process.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-mist-600">
            From the first conversation to the final handover, we keep the work
            structured and the communication straightforward—so you know what
            we&apos;re building, why it matters, and what comes next.
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-primary/30 pb-1 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary"
          >
            Discuss your project
            <ArrowUpRight size={17} />
          </Link>
          <p className="mt-10 flex items-start gap-3 text-xs leading-relaxed text-mist-600">
            <span
              aria-hidden
              className="mt-2 h-px w-8 shrink-0 bg-primary/40"
            />
            Clear scope. Shared checkpoints.
            <br />
            Thoughtful handover.
          </p>
        </div>

        <ol className="divide-y divide-mist-200 border-y border-mist-200">
          {STEPS.map(({ title, text, focus }, i) => (
            <li
              key={title}
              className="grid grid-cols-[36px_minmax(0,1fr)] gap-5 py-7 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-7 sm:py-8"
            >
              <span
                aria-hidden
                className="font-display text-2xl font-semibold leading-none tracking-tight text-primary/50 sm:text-3xl"
              >
                0{i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold tracking-tight text-secondary sm:text-xl">
                  {title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist-600">
                  {text}
                </p>
                <p className="mt-4 text-xs font-medium leading-relaxed text-primary">
                  {focus}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
