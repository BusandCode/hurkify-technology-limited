import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const base = "https://hurkifytechologylimited.com";
const pages = [
  [
    "out/hefamaa-support-community/index.html",
    "/hefamaa-support-community/",
    "HEFAMAA Support Community | Questions & Answers | Hurkify",
  ],
  [
    "out/index.html",
    "/",
    "Hurkify Technology Limited | IT Consulting & Healthcare Technology",
  ],
  [
    "out/hefamaa-registration-lagos/index.html",
    "/hefamaa-registration-lagos/",
    "HEFAMAA Registration Support in Lagos | Hurkify",
  ],
  [
    "out/privacy/index.html",
    "/privacy/",
    "Privacy notice | Hurkify Technology Limited",
  ],
];
const sitemap = readFileSync("out/sitemap.xml", "utf8");
const home = readFileSync("out/index.html", "utf8");
const homeIds = new Set([...home.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
for (const [file, path, title] of pages) {
  const html = readFileSync(file, "utf8");
  const head = html.slice(0, html.indexOf("</head>"));
  const canonicals = [
    ...head.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/g),
  ];
  assert.equal(canonicals.length, 1, `${path}: one canonical`);
  assert.equal(canonicals[0][1], `${base}${path}`);
  assert.ok(
    head.includes(`<title>${title.replaceAll("&", "&amp;")}</title>`),
    `${path}: correct title`,
  );
  assert.ok(head.includes('name="description"'), `${path}: description`);
  assert.ok(head.includes('property="og:url"'), `${path}: Open Graph URL`);
  assert.ok(!/noindex/i.test(head), `${path}: indexable`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: single H1`);
  assert.ok(sitemap.includes(`${base}${path}`), `${path}: sitemap entry`);
  const localIds = new Set(
    [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]),
  );
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g))
    assert.ok(localIds.has(id), `${path}: #${id}`);
  for (const [, id] of html.matchAll(/href="\/#([^"]+)"/g))
    assert.ok(homeIds.has(id), `${path}: homepage #${id}`);
  for (const [, json] of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  ))
    JSON.parse(json);
  assert.ok(!html.includes("YOUR_FORM_ID"));
}
for (const id of [
  "home",
  "about",
  "services",
  "healthcare-support",
  "projects",
  "team",
  "contact",
])
  assert.ok(homeIds.has(id), `Preserved anchor ${id}`);
assert.ok(
  home.includes('href="/hefamaa-registration-lagos/"'),
  "Crawlable homepage landing page link",
);
const robots = readFileSync("out/robots.txt", "utf8");
assert.match(robots, /Allow: \//);
assert.ok(robots.includes(`${base}/sitemap.xml`));
assert.ok(
  existsSync("out/googleb0b2b1f2b08d3229.html"),
  "Existing verification file preserved",
);
assert.ok(existsSync("out/hurkify-icon.png"), "H icon favicon included");
console.log(
  `SEO smoke checks passed: ${pages.length} pages, canonical URLs, titles, headings, anchors, schema JSON, sitemap, robots, verification file and favicon.`,
);
