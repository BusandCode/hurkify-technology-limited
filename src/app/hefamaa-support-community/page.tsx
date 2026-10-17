import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { QuestionBox } from "@/components/question-box";
import { StructuredData } from "@/components/structured-data";
import { pageMetadata } from "@/lib/seo";
import { COMMUNITY_PATH, HEFAMAA_PATH, SITE_URL } from "@/lib/site";

const TITLE = "HEFAMAA Support Community | Questions & Answers | Hurkify";
const DESCRIPTION =
  "Ask HEFAMAA registration and renewal questions in Hurkify's healthcare community. Read public discussions and share practical experiences with healthcare facility teams in Lagos.";
export const metadata = pageMetadata(TITLE, DESCRIPTION, COMMUNITY_PATH);

export default function HealthcareCommunityPage() {
  return (
    <div className="hefamaa-page">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}${COMMUNITY_PATH}#page`,
          url: `${SITE_URL}${COMMUNITY_PATH}`,
          name: TITLE,
          description: DESCRIPTION,
          inLanguage: "en-NG",
          publisher: {
            "@type": "Organization",
            name: "Hurkify Technology Limited",
            url: SITE_URL,
          },
        }}
      />
      <header className="mx-auto max-w-7xl px-6 pb-6 pt-28 lg:px-10">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap gap-2 text-xs text-mist-600"
        >
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span>HEFAMAA support community</span>
        </nav>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="max-w-3xl text-secondary">
              HEFAMAA <span className="text-primary">community.</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist-600">
              A room for healthcare teams to ask, share, and find their next
              step.
            </p>
          </div>
          <Link
            href={HEFAMAA_PATH}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-mist-600 hover:text-primary"
          >
            Registration support guide <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </header>
      <QuestionBox />
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <p className="max-w-3xl text-xs leading-relaxed text-mist-600">
          Hurkify is an independent support provider. This community is not an
          official HEFAMAA channel. Contributions are reviewed before
          publication; responses depend on community and team participation. For
          regulatory decisions and current requirements, consult the{" "}
          <a
            href="https://hefamaa.lagosstate.gov.ng/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            official HEFAMAA website
          </a>
          .
        </p>
      </div>
    </div>
  );
}
