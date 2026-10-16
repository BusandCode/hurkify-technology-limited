import Image from "next/image";
import { ArrowUpRight, Layers } from "lucide-react";

type Project = {
  tag: string;
  title: string;
  body: string;
  image?: string;
  scope: string[];
};

const PROJECTS: Project[] = [
  {
    tag: "Healthcare",
    title: "Facility Compliance Portal",
    body: "A HEFAMAA compliance tracker used by facility administrators to manage renewals and documentation.",
    scope: [
      "Renewal tracking",
      "Facility documentation",
      "Administrator workflows",
    ],
  },
  {
    tag: "Business systems",
    title: "SME Operations Dashboard",
    body: "An internal operations tool for a Lagos-based distribution SME, replacing spreadsheet workflows.",
    scope: [
      "Internal operations",
      "Spreadsheet replacement",
      "Centralised dashboard",
    ],
  },
  {
    tag: "Health-Tech",
    title: "Clinic EMR System",
    body: "Electronic medical records platform for a multi-branch clinic network, built for offline-first reliability.",
    scope: [
      "Electronic medical records",
      "Multi-branch workflows",
      "Offline-first reliability",
    ],
  },
  {
    tag: "Fintech",
    title: "Hurkfin",
    body: "A Nigerian fintech app combining savings, a dual-wallet system, Trust Score, payments, bills, virtual cards, and shopping in one place.",
    image: "/projects/hurkfin.webp",
    scope: ["Dual-wallet savings", "Trust Score", "Payments & bills"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 bg-mist-50 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
              Selected projects
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map(({ tag, title, body, image, scope }, i) => (
            <article
              key={title}
              className="group block overflow-hidden rounded-2xl border border-mist-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(61,31,82,0.2)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-mist-200">
                {image ? (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full flex-col justify-between bg-secondary p-6 text-white">
                    <div className="flex items-center justify-between text-white/50">
                      <Layers size={24} />
                      <span className="text-xs">0{i + 1}</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/50">
                        Hurkify / {tag}
                      </p>
                      <p className="mt-2 font-display text-lg font-bold">
                        {title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                  {tag}
                </span>
                <div className="mt-2 flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-bold text-secondary">
                    {title}
                  </h3>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-mist-600">
                  {body}
                </p>
                <details className="mt-5 border-t border-mist-200 pt-4 text-sm">
                  <summary className="cursor-pointer font-semibold text-primary">
                    Project scope
                  </summary>
                  <ul className="mt-3 list-inside list-disc space-y-2 text-mist-600">
                    {scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary"
                  >
                    Discuss a similar project <ArrowUpRight size={14} />
                  </a>
                </details>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
