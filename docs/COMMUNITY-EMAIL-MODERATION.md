# Gmail moderation alerts

The owner deployed the packaged function through the dashboard under `bright-responder`. Its live version header was verified as `moderation-v3`, configuration checks pass, and requests without the webhook secret return 401. The owner installed Database Webhooks and created an INSERT webhook. On 18 October 2026, the owner reported that email delivery and moderation were working after creating the missing token table and correcting the sender and website URL secrets. This is owner-reported local testing; production-domain links still need verification after hosting. Pending posts remain available for manual moderation in Table Editor.

Set `NEXT_PUBLIC_COMMUNITY_MODERATION_FUNCTION=bright-responder` in the website's build environment to match the existing deployment. The local source directory and CLI configuration retain the canonical `community-moderation` name; do not deploy an additional function accidentally. For dashboard updates, regenerate `docs/deployment/community-moderation.txt` with `node scripts/package-moderation.mjs` and paste it into the existing `bright-responder` function. The active webhook URL must be `https://atiqrxbqtsvgkaytpcsn.supabase.co/functions/v1/bright-responder?mode=notify`.

The `moderation-v3` response includes a safe diagnostic step, HTTP status, and database error code for failures, plus a version response header. It does not expose query parameters, token hashes, secrets, or raw database error text. A successful empty INSERT response is handled without JSON parsing. After any deployment, inspect a fresh webhook result, not an older log row.

## Components
- `src/supabase/community-email-moderation.sql`: private token table and service-only atomic approve/reject function. Run once after the base community SQL. Reject permanently deletes a pending post; approve makes it public. The token is consumed in the same transaction.
- `supabase/functions/community-moderation`: webhook handler and preview/decision API.
- `/community-review/`: noindex confirmation page. Email links put the secret token in the URL fragment so it is not sent in the site's HTTP request or Referer. Opening or previewing a link does not mutate a post; explicit confirmation is required.

## Setup
1. In Resend, create a Sending access API key. Save it directly in Supabase Edge Function Secrets as `RESEND_API_KEY`; never put it in a NEXT_PUBLIC variable, source file, or chat.
2. Configure an approved sender. Use a verified sending domain for production. For testing only, Resend's `onboarding@resend.dev` can send to the email address owning the Resend account. If that address is not hurkifytechnology@gmail.com, verify a domain before sending to Hurkify. Do not change existing MX records to set up outbound-only notifications.
3. Run `src/supabase/community-email-moderation.sql` in SQL Editor. Keep the existing community policies.
4. Add Edge Function secrets:
   - `RESEND_API_KEY`: private sending key.
   - `COMMUNITY_EMAIL_FROM`: e.g. `Hurkify Community <community@your-verified-sending-domain>`; use an actual verified sender.
   - `COMMUNITY_EMAIL_TO`: `hurkifytechnology@gmail.com`.
   - `COMMUNITY_WEBHOOK_SECRET`: a newly generated random secret, at least 32 random bytes encoded as hex.
   - `COMMUNITY_REVIEW_SECRET`: another independent random secret of at least 32 random bytes. Keep it stable; rotating invalidates pending email links.
   - `COMMUNITY_SITE_URL`: `https://hurkifytechologylimited.com` after this website version is deployed. For initial local testing, use `http://localhost:3000`; links then work only on the computer running that server.
   Supabase supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Edge Functions. Those stay server-side.
5. Deploy `community-moderation` with its entrypoint `supabase/functions/community-moderation/index.js`. CLI: `supabase functions deploy community-moderation --project-ref atiqrxbqtsvgkaytpcsn`. The config disables gateway JWT verification because public email action links use scoped tokens; the webhook independently checks its secret header and moderation independently checks the token. Never deploy a version missing those checks.
6. In Supabase Database Webhooks, create a webhook for `public.healthcare_discussions`, event INSERT only. URL: `https://atiqrxbqtsvgkaytpcsn.supabase.co/functions/v1/community-moderation?mode=notify`. Method POST; header `Content-Type: application/json`; header `x-community-webhook-secret` equals the secret configured above. Do not expose it in browser code.
7. Deploy the website's `/community-review/` route before production alerts. The new route is deliberately omitted from the sitemap and marked noindex.

## Behaviour and delivery limits
- Sends only pending inserted posts, including replies. Existing pending posts do not automatically produce an alert when the webhook is installed.
- Reads the real post from the database instead of trusting webhook body text. HTML is escaped.
- One review token per post, hashed at rest, valid for seven days, one decision only. Anyone holding the email link can moderate that one post, so avoid forwarding alerts.
- Email-provider acknowledgement is required before recording `notified_at`. Provider acceptance does not guarantee Gmail inbox delivery; check Spam and delivery logs.
- Resend idempotency keys reduce duplicates during retry. Webhook failures are visible in Supabase logs; automatic guaranteed retries/durable outbox are not implemented. A missed alert never auto-approves a post. Review pending posts in Table Editor periodically and retry failed webhook events deliberately. Replaying a successfully notified event does not resend it.
- Expired links require manual Table Editor moderation. No automatic reissue or moderator dashboard is implemented.
- Only exact configured website origin and localhost:3000 receive browser CORS permission. Do not include paths or trailing slash in COMMUNITY_SITE_URL.

## Verification
Mocked Node tests cover unauthenticated webhooks, scanner GETs, nonmutating previews, expired/consumed links, explicit decision RPC calls, failed decisions, HTML escaping, email links and provider acknowledgement. They do not prove deployed database permissions or real delivery.

After setup, test one new question and one reply; verify Gmail receipt; opening both links changes nothing; confirming approve publishes; replay fails; confirming reject deletes only the intended pending post; preview and unknown tokens cannot mutate anything. Verify public users cannot read token rows or call the moderation RPC. Check failed email requests and webhook logs. Live tests and SQL permission tests remain outstanding.
