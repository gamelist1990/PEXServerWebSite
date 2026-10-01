import { servers, statusEndpoint, type ServerConfig } from "../app/servers";
import { StatusCard } from "../components/status/StatusCard";
import { useServerStatus } from "../hooks/useServerStatus";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";
function ServerStatusSection({ server }: { server: ServerConfig }) {
  const java = useServerStatus(statusEndpoint(server));
  const bedrock = useServerStatus(statusEndpoint(server, true));
  return (
    <section>
      <div className="library-title">
        <h2>{server.name}</h2>
        <span>{server.address}</span>
      </div>
      <div className="dual-status-grid">
        <StatusCard
          title="Java Edition"
          panelLabel={server.label}
          statusState={java}
          fallbackSoftware="Paper"
          addressLabel={server.address}
          portLabel="25565"
        />
        <StatusCard
          title="Bedrock Edition"
          panelLabel={server.label}
          statusState={bedrock}
          fallbackSoftware="Geyser"
          addressLabel={server.address}
          portLabel={String(server.bedrockPort)}
        />
      </div>
    </section>
  );
}
export function StatusPage() {
  useMetaTags(pageMetadata["/status"]);
  return (
    <div className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">LIVE / NETWORK STATUS</p>
        <h1>今の世界を、チェック。</h1>
        <p className="section-text">
          2つのサーバーの稼働状況・公開バージョンをJava /
          Bedrockごとに自動取得しています。約5分ごとに更新します。
        </p>
      </section>
      {servers.map((server) => (
        <ServerStatusSection key={server.id} server={server} />
      ))}
      <p className="directory-note">
        情報提供：mcsrvstat.us。表示はサーバーが公開するバージョン情報です。取得失敗時は停止と区別して表示します。
      </p>
    </div>
  );
}
