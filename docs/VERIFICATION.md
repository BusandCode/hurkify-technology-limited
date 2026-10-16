# Verification record — 15 October 2026

## Passed locally

- Six automated enquiry tests: general and consultation schemas, required fields, invalid emails, consent, length limits, service choices, honeypot, endpoint restrictions, payload minimisation, provider acceptance/rejection, malformed responses, 429, network failures and timeouts. All service calls in these tests are mocked; no emails are sent.
- ESLint, without suppressing rules.
- Static production build, including TypeScript checking.
- Generated SEO checks for homepage, HEFAMAA page and privacy: unique requested titles, descriptions, one canonical per page, expected canonical URLs, Open Graph URLs, one H1, preserved section IDs, internal anchor destinations, parseable JSON-LD, sitemap entries, robots, existing favicon and verification file.
- Optional Node production build and local production startup.
- Production Node HTTP checks: homepage, HEFAMAA, privacy, robots, sitemap and verification return 200; missing routes return 404; slash and www variants redirect permanently. Host-based checks use Node's HTTP client because fetch may override a custom Host header.
- Development HEFAMAA route returns HTTP 200 at `http://localhost:3000/hefamaa-registration-lagos/`.

## Live form-service verification

- Owner supplied the public Formspree endpoint. Both form types are configured in ignored `.env.local`; no management token or email credentials are stored.
- Two clearly marked controlled integration tests were sent, one general and one HEFAMAA. Formspree returned explicit acceptance for both.
- The owner confirmed **both notifications arrived** in `hurkifytechnology@gmail.com` on 15 October 2026.
- An OPTIONS request confirmed the endpoint allows browser POST requests and the Content-Type header from `http://localhost:3000`.
- The development landing page renders without the unconfigured-form warning after loading the real endpoint.
- `scripts/test-provider.mjs` requires an explicit endpoint and `--send`; it is excluded from automated tests and builds. Do not rerun it casually because it sends two real notifications.

## Pending external information / manual review

- Provider account spam/rate-limit rules, any CAPTCHA, and allowed production domains still require dashboard/staging review. Live happy-path submission acceptance and inbox delivery are confirmed; abuse cases use mocked tests only.
- Visual desktop/mobile, keyboard, focus and loading-state review: no connected browser automation surface is available in this session. HTTP and generated HTML checks do not replace visual review.
- Truehost account: owner confirms Setup Node.js App exists; available runtime version, process/startup contract, resource limits, TLS proxy behaviour and operational restart are not independently confirmed.
- Owner review of privacy wording, processor terms, cross-border processing, actual retention schedule and deletion workflow.
- Search Console live inspection, selected canonical, indexing and validation after deployment. No indexing success is claimed.

## Files for this implementation stage

- SEO and business constants: `src/lib/site.ts`, `src/lib/seo.ts`, `src/components/structured-data.tsx`.
- Metadata and sitemap: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/sitemap.ts`.
- Landing page and homepage link: `src/app/hefamaa-registration-lagos/page.tsx`, `src/sections/healthcare-support.tsx`.
- Shared enquiry UI, transport and validation: `src/components/enquiry-form.tsx`, `src/lib/enquiries.ts`, `src/sections/contact.tsx`.
- Privacy and contact details: `src/app/privacy/page.tsx`, `src/components/layout/footer.tsx`.
- Deployment modes and environment example: `next.config.ts`, `package.json`, `.env.example`, `.gitignore`.
- Checks: `tests/enquiries.test.mjs`, `scripts/build.mjs`, `scripts/check-seo.mjs`, `scripts/check-runtime.mjs`.
- Handover: `README.md`, `docs/IMPLEMENTATION-HANDOVER.md`, `docs/deployment/apache-static.htaccess`, this record.

The workspace also contains changes from the earlier visual-upgrade work. They are preserved, not reverted or committed. No production deployment, DNS changes, hosting changes or account creation was performed by the agent.
