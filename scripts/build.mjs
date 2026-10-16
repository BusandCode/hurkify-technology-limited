import { spawnSync } from "node:child_process";
const target = process.argv[2];
if (!["static", "node"].includes(target))
  throw new Error("Choose static or node deployment mode.");
const result = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build", "--webpack"],
  { stdio: "inherit", env: { ...process.env, HURKIFY_DEPLOY_TARGET: target } },
);
if (result.error) throw result.error;
process.exit(result.status ?? 1);
