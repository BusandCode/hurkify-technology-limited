const escapeHtml = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const hex = (bytes) =>
  Array.from(new Uint8Array(bytes), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
const hash = async (value) =>
  hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
async function signedToken(id, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return hex(
    await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(`healthcare-review:${id}`),
    ),
  );
}
const VERSION = "moderation-v3";
function page(title, content, status = 200) {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escapeHtml(title)} | Hurkify</title><style>body{margin:0;background:#faf9fa;color:#241b35;font:16px/1.6 system-ui,sans-serif}main{max-width:620px;margin:7vh auto;padding:28px;background:white;border:1px solid #e2dcea;border-radius:16px}h1{font-size:25px;line-height:1.3;font-weight:600}p{white-space:pre-wrap;overflow-wrap:anywhere}button{border:0;border-radius:24px;padding:13px 22px;background:#6522c7;color:white;font:inherit;cursor:pointer}small{color:#62586f}a{color:#6522c7}</style></head><body><main><small>Hurkify · Community moderation</small><h1>${escapeHtml(title)}</h1>${content}</main></body></html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Hurkify-Moderation-Version": VERSION,
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Content-Security-Policy":
          "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
      },
    },
  );
}

export function createModerationHandler(env, fetcher = fetch) {
  return async function handler(request) {
    const origin = request.headers.get("origin");
    const allowedOrigins = [
      env.COMMUNITY_SITE_URL || "https://hurkifytechologylimited.com",
      "http://localhost:3000",
    ];
    const cors =
      origin && allowedOrigins.includes(origin)
        ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" }
        : {};
    const json = (data, status = 200) =>
      new Response(JSON.stringify(data), {
        status,
        headers: {
          ...cors,
          "Content-Type": "application/json",
          "X-Hurkify-Moderation-Version": VERSION,
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      });
    if (request.method === "OPTIONS")
      return new Response(null, {
        status: 204,
        headers: {
          ...cors,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "content-type",
          "Access-Control-Max-Age": "600",
        },
      });
    const required = [
      "SUPABASE_URL",
      "SUPABASE_SERVICE_ROLE_KEY",
      "COMMUNITY_WEBHOOK_SECRET",
      "COMMUNITY_REVIEW_SECRET",
      "RESEND_API_KEY",
      "COMMUNITY_EMAIL_FROM",
      "COMMUNITY_EMAIL_TO",
    ];
    if (required.some((key) => !env[key]))
      return page(
        "Setup is incomplete",
        "<p>Moderation email settings have not been configured.</p>",
        503,
      );
    const base = env.SUPABASE_URL.replace(/\/$/, "");
    const site =
      env.COMMUNITY_SITE_URL || "https://hurkifytechologylimited.com";
    const dbHeaders = {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    };
    let diagnostic = { step: "initialise", status: 0, code: "" };
    async function db(path, options = {}) {
      diagnostic = {
        step: `${options.method || "GET"} ${path.split("?")[0]}`,
        status: 0,
        code: "",
      };
      const response = await fetcher(`${base}/rest/v1/${path}`, {
        ...options,
        headers: { ...dbHeaders, ...options.headers },
        signal: AbortSignal.timeout(10000),
      });
      const body = await response.text();
      diagnostic.status = response.status;
      if (!response.ok) {
        try {
          const failure = JSON.parse(body);
          if (/^[A-Z0-9_]{3,24}$/.test(String(failure.code)))
            diagnostic.code = String(failure.code);
        } catch {
          /* Never expose raw database errors or response bodies. */
        }
        throw new Error("Database request failed");
      }
      return body.trim() ? JSON.parse(body) : null;
    }
    const url = new URL(request.url);
    try {
      // Database webhook: only the secret-authenticated request can send mail.
      if (
        request.method === "POST" &&
        url.searchParams.get("mode") === "notify"
      ) {
        const supplied = request.headers.get("x-community-webhook-secret");
        if (
          !supplied ||
          (await hash(supplied)) !== (await hash(env.COMMUNITY_WEBHOOK_SECRET))
        )
          return new Response("Unauthorized", { status: 401 });
        const event = await request.json();
        if (
          event.type !== "INSERT" ||
          event.table !== "healthcare_discussions" ||
          event.schema !== "public" ||
          !/^[0-9a-f-]{36}$/i.test(event.record?.id ?? "")
        )
          return new Response("Invalid event", { status: 400 });
        const rows = await db(
          `healthcare_discussions?id=eq.${event.record.id}&select=id,parent_id,title,body,author_name,published`,
        );
        const post = rows?.[0];
        if (!post || post.published)
          return new Response("No pending post", { status: 200 });
        const token = await signedToken(post.id, env.COMMUNITY_REVIEW_SECRET);
        const tokenHash = await hash(token);
        await db("community_review_tokens?on_conflict=token_hash", {
          method: "POST",
          headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
          body: JSON.stringify({ token_hash: tokenHash, post_id: post.id }),
        });
        const tickets = await db(
          `community_review_tokens?token_hash=eq.${tokenHash}&select=used_at,expires_at,notified_at`,
        );
        const ticket = tickets?.[0];
        if (
          !ticket ||
          ticket.used_at ||
          ticket.notified_at ||
          Date.parse(ticket.expires_at) <= Date.now()
        )
          return new Response("Already handled", { status: 200 });
        const link = (action) =>
          `${site}/community-review/#token=${token}&action=${action}`;
        const title = post.title || "Reply to a healthcare community question";
        const subject = `Hurkify: ${post.parent_id ? "reply" : "question"} awaiting review`;
        const html = `<h2>${escapeHtml(subject)}</h2><p><strong>${escapeHtml(post.author_name)}</strong></p><h3>${escapeHtml(title)}</h3><p style="white-space:pre-wrap">${escapeHtml(post.body)}</p><p><a href="${link("approve")}">Approve post</a> &nbsp; | &nbsp; <a href="${link("reject")}">Reject post</a></p><p>Each link opens a confirmation page. Rejecting permanently removes this pending post. Links expire after seven days and work once. Keep this email private: anyone with its link can review this post.</p>`;
        diagnostic = { step: "send moderation email", status: 0, code: "" };
        const email = await fetcher("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
            "Idempotency-Key": `community-review-${post.id}`,
          },
          body: JSON.stringify({
            from: env.COMMUNITY_EMAIL_FROM,
            to: [env.COMMUNITY_EMAIL_TO],
            subject,
            html,
            text: `${subject}\n${post.author_name}\n${title}\n${post.body}\n\nApprove: ${link("approve")}\nReject: ${link("reject")}\nLinks open a confirmation page, expire after seven days, and must be kept private.`,
          }),
          signal: AbortSignal.timeout(15000),
        });
        diagnostic.status = email.status;
        if (!email.ok)
          return json(
            {
              error:
                "Email provider rejected the request. Check Resend Logs for the reason.",
              diagnostic,
              version: VERSION,
            },
            502,
          );
        const acknowledgement = await email.json();
        if (!acknowledgement.id)
          return new Response("Email acknowledgement missing", { status: 502 });
        await db(`community_review_tokens?token_hash=eq.${tokenHash}`, {
          method: "PATCH",
          headers: { Prefer: "return=minimal" },
          body: JSON.stringify({ notified_at: new Date().toISOString() }),
        });
        return new Response("Notification accepted by email provider", {
          status: 200,
        });
      }
      if (request.method === "GET")
        return page(
          "Community moderation",
          "<p>Open your review link on the Hurkify website to continue.</p>",
        );
      if (request.method !== "POST")
        return json({ error: "Method not allowed" }, 405);
      const input = await request.json();
      const token = String(input.token ?? "");
      const action = String(input.action ?? "");
      if (
        !/^[0-9a-f]{64}$/.test(token) ||
        !["approve", "reject"].includes(action)
      )
        return json({ error: "Invalid review link" }, 400);
      const tokenHash = await hash(token);
      if (input.mode === "decide") {
        const outcome = await db("rpc/moderate_healthcare_post", {
          method: "POST",
          body: JSON.stringify({
            review_hash: tokenHash,
            review_action: action,
          }),
        });
        if (outcome !== action)
          throw new Error("Decision acknowledgement missing");
        return json({ outcome: action });
      }
      if (input.mode !== "preview")
        return json({ error: "Invalid request" }, 400);
      const tickets = await db(
        `community_review_tokens?token_hash=eq.${tokenHash}&select=post_id,expires_at,used_at`,
      );
      const ticket = tickets?.[0];
      if (
        !ticket ||
        ticket.used_at ||
        !ticket.post_id ||
        Date.parse(ticket.expires_at) <= Date.now()
      )
        return json(
          {
            error:
              "This link has expired or has already been used. You can still manage posts in Supabase.",
          },
          410,
        );
      const posts = await db(
        `healthcare_discussions?id=eq.${ticket.post_id}&select=title,body,author_name,published`,
      );
      const post = posts?.[0];
      if (!post || post.published)
        return json({ error: "This post has already been reviewed." }, 410);
      return json({ post });
    } catch {
      return json(
        {
          error:
            "The request failed. Share the diagnostic fields below so the failing step can be identified.",
          diagnostic,
          version: VERSION,
        },
        409,
      );
    }
  };
}
