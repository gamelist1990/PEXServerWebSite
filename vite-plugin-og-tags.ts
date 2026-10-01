import type { Plugin } from "vite";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";

import { pageMetadata } from "./src/data/pageMetadata";
import type { MetaTagsConfig } from "./src/hooks/useMetaTags";

// Base URL for the site
const SITE_URL = "https://pexserver.com";

function generateMetaTags(config: MetaTagsConfig, route: string): string {
  const tags: string[] = [];

  if (config.description) {
    tags.push(
      `    <meta name="description" content="${config.description}" />`,
    );
  }

  if (config.ogTitle) {
    tags.push(`    <meta property="og:title" content="${config.ogTitle}" />`);
  }

  if (config.ogDescription) {
    tags.push(
      `    <meta property="og:description" content="${config.ogDescription}" />`,
    );
  }

  if (config.ogType) {
    tags.push(`    <meta property="og:type" content="${config.ogType}" />`);
  }

  // Add og:url for proper social sharing
  const pageUrl = route === "/" ? SITE_URL : `${SITE_URL}${route}`;
  tags.push(`    <meta property="og:url" content="${pageUrl}" />`);

  if (config.ogImage) {
    // Convert relative image path to absolute URL
    const imageUrl = config.ogImage.startsWith("http")
      ? config.ogImage
      : `${SITE_URL}/${config.ogImage.replace(/^\.\//, "")}`;
    tags.push(`    <meta property="og:image" content="${imageUrl}" />`);
  }

  if (config.twitterCard) {
    tags.push(
      `    <meta name="twitter:card" content="${config.twitterCard}" />`,
    );
  }

  return tags.join("\n");
}

export function ogTagsPlugin(): Plugin {
  return {
    name: "vite-plugin-og-tags",
    apply: "build",
    closeBundle() {
      const distDir = join(process.cwd(), "dist");
      const indexHtml = readFileSync(join(distDir, "index.html"), "utf-8");

      // Generate HTML file for each route
      Object.entries(pageMetadata).forEach(([route, metadata]) => {
        if (route === "/") return; // Skip homepage, it's already index.html

        let html = indexHtml;

        // Replace title
        if (metadata.title) {
          html = html.replace(
            /<title>.*?<\/title>/,
            `<title>${metadata.title}</title>`,
          );
        }

        // Replace meta tags
        const metaTags = generateMetaTags(metadata, route);

        // Remove old meta tags (with multiline support)
        html = html.replace(/<meta\s+name="description"[^>]*>\s*/g, "");
        html = html.replace(/<meta\s+property="og:title"[^>]*>\s*/g, "");
        html = html.replace(/<meta\s+property="og:description"[^>]*>\s*/g, "");
        html = html.replace(/<meta\s+property="og:type"[^>]*>\s*/g, "");
        html = html.replace(/<meta\s+property="og:url"[^>]*>\s*/g, "");
        html = html.replace(/<meta\s+property="og:image"[^>]*>\s*/g, "");
        html = html.replace(/<meta\s+name="twitter:card"[^>]*>\s*/g, "");

        // Add new meta tags before the theme-color meta tag
        html = html.replace(
          /(<meta name="theme-color")/,
          `${metaTags}\n    $1`,
        );

        // Determine output path
        const routePath = route.substring(1); // Remove leading slash
        const outputPath = join(distDir, routePath, "index.html");

        // Create directory if it doesn't exist
        mkdirSync(dirname(outputPath), { recursive: true });

        // Write the HTML file
        writeFileSync(outputPath, html, "utf-8");
        console.log(`Generated: ${outputPath}`);
      });
    },
  };
}
