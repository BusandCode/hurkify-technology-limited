import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { BUSINESS_EMAIL } from "@/lib/site";

export const metadata = pageMetadata(
  "Privacy notice | Hurkify Technology Limited",
  "How Hurkify handles website enquiries, contact information, and privacy requests.",
  "/privacy/",
);
export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-36">
      <p className="eyebrow">Your information</p>
      <h1 className="section-title">Website enquiry privacy notice</h1>
      <div className="mt-8 space-y-7 text-base leading-relaxed text-mist-600">
        <section>
          <h2 className="mb-3 text-xl font-bold text-secondary">
            Who handles your enquiry
          </h2>
          <p>
            Hurkify Technology Limited, Lagos, Nigeria, uses the information you
            provide to respond to your enquiry and discuss the services you
            request. For privacy questions, contact{" "}
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="text-primary underline"
            >
              {BUSINESS_EMAIL}
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold text-secondary">
            Information we request
          </h2>
          <p>
            Our general form requests your name, email, service of interest, and
            message, with optional phone and company details. The HEFAMAA
            consultation form also requests a phone or WhatsApp number and the
            assistance needed, with optional facility details and additional
            information. Both ask for your agreement to this use of your
            details.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold text-secondary">
            Healthcare community
          </h2>
          <p>
            When enabled, the healthcare community uses Supabase to store shared
            questions and replies. Google sign-in identifies contributors;
            Supabase stores the authentication session in your browser. Your
            display name, contribution, and posting date are visible publicly
            after review. Your email address is not included in the public
            discussion table. Pending contributions are visible to you and
            authorised moderators. These posts are not sent through Formspree.
            Do not post patient information or confidential documents. Contact
            us to request removal of your contributions. Supabase may process
            data outside Nigeria; see{" "}
            <a href="https://supabase.com/privacy" className="text-primary underline" target="_blank" rel="noopener noreferrer">Supabase&apos;s privacy policy</a>.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold text-secondary">
            Submitting an enquiry form
          </h2>
          <p>
            When online submissions are enabled and you press send, your details
            and a submission timestamp are sent over HTTPS to Formspree for
            processing and email notification to Hurkify. Formspree may process
            submissions outside Nigeria and retain submissions under the
            configured account settings. See{" "}
            <a
              href="https://formspree.io/legal/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Formspree&apos;s privacy policy
            </a>
            . If online submissions are unavailable, use our direct email or
            WhatsApp links instead.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold text-secondary">
            Purpose, access, and retention
          </h2>
          <p>
            We use enquiry information to respond to your request and arrange
            the services you ask about. Enquiries are intended for authorised
            Hurkify team members and our communication and submission providers.
            Information may be retained in our email account and Formspree
            dashboard while handling the enquiry and any resulting business
            relationship, subject to applicable record-keeping obligations.
            Contact us to ask about retention or request deletion.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold text-secondary">
            What not to share
          </h2>
          <p>
            Do not submit patient records, medical histories, government ID
            numbers, passwords, payment details, or confidential documents in an
            initial enquiry. Ask our team to agree on an appropriate secure
            channel if your project requires confidential material.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold text-secondary">
            Your choices
          </h2>
          <p>
            You may choose not to use these forms and contact us by another
            listed channel. Contact us to request access, correction, or
            deletion of information you have shared, or withdraw your consent.
            Withdrawal does not undo processing already carried out. You may
            also contact the{" "}
            <a
              href="https://ndpc.gov.ng/"
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nigeria Data Protection Commission
            </a>{" "}
            about data protection concerns.
          </p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold text-secondary">
            Direct email and WhatsApp
          </h2>
          <p>
            When you contact us directly, the email or messaging provider you
            choose processes the communication under its own terms. We receive
            the contact information and message you send.
          </p>
        </section>
        <Link href="/" className="inline-block font-semibold text-primary">
          Back to Hurkify →
        </Link>
      </div>
    </article>
  );
}
