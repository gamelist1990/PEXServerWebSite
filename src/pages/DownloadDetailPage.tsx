import { NavLink } from "react-router-dom";
import { type DownloadResource, resourcePath } from "../data/downloads";
import { ShareTitle } from "../components/common/ShareTitle";
import {
  ResourceActions,
  ResourcePreview,
} from "../components/common/ResourcePreview";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";
import { useDownloads } from "../hooks/useDownloads";
export function DownloadDetailPage({
  resource: staticResource,
}: {
  resource: DownloadResource;
}) {
  useMetaTags(pageMetadata[resourcePath(staticResource)]);
  // Routes and metadata come from the bundled catalog (build time), but
  // the rendered content prefers the fresher API copy of the same
  // resource when downloads.get provides one.
  const catalog = useDownloads();
  const resource =
    catalog.find((item) => item.id === staticResource.id) ?? staticResource;
  return (
    <div className="page-grid resource-detail">
      <NavLink className="text-link" to="/downloads">
        ← 配布一覧に戻る
      </NavLink>
      <article className="download-card resource-detail-card">
        <ResourcePreview resource={resource} />
        <div className="download-card-body">
          <span className="download-kind">{resource.kind}</span>
          <h1>
            <ShareTitle path={resourcePath(resource)} name={resource.name}>
              {resource.name}
            </ShareTitle>
          </h1>
          <p>{resource.description}</p>
          <div className="mode-tags">
            {resource.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p className="download-note">{resource.note}</p>
          <ResourceActions resource={resource} />
          <p className="download-note">
            タイトルをクリックすると、この配布ページの共有URLをコピーできます。
          </p>
        </div>
      </article>
      {resource.features && resource.features.length > 0 && (
        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">FEATURES</p>
            <h2>できること</h2>
          </div>
          <div className="feature-grid">
            {resource.features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      {resource.installSteps && resource.installSteps.length > 0 && (
        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">INSTALL</p>
            <h2>導入手順</h2>
          </div>
          <ol className="install-steps">
            {resource.installSteps.map((step, index) => (
              <li className="install-step" key={step}>
                <span className="install-step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
      {resource.warning && (
        <section className="notes-panel warning-panel">
          <p className="eyebrow">CAUTION</p>
          <h2>注意事項</h2>
          <p>{resource.warning}</p>
        </section>
      )}
    </div>
  );
}
