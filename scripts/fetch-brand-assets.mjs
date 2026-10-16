import { writeFile, mkdir } from "node:fs/promises";

const sources = [
  [
    "olitt.webp",
    "https://olitt.com/wp-content/uploads/2025/08/Olitt-logo-website-builder.webp",
  ],
  [
    "truehost.png",
    "https://truehost.com.ng/wp-content/uploads/2021/09/logo.png",
  ],
  [
    "google.png",
    "https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
  ],
  ["formspree.svg", "https://formspree.io/img/formspree-new.svg"],
  ...["nextjs", "react", "typescript", "tailwindcss", "nodejs"].map((name) => [
    `${name}.svg`,
    `https://raw.githubusercontent.com/devicons/devicon/master/icons/${name}/${name}-original.svg`,
  ]),
];
await mkdir("public/logos", { recursive: true });
const results = await Promise.allSettled(
  sources.map(async ([name, url]) => {
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (
      name.endsWith(".svg") &&
      /<script\b|\bonload=|\bonerror=/i.test(bytes.toString())
    )
      throw new Error(`${name}: unexpected active SVG content`);
    await writeFile(`public/logos/${name}`, bytes);
    return `${name}: ${bytes.length} bytes`;
  }),
);
for (const result of results)
  console.log(
    result.status === "fulfilled" ? result.value : result.reason.message,
  );
if (results.some((result) => result.status === "rejected"))
  process.exitCode = 1;
