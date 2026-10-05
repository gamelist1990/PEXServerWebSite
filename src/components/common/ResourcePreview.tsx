import { SITE_BASE_PATH } from "../../app/sitePaths";
import { type DownloadResource, resourcePath } from "../../data/downloads";
import { ShareTitle } from "../common/ShareTitle";
export function ResourcePreview({ resource }: { resource: DownloadResource }) {
  return resource.kind === "GEYSER EXTENSION" ? (
    <div className="download-preview extension-preview">
      <img
        src={`${SITE_BASE_PATH}${resource.image}`}
        alt={resource.id === "cooldown-animation"
          ? "ダイヤの剣と攻撃のチャージを表す光の軌跡"
          : "スキャンシールドで保護されたブロック型のプレイヤー"}
        width={resource.imageWidth}
        height={resource.imageHeight}
      />
      <div className="extension-preview-copy">
        <span>{resource.eyebrow}</span>
        <ShareTitle path={resourcePath(resource)} name={resource.name}>
          <strong>{resource.id === "cooldown-animation" ? <>Cooldown<br />Animation</> : "CheckSkin"}</strong>
        </ShareTitle>
      </div>
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
