import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";
import {
  downloadResources,
  resourceCategory,
  resourcePath,
  type DownloadResource,
} from "../data/downloads";
import { useDownloads } from "../hooks/useDownloads";
import { ShareTitle } from "../components/common/ShareTitle";
import {
  ResourcePreview,
  ResourceActions,
} from "../components/common/ResourcePreview";
const categories = ["すべて", "Geyser", "Client Mod", "PEXServer"] as const;

// Detail pages (routes + SEO metadata) are generated at build time from
// the bundled catalog, so only those resources get a detail link. Newer
// entries served only by the API still render as cards with their links.
const detailResourceIds = new Set(
  downloadResources.map((resource) => resource.id),
);

function ResourceCard({ resource }: { resource: DownloadResource }) {
  return (
    <article className="download-card">
      <ResourcePreview resource={resource} />
      <div className="download-card-body">
        <span className="download-kind">{resource.kind}</span>
        <h3>
          <ShareTitle path={resourcePath(resource)} name={resource.name}>
            {resource.name}
          </ShareTitle>
        </h3>
        <p>{resource.description}</p>
        <div className="mode-tags">
          {resource.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <p className="download-note">{resource.note}</p>
        <ResourceActions resource={resource} />
        {detailResourceIds.has(resource.id) && (
          <NavLink
            className="resource-detail-link text-link"
            to={resourcePath(resource)}
          >
            詳細・共有ページ →
          </NavLink>
        )}
      </div>
    </article>
  );
}

export function DownloadsPage() {
  useMetaTags(pageMetadata["/downloads"]);
  const [category, setCategory] =
    useState<(typeof categories)[number]>("すべて");
  // Runtime catalog from the API (downloads.get); the bundled static
  // catalog is the initial value and the fallback (see useDownloads).
  const resources = useDownloads();
  const geyserResources = resources.filter(
    (resource) => resourceCategory(resource) === "geyser",
  );
  const clientModResources = resources.filter(
    (resource) => resourceCategory(resource) === "client-mod",
  );
  return (
    <div className="page-grid downloads-page">
      <section className="download-heading">
        <p className="eyebrow">RESOURCE LIBRARY</p>
        <h1>遊びを、もっと快適に。</h1>
        <p className="section-text">
          Geyser向けの拡張機能・リソースパック、Bedrock向けクライアントModと、PEXserverの公開ソフトウェアを配布しています。
        </p>
      </section>
      <div className="download-filter" aria-label="配布カテゴリ">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={category === item ? "selected" : ""}
          >
            {item}
          </button>
        ))}
      </div>
      {(category === "すべて" || category === "Geyser") && (
        <section aria-labelledby="geyser-title">
          <div className="library-title">
            <h2 id="geyser-title">Geyser</h2>
            <span>EXTENSION & RESOURCE PACK</span>
          </div>
          <div className="download-grid">
            {geyserResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>
      )}
      {(category === "すべて" || category === "Client Mod") && (
        <section aria-labelledby="client-mod-title">
          <div className="library-title">
            <h2 id="client-mod-title">Client Mod</h2>
            <span>BEDROCK CLIENT MOD</span>
          </div>
          <div className="download-grid">
            {clientModResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>
      )}
      {(category === "すべて" || category === "PEXServer") && (
        <section aria-labelledby="software-title">
          <div className="library-title">
            <h2 id="software-title">PEXServer</h2>
            <span>OPEN SOURCE SOFTWARE</span>
          </div>
          <NavLink
            to="/downloads/pexserver/ferrumproxy"
            className="software-download"
          >
            <div>
              <span className="download-kind">NETWORK CORE</span>
              <h3>FerrumProxy</h3>
              <p>
                PEXserverのネットワークを支えるプロキシ。Client・GUI・本体の配布はこちら。
              </p>
            </div>
            <span className="software-arrow" aria-hidden="true">
              ↗
            </span>
          </NavLink>
        </section>
      )}
    </div>
  );
}
