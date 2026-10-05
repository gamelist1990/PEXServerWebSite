import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
const dist = join(process.cwd(), "dist");
const read = (route) => readFileSync(join(dist, route, "index.html"), "utf8");
const meta = (html, key) =>
  [
    ...html.matchAll(
      /<meta\s+(?:property|name)="([^"]+)"\s+content="([^"]*)"\s*\/?\s*>/g,
    ),
  ]
    .filter((match) => match[1] === key)
    .map((match) => match[2]);
const routes = [];
function collect(dir, prefix = "") {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    if (item.isDirectory())
      collect(join(dir, item.name), `${prefix}${item.name}/`);
    else if (item.name === "index.html") routes.push(prefix);
  }
}
collect(dist);
for (const route of routes) {
  const html = read(route);
  for (const key of [
    "description",
    "og:title",
    "og:description",
    "og:url",
    "og:site_name",
    "twitter:card",
    "robots",
  ])
    assert.equal(meta(html, key).length, 1, `${route}: exactly one ${key}`);
  assert.match(html, /<link rel="canonical" href="https:\/\/pexserver\.com\//);
  const schema = JSON.parse(
    html.match(
      /<script type="application\/ld\+json" data-site-schema>(.*?)<\/script>/s,
    )[1],
  );
  assert.ok(schema["@graph"].some((item) => item["@type"] === "WebPage"));
  assert.match(html, /<div id="root"><main/); // useful response without executing JavaScript
  assert.match(html, /<h1>[^<]+<\/h1>/);
}
assert.equal(
  meta(read(""), "og:image").length,
  0,
  "home must not advertise the large logo",
);
assert.equal(meta(read(""), "twitter:image").length, 0);
for (const [id, name] of [
  ["cooldown-animation", "Cooldown Animation"],
  ["check-skin", "GeyserCheckSkin"],
  ["2d-glass", "2D Glass"],
]) {
  const html = read(`downloads/geyser/${id}`);
  assert.ok(meta(html, "og:title")[0].startsWith(name));
  assert.equal(
    meta(html, "og:url")[0],
    `https://pexserver.com/downloads/geyser/${id}/`,
  );
  assert.equal(meta(html, "twitter:card")[0], "summary");
  assert.equal(meta(html, "og:image").length, 1);
  const image = meta(html, "og:image")[0];
  const bytes = readFileSync(join(dist, new URL(image).pathname));
  assert.equal(bytes.readUInt32BE(16), Number(meta(html, "og:image:width")[0]));
  assert.equal(
    bytes.readUInt32BE(20),
    Number(meta(html, "og:image:height")[0]),
  );
  assert.match(html, /最新版をダウンロード|MCPACKをダウンロード/);
}
const sitemap = readFileSync(join(dist, "sitemap.xml"), "utf8");
assert.match(
  sitemap,
  /https:\/\/pexserver\.com\/downloads\/geyser\/cooldown-animation\//,
);
assert.match(
  sitemap,
  /https:\/\/pexserver\.com\/downloads\/geyser\/2d-glass\//,
);
assert.match(
  sitemap,
  /https:\/\/pexserver\.com\/downloads\/geyser\/check-skin\//,
);
assert.ok(!sitemap.includes("/tools/pexserver"));
assert.match(
  readFileSync(join(dist, "robots.txt"), "utf8"),
  /Sitemap: https:\/\/pexserver\.com\/sitemap.xml/,
);
assert.deepEqual(meta(readFileSync(join(dist, "404.html"), "utf8"), "robots"), [
  "noindex, follow",
]);
console.log(
  `Verified ${routes.length} static pages, resource icons, text-only home, canonical URLs, JSON-LD, sitemap and robots.txt.`,
);

const catalog = JSON.parse(readFileSync(join(dist, "downloads.json"), "utf8"));
const sourceCatalog = JSON.parse(
  readFileSync("src/data/generated/downloads.json", "utf8"),
);
assert.deepEqual(
  catalog,
  sourceCatalog,
  "Public JSON and built catalog must match",
);
for (const resource of catalog.resources) {
  const html = read(`downloads/geyser/${resource.id}`);
  assert.ok(
    meta(html, "og:title")[0].includes(`v${resource.version}`),
    "OG title must contain the generated version",
  );
  for (const link of resource.links)
    assert.ok(
      html.includes(link.href),
      "Static resource page must include generated download links",
    );
}
