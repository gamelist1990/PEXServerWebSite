import { NavLink } from "react-router-dom";
import { type DownloadResource, resourcePath } from "../data/downloads";
import { ShareTitle } from "../components/common/ShareTitle";
import {
  ResourceActions,
  ResourcePreview,
} from "../components/common/ResourcePreview";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";
export function DownloadDetailPage({
  resource,
}: {
  resource: DownloadResource;
}) {
  useMetaTags(pageMetadata[resourcePath(resource)]);
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
    </div>
  );
}
