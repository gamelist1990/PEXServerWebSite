import { useServerStatus } from "../../hooks/useServerStatus";
import { MetricCard } from "../common/MetricCard";

type StatusCardProps = {
  title: string;
  panelLabel: string;
  statusState: ReturnType<typeof useServerStatus>;
  fallbackSoftware: string;
  addressLabel: string;
  portLabel: string;
};

export function StatusCard({ title, panelLabel, statusState, fallbackSoftware, addressLabel, portLabel }: StatusCardProps) {
  const { status, loading, error } = statusState;
  const online = Boolean(status?.online);
  const playerCount = status?.players?.online ?? 0;
  const maxPlayers = status?.players?.max ?? "?";
  const version = status?.protocol?.name || status?.version || "Unknown";
  const motd = status?.motd?.clean?.join(" ") || "PEXserver";
  const software = status?.software || status?.gamemode || fallbackSoftware;

  return (
    <aside className="status-panel">
      <div className="status-panel-header">
        <div>
          <p className="panel-label">{panelLabel}</p>
          <h2>{title}</h2>
        </div>
        <span className={`pulse ${online ? "is-online" : "is-offline"}`} />
      </div>

      <div className="status-banner">
        <span>{loading ? "Checking..." : online ? "稼働中" : "停止中"}</span>
        <strong>
          {playerCount} / {maxPlayers}
        </strong>
      </div>

      <div className="status-grid">
        <MetricCard label="Version" value={version} />
        <MetricCard label="Software" value={software} />
        <MetricCard label="Address" value={addressLabel} />
        <MetricCard label="Port" value={portLabel} />
      </div>

      <div className="motd-card">
        <p className="panel-label">MOTD</p>
        <p>{motd}</p>
      </div>

      {error ? <p className="status-error">{error}</p> : null}
    </aside>
  );
}
