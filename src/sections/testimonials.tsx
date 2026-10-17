import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Professional service, good communication, and excellent attention to detail. Hurkify Technology Limited was a pleasure to work with, and I would gladly recommend them for IT and digital solutions.",
    name: "Olamilekan Egunleti",
    rating: 5,
  },
  {
    quote:
      "Working with Hurkify Technology Limited was a positive experience. They understand how technology can be used to solve real business problems, and their approach was professional and solution-focused. I would recommend them to businesses looking for quality IT consulting and digital solutions.",
    name: "Gbemileke Okikiola",
    rating: 4,
  },
  {
    quote:
      "I had a great experience working with this company for my website development. They were professional, responsive, and attentive to my requirements throughout the process. The team delivered a high-quality website that looks great and functions perfectly. They completed the project on time and provided excellent support. I am very satisfied with their service and would highly recommend them to anyone looking for a reliable website development company.",
    name: "Soboyejo Faith",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 border-y border-mist-200 bg-mist-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">Client testimonials</p>
            <h2 className="section-title max-w-lg">
              Our work, in their words.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-mist-600 lg:justify-self-end">
            Client experiences shared on Google, from IT consulting and digital
            solutions to website development.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map(({ quote, name, rating }, i) => (
            <figure
              key={name}
              className={`flex flex-col rounded-xl p-5 ${i === 0 ? "bg-secondary text-white" : "border border-mist-200 bg-white text-secondary"}`}
            >
              <div className="flex items-center justify-between gap-4">
                <Quote
                  size={22}
                  strokeWidth={1.3}
                  aria-hidden
                  className={i === 0 ? "text-white/45" : "text-primary/50"}
                />
                <div
                  role="img"
                  aria-label={`${rating} out of 5 stars`}
                  className="flex gap-1"
                >
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star
                      key={star}
                      aria-hidden
                      size={15}
                      className={
                        star < rating
                          ? "fill-amber-400 text-amber-400"
                          : i === 0
                            ? "fill-white/15 text-white/25"
                            : "fill-mist-200 text-mist-200"
                      }
                    />
                  ))}
                </div>
              </div>
              <blockquote className="mb-4 mt-4 text-[13px] leading-6">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption
                className={`flex items-center gap-2.5 border-t pt-3 ${i === 0 ? "border-white/15" : "border-mist-200"}`}
              >
                <span
                  aria-hidden
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-xs font-semibold ${i === 0 ? "bg-white/10 text-white" : "bg-primary/8 text-primary"}`}
                >
                  {name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </span>
                <div>
                  <p className="font-display text-sm font-bold">{name}</p>
                  <p
                    className={`mt-1 text-xs leading-relaxed ${i === 0 ? "text-white/65" : "text-mist-600"}`}
                  >
                    Google review
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
