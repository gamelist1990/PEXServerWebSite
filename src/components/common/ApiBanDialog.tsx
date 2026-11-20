import { useEffect, useState } from "react";
import {
  getCurrentBan,
  subscribeApiBan,
  type ApiBanInfo,
} from "../../lib/apiClient";

function formatRemaining(retryAfterSeconds: number): string {
  if (retryAfterSeconds <= 0) return "まもなく";
  const hours = Math.floor(retryAfterSeconds / 3600);
  const minutes = Math.floor((retryAfterSeconds % 3600) / 60);
  if (hours > 0) return `約 ${hours} 時間 ${minutes} 分`;
  if (minutes > 0) return `約 ${minutes} 分`;
  return `約 ${retryAfterSeconds} 秒`;
}

/**
 * Warning dialog shown when the API reports this client as banned
 * (anomaly detection on the server side). Rendered once from App.
 */
export function ApiBanDialog() {
  const [ban, setBan] = useState<ApiBanInfo | null>(() => getCurrentBan());
  const [dismissed, setDismissed] = useState(false);

  useEffect(
    () =>
      subscribeApiBan((info) => {
        setBan(info);
        setDismissed(false);
      }),
    [],
  );

  if (!ban || dismissed) return null;

  return (
    <div className="api-ban-overlay">
      <div
        className="api-ban-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="api-ban-title"
        aria-describedby="api-ban-body"
      >
        <p className="eyebrow">ACCESS RESTRICTED</p>
        <h2 id="api-ban-title">アクセスが制限されています</h2>
        <div id="api-ban-body">
          <p>{ban.reason}</p>
          <p>
            制限の解除目安: <strong>{formatRemaining(ban.retryAfterSeconds)}</strong>
          </p>
          <p>
            心当たりがない場合は、しばらく時間をおいてから再度アクセスしてください。
          </p>
        </div>
        <button
          type="button"
          className="primary-button"
          onClick={() => setDismissed(true)}
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
