import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ogTagsPlugin } from "./vite-plugin-og-tags";

export default defineConfig({
  plugins: [react(), ogTagsPlugin()],
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        notFound: resolve(__dirname, "404.html")
      }
    }
  }
});
