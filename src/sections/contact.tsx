"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  MessageCircle,
  Phone,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
} from "lucide-react";
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
  {
    icon: Mail,
    label: "Email",
    value: "hello@hurkify.com",
    href: "mailto:hello@hurkify.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 9045 083 581",
    href: "tel: +2349045083581",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with our team",
    href: "https://wa.me/2349045083581",
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
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-primary py-24 sm:py-28"
    >
      {/* Decorative background: dot grid + soft glow, same visual language as Hero/Services */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{ background: "rgba(26,11,46,0.5)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Get in touch
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Let&rsquo;s talk about your next system.
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
              Tell us what you&rsquo;re working with and what you need. We
              typically respond within one business day.
            </p>

            {/* Response-time badge — clearer visual weight than plain text */}
            <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/10 px-4 py-3">
              <Clock size={16} className="shrink-0 text-white" />
              <span className="text-sm font-medium text-white">
                Average first response: under 24 hours
              </span>
            </div>

            {/* Contact channels as clear cards, not faint links */}
            <div className="mt-8 space-y-3">
              {CONTACT_CHANNELS.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 transition-colors hover:border-white/30 hover:bg-white/15"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                    <Icon size={18} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-white/60">
                      {label}
                    </span>
                    <span className="block text-sm font-semibold text-white">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-white/50 transition-colors group-hover:text-white"
                  />
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
            className="rounded-2xl border border-white/20 bg-white p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] sm:p-8"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-mist-600">
                  Full name
                </Label>
                <Input
                  id="name"
                  placeholder="Ada Obi"
                  className="border-mist-200 bg-mist-50 text-secondary placeholder:text-mist-400 focus:border-primary focus:ring-primary/25"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="text-mist-600">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="border-mist-200 bg-mist-50 text-secondary placeholder:text-mist-400 focus:border-primary focus:ring-primary/25"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="company" className="text-mist-600">
                  Company (optional)
                </Label>
                <Input
                  id="company"
                  placeholder="Company name"
                  className="border-mist-200 bg-mist-50 text-secondary placeholder:text-mist-400 focus:border-primary focus:ring-primary/25"
                  {...register("company")}
                />
              </div>
              <div>
                <Label htmlFor="service" className="text-mist-600">
                  Service needed
                </Label>
                <select
                  id="service"
                  defaultValue=""
                  {...register("service")}
                  className="h-11 w-full rounded-lg border border-mist-200 bg-mist-50 px-4 text-sm text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">
                    {errors.service.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <Label htmlFor="message" className="text-mist-600">
                Message
              </Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="What are you looking to build or fix?"
                className="border-mist-200 bg-mist-50 text-secondary placeholder:text-mist-400 focus:border-primary focus:ring-primary/25"
                {...register("message")}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
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
                  "mt-4 flex items-start gap-2 rounded-lg px-4 py-3 text-sm font-medium",
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
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