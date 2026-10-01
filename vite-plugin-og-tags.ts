import type { Plugin } from "vite";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { pageMetadata } from "./src/data/pageMetadata";
import { downloadResources, resourcePath } from "./src/data/downloads";
import {
  canonicalUrl,
  metadataEntries,
  structuredData,
  SITE_URL,
} from "./src/data/seo";
import type { MetaTagsConfig } from "./src/hooks/useMetaTags";
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );

// Render useful, visible initial content as well as metadata. Bots need not execute React.
function initialContent(config: MetaTagsConfig) {
  const resource = downloadResources.find(
    (item) => resourcePath(item) === config.canonicalPath,
  );
  const links = Object.entries(pageMetadata)
    .filter(([, metadata]) => !metadata.noindex)
    .map(
      ([path, metadata]) =>
        `<a href="${canonicalUrl(path)}">${escapeHtml(metadata.ogTitle || metadata.title || "PEXserver")}</a>`,
    )
    .join(" · ");
  const detail = resource
    ? `<p>${escapeHtml(resource.note)}</p><ul>${resource.links.map((link) => `<li><a href="${escapeHtml(link.href.startsWith("https:") ? link.href : `${SITE_URL}/${link.href}`)}">${escapeHtml(link.label)}</a></li>`).join("")}</ul>`
    : "";
  return `<main class="app-main"><section class="panel section-hero"><p class="eyebrow">PEXserver</p><h1>${escapeHtml(config.ogTitle || config.title || "PEXserver")}</h1><p>${escapeHtml(config.description || "")}</p>${detail}<nav aria-label="サイト内のページ">${links}</nav></section></main>`;
}
function pageHtml(template: string, metadata: MetaTagsConfig) {
  const tags = metadataEntries(metadata)
    .map(
      (tag) =>
        `<meta ${tag.attribute}="${tag.key}" content="${escapeHtml(tag.content)}" />`,
    )
    .join("\n    ");
  const json = JSON.stringify(structuredData(metadata)).replace(
    /</g,
    "\\u003c",
  );
  return template
    .replace(
      /<title>.*?<\/title>/s,
      `<title>${escapeHtml(metadata.title || "PEXserver")}</title>`,
    )
    .replace(
      /<meta\s+(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>\s*/g,
      "",
    )
    .replace(/<link\s+rel="canonical"[^>]*>\s*/g, "")
    .replace(
      /<\/head>/,
      `    ${tags}\n    <link rel="canonical" href="${canonicalUrl(metadata.canonicalPath)}" />\n    <script type="application/ld+json" data-site-schema>${json}</script>\n  </head>`,
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${initialContent(metadata)}</div>`,
    );
}
export function ogTagsPlugin(): Plugin {
  return {
    name: "vite-plugin-og-tags",
    apply: "build",
    closeBundle() {
      const dist = join(process.cwd(), "dist");
      const template = readFileSync(join(dist, "index.html"), "utf-8");
      for (const [route, metadata] of Object.entries(pageMetadata)) {
        const path = join(dist, route.substring(1), "index.html");
        mkdirSync(dirname(path), { recursive: true });
        writeFileSync(path, pageHtml(template, metadata), "utf-8");
      }
      const notFound = readFileSync(join(dist, "404.html"), "utf-8");
      writeFileSync(
        join(dist, "404.html"),
        pageHtml(notFound, {
          title: "ページが見つかりません - PEXserver",
          description:
            "ページが見つかりません。サイト内のリンクから目的のページをお探しください。",
          noindex: true,
          canonicalPath: "/",
        }),
        "utf-8",
      );
      const urls = Object.entries(pageMetadata)
        .filter(([, config]) => !config.noindex)
        .map(([route]) => `  <url><loc>${canonicalUrl(route)}</loc></url>`)
        .join("\n");
      writeFileSync(
        join(dist, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
      writeFileSync(
        join(dist, "robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      );
      console.log(
        `Generated static metadata, crawlable content and sitemap for ${Object.keys(pageMetadata).length} routes.`,
      );
    },
  };
}
