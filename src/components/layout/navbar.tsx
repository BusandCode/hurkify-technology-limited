"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav-links";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [open]);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-mist-200 bg-white/95 backdrop-blur-lg">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-10"
      >
        <Link
          href="/#home"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-0.5"
          aria-label="Hurkify Technology Limited home"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden">
            <Image
              src="/hurkify-icon.png"
              alt=""
              width={36}
              height={36}
              preload
              className="h-9 w-9 scale-[1.4] object-contain"
            />
          </span>
          <span
            aria-hidden="true"
            className="font-display text-lg font-extrabold leading-none tracking-[-0.035em] text-primary"
          >
            urkify
            <span className="mt-1 block text-[7px] font-semibold uppercase leading-none tracking-[0.08em] text-primary/75">
              Technology Limited
            </span>
          </span>
        </Link>
        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={`/${link.href}`}
                className="nav-link text-sm font-medium text-mist-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#contact"
          className="nav-cta hidden items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-secondary lg:inline-flex"
        >
          Let&apos;s talk <ArrowUpRight size={16} />
        </Link>
        <button
          ref={toggle}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-secondary lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <div
        id="mobile-navigation"
        hidden={!open}
        className="border-t border-mist-200 bg-white lg:hidden"
      >
        <ul className="mx-auto max-w-7xl space-y-1 px-6 py-5">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={`/${link.href}`}
                onClick={() => setOpen(false)}
                className="nav-mobile-link block rounded-lg px-3 py-3 text-sm font-medium text-secondary hover:bg-mist-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-lg bg-primary px-3 py-3 text-center text-sm font-semibold text-white"
            >
              Discuss your project
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
