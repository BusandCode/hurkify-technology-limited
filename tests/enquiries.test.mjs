import test from "node:test";
import assert from "node:assert/strict";
import {
  generalEnquirySchema,
  hefamaaEnquirySchema,
  isFormspreeEndpoint,
  sendEnquiry,
} from "../src/lib/enquiries.ts";

const endpoint = "https://formspree.io/f/controlledtest";
const general = {
  name: "Test Visitor",
  email: "visitor@example.com",
  service: "Software Development",
  message: "Controlled local test only.",
  consent: "yes",
  _gotcha: "",
};
const healthcare = {
  name: "Test Administrator",
  email: "admin@example.com",
  phone: "+234 904 508 3581",
  assistance: "New registration",
  consent: "yes",
  _gotcha: "",
};

test("both form types validate required fields and reject bad email or missing consent", () => {
  for (const [schema, values] of [
    [generalEnquirySchema, general],
    [hefamaaEnquirySchema, healthcare],
  ]) {
    assert.equal(schema.safeParse(values).success, true);
    assert.equal(
      schema.safeParse({ ...values, email: "invalid" }).success,
      false,
    );
    assert.equal(
      schema.safeParse({ ...values, consent: undefined }).success,
      false,
    );
    assert.equal(schema.safeParse({ ...values, name: "" }).success, false);
  }
  assert.equal(
    hefamaaEnquirySchema.safeParse({ ...healthcare, phone: "" }).success,
    false,
  );
  assert.equal(
    generalEnquirySchema.safeParse({ ...general, service: "arbitrary" })
      .success,
    false,
  );
  assert.equal(
    hefamaaEnquirySchema.safeParse({ ...healthcare, assistance: "arbitrary" })
      .success,
    false,
  );
});

test("length limits and honeypot reject invalid submissions", () => {
  assert.equal(
    generalEnquirySchema.safeParse({ ...general, message: "a".repeat(3001) })
      .success,
    false,
  );
  assert.equal(
    hefamaaEnquirySchema.safeParse({
      ...healthcare,
      facilityLocation: "a".repeat(201),
    }).success,
    false,
  );
  assert.equal(
    generalEnquirySchema.safeParse({ ...general, _gotcha: "bot" }).success,
    false,
  );
});

test("only HTTPS Formspree form endpoints are allowed", () => {
  for (const value of [
    "",
    undefined,
    "http://formspree.io/f/example",
    "https://evil.example/f/example",
    "https://formspree.io.evil.example/f/example",
    "https://formspree.io/f/example?redirect=elsewhere",
  ])
    assert.equal(isFormspreeEndpoint(value), false);
  assert.equal(isFormspreeEndpoint(endpoint), true);
});

test("invalid data or missing configuration never contacts the service", async () => {
  let calls = 0;
  const fetcher = async () => {
    calls++;
    throw new Error("Must not run");
  };
  await assert.rejects(sendEnquiry("", "general", general, fetcher));
  await assert.rejects(
    sendEnquiry(endpoint, "general", { ...general, email: "invalid" }, fetcher),
  );
  await assert.rejects(
    sendEnquiry(endpoint, "general", { ...general, _gotcha: "bot" }, fetcher),
  );
  assert.equal(calls, 0);
});

test("acceptance requires explicit provider acknowledgement and sends only permitted data", async () => {
  for (const [kind, values] of [
    ["general", general],
    ["hefamaa", healthcare],
  ]) {
    let body;
    await sendEnquiry(
      endpoint,
      kind,
      { ...values, unexpectedSecret: "must not be sent" },
      async (url, options) => {
        assert.equal(url, endpoint);
        assert.equal(options.method, "POST");
        assert.equal(options.headers.Accept, "application/json");
        body = JSON.parse(options.body);
        return Response.json({ ok: true });
      },
    );
    assert.equal(body.enquiryType, kind);
    assert.equal(body.email, values.email);
    assert.equal(body.unexpectedSecret, undefined);
    assert.ok(Number.isFinite(Date.parse(body.submittedAt)));
    assert.match(body._subject, /Hurkify Website/);
  }
  for (const result of [
    {},
    { ok: false },
    { ok: true, errors: [{ message: "Rejected" }] },
  ])
    await assert.rejects(
      sendEnquiry(endpoint, "general", general, async () =>
        Response.json(result),
      ),
    );
});

test("service errors, rate limits, network failures and timeouts never report success", async () => {
  await assert.rejects(
    sendEnquiry(
      endpoint,
      "general",
      general,
      async () => new Response("not JSON"),
    ),
    /confirm acceptance/,
  );
  for (const status of [400, 429, 500])
    await assert.rejects(
      sendEnquiry(endpoint, "general", general, async () =>
        Response.json({}, { status }),
      ),
    );
  await assert.rejects(
    sendEnquiry(endpoint, "general", general, async () => {
      throw new TypeError("network");
    }),
    /connection/,
  );
  await assert.rejects(
    sendEnquiry(endpoint, "general", general, async () => {
      throw new DOMException("timeout", "AbortError");
    }),
    /may have been received/,
  );
});
