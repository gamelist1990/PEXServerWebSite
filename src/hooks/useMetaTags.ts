import { useEffect } from "react";
import { canonicalUrl, metadataEntries, structuredData } from "../data/seo";
export interface MetaTagsConfig {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  twitterCard?: string;
  canonicalPath?: string;
  noindex?: boolean;
}
export function useMetaTags(config: MetaTagsConfig) {
  useEffect(() => {
    if (config.title) document.title = config.title;
    // Remove stale image/SEO tags when navigating between a resource and a text-only page.
    document.head
      .querySelectorAll(
        'meta[property^="og:"], meta[name^="twitter:"], meta[name="description"], meta[name="robots"]',
      )
      .forEach((tag) => tag.remove());
    for (const entry of metadataEntries(config)) {
      const tag = document.createElement("meta");
      tag.setAttribute(entry.attribute, entry.key);
      tag.content = entry.content;
      document.head.appendChild(tag);
    }
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl(config.canonicalPath);
    let schema = document.head.querySelector<HTMLScriptElement>(
      "script[data-site-schema]",
    );
    if (!schema) {
      schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.dataset.siteSchema = "";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(structuredData(config));
  }, [config]);
}
