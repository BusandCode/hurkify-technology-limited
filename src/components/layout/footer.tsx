import Image from "next/image";
import Link from "next/link";
import { FooterGlow } from "@/components/layout/footer-glow";
import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  HEFAMAA_PATH,
  COMMUNITY_PATH,
  WHATSAPP_URL,
} from "@/lib/site";

const COMPANY_LINKS = [
  { label: "About Hurkify", href: "/#about" },
  { label: "Selected projects", href: "/#projects" },
  { label: "Our approach", href: "/#process" },
  { label: "Meet the team", href: "/#team" },
];
const SERVICE_LINKS = [
  { label: "HEFAMAA support community", href: COMMUNITY_PATH },
  { label: "Software & websites", href: "/#services" },
  { label: "IT consulting & support", href: "/#services" },
  { label: "HEFAMAA registration", href: HEFAMAA_PATH },
  { label: "Annual renewal support", href: `${HEFAMAA_PATH}#annual-renewal` },
];

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="footer-shell relative isolate mt-8 border border-primary/15 bg-mist-50 sm:mt-12"
    >
      <FooterGlow />
      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-10 lg:pt-16">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_1fr_1.2fr]">
          <div>
            <Link
              href="/#home"
              aria-label="Hurkify Technology Limited home"
              className="inline-flex items-center gap-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden">
                <Image
                  src="/hurkify-icon.png"
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 scale-[1.4] object-contain"
                />
              </span>
              <span
                aria-hidden="true"
                className="font-display text-2xl font-extrabold leading-none tracking-[-0.035em] text-primary"
              >
                urkify
                <span className="mt-1.5 block text-[8px] font-semibold uppercase leading-none tracking-[0.12em] text-primary/75">
                  Technology Limited
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs font-display text-base font-bold leading-relaxed text-secondary">
              Technology that works for you.
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist-600">
              Practical software, IT consulting, and healthcare technology
              support for businesses across Nigeria.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-mist-600">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-primary"
              />
              Based in Lagos. Built for your business.
            </span>
          </div>

          <nav aria-label="Footer company links">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-secondary">
              Company
            </h2>
            <ul className="mt-6 space-y-4">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-mist-600 transition-colors hover:text-primary hover:underline underline-offset-4"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer service links">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-secondary">
              Our expertise
            </h2>
            <ul className="mt-6 space-y-4">
              {SERVICE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-mist-600 transition-colors hover:text-primary hover:underline underline-offset-4"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-secondary">
              Stay in touch
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-mist-600">
              <li>
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="group flex items-start gap-3 hover:text-primary"
                >
                  <Mail
                    aria-hidden
                    size={16}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span className="min-w-0 break-words">{BUSINESS_EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+2349045083581"
                  className="flex items-center gap-3 hover:text-primary"
                >
                  <Phone
                    aria-hidden
                    size={16}
                    className="shrink-0 text-primary"
                  />
                  {BUSINESS_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:text-primary"
                >
                  <MessageCircle
                    aria-hidden
                    size={16}
                    className="shrink-0 text-primary"
                  />
                  Chat on WhatsApp
                  <ArrowUpRight aria-hidden size={13} />
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  aria-hidden
                  size={16}
                  className="mt-1 shrink-0 text-primary"
                />
                <address className="not-italic leading-relaxed">
                  6, Asabi Cole Street,
                  <br />
                  Alausa, Ikeja, Lagos.
                  <span className="mt-1 block text-xs">
                    Near the Passport Office.
                  </span>
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-mist-200 py-6 text-xs leading-relaxed text-mist-600 sm:mt-14 lg:flex-row lg:items-center lg:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Hurkify Technology Limited. All
            rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span>Registered in Nigeria</span>
            <Link
              href="/privacy/"
              className="hover:text-primary hover:underline underline-offset-4"
            >
              Privacy notice
            </Link>
            <a
              href="#main-content"
              className="inline-flex items-center gap-2 font-semibold text-primary"
            >
              Back to top
              <ArrowUp aria-hidden size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
