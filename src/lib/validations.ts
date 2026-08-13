import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  company: z.string().trim().optional().or(z.literal("")),
  service: z.string().trim().min(1, "Select a service"),
  message: z.string().trim().min(10, "Tell us a bit more about what you need"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const SERVICE_OPTIONS = [
  "IT Consulting & Digital Transformation",
  "Software Development",
  "Healthcare Compliance Support (HEFAMAA)",
  "EMR & Health-Tech Solutions",
  "Website Development",
  "Cloud & Technical Support",
] as const;
