"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  enquirySchema,
  GENERAL_SERVICES,
  HEFAMAA_ASSISTANCE,
  isFormspreeEndpoint,
  sendEnquiry,
  type EnquiryKind,
} from "@/lib/enquiries";
import { BUSINESS_EMAIL, WHATSAPP_URL } from "@/lib/site";

export function EnquiryForm({ kind = "general" }: { kind?: EnquiryKind }) {
  const consultation = kind === "hefamaa";
  const endpoint = consultation
    ? process.env.NEXT_PUBLIC_FORMSPREE_HEFAMAA_ENDPOINT ||
      process.env.NEXT_PUBLIC_FORMSPREE_GENERAL_ENDPOINT
    : process.env.NEXT_PUBLIC_FORMSPREE_GENERAL_ENDPOINT;
  const configured = isFormspreeEndpoint(endpoint);
  const lock = useRef(false);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failure, setFailure] = useState("");
  const prefix = `${kind}-enquiry`;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current || success) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;
    const parsed = enquirySchema(kind).safeParse(values);
    setFailure("");
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues)
        next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      const first = form.elements.namedItem(Object.keys(next)[0]);
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    setErrors({});
    if (!configured) {
      setFailure(
        "Online enquiries are not available yet. Please email or WhatsApp our team.",
      );
      return;
    }
    lock.current = true;
    setBusy(true);
    try {
      await sendEnquiry(endpoint, kind, values);
      setSuccess(true);
      form.reset();
    } catch (error) {
      setFailure(
        error instanceof Error
          ? error.message
          : "Unable to confirm your enquiry. Please contact us directly.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  const inputClass =
    "border-mist-200 bg-white text-secondary focus:border-primary focus:ring-primary/25";
  function field(
    name: string,
    label: string,
    required = false,
    type = "text",
    maxLength = 160,
    autoComplete?: string,
  ) {
    const id = `${prefix}-${name}`;
    return (
      <div key={name}>
        <Label htmlFor={id}>
          {label}
          {required ? " *" : " (optional)"}
        </Label>
        <Input
          id={id}
          name={name}
          type={type}
          maxLength={maxLength}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${id}-error` : undefined}
          className={inputClass}
        />
        {errorText(name)}
      </div>
    );
  }
  function errorText(name: string) {
    return errors[name] ? (
      <p id={`${prefix}-${name}-error`} className="mt-2 text-xs text-red-700">
        {errors[name]}
      </p>
    ) : null;
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      aria-busy={busy}
      className="rounded-2xl border border-mist-200 bg-mist-50 p-6 text-secondary sm:p-8"
    >
      <h3 className="text-xl font-bold">
        {consultation
          ? "Request a HEFAMAA consultation"
          : "Start a project enquiry"}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-mist-600">
        {consultation
          ? "Tell us about your facility and the support you need."
          : "Share your goals and the service you need."}{" "}
        Fields marked * are required.
      </p>
      {!configured && (
        <p
          role="status"
          className="mt-5 rounded-lg border border-primary/15 bg-white p-3 text-sm leading-relaxed"
        >
          Online submissions are currently unavailable.{" "}
          <a
            className="font-semibold text-primary underline"
            href={`mailto:${BUSINESS_EMAIL}`}
          >
            Email our team
          </a>{" "}
          or{" "}
          <a
            className="font-semibold text-primary underline"
            href={WHATSAPP_URL}
          >
            contact us on WhatsApp
          </a>
          .
        </p>
      )}
      <fieldset
        disabled={busy || success}
        className="mt-7 space-y-5 disabled:opacity-70"
      >
        <legend className="sr-only">
          {consultation ? "HEFAMAA consultation details" : "Contact details"}
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          {field("name", "Full name", true, "text", 120, "name")}
          {field("email", "Email address", true, "email", 254, "email")}
        </div>
        {field(
          "phone",
          consultation ? "Phone / WhatsApp number" : "Phone number",
          consultation,
          "tel",
          30,
          "tel",
        )}
        {consultation ? (
          <>
            {field("facilityName", "Healthcare facility name")}
            {field("facilityCategory", "Facility category", false, "text", 100)}
            {field("facilityLocation", "Facility location", false, "text", 200)}
          </>
        ) : (
          field("company", "Company", false, "text", 160, "organization")
        )}
        <div>
          <Label htmlFor={`${prefix}-service`}>
            {consultation ? "Assistance required" : "Service of interest"} *
          </Label>
          <select
            name={consultation ? "assistance" : "service"}
            id={`${prefix}-service`}
            defaultValue=""
            required
            aria-invalid={!!errors[consultation ? "assistance" : "service"]}
            aria-describedby={
              errors[consultation ? "assistance" : "service"]
                ? `${prefix}-${consultation ? "assistance" : "service"}-error`
                : undefined
            }
            className="h-11 w-full rounded-lg border border-mist-200 bg-white px-3 text-sm"
          >
            <option value="" disabled>
              Select an option
            </option>
            {(consultation ? HEFAMAA_ASSISTANCE : GENERAL_SERVICES).map(
              (option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ),
            )}
          </select>
          {errorText(consultation ? "assistance" : "service")}
        </div>
        <div>
          <Label htmlFor={`${prefix}-message`}>
            {consultation
              ? "Additional information (optional)"
              : "Tell us about your project *"}
          </Label>
          <Textarea
            name="message"
            id={`${prefix}-message`}
            rows={4}
            maxLength={3000}
            required={!consultation}
            className={inputClass}
            aria-invalid={!!errors.message}
            aria-describedby={`${prefix}-message-help${errors.message ? ` ${prefix}-message-error` : ""}`}
          />
          <p
            id={`${prefix}-message-help`}
            className="mt-2 text-xs leading-relaxed text-mist-600"
          >
            Do not include patient records, medical histories, ID numbers,
            passwords, or sensitive documents.
          </p>
          {errorText("message")}
        </div>
        <div aria-hidden="true" className="hidden">
          <label htmlFor={`${prefix}-website`}>Leave this field empty</label>
          <input
            name="_gotcha"
            id={`${prefix}-website`}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="flex items-start gap-3 text-xs leading-relaxed text-mist-600">
            <input
              name="consent"
              value="yes"
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
              aria-invalid={!!errors.consent}
              aria-describedby={
                errors.consent ? `${prefix}-consent-error` : undefined
              }
            />
            <span>
              I agree to Hurkify using these details to respond to my enquiry,
              with submission processing by Formspree, as described in the{" "}
              <Link href="/privacy/" className="text-primary underline">
                privacy notice
              </Link>
              . *
            </span>
          </label>
          {errorText("consent")}
        </div>
        <button
          disabled={!configured || busy || success}
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? (
            <>
              <LoaderCircle className="animate-spin" size={17} />
              Sending enquiry…
            </>
          ) : (
            <>
              {consultation ? "Request consultation" : "Send enquiry"}
              <ArrowUpRight size={17} />
            </>
          )}
        </button>
      </fieldset>
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          Please check the highlighted fields.
        </p>
      )}
      {failure && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800"
        >
          {failure}
        </p>
      )}
      {success && (
        <div
          role="status"
          className="mt-5 rounded-lg bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-800"
        >
          Thank you. Your enquiry has been accepted by our submission service.
          Our team will review it and respond using your contact details.
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="mt-3 block font-semibold underline"
          >
            Start another enquiry
          </button>
        </div>
      )}
      <noscript>
        <p className="mt-4 text-sm">
          Enable JavaScript to submit this form, or email{" "}
          <a href={`mailto:${BUSINESS_EMAIL}`} className="underline">
            {BUSINESS_EMAIL}
          </a>
          .
        </p>
      </noscript>
    </form>
  );
}
