import test from "node:test";
import assert from "node:assert/strict";
import { createModerationHandler } from "../supabase/functions/community-moderation/handler.mjs";
const env = {
  SUPABASE_URL: "https://example.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "test-server-key",
  COMMUNITY_WEBHOOK_SECRET: "test-webhook",
  COMMUNITY_REVIEW_SECRET: "test-review-secret",
  RESEND_API_KEY: "test-email-key",
  COMMUNITY_EMAIL_FROM: "test@example.com",
  COMMUNITY_EMAIL_TO: "owner@example.com",
  COMMUNITY_SITE_URL: "https://example.com",
};
const token = "a".repeat(64);
const id = "11111111-1111-4111-8111-111111111111";
const ticket = {
  post_id: id,
  used_at: null,
  notified_at: null,
  expires_at: "2099-01-01T00:00:00Z",
};
const post = {
  id,
  parent_id: null,
  title: "Question",
  body: "<script>alert(1)</script>",
  author_name: "Member",
  published: false,
};
const ok = (data) => Response.json(data);
const request = (body) =>
  new Request("https://example.supabase.co/functions/v1/community-moderation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      origin: "https://example.com",
    },
    body: JSON.stringify(body),
  });

test("GET email scanner visits cannot change a post", async () => {
  let calls = 0;
  const response = await createModerationHandler(env, async () => {
    calls++;
    return ok([]);
  })(
    new Request(
      `https://example.supabase.co/functions/v1/community-moderation?token=${token}&action=approve`,
    ),
  );
  assert.equal(response.status, 200);
  assert.equal(calls, 0);
});
test("preview returns post with CORS and makes no writes", async () => {
  const methods = [];
  const handler = createModerationHandler(env, async (url, options) => {
    methods.push(options.method || "GET");
    return ok(url.includes("community_review_tokens") ? [ticket] : [post]);
  });
  const response = await handler(
    request({ mode: "preview", token, action: "approve" }),
  );
  assert.equal(response.status, 200);
  assert.equal(
    response.headers.get("access-control-allow-origin"),
    "https://example.com",
  );
  assert.equal((await response.json()).post.id, id);
  assert.deepEqual(methods, ["GET", "GET"]);
});
test("expired and consumed links cannot preview", async () => {
  for (const bad of [
    { ...ticket, expires_at: "2000-01-01" },
    { ...ticket, used_at: "2026-01-01" },
  ]) {
    const response = await createModerationHandler(env, async () => ok([bad]))(
      request({ mode: "preview", token, action: "reject" }),
    );
    assert.equal(response.status, 410);
  }
});
test("only explicit confirmation invokes atomic decision RPC", async () => {
  const calls = [];
  const handler = createModerationHandler(env, async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    return ok("approve");
  });
  const response = await handler(
    request({ mode: "decide", token, action: "approve" }),
  );
  assert.deepEqual(await response.json(), { outcome: "approve" });
  assert.equal(calls.length, 1);
  assert.ok(calls[0].url.endsWith("rpc/moderate_healthcare_post"));
  assert.equal(calls[0].body.review_action, "approve");
  assert.equal(calls[0].body.review_hash.length, 64);
  assert.notEqual(calls[0].body.review_hash, token);
});
test("invalid action and failed atomic decision never report success", async () => {
  let calls = 0;
  const handler = createModerationHandler(env, async () => {
    calls++;
    return new Response("conflict", { status: 409 });
  });
  assert.equal(
    (
      await handler(
        request({ mode: "decide", token, action: "delete-everything" }),
      )
    ).status,
    400,
  );
  assert.equal(calls, 0);
  const response = await handler(
    request({ mode: "decide", token, action: "reject" }),
  );
  assert.equal(response.status, 409);
  assert.ok((await response.json()).error);
});
test("webhook requires secret before sending or reading", async () => {
  let calls = 0;
  const handler = createModerationHandler(env, async () => {
    calls++;
    return ok({});
  });
  const response = await handler(
    new Request(
      "https://example.supabase.co/functions/v1/community-moderation?mode=notify",
      { method: "POST", body: "{}" },
    ),
  );
  assert.equal(response.status, 401);
  assert.equal(calls, 0);
});
test("notification escapes posts, uses fragment links, and requires email acknowledgement", async () => {
  for (const accepted of [false, true]) {
    let marked = false;
    const handler = createModerationHandler(env, async (url, options) => {
      if (url === "https://api.resend.com/emails") {
        const mail = JSON.parse(options.body);
        assert.ok(mail.html.includes("&lt;script&gt;"));
        assert.ok(!mail.html.includes("<script>"));
        assert.ok(
          mail.html.includes("https://example.com/community-review/#token="),
        );
        assert.ok(mail.html.includes("action=approve"));
        assert.ok(mail.html.includes("action=reject"));
        return accepted
          ? ok({ id: "email-1" })
          : new Response("failure", { status: 503 });
      }
      if (options.method === "PATCH") {
        marked = true;
        return new Response(null, { status: 204 });
      }
      // PostgREST INSERT with return=minimal responds 201 with an empty body.
      if (options.method === "POST") return new Response(null, { status: 201 });
      return ok(url.includes("community_review_tokens") ? [ticket] : [post]);
    });
    const response = await handler(
      new Request(
        "https://example.supabase.co/functions/v1/community-moderation?mode=notify",
        {
          method: "POST",
          headers: {
            "x-community-webhook-secret": env.COMMUNITY_WEBHOOK_SECRET,
          },
          body: JSON.stringify({
            type: "INSERT",
            schema: "public",
            table: "healthcare_discussions",
            record: { id },
          }),
        },
      ),
    );
    assert.equal(response.status, accepted ? 200 : 502);
    assert.equal(marked, accepted);
  }
});

test("database failures identify the operation without exposing secrets or raw errors", async () => {
  const handler = createModerationHandler(env, async () =>
    Response.json(
      {
        code: "PGRST205",
        message: "private details " + env.SUPABASE_SERVICE_ROLE_KEY,
      },
      { status: 404 },
    ),
  );
  const response = await handler(
    request({ mode: "preview", token, action: "approve" }),
  );
  const result = await response.json();
  assert.equal(result.version, "moderation-v3");
  assert.deepEqual(result.diagnostic, {
    step: "GET community_review_tokens",
    status: 404,
    code: "PGRST205",
  });
  assert.ok(!JSON.stringify(result).includes(env.SUPABASE_SERVICE_ROLE_KEY));
  assert.ok(!JSON.stringify(result).includes(token));
  assert.ok(!JSON.stringify(result).includes("private details"));
});
