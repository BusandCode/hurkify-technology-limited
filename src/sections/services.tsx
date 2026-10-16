import { ArrowUpRight, Code2, HeartPulse, Workflow, Check } from "lucide-react";

const SERVICES = [
  {
    icon: Code2,
    number: "01",
    title: "Software & websites",
    body: "Websites, applications, and integrations that help customers find you and give your team tools built around their daily work.",
    items: [
      "Corporate & product websites",
      "Custom web & mobile applications",
      "Business automation & integrations",
      "Brand identity & interface design",
    ],
    href: "#contact",
    cta: "Let's build your solution",
  },
  {
    icon: Workflow,
    number: "02",
    title: "IT consulting & support",
    body: "Clear technology advice, dependable infrastructure, and practical support to reduce friction in your business operations.",
    items: [
      "Technology reviews & digital strategy",
      "Cloud infrastructure & deployment",
      "Workflow & systems improvement",
      "Ongoing technical support",
    ],
    href: "#contact",
    cta: "Discuss your IT needs",
  },
  {
    icon: HeartPulse,
    number: "03",
    title: "Healthcare solutions",
    body: "Digital records, clinical workflow tools, and registration assistance that help healthcare teams organise their operations.",
    items: [
      "HEFAMAA registration assistance",
      "Facility renewal & documentation",
      "Electronic medical records systems",
      "Clinical workflow tools",
    ],
    href: "#healthcare-support",
    cta: "Explore healthcare support",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-14">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="section-title max-w-2xl">
              From business challenges to better digital solutions.
            </h2>
          </div>
          <p className="max-w-lg border-l-2 border-primary/25 pl-5 text-base leading-relaxed text-mist-600 lg:mb-1 lg:justify-self-end">
            Build something new, improve the systems you already use, or get
            specialist healthcare support. We start with the problem and shape
            the technology around it.
          </p>
        </div>
        <div className="service-grid mt-12 grid gap-6 lg:grid-cols-3">
          {SERVICES.map(
            ({ icon: Icon, number, title, body, items, href, cta }) => (
              <article
                key={title}
                className="service-card group relative flex flex-col rounded-2xl border border-mist-200 bg-white p-7 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="service-icon flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 text-primary">
                    <Icon size={23} />
                  </span>
                  <span className="font-display text-xs font-bold tracking-widest text-primary/50">
                    {number}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-bold tracking-tight text-secondary">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-600">
                  {body}
                </p>
                <ul className="my-7 space-y-3.5 border-t border-mist-200/70 pt-6">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[16px_1fr] items-start gap-3 text-sm leading-relaxed text-secondary"
                    >
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={href}
                  className="service-link mt-auto inline-flex min-h-12 items-center justify-between gap-3 rounded-xl bg-primary/5 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white"
                >
                  {cta}
                  <ArrowUpRight size={17} />
                </a>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
