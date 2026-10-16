// Explicit opt-in only. This sends TWO real, marked tests to the business form.
// It is intentionally excluded from npm test and never runs during a build.
import { sendEnquiry, isFormspreeEndpoint } from "../src/lib/enquiries.ts";

const endpoint = process.argv[2];
if (!isFormspreeEndpoint(endpoint) || process.argv[3] !== "--send")
  throw new Error(
    "Usage: node scripts/test-provider.mjs https://formspree.io/f/<id> --send (sends two real test enquiries)",
  );
const common = {
  name: "CONTROLLED TEST — Hurkify website",
  email: "hurkifytechnology@gmail.com",
  phone: "+2349045083581",
  consent: "yes",
  _gotcha: "",
  message:
    "CONTROLLED WEBSITE INTEGRATION TEST requested by the business owner. No customer or patient information. Please confirm receipt; no other action is required.",
};
for (const [kind, values] of [
  ["general", { ...common, service: "Software Development" }],
  [
    "hefamaa",
    {
      ...common,
      assistance: "General consultation",
      facilityName: "TEST ONLY — no real facility",
    },
  ],
]) {
  await sendEnquiry(endpoint, kind, values, (url, options) => {
    const body = JSON.parse(options.body);
    body._subject = `[CONTROLLED TEST] ${body._subject}`;
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Origin: "http://localhost:3000",
        Referer: "http://localhost:3000/",
      },
      body: JSON.stringify(body),
    });
  });
  console.log(
    `${kind}: Formspree confirmed acceptance. Inbox delivery must be checked separately.`,
  );
}
