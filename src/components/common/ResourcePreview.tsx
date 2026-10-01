import { SITE_BASE_PATH } from "../../app/sitePaths";
import { type DownloadResource, resourcePath } from "../../data/downloads";
import { ShareTitle } from "../common/ShareTitle";
export function ResourcePreview({ resource }: { resource: DownloadResource }) {
  return resource.id === "cooldown-animation" ? (
    <div className="download-preview cooldown-preview">
      <span>{resource.eyebrow}</span>
      <div className="cooldown-bars" aria-hidden="true">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <i key={n} />
        ))}
      </div>
      <ShareTitle path={resourcePath(resource)} name={resource.name}>
        <strong>
          Cooldown
          <br />
          Animation
        </strong>
      </ShareTitle>
      <small>JAVA COMBAT → BEDROCK</small>
    </div>
  ) : (
    <div className="download-preview glass-preview">
      <img
        src={`${SITE_BASE_PATH}${resource.image}`}
        alt={`${resource.name}のパックアイコン`}
        width="256"
        height="256"
      />
      <span>{resource.eyebrow}</span>
    </div>
  );
}
export function ResourceActions({ resource }: { resource: DownloadResource }) {
  return (
    <div className="download-actions">
      {resource.links.map((link, index) => (
        <a
          className={index === 0 ? "primary-button" : "text-link"}
          key={link.href}
          href={
            link.href.startsWith("https:")
              ? link.href
              : `${SITE_BASE_PATH}${link.href}`
          }
          target={"external" in link && link.external ? "_blank" : undefined}
          rel={"external" in link && link.external ? "noreferrer" : undefined}
          download={"download" in link ? link.download : undefined}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
