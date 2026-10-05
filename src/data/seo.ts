import type { MetaTagsConfig } from "../hooks/useMetaTags";
import { downloadResources, resourcePath } from "./downloads";
export const SITE_URL = "https://pexserver.com";
export function canonicalUrl(path: string = "/") {
  return `${SITE_URL}${path === "/" ? "/" : `${path.replace(/\/$/, "")}/`}`;
}
export function metadataEntries(config: MetaTagsConfig) {
  const entries: {
    attribute: "name" | "property";
    key: string;
    content: string;
  }[] = [];
  const name = (key: string, content: string) =>
    entries.push({ attribute: "name", key, content });
  const property = (key: string, content: string) =>
    entries.push({ attribute: "property", key, content });
  name("description", config.description || "");
  name("robots", config.noindex ? "noindex, follow" : "index, follow");
  property("og:title", config.ogTitle || config.title || "PEXserver");
  property("og:description", config.ogDescription || config.description || "");
  property("og:type", config.ogType || "website");
  property("og:site_name", "PEXserver");
  property("og:locale", "ja_JP");
  property("og:url", canonicalUrl(config.canonicalPath));
  name("twitter:card", config.twitterCard || "summary");
  name("twitter:title", config.ogTitle || config.title || "PEXserver");
  name("twitter:description", config.ogDescription || config.description || "");
  if (config.ogImage) {
    const image = new URL(config.ogImage.replace(/^\.\//, ""), `${SITE_URL}/`)
      .href;
    property("og:image", image);
    property(
      "og:image:alt",
      config.ogImageAlt || config.ogTitle || "PEXserver",
    );
    property("og:image:type", "image/png");
    if (config.ogImageWidth)
      property("og:image:width", String(config.ogImageWidth));
    if (config.ogImageHeight)
      property("og:image:height", String(config.ogImageHeight));
    name("twitter:image", image);
    name(
      "twitter:image:alt",
      config.ogImageAlt || config.ogTitle || "PEXserver",
    );
  }
  return entries;
}
export function structuredData(config: MetaTagsConfig) {
  const url = canonicalUrl(config.canonicalPath);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "PEXserver",
      inLanguage: "ja",
    },
    {
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name: config.title,
      description: config.description,
      inLanguage: "ja",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
  ];
  if (config.canonicalPath !== "/")
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "PEXserver",
          item: `${SITE_URL}/`,
        },
        { "@type": "ListItem", position: 2, name: config.ogTitle, item: url },
      ],
    });
  const resource = downloadResources.find(
    (item) => resourcePath(item) === config.canonicalPath,
  );
  if (resource)
    graph.push({
      "@type":
        resource.kind === "GEYSER EXTENSION"
          ? "SoftwareApplication"
          : "CreativeWork",
      name: resource.name,
      description: resource.description,
      url,
      image: new URL(resource.image, `${SITE_URL}/`).href,
      ...(resource.kind === "GEYSER EXTENSION"
        ? {
            applicationCategory: "GameApplication",
            softwareVersion: resource.version,
            operatingSystem: "Geyser / Minecraft Bedrock Edition",
            downloadUrl: resource.links[0].href,
          }
        : {}),
    });
  return { "@context": "https://schema.org", "@graph": graph };
}
