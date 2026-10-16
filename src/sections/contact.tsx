import { ArrowUpRight, Mail, MessageCircle, Phone, MapPin } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { BUSINESS_EMAIL, BUSINESS_PHONE, WHATSAPP_URL } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-secondary py-20 text-white sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9b2ff]">
            Let&apos;s work together
          </p>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Tell us what your
            <br />
            business needs next.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
            Have a project in mind or a system that needs improving? Share your
            goals and we&apos;ll discuss a practical next step.
          </p>
          <p className="mt-4 text-sm text-white/60">
            We typically respond within one business day.
          </p>
          <div className="mt-9 space-y-3">
            {[
              {
                icon: Mail,
                label: "Email us",
                value: BUSINESS_EMAIL,
                href: `mailto:${BUSINESS_EMAIL}`,
              },
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: "Start a conversation",
                href: WHATSAPP_URL,
              },
              {
                icon: Phone,
                label: "Call our team",
                value: BUSINESS_PHONE,
                href: "tel:+2349045083581",
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("https") ? "_blank" : undefined}
                rel={
                  href.startsWith("https") ? "noopener noreferrer" : undefined
                }
                className="flex items-center gap-4 rounded-xl border border-white/15 p-4 transition-colors hover:bg-white/5"
              >
                <Icon size={20} className="shrink-0 text-[#c9b2ff]" />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-white/60">{label}</span>
                  <span className="mt-1 block break-words text-sm font-semibold">
                    {value}
                  </span>
                </span>
                <ArrowUpRight size={16} />
              </a>
            ))}
          </div>
          <p className="mt-7 flex items-start gap-3 text-sm leading-relaxed text-white/60">
            <MapPin size={18} className="mt-1 shrink-0" />
            <span>
              6, Asabi Cole Street, Alausa, Ikeja, Lagos.
              <br />
              Near the Passport Office.
            </span>
          </p>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}
