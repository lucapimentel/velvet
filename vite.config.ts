import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { createRequire } from "node:module";

// Anything in dependencies stays out of the bundle so consumers dedupe it themselves.
// Reading package.json means a new dependency cannot silently get compiled in.
const pkg = createRequire(import.meta.url)("./package.json");
const external = [
  /^react($|\/)/,
  ...Object.keys(pkg.dependencies ?? {}).map((name) => new RegExp(`^${name}($|/)`)),
];

export default defineConfig({
  plugins: [react(), dts({ include: ["src"], rollupTypes: true })],
  css: { modules: { generateScopedName: "velvet_[local]_[hash:base64:4]" } },
  build: {
    lib: { entry: "src/index.ts", formats: ["es"], fileName: "velvet", cssFileName: "velvet" },
    // Velvet is a client component library: half of it uses hooks, and it
    // ships as one bundle. Without the directive, a React Server Component
    // importing even Card fails on the hooks its neighbours pulled in.
    rollupOptions: { external, output: { banner: '"use client";' } },
  },
  test: { environment: "jsdom", globals: true },
});
