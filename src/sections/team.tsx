import Image from "next/image";
import { Code2, Compass, PenTool } from "lucide-react";

const TEAM = [
  {
    name: "Olamide Sobowale",
    role: "Founder & CEO",
    focus: "Leadership & technical direction",
    icon: Compass,
    bio: "Connecting business strategy with practical technology.",
    image: "/hurkify-founder.webp",
  },
  {
    name: "Andrew Adetokunbo",
    role: "Full Stack Developer",
    focus: "Software engineering",
    icon: Code2,
    bio: "Turning product ideas into connected digital experiences.",
    image: "/busandcode.webp",
  },
  {
    name: "Alaka Olakunle Oluwabukunmi",
    role: "Lead UI/UX Designer",
    focus: "Product & experience design",
    icon: PenTool,
    bio: "Making complex workflows feel clear and intuitive.",
    image: "/bukunmi.webp",
  },
];

export function Team() {
  return (
    <section id="team" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">Our team</p>
            <h2 className="section-title">
              The people behind
              <br />
              the work.
            </h2>
          </div>
          <p className="max-w-lg border-l-2 border-primary/20 pl-5 text-base leading-relaxed text-mist-600 lg:mb-1">
            Leadership, engineering, and design working together to turn your
            business needs into useful technology. A team you can speak to
            directly.
          </p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {TEAM.map(({ name, role, focus, icon: Icon, bio, image }) => (
            <article
              key={name}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-mist-200 bg-white p-4 transition-colors hover:border-primary/40 hover:bg-primary/[0.02] sm:p-5"
            >
              <span
                aria-hidden
                className="absolute right-0 top-0 h-px w-20 bg-linear-to-l from-primary/60 to-transparent"
              />
              <div className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-4">
                <div className="relative h-[72px] w-[72px] overflow-hidden rounded-2xl border border-primary/10 bg-mist-100 sm:h-[88px] sm:w-[88px]">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(min-width: 640px) 88px, 72px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold leading-snug tracking-tight text-secondary">
                    {name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-primary">
                    {role}
                  </p>
                </div>
              </div>
              <p className="mb-4 mt-4 flex-1 text-xs leading-relaxed text-mist-600">
                {bio}
              </p>
              <div className="flex items-center gap-2 border-t border-mist-200/70 pt-3 text-[11px] font-medium leading-relaxed text-mist-600">
                <Icon
                  aria-hidden
                  size={14}
                  className="shrink-0 text-primary transition-transform group-hover:-rotate-12 motion-reduce:transform-none motion-reduce:transition-none"
                />
                <span>{focus}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
