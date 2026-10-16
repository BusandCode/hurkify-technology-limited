# Hurkify implementation handover

## Repository audit and selected architecture

Reviewed 15 October 2026. Next.js 16.3.0 App Router, React 19.2.8, TypeScript, Tailwind v4. Existing header, purple brand, supplied H + urkify wordmark, favicon, section IDs, project content, and verification file are retained. The initial build used `output: "export"`; contact enquiries opened email drafts. Sanity and Supabase scaffolding exist, but there is no configured production enquiry database or email service. No environment files were present at audit time. The existing Vercel config is not evidence of the live Truehost plan.

**Selected: managed Formspree submissions.** Both forms use the same transport and validation. General contact details and HEFAMAA facility details are separate schemas. No new runtime dependency, custom CRM, admin dashboard, or public submission database is introduced. The browser receives only the public Formspree endpoint, never email credentials. Notifications are configured in the business-owned Formspree account for `hurkifytechnology@gmail.com`.

**Alternative: Next.js Node server.** The owner confirms cPanel has Setup Node.js App. The available runtime version, memory allocation, startup mechanism, restart behaviour, and application routing have not been inspected. This feature alone does not establish that this Next.js build will run reliably. The installed Next.js guide requires Node >=20.9; local testing uses Node 24.21.0. Ask Truehost to confirm a supported maintained runtime, sufficient build memory, HTTPS proxying, and persistent process management. Do not follow older tutorials that prescribe Node 16 for this Next.js version.

`next.config.ts` preserves static deployment by default and allows explicit Node deployment through `HURKIFY_DEPLOY_TARGET=node`. `npm run build:static` and `npm run build:node` select the target. Managed form handling works in either mode. Marketing content remains pre-rendered; forms are the interactive client components. Changing modes does not change public page URLs.

## SEO preservation

- Canonical hostname remains exactly `hurkifytechologylimited.com`, without www. No domain spelling correction.
- Homepage title and description match the supplied brief. The homepage canonical is `https://hurkifytechologylimited.com/`.
- HEFAMAA page has its requested unique title, description, and canonical `/hefamaa-registration-lagos/`.
- Privacy has its own canonical `/privacy/`. Root metadata does not inherit a homepage canonical into other pages.
- All three pages include Open Graph and Twitter metadata. Existing favicon is retained.
- Existing `robots.txt` endpoint allows crawling and points to the existing sitemap URL. Sitemap lists all three legitimate pages. No invented change dates or verification tokens.
- Organization, Service and BreadcrumbList JSON-LD describe actual business support; no government association, invented ratings or awards. JSON is escaped safely. FAQ answers are visible HTML; no promised Google FAQ rich result.
- `trailingSlash: true` produces directory index files for direct static-host navigation. In Node mode, Next.js redirects slash variants. Existing `/privacy` requests should redirect to `/privacy/` at the static host.
- Node mode includes a host-based permanent redirect from www to the canonical hostname. Static hosting needs the reviewed Apache template below or equivalent host settings. HTTPS handling must be checked at the real reverse proxy to avoid redirect loops.
- DNS TXT verification, MX, SPF, DKIM and DMARC are not touched. `public/googleb0b2b1f2b08d3229.html` remains unchanged.
- Indexing, canonical selection and Search Console validation cannot be established locally. No success is claimed for those external processes.

## HEFAMAA source review

The page distinguishes registration from renewal and includes category exceptions. It cites the official checklist and discloses independent assistance. No approval guarantee, fixed regulatory timeline, fabricated certificate or government endorsement is used. Page content is a starting guide, not a definitive universal requirements list. Recheck official guidance before deployment and periodically afterwards.

Sources:
- https://hefamaa.lagosstate.gov.ng/
- https://hefamaa.lagosstate.gov.ng/a-quick-guideline-for-registration-renewal-of-health-facility-on-the-e-hefamaa-platform/

## Formspree setup and email delivery

1. In the business-owned Formspree account, create a **Dashboard project** named Hurkify Website and a form named Website Enquiries.
2. Set and verify `hurkifytechnology@gmail.com` as the notification recipient. The project overview URL is not a form endpoint.
3. Open the form's Integration section and copy its public endpoint, `https://formspree.io/f/<form-id>`.
4. Copy `.env.example` to `.env.local` and populate `NEXT_PUBLIC_FORMSPREE_GENERAL_ENDPOINT`. Optionally provide a separate `NEXT_PUBLIC_FORMSPREE_HEFAMAA_ENDPOINT`; otherwise both forms use the general endpoint. Rebuild/restart after changing either public variable.
5. Configure the notification subject to use the submitted subject where supported; the payload includes `_subject`, `enquiryType`, `submittedAt`, contact details and the relevant service/facility fields. Do not rely on a client-provided recipient address. Configure the actual recipient in the dashboard.
6. Verify Formspree spam filtering, the `_gotcha` honeypot, available domain restrictions and rate-limit behaviour. Configure server-side form rules for allowed services, required fields and length limits where supported by the selected plan. If these controls are unavailable or insufficient, evaluate a supported Next.js API with server validation before deployment. Browser validation alone is not a security boundary.
7. Complete any provider CAPTCHA configuration/challenge requirements for the plan and test with this AJAX integration. The integration fails visibly if the provider rejects or cannot confirm acceptance; it never simulates success. Do not disable account protections simply to make a test pass.
8. Send one controlled test from each form using a business-approved test address. Check the dashboard, actual inbox/spam folder, submitted fields, subject, timestamp and reply address. Provider acceptance and inbox delivery are separate checks.
9. Confirm the account's quota and billing plan before launch. Test the provider's blocked-domain, spam and quota responses on staging.

No email API key, SMTP password, database credential or Formspree management token belongs in a `NEXT_PUBLIC_` variable. Only the submission endpoint is public. The endpoint is deliberately restricted to HTTPS `formspree.io/f/...` URLs in code.

### Behaviour

Missing endpoint: forms show unavailability, disable send, and provide direct email/WhatsApp. Valid submissions: client validation, immediate in-flight lock, disabled controls, loading feedback, HTTPS POST, and success only after an explicit provider `ok: true`. HTTP rejection, 429, malformed response, network failure and timeout produce accessible errors. No automatic retries. Timeouts and network failures warn that acceptance is uncertain to reduce duplicate enquiries. A successful form stays disabled until the visitor explicitly starts another enquiry.

The managed service performs server-side processing; its anti-abuse controls and account settings must be verified. The site adds a honeypot and length-limited schemas but does not claim these stop a determined attacker. Submissions are not logged in the application. No patient documents or files are collected.

## Privacy items for owner review before publication

The updated notice explains fields, purpose, consent, Formspree processing, possible processing outside Nigeria, direct communication providers, and privacy requests. It is an operational draft, not a legal-compliance certification.

The owner should review the lawful basis, processor agreement, international-transfer safeguards, actual recipients/access, retention period, deletion process covering both mailbox and Formspree, and any applicable registration/DPO obligations with a qualified adviser. Set a concrete retention schedule in the account and update the notice accordingly. Do not add marketing subscriptions to enquiry consent. No new analytics or marketing cookies are introduced by this implementation; re-evaluate if scripts or provider challenges are added.

Primary regulator references:
- https://ndpc.gov.ng/faqs/
- https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf
- https://formspree.io/legal/privacy-policy/

## Verification commands

The owner supplied the endpoint and confirmed receipt of both controlled test notifications on 15 October 2026. See `docs/VERIFICATION.md` for the evidence and remaining hosting/manual checks. Tests use Node 24.21.0 locally; the TypeScript-import test runner needs a Node version with built-in type stripping (the application itself has Next.js's minimum Node >=20.9).

```sh
npm ci
npm run test
npm run lint
npm run build:static
npm run check:seo
```

Transport tests use a local fetch stub and reserved example.com addresses: no enquiry is sent. They cover both schemas, required fields, email validity, service enums, consent, lengths, honeypot, endpoint allowlist, payload minimisation, acceptance, rejection, 429, network failure and timeout. SEO checks inspect generated HTML and files for canonical count/values, titles, descriptions, Open Graph, one H1, preserved anchors, schema JSON, robots, sitemap, favicon and verification file.

Run `npm run build:node` separately to check the server-capable configuration. To run that build, set `HURKIFY_DEPLOY_TARGET=node` in the runtime environment and use `npm start -- --hostname 127.0.0.1 --port <assigned-port>`. If the cPanel app manager only accepts a startup file rather than this command, obtain its supported Passenger/startup procedure from Truehost and test it on staging. A custom server has not been added speculatively.

Manual checks still required: desktop/mobile rendering, keyboard validation/focus, loading state, duplicate click handling, live provider CAPTCHA/rules/rate limits, actual inbox delivery, Truehost account runtime and process restart. A connected browser is unavailable in this tool session. Do not describe mocked transport tests as live email delivery.

## Deployment and rollback — approval required

No production hosting, DNS, account permissions or live files have been changed.

### Static frontend with managed enquiries

1. Verify the provider endpoint, inbox delivery, spam controls and owner-reviewed privacy settings on staging.
2. Run the verification commands with the real endpoint set at build time.
3. Back up the complete current document root, existing `.htaccess`, and deployment configuration. Record a restorable release identifier.
4. Stage the contents of `out/` in a separate directory. Include directory indexes, `_next`, public assets, robots, sitemap and the existing verification file. Do not upload source or `.env.local` to the web root.
5. Review `docs/deployment/apache-static.htaccess` against existing Apache rules and proxy/TLS settings. Merge rather than overwrite existing rules blindly. The template is not installed automatically.
6. Verify HTTPS, non-www redirects, slash variants, direct page navigation and 404s on staging. Obtain explicit approval before switching production files.
7. Keep the previous release intact until post-deployment checks pass. If a regression occurs, restore the backed-up document root and routing rules. No DNS rollback should be necessary because this plan changes no DNS records.

### Node.js alternative

After confirming the exact Truehost runtime and startup contract, build on the target Linux platform (or matching CI) using `npm ci` and `npm run build:node`; do not copy Windows `node_modules`. Stage `.next`, `public`, required source/config/runtime files and production dependencies outside public document access. Configure the managed process, assigned port, environment variables, reverse proxy, HTTPS, memory limits and restart policy. Keep the original static release until staging, direct routes, canonical redirects, assets and provider delivery pass. Switch the domain only with approval. Roll back the domain/app mapping and previous release if necessary.

Primary hosting references:
- https://truehost.com/support/knowledge-base/how-to-deploy-nextjs-on-cpanel/
- https://truehost.com/support/knowledge-base/how-to-setup-node-js-app-in-cpanel/
- Installed Next.js docs: `node_modules/next/dist/docs/01-app/02-guides/self-hosting.md`

## Search Console post-deployment checklist

1. Confirm the existing DNS-verified property remains verified without changing its TXT record.
2. Fetch `/`, `/hefamaa-registration-lagos/`, `/privacy/`, `/robots.txt`, `/sitemap.xml` and the existing HTML verification URL over HTTPS. Check actual status codes and no login or noindex.
3. Check http, www and slash variants redirect once or in a short expected chain to the canonical URL without loops or query-string loss.
4. Inspect homepage and HEFAMAA page using URL Inspection's live test; compare declared and Google-selected canonicals when data is available.
5. Resubmit the existing sitemap endpoint and request indexing of the new HEFAMAA page after live checks pass. Keep the indexed homepage URL unchanged.
6. Review Page Indexing, HTTPS, Core Web Vitals and Search Console validation status over time. Record evidence rather than assuming indexing or validation succeeded.
