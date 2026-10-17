# Healthcare community setup

This replaces the private guide question form. It does not use Formspree.
Until configured, the section shows an honest opening-soon state and accepts no posts.

1. Create a Supabase project owned by Hurkify. Keep its database password private.
2. Run `src/supabase/healthcare-community.sql` once in SQL Editor.
3. Copy the project URL and public publishable/anon key into `.env.local` using the names in `.env.example`. Never use the service-role/secret key.
4. Enable Google in Authentication > Sign In / Providers. Follow Supabase's Google OAuth guide: https://supabase.com/docs/guides/auth/social-login/auth-google . Google client secrets belong in Supabase, never the website source.
5. Set Authentication URL Configuration: production Site URL `https://hurkifytechologylimited.com`; allow redirect URLs `http://localhost:3000/hefamaa-registration-lagos/` and `https://hurkifytechologylimited.com/hefamaa-registration-lagos/`.
6. Restart local development. Rebuild static output after configuration for hosting.

Anyone can read published threads without signing in. Google authentication is required to contribute. Questions and replies are initially pending. Authors see their own pending posts. In Supabase Table Editor, review `healthcare_discussions`; set `published` to true for approved posts. The Hurkify team can sign in on the website and reply like a community member. No unverified staff badges are shown. No public update/delete rights are granted. Hide a post by setting published false. Review replies too when hiding a thread.

Database-side checks enforce account ownership, derive public names from authenticated account metadata, restrict replies to published root questions, and limit posting to one per minute and twenty per day per account. They do not replace moderation or prevent people creating multiple accounts. Names are display names, not verified professional identities.

The browser fetches persisted shared conversations; it refreshes every 30 seconds while visible and has manual refresh. Questions are paginated 20 per page. Replies currently load the earliest 100 per thread; extend pagination before large discussions. No fake threads, email delivery, or local-only storage is used. Supabase Auth stores a session in browser storage; email addresses are not stored in the public discussion table. No patient data should be posted.

Live acceptance checks after setup (not yet performed):
- Sign in with two separate Google accounts; post a question, confirm pending visibility only to its author, approve it, and read from an anonymous browser.
- Post and approve a reply; verify both accounts and the anonymous browser see it after refresh.
- Confirm anonymous insert, forged ownership, published=true inserts, and public updates/deletes fail.
- Confirm reply targets and posting limits are enforced. Confirm sign-out and OAuth redirect work locally and in production.
- Test failed requests and verify no success appears without database acknowledgement.

The owner ran the SQL successfully in the Supabase project. The public table endpoint was verified to return HTTP 200 with an empty list, and Google authentication was verified as enabled. Local public connection values are configured in the ignored `.env.local`; configure these in the hosting/build environment too. Full Google sign-in, posting, moderation, cross-account visibility, and database access-control acceptance tests remain outstanding.
