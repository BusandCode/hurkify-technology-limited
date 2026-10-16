import assert from "node:assert/strict";
import http from "node:http";

const base = process.argv[2] || "http://127.0.0.1:3100";
function request(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.get(
      new URL(path, base),
      { headers, timeout: 10000 },
      (res) => {
        res.resume();
        res.on("end", () =>
          resolve({ status: res.statusCode, location: res.headers.location }),
        );
      },
    );
    req.on("error", reject);
    req.on("timeout", () => req.destroy(new Error("Request timed out")));
  });
}
for (const path of [
  "/",
  "/hefamaa-registration-lagos/",
  "/privacy/",
  "/robots.txt",
  "/sitemap.xml",
  "/googleb0b2b1f2b08d3229.html",
]) {
  const result = await request(path);
  assert.equal(result.status, 200, path);
}
const slash = await request("/hefamaa-registration-lagos");
assert.equal(slash.status, 308);
assert.equal(slash.location, "/hefamaa-registration-lagos/");
const www = await request("/hefamaa-registration-lagos/", {
  Host: "www.hurkifytechologylimited.com",
});
assert.equal(www.status, 308);
assert.equal(
  www.location,
  "https://hurkifytechologylimited.com/hefamaa-registration-lagos",
);
assert.equal((await request("/does-not-exist/")).status, 404);
console.log(
  "Node runtime checks passed: page and SEO endpoints, verification file, slash redirect, www redirect, real 404.",
);
