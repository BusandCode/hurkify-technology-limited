"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav-links";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-accent transition-shadow duration-300",
        scrolled && "shadow-[0_1px_0_0_rgba(0,0,0,0.12)]"
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a
          href="#home"
          className="flex items-center transition-transform duration-200 hover:scale-105"
        >
          <Image
            src="/hurkify.png"
            alt="Hurkify Technology Limited"
            width={44}
            height={44}
            priority
            className="h-15 w-15 object-cover sm:h-15 sm:w-15"
          />
        </a>

        <ul className="hidden items-center gap-2 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-black hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={cn(
            buttonVariants({ size: "sm" }),
            "hidden bg-black text-white transition-colors duration-200 hover:bg-white hover:text-black lg:inline-flex"
          )}
        >
          Talk to us
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-md p-1.5 text-white transition-colors duration-200 hover:bg-black lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-accent lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-black"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "w-full bg-black text-white transition-colors duration-200 hover:bg-white hover:text-black"
                  )}
                >
                  Talk to us
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}