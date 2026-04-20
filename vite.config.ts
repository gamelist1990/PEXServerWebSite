import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ogTagsPlugin } from "./vite-plugin-og-tags";

const configuredBase = process.env.VITE_BASE_PATH?.trim();
const base = configuredBase ? (configuredBase.endsWith("/") ? configuredBase : `${configuredBase}/`) : "/";

export default defineConfig({
  plugins: [react(), ogTagsPlugin()],
  base,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        notFound: resolve(__dirname, "404.html")
      }
    }
  }
});
