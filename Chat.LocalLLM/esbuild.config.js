import { build } from "esbuild";
import { existsSync, rmSync } from "fs";

const sourcemapEnabled = process.env.NODE_ENV || "development";

const outdir = 'dist';

if (existsSync(outdir)) {
  rmSync(outdir, { recursive: true, force: true });
}

build({
  entryPoints: ["src/server.ts"],
  outfile: "dist/server.js",
  bundle: true,
  platform: "node",
  target: "node22",
  sourcemap: sourcemapEnabled === "development",
  packages: "external",
  external: [
    'tsoa',
  ],
  format: "esm"
}).then(r => {
  console.log("Build succeeded:", r);
})
.catch(e => {
  console.error(e);
  process.exit(1)
});

