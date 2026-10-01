import { NavLink } from "react-router-dom";
import { servers, statusEndpoint, detectedVersion } from "../app/servers";
import { CopyAddress } from "../components/common/CopyAddress";
import { useServerStatus } from "../hooks/useServerStatus";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";
export function SurvivalPage() {
  useMetaTags(pageMetadata["/survival"]);
  const server = servers[1];
  const { status, loading, error } = useServerStatus(statusEndpoint(server));
  const version = detectedVersion(status);
  return (
    <div className="page-grid">
      <section className="panel section-hero survival-hero">
        <p className="eyebrow">PEXSurvival / SURVIVAL SERVER</p>
        <h1>冒険は、自分のペースで。</h1>
        <p className="section-text">
          探索して、集めて、建てる。play.pexserver.comで、サバイバルの世界を楽しもう。
        </p>
        <CopyAddress address={server.address} />
        <div className="server-entry-meta">
          <span>
            {loading
              ? "稼働状況を確認中"
              : error
                ? "取得できません"
                : status?.online
                  ? "ONLINE"
                  : "OFFLINE"}
          </span>
          <span>
            Java {version || `${server.fallbackVersion}（参考・未取得）`}
          </span>
        </div>
        <div className="hero-link-row">
          <NavLink className="primary-button" to="/guide?server=survival">
            参加方法を見る ↗
          </NavLink>
          <NavLink className="text-link" to="/status">
            Java / Bedrockの稼働状況 →
          </NavLink>
        </div>
      </section>
      <section className="notes-panel">
        <p className="eyebrow">YOUR WORLD</p>
        <h2>新しい世界で、遊びを広げよう。</h2>
        <p>
          対戦やミニゲームはpexserver.com、サバイバルはplay.pexserver.comへ。遊びたいモードに合わせて接続先を選べます。
        </p>
        <NavLink className="text-link" to="/">
          サーバー一覧に戻る →
        </NavLink>
      </section>
    </div>
  );
}
