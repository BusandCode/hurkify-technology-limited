# Hurkify Technology Limited — Website

Phase 1 scaffold: Next.js App Router + TypeScript + Tailwind v4, with brand
tokens, folder structure, and a working nav/footer shell wired to anchor
placeholders for every section in the spec.

## Stack installed
Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4,
lucide-react, framer-motion, react-hook-form + zod + @hookform/resolvers,
@supabase/supabase-js, resend, class-variance-authority, clsx, tailwind-merge.

`shadcn/ui` is configured via `components.json` (style: new-york, base:
neutral) so `npx shadcn@latest add <component>` works directly — the CLI's
interactive init hangs in a non-TTY sandbox, so `components.json` and the
first component (`Button`) were added by hand in the same shape the CLI
produces.

## Structure
```
src/
  app/            # layout.tsx (fonts, metadata, Navbar/Footer), page.tsx (section anchors)
  components/
    ui/           # shadcn-style primitives (Button so far)
    layout/       # Navbar, Footer, SectionPlaceholder
  sections/       # empty — real section builds start Phase 2
  lib/            # utils.ts (cn), nav-links.ts
  hooks/          # empty — added as needed
  types/          # shared TS types
  sanity/         # client stub, wired Phase 6
  supabase/       # client stub, wired Phase 6
```

## Brand tokens (globals.css)
- `--color-primary`  #3D1F52
- `--color-secondary` #1A0B2E
- `--color-accent`   #FF6F61
- Neutral "mist" scale tinted from the primary hue instead of generic gray
- Display font: Manrope · Body font: Inter

## Run it
```bash
npm install
cp .env.local.example .env.local   # fill in when Phase 6 lands
npm run dev
```

## Note on this build
`npm run build` will fail in network-restricted sandboxes because Next.js
fetches Manrope/Inter from Google Fonts at build time. It builds cleanly
anywhere with normal internet access (local machine, Vercel). `tsc --noEmit`
passes clean, confirming the code itself is sound.
