import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Check,
  ClipboardCheck,
  FileCheck2,
  Files,
  HeartPulse,
  MessagesSquare,
  RefreshCcw,
} from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { HefamaaExplainer } from "@/components/hefamaa-explainer";
import { QuestionBox } from "@/components/question-box";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { StructuredData } from "@/components/structured-data";
import { buttonVariants } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";
import {
  HEFAMAA_GUIDE,
  HEFAMAA_PATH,
  SITE_URL,
  WHATSAPP_URL,
  BUSINESS_EMAIL,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const TITLE = "HEFAMAA Registration Support in Lagos | Hurkify";
const DESCRIPTION =
  "Get professional HEFAMAA registration and renewal support in Lagos. Hurkify helps healthcare facilities prepare documents, navigate applications, and manage compliance requirements.";
export const metadata = pageMetadata(TITLE, DESCRIPTION, HEFAMAA_PATH);

const SERVICES = [
  {
    icon: FileCheck2,
    title: "New facility registration support",
    text: "Understand the preparation involved, identify gaps in your documents, and organise your application.",
  },
  {
    icon: RefreshCcw,
    title: "Annual renewal assistance",
    text: "Bring renewal records together and plan the work needed for your next renewal cycle.",
  },
  {
    icon: Files,
    title: "Documentation review",
    text: "Review your available documents against the applicable checklist and identify items needing attention.",
  },
  {
    icon: MessagesSquare,
    title: "Application guidance",
    text: "Get practical help navigating the application process and organising follow-up questions.",
  },
  {
    icon: ClipboardCheck,
    title: "Inspection readiness support",
    text: "Prepare your team and documentation for the inspection process, with clear actions to address gaps.",
  },
  {
    icon: HeartPulse,
    title: "Compliance consultation",
    text: "Discuss your facility category, registration stage, and the support that fits your situation.",
  },
];
const NEW_DOCUMENTS = [
  "Letter of intent to the Lagos State Commissioner for Health",
  "CAC registration certificate and tax revenue receipt",
  "LAWMA introduction letter",
  "Stamped HMIS monthly-data letter from the LGA Medical Officer of Health, where applicable",
  "LASRAA card, as listed in the agency guidance",
  "Internal facility sketch and access diagram from Alausa, where applicable",
  "Medical staff credentials",
];
const RENEWAL_DOCUMENTS = [
  "CAC certificate for first-time portal access",
  "Tax revenue receipt and LAWMA medical certificate, where applicable",
  "Stamped HMIS letter, where applicable",
  "Previous registration or renewal certificate",
  "Current practising licences for medical staff",
  "Sworn affidavit and supporting records for relevant operating-officer changes",
];
const PROCESS = [
  [
    "Initial consultation",
    "Tell us your facility category, location, and whether you need registration, renewal, or another form of assistance.",
  ],
  [
    "Facility & document review",
    "We identify available documents, missing items, and questions to clarify with the agency.",
  ],
  [
    "Application preparation",
    "We help organise the applicable documentation and prepare the information needed for your application.",
  ],
  [
    "Submission & follow-up assistance",
    "We guide the submission process and help you organise follow-up actions. You retain control of your facility account.",
  ],
  [
    "Inspection-readiness & renewal planning",
    "We help prepare for the next steps and organise a practical plan for future renewals.",
  ],
];
const FAQS = [
  [
    "What is HEFAMAA registration in Lagos?",
    "It is the agency's process for registering healthcare facilities within its remit in Lagos State. Your facility category determines the applicable requirements. Use the official HEFAMAA website to confirm your category and current instructions.",
  ],
  [
    "Can Hurkify issue a certificate or guarantee approval?",
    "No. Hurkify is an independent support provider. Regulatory approvals and certificates are issued by the relevant authorities. Our role is preparation, documentation review, application guidance, and follow-up assistance.",
  ],
  [
    "Is annual renewal the same as a new registration?",
    "No. Existing facilities have a separate renewal document checklist. We review your previous registration details and current records to help identify what needs updating.",
  ],
  [
    "What documents should I prepare?",
    "Start with the registration or renewal checklist below, then confirm the items applicable to your category using the linked official guidance. Please do not upload documents or ID numbers through this initial enquiry form.",
  ],
  [
    "How long does registration or renewal take?",
    "Timing depends on your facility, document readiness, inspection scheduling, and the agency's review. We discuss the preparation work after an initial review; we do not promise a fixed approval date.",
  ],
  [
    "Which facilities can request support?",
    "Hospitals, clinics, specialist and maternity facilities, diagnostic centres, and other applicable healthcare establishments can discuss their needs with us. Requirements vary by category; the agency determines the relevant classification.",
  ],
  [
    "How do I arrange a consultation and find out the cost?",
    "Complete the consultation form or contact us on WhatsApp. Tell us your facility category and the assistance needed. We discuss the scope and our service fees before work begins; regulatory charges are separate and should be verified with the agency.",
  ],
];

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-mist-200 bg-white p-6 sm:p-8">
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-relaxed text-mist-600"
          >
            <Check size={17} className="mt-0.5 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function HefamaaPage() {
  return (
    <div className="hefamaa-page">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": `${SITE_URL}${HEFAMAA_PATH}#service`,
              name: "HEFAMAA Registration and Renewal Support",
              serviceType:
                "Independent healthcare facility registration support",
              description: DESCRIPTION,
              url: `${SITE_URL}${HEFAMAA_PATH}`,
              areaServed: { "@type": "Place", name: "Lagos, Nigeria" },
              provider: {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: "Hurkify Technology Limited",
                url: `${SITE_URL}/`,
                email: BUSINESS_EMAIL,
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: `${SITE_URL}/`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "HEFAMAA Support",
                  item: `${SITE_URL}${HEFAMAA_PATH}`,
                },
              ],
            },
          ],
        }}
      />
      <section className="relative overflow-hidden bg-mist-50 pb-20 pt-32 sm:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-10">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="mb-7 flex flex-wrap gap-2 text-xs text-mist-600"
            >
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span aria-hidden>/</span>
              <span>HEFAMAA support</span>
            </nav>
            <p className="eyebrow">Healthcare facility support / Lagos</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] tracking-tight text-secondary sm:text-5xl">
              HEFAMAA Registration &amp; Renewal Support in Lagos
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-600 sm:text-lg">
              Hurkify Technology Limited assists healthcare facility owners and
              administrators with registration preparation, documentation,
              application guidance, and annual renewal support.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#consultation"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-primary text-white hover:bg-secondary",
                )}
              >
                Get HEFAMAA Support <ArrowUpRight size={17} />
              </a>
              <a
                href="#requirements"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                View Registration Requirements
              </a>
            </div>
          </div>
          <aside className="rounded-[28px] bg-secondary p-8 text-white">
            <ClipboardCheck size={36} className="text-[#c9b2ff]" />
            <h2 className="mt-6 text-2xl font-bold">
              Clear steps.
              <br />
              Organised support.
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-white/75">
              {[
                "Understand your facility's requirements",
                "Review and organise documentation",
                "Prepare for the next stage",
                "Plan ahead for annual renewal",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#c9b2ff]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-white/15 pt-5 text-xs leading-relaxed text-white/65">
              Independent assistance from Hurkify. Regulatory decisions remain
              with the relevant authorities.
            </p>
          </aside>
        </div>
      </section>

      <HefamaaExplainer />

      <section className="border-y border-mist-200 bg-mist-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <div>
              <p className="eyebrow">How we can help</p>
              <h2 className="section-title">
                Support for <span className="text-primary">each stage</span> of
                the process.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-mist-600 lg:justify-self-end">
              From the first document review to your next renewal, choose
              practical support around the stage your facility has reached.
            </p>
          </div>
          <div className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="group grid grid-cols-[32px_1fr] items-start gap-4 border-t border-mist-200 py-6"
              >
                <Icon
                  size={23}
                  strokeWidth={1.5}
                  aria-hidden
                  className="mt-0.5 text-primary"
                />
                <div>
                  <h3 className="text-base font-semibold leading-snug text-secondary">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-600">
                    {text}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <a
            href="#consultation"
            className="mt-5 inline-flex min-h-11 items-center gap-3 border-b border-primary/25 text-sm font-semibold text-primary hover:border-primary"
          >
            Find the right support for your facility{" "}
            <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
          <div>
            <p className="eyebrow">Facilities supported</p>
            <h2 className="section-title">
              Different facilities.
              <br />
              <span className="text-primary">Considered support.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-mist-600">
              Hospitals, clinics, specialist facilities, maternity facilities,
              diagnostic centres, and other applicable healthcare establishments
              can request a consultation. Requirements differ by facility
              category.
            </p>
            <p className="mt-5 max-w-md border-l-2 border-primary/25 pl-4 text-xs leading-relaxed text-mist-600">
              Your facility category shapes the preparation. We clarify the
              support you need before agreeing the scope of work.
            </p>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {[
              ["Hospitals", "Preparation across facility records and teams"],
              ["Clinics", "Support around your registration stage"],
              ["Specialist facilities", "Guidance for your service category"],
              [
                "Maternity facilities",
                "Organised documentation and next steps",
              ],
              ["Diagnostic centres", "A review of applicable requirements"],
              ["Other facilities", "Start with a category consultation"],
            ].map(([name, detail]) => (
              <li
                key={name}
                className="flex items-start gap-3 border-t border-mist-200 py-5"
              >
                <Building2
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden
                  className="mt-0.5 shrink-0 text-primary/75"
                />
                <div>
                  <h3 className="text-sm font-semibold text-secondary">
                    {name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-mist-600">
                    {detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="requirements" className="bg-mist-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">Registration requirements</p>
          <h2 className="section-title">
            A starting checklist for{" "}
            <span className="text-primary">your documents.</span>
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-mist-600">
            The checklist summarises the agency&apos;s published portal
            guidance, reviewed on 15 October 2026. Confirm current instructions
            and your facility category before applying. It is not an exhaustive
            or universal list.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Checklist title="New registration" items={NEW_DOCUMENTS} />
            <Checklist
              title="Existing facilities / renewal"
              items={RENEWAL_DOCUMENTS}
            />
          </div>
          <div className="mt-6 rounded-xl border border-mist-200 bg-white p-6 text-sm leading-relaxed text-mist-600">
            <p>
              <strong className="text-secondary">Category exceptions:</strong>{" "}
              The guide exempts mobile clinics, ambulances, and home-care
              services from diagrams and the renewal LAWMA medical certificate.
              Diagnostic facilities, laboratories, and eye centres are exempt
              from LGA HMIS clearance. Confirm how exceptions apply to your
              facility.
            </p>
            <a
              href={HEFAMAA_GUIDE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-semibold text-primary"
            >
              Read the official registration and renewal guideline{" "}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Our process</p>
            <h2 className="section-title">
              Practical support,{" "}
              <span className="text-primary">one step at a time.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-mist-600">
              A clear sequence, shared responsibilities, and an organised view
              of what comes next. We agree on the scope before preparation
              begins.
            </p>
            <a
              href="#consultation"
              className="mt-6 inline-flex min-h-11 items-center gap-3 border-b border-primary/25 text-sm font-semibold text-primary hover:border-primary"
            >
              Start with a consultation <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
          <ol className="divide-y divide-mist-200 border-y border-mist-200">
            {PROCESS.map(([title, text], i) => (
              <li
                key={title}
                className="grid grid-cols-[32px_1fr] gap-4 py-6 sm:grid-cols-[40px_1fr] sm:gap-6"
              >
                <span
                  aria-hidden
                  className="font-display text-xl font-medium leading-snug tracking-tight text-primary/60"
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-secondary">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-600">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="annual-renewal" className="bg-secondary py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9b2ff]">
              Annual renewal support
            </p>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Keep your next renewal
              <br />
              <span className="text-[#c9b2ff]">
                on your team&apos;s agenda.
              </span>
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-white/75">
              We help you organise compliance records, review document
              readiness, and prepare for renewal. Start the conversation early
              so there is time to identify missing information and clarify the
              next steps.
            </p>
            <a
              href="#consultation"
              className={cn(buttonVariants({ size: "lg" }), "mt-7")}
            >
              Discuss your renewal <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="eyebrow">Why choose Hurkify</p>
          <h2 className="section-title">
            A practical partner for{" "}
            <span className="text-primary">your preparation.</span>
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "Organised documentation",
                "A clear view of the records available, the gaps to address, and the actions to take.",
              ],
              [
                "Clear communication",
                "An agreed scope of support and straightforward explanations of the work involved.",
              ],
              [
                "Healthcare technology knowledge",
                "Experience with facility workflows and digital systems alongside documentation support.",
              ],
            ].map(([title, text]) => (
              <article key={title}>
                <h3 className="text-lg font-bold text-secondary">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-600">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="eyebrow">Common questions</p>
          <h2 className="section-title">Before you begin.</h2>
          <div className="mt-9 divide-y divide-mist-200">
            {FAQS.map(([question, answer]) => (
              <details key={question} className="py-5">
                <summary className="cursor-pointer pr-3 text-base font-semibold text-secondary">
                  {question}
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-mist-600">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="consultation" className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
          <div>
            <p className="eyebrow">Arrange a consultation</p>
            <h2 className="section-title">
              Let&apos;s understand
              <br />
              what your facility needs.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-mist-600">
              Share a few details so we can discuss a suitable scope of
              assistance. This enquiry does not submit an application to
              HEFAMAA.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Prefer WhatsApp? Talk to our team <ArrowUpRight size={16} />
            </a>
          </div>
          <EnquiryForm kind="hefamaa" />
        </div>
      </section>
      <QuestionBox />
      <section className="bg-mist-50 py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div>
            <h2 className="text-2xl font-bold text-secondary">
              Ready to plan your next step?
            </h2>
            <p className="mt-2 text-sm text-mist-600">
              Start with a conversation about your facility.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#consultation"
              className={cn(
                buttonVariants(),
                "bg-primary text-white hover:bg-secondary",
              )}
            >
              Request consultation
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants(),
                "bg-[#25D366] text-[#052e16] hover:bg-[#20bd5a] focus-visible:ring-[#25D366]",
              )}
            >
              <WhatsAppIcon />
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
