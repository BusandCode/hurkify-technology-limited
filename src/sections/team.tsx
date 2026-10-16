import Image from "next/image";
import { Code2, Compass, PenTool } from "lucide-react";

const TEAM = [
  {
    name: "Olamide Sobowale",
    role: "Founder & CEO",
    focus: "Leadership & technical direction",
    icon: Compass,
    bio: "Guides project strategy and engineering, with a focus on practical digital solutions for businesses and healthcare providers.",
    image: "/hurkify-founder.webp",
  },
  {
    name: "Andrew Adetokunbo",
    role: "Full Stack Developer",
    focus: "Software engineering",
    icon: Code2,
    bio: "Builds web and mobile products end to end, connecting clear interfaces with the APIs and data that power them.",
    image: "/busandcode.webp",
  },
  {
    name: "Alaka Olakunle Oluwabukunmi",
    role: "Lead UI/UX Designer",
    focus: "Product & experience design",
    icon: PenTool,
    bio: "Turns complex workflows into clear, user-friendly experiences through thoughtful interface and interaction design.",
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

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {TEAM.map(({ name, role, focus, icon: Icon, bio, image }) => (
            <article
              key={name}
              className="flex h-full flex-col rounded-2xl border border-mist-200 bg-mist-50/60 p-6 transition-colors hover:border-primary/30 sm:p-7"
            >
              <div className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[88px_minmax(0,1fr)] lg:min-h-28">
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
                  <p className="mt-1.5 text-xs font-semibold leading-relaxed text-primary">
                    {role}
                  </p>
                </div>
              </div>
              <p className="mb-6 mt-5 flex-1 text-sm leading-relaxed text-mist-600">
                {bio}
              </p>
              <div className="flex items-center gap-2.5 border-t border-mist-200 pt-4 text-[11px] font-medium leading-relaxed text-mist-600">
                <Icon aria-hidden size={15} className="shrink-0 text-primary" />
                <span>{focus}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
