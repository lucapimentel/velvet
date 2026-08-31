import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ include: ["src"], rollupTypes: true })],
  css: { modules: { generateScopedName: "velvet_[local]_[hash:base64:4]" } },
  build: {
    lib: { entry: "src/index.ts", formats: ["es"], fileName: "velvet", cssFileName: "velvet" },
    rollupOptions: { external: ["react", "react-dom", "react/jsx-runtime"] },
  },
  test: { environment: "jsdom", globals: true },
});
