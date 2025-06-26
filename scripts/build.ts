import { $ } from "bun";

await $`rm -rf dist`;

await Bun.build({
  banner: "#!/usr/bin/env node",
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "node",
  packages: "external",
});

await $`chmod +x ./dist/index.js`;
