import { useEffect, useState, type ReactNode } from "react";
import { SITE_BASE_PATH } from "../../app/sitePaths";
export function ShareTitle({
  path,
  name,
  children,
  className = "",
}: {
  path: string;
  name: string;
  children: ReactNode;
  className?: string;
}) {
  const [feedback, setFeedback] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");
  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(""), 3000);
    return () => window.clearTimeout(timer);
  }, [feedback]);
  const copy = async () => {
    const url = new URL(
      `${SITE_BASE_PATH}${path.replace(/^\//, "")}/`,
      window.location.origin,
    ).href;
    try {
      await navigator.clipboard.writeText(url);
      setFallbackUrl("");
      setFeedback("共有URLをコピーしました");
    } catch {
      setFallbackUrl(url);
      setFeedback("共有URLを選択してコピーしてください");
    }
  };
  return (
    <span className={`share-title ${className}`}>
      <button
        type="button"
        onClick={() => void copy()}
        className="share-title-button"
        title="クリックして共有URLをコピー"
        aria-label={`${name}の共有URLをコピー`}
      >
        <span className="share-title-text">{children}</span>
        <span className="share-title-icon" aria-hidden="true">
          ⧉
        </span>
      </button>
      <span className="share-title-feedback" role="status">
        {feedback}
      </span>
      {fallbackUrl && (
        <input
          className="share-title-fallback"
          aria-label={`${name}の共有URL`}
          value={fallbackUrl}
          readOnly
          onFocus={(event) => event.currentTarget.select()}
        />
      )}
    </span>
  );
}
