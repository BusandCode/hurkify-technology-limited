"use server";

import { Resend } from "resend";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import { supabase } from "@/supabase/client";

export type ContactActionResult = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  values: ContactFormValues
): Promise<ContactActionResult> {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check the form for errors and try again.",
    };
  }

  const { name, email, company, service, message } = parsed.data;

  // Persist the lead in Supabase. Table: contact_submissions
  // (id uuid default gen_random_uuid() pk, name text, email text, company text,
  //  service text, message text, created_at timestamptz default now())
  const { error: dbError } = await supabase.from("contact_submissions").insert({
    name,
    email,
    company: company || null,
    service,
    message,
  });

  if (dbError) {
    console.error("Supabase insert failed:", dbError.message);
    // Don't block the email notification on a DB failure.
  }

  // Notify the team via Resend.
  try {
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL_TO) {
      console.warn(
        "RESEND_API_KEY or CONTACT_EMAIL_TO not set — skipping email send."
      );
    } else {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Hurkify Website <no-reply@hurkify.com>",
        to: process.env.CONTACT_EMAIL_TO,
        replyTo: email,
        subject: `New enquiry: ${service} — ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${
          company || "—"
        }\nService: ${service}\n\nMessage:\n${message}`,
      });
    }
  } catch (err) {
    console.error("Resend send failed:", err);
    return {
      success: false,
      message:
        "Your message was saved, but we couldn't send the notification email. We'll still follow up.",
    };
  }

  return {
    success: true,
    message: "Thanks — we'll get back to you within one business day.",
  };
}
