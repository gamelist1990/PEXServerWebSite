import { NavLink } from "react-router-dom";
import {
  servers,
  statusEndpoint,
  detectedVersion,
  type ServerConfig,
} from "../../app/servers";
import { useServerStatus } from "../../hooks/useServerStatus";
import { CopyAddress } from "./CopyAddress";
function ServerEntry({
  server,
  index,
}: {
  server: ServerConfig;
  index: number;
}) {
  const { status, loading, error } = useServerStatus(statusEndpoint(server));
  const version = detectedVersion(status);
  return (
    <article className={`server-entry server-entry-${server.id}`}>
      <div className="server-entry-top">
        <span className="entry-index">
          0{index + 1} / {server.label}
        </span>
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
      <h3>{server.name}</h3>
      <p>{server.description}</p>
      <div className="server-entry-meta">
        <span>Java {version || `${server.fallbackVersion}（参考）`}</span>
        <span>
          {status?.online
            ? `${status.players?.online ?? "—"} 人が参加中`
            : "参加人数 —"}
        </span>
      </div>
      <CopyAddress address={server.address} />
      {server.id === "survival" && (
        <NavLink className="text-link" to="/survival">
          サバイバルの紹介 ↗
        </NavLink>
      )}
      <NavLink className="entry-link" to={`/guide?server=${server.id}`}>
        このサーバーへの参加方法 <span>→</span>
      </NavLink>
    </article>
  );
}
export function ServerDirectory() {
  return (
    <div className="server-directory">
      {servers.map((server, index) => (
        <ServerEntry key={server.id} server={server} index={index} />
      ))}
    </div>
  );
}
