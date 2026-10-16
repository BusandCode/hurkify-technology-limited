# Hurkify Technology Limited

Company website built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Local development

```sh
npm ci
# Copy .env.example to .env.local and configure the public Formspree endpoint.
npm run dev
```

Open http://localhost:3000. On Windows PowerShell with script execution disabled, use `npm.cmd` instead of `npm`.

## Verification and deployment

```sh
npm run lint
npm run test
npm run build:static
npm run check:seo
```

Static deployment remains the default for existing cPanel compatibility; files are generated in `out/`. `npm run build:node` prepares a Next.js server build when the hosting runtime is verified. The build needs internet access for Google Fonts. The shared managed-form integration works with either deployment target.

## Enquiries

The general contact and HEFAMAA consultation forms submit to a business-owned Formspree endpoint. Set `NEXT_PUBLIC_FORMSPREE_GENERAL_ENDPOINT` before building; optionally set `NEXT_PUBLIC_FORMSPREE_HEFAMAA_ENDPOINT` to a separate endpoint. Configure and verify notifications to `hurkifytechnology@gmail.com` in Formspree. The endpoint is public; no secret keys are needed in frontend code.

Without a configured endpoint, send is disabled and direct email/WhatsApp options remain available. Success requires provider acknowledgement. The supplied endpoint is configured locally, and the owner confirmed receipt of both controlled general and HEFAMAA test notifications. See [verification results](docs/VERIFICATION.md) for remaining checks; mocked tests are recorded separately from live delivery.

See [the implementation handover](docs/IMPLEMENTATION-HANDOVER.md) for the audit, architecture, owner privacy review, provider configuration, hosting assessment, deployment steps, rollback, and Search Console checklist. No production deployment is performed automatically.

## Content and assets

- Homepage sections live in `src/sections/`; navigation lives in `src/lib/nav-links.ts`.
- The company confirmed its published figures, project claims, and testimonials during the website review. These remain on the homepage.
- Project scope disclosures replace non-functional project links. The first three cards use graphic title panels; Hurkfin uses its supplied image.
- Optimised WebP portraits and the Hurkfin image are served on the homepage. Original images remain in `public/`.
- The dedicated healthcare page is `/hefamaa-registration-lagos/`; the privacy notice is `/privacy/`.
- The owner confirmed the canonical domain is `https://hurkifytechologylimited.com/`. Preserve the `techology` spelling.
- Confirm the founder's preferred public name before reusing promotional artwork: the supplied banner and biography use different names.

Sanity and Supabase scaffolding is present but is not used by the current homepage enquiry flow.
