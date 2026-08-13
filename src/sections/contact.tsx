"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageCircle, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  contactFormSchema,
  SERVICE_OPTIONS,
  type ContactFormValues,
} from "@/lib/validations";
import { submitContactForm } from "@/app/actions/contact";

const CONTACT_CHANNELS = [
  { icon: Mail, label: "hello@hurkify.com", href: "mailto:hello@hurkify.com" },
  { icon: Phone, label: "+234 000 000 0000", href: "tel:+2340000000000" },
  {
    icon: MessageCircle,
    label: "Chat on WhatsApp",
    href: "https://wa.me/2340000000000",
  },
];

export function Contact() {
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus({ type: "idle" });
    const result = await submitContactForm(values);
    setStatus({
      type: result.success ? "success" : "error",
      message: result.message,
    });
    if (result.success) reset();
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-secondary py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Get in touch
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Let&rsquo;s talk about your next system.
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
              Tell us what you&rsquo;re working with and what you need. We
              typically respond within one business day.
            </p>

            <div className="mt-10 space-y-4">
              {CONTACT_CHANNELS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                    <Icon size={16} className="text-accent" />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Ada Obi" {...register("name")} />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-accent">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-accent">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="company">Company (optional)</Label>
                <Input
                  id="company"
                  placeholder="Company name"
                  {...register("company")}
                />
              </div>
              <div>
                <Label htmlFor="service">Service needed</Label>
                <select
                  id="service"
                  defaultValue=""
                  {...register("service")}
                  className="h-11 w-full rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  <option value="" disabled className="text-secondary">
                    Select a service
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option} className="text-secondary">
                      {option}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-1.5 text-xs text-accent">
                    {errors.service.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="What are you looking to build or fix?"
                {...register("message")}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-accent">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(buttonVariants({ size: "lg" }), "mt-7 w-full")}
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>

            {status.type !== "idle" && (
              <div
                role="status"
                className={cn(
                  "mt-4 flex items-start gap-2 rounded-lg px-4 py-3 text-sm",
                  status.type === "success"
                    ? "bg-emerald-500/10 text-emerald-300"
                    : "bg-accent/10 text-accent"
                )}
              >
                {status.type === "success" ? (
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                )}
                {status.message}
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
