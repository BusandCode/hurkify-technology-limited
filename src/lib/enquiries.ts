import { z } from "zod";

export const GENERAL_SERVICES = [
  "IT Consulting & Digital Transformation",
  "Software Development",
  "Website Development",
  "Healthcare Compliance Support (HEFAMAA)",
  "EMR & Health-Tech Solutions",
  "Cloud & Technical Support",
  "Branding & Interface Design",
  "Not sure yet",
] as const;
export const HEFAMAA_ASSISTANCE = [
  "New registration",
  "Annual renewal",
  "Documentation support",
  "Inspection readiness",
  "General consultation",
] as const;
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please use ${max} characters or fewer`)
    .default("");
const phone = z
  .string()
  .trim()
  .max(30)
  .regex(/^\+?[\d\s().-]{7,30}$/, "Enter a valid phone or WhatsApp number");
const common = {
  name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.email("Enter a valid email address").max(254),
  consent: z.literal("yes", {
    error: "Please agree to the privacy notice to continue",
  }),
  _gotcha: z
    .literal("", {
      error: "Unable to submit this enquiry. Please contact us directly.",
    })
    .default(""),
};
export const generalEnquirySchema = z.object({
  ...common,
  phone: z.union([z.literal(""), phone]).default(""),
  company: optionalText(160),
  service: z.enum(GENERAL_SERVICES, { error: "Select a service" }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more about what you need")
    .max(3000),
});
export const hefamaaEnquirySchema = z.object({
  ...common,
  phone,
  facilityName: optionalText(160),
  facilityCategory: optionalText(100),
  facilityLocation: optionalText(200),
  assistance: z.enum(HEFAMAA_ASSISTANCE, {
    error: "Select the assistance you need",
  }),
  message: optionalText(3000),
});
export type EnquiryKind = "general" | "hefamaa";
export const enquirySchema = (kind: EnquiryKind) =>
  kind === "general" ? generalEnquirySchema : hefamaaEnquirySchema;

export function isFormspreeEndpoint(
  value: string | undefined,
): value is string {
  return !!value && /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(value);
}

// HTTP acceptance is not a guarantee that a recipient's mailbox delivered the email.
export async function sendEnquiry(
  endpoint: string,
  kind: EnquiryKind,
  values: Record<string, string>,
  fetcher: typeof fetch = fetch,
) {
  if (!isFormspreeEndpoint(endpoint))
    throw new Error(
      "Online enquiries are not available yet. Please email or WhatsApp our team.",
    );
  const parsed = enquirySchema(kind).safeParse(values);
  if (!parsed.success) throw new Error("Please check the highlighted fields.");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetcher(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        ...parsed.data,
        _subject: `New ${kind === "hefamaa" ? "HEFAMAA Consultation" : "Contact"} Enquiry — Hurkify Website`,
        enquiryType: kind,
        submittedAt: new Date().toISOString(),
      }),
    });
    if (response.status === 429)
      throw new Error(
        "Too many requests. Please wait a few minutes or contact us directly.",
      );
    if (!response.ok)
      throw new Error(
        "Your enquiry could not be accepted. Please try again later or contact us directly.",
      );
    const result = await response.json();
    if (result?.ok !== true || result?.errors?.length)
      throw new Error(
        "We could not confirm acceptance. Please contact our team directly.",
      );
  } catch (error) {
    if (error instanceof SyntaxError)
      throw new Error(
        "We could not confirm acceptance. Please contact our team directly before trying again.",
      );
    if (error instanceof Error && error.name === "AbortError")
      throw new Error(
        "The request timed out and may have been received. Please contact us directly before submitting again.",
      );
    if (error instanceof TypeError)
      throw new Error(
        "We could not confirm your submission. Check your connection or contact us directly before trying again.",
      );
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
