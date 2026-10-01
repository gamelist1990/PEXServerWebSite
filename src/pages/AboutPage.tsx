import { NavLink } from "react-router-dom";
import { featureCards, serverFacts } from "../data/siteContent";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";

const techPoints = [
  {
    title: "Java / Bedrock 両対応",
    body: "Geyser・Floodgate 連携により、Java 版と Bedrock（統合版）の両方から同じサーバーへ参加できます。"
  },
  {
    title: "自作 Paper プラグイン",
    body: "サーバーの中核は自作の Paper プラグインで、カスタムアイテム・独自コマンド・GameRule・タグイベントなどを実装しています。"
  },
  {
    title: "対戦とミニゲームが中心",
    body: "Duel や Pot PvP といった対人戦に加え、20 種類以上のミニゲームを用意した小規模コミュニティ鯖です。"
  }
];

export function AboutPage() {
  useMetaTags(pageMetadata['/about']);
  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">About PEXserver</p>
        <h2>PEXserver について</h2>
        <p className="section-text">
          PEXserver は Minecraft の Java 版 / Bedrock 版で運営している小規模のマイクラサーバーです。
          自作の Paper プラグイン（Java 25）を中核に、Duel・Pot PvP・ミニゲームに加え、play.pexserver.comでサバイバルも提供しています。対応バージョンはステータスページで自動取得しています。
        </p>
      </section>

      <section className="server-facts">
        {serverFacts.map((fact) => (
          <div className="server-fact" key={fact.label}>
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </div>
        ))}
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Technology</p>
          <h2>サーバーの仕組み</h2>
        </div>
        <div className="feature-grid">
          {techPoints.map((point) => (
            <article className="feature-card" key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Highlights</p>
          <h2>遊びの柱</h2>
        </div>
        <div className="feature-grid">
          {featureCards.map((card) => (
            <article className="feature-card" key={card.title}>
              <p className="card-eyebrow">{card.eyebrow}</p>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="notes-panel">
        <p className="eyebrow">Get Started</p>
        <h2>遊んでみる</h2>
        <p>参加方法は画像付きのガイドにまとめています。まずは接続して、気になるモードから遊んでみてください。</p>
        <div className="hero-actions">
          <NavLink className="primary-button" to="/guide">参加方法を見る</NavLink>
          <NavLink className="secondary-button" to="/status">稼働状況を確認</NavLink>
        </div>
      </section>
    </section>
  );
}
