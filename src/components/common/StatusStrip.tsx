import { NavLink } from "react-router-dom";
import {
  servers,
  statusEndpoint,
  detectedVersion,
  type ServerConfig,
} from "../../app/servers";
import { useServerStatus } from "../../hooks/useServerStatus";
import { CopyAddress } from "./CopyAddress";

function StatusStripEntry({ server }: { server: ServerConfig }) {
  const { status, loading, error } = useServerStatus(statusEndpoint(server));
  const version = detectedVersion(status);
  return (
    <article className="status-strip-entry">
      <div className="server-entry-top">
        <h3>{server.name}</h3>
        <span className={`live-label ${status?.online ? "online" : ""}`}>
          {loading
            ? "確認中"
            : error
              ? "取得できません"
              : status?.online
                ? "ONLINE"
                : "OFFLINE"}
        </span>
      </div>
      <div className="server-entry-meta">
        <span>
          {status?.online
            ? `${status.players?.online ?? "—"} 人が参加中`
            : "参加人数 —"}
        </span>
        <span>Java {version || `${server.fallbackVersion}（参考）`}</span>
        <span>Bedrock ポート {server.bedrockPort}</span>
      </div>
      <CopyAddress address={server.address} />
    </article>
  );
}

export function StatusStrip() {
  return (
    <section className="status-strip" aria-labelledby="status-strip-title">
      <div className="status-strip-head">
        <div>
          <p className="eyebrow">LIVE STATUS / JOIN</p>
          <h2 id="status-strip-title">今すぐ参加できます</h2>
        </div>
        <NavLink className="text-link" to="/status">
          稼働状況を詳しく見る ↗
        </NavLink>
      </div>
      <div className="status-strip-grid">
        {servers.map((server) => (
          <StatusStripEntry key={server.id} server={server} />
        ))}
      </div>
    </section>
  );
}
