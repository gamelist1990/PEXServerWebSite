import { NavLink } from "react-router-dom";
import { featureCards, serverFacts } from "../data/siteContent";
import { downloadResources, resourcePath } from "../data/downloads";
import { DISCORD_INVITE_URL } from "../app/constants";
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

const dynamicClient = downloadResources.find(
  (resource) => resource.id === "dynamic-client",
);

type LinkCard = {
  label: string;
  title: string;
  body: string;
  meta: string;
  href: string;
  external?: boolean;
  primary?: boolean;
};

const linkCards: LinkCard[] = [
  {
    label: "JOIN / MAIN SERVER",
    title: "PEXserver に参加",
    body: "対戦・ミニゲームのメインサーバー。参加手順は画像付きガイドで確認できます。",
    meta: "pexserver.com · Bedrock ポート 19132",
    href: "/guide?server=network",
    primary: true
  },
  {
    label: "SURVIVAL",
    title: "PEXSurvival",
    body: "自分のペースで冒険を続けられるサバイバルサーバー。",
    meta: "play.pexserver.com · Bedrock ポート 19132",
    href: "/survival"
  },
  {
    label: "FILESHARE",
    title: "FileShare",
    body: "みんなの共有フォルダと、自分だけのプライベート空間。",
    meta: "share.pexserver.com",
    href: "https://share.pexserver.com",
    external: true
  },
  {
    label: "BLOG",
    title: "PEXServer Blog",
    body: "開発メモや機材レビュー、サーバーの裏側を書いています。",
    meta: "blog.pexserver.com",
    href: "https://blog.pexserver.com",
    external: true
  },
  {
    label: "COMMUNITY",
    title: "Discord",
    body: "お知らせやサーバーの案内、雑談は Discord で。",
    meta: "招待リンク（外部）",
    href: DISCORD_INVITE_URL,
    external: true
  },
  {
    label: "CLIENT MOD",
    title: "DynamicClient",
    body: "Zoom・AutoSprint・TabList・Fullbright・Freecam をまとめた Bedrock 向けクライアント Mod。",
    meta: "対応版 1.26.65.1（Windows）",
    href: dynamicClient ? resourcePath(dynamicClient) : "/downloads"
  },
  {
    label: "DOWNLOADS",
    title: "配布ページ",
    body: "Geyser 拡張・リソースパック・クライアント Mod の配布一覧。",
    meta: "Downloads",
    href: "/downloads"
  },
  {
    label: "STATUS",
    title: "ステータス",
    body: "2 つのサーバーの稼働状況と参加人数を確認できます。",
    meta: "Status",
    href: "/status"
  },
  {
    label: "DEVELOPERS",
    title: "開発者向け情報",
    body: "Web API の仕組みや GitHub リポジトリ、Bedrock 向け Mod 開発への入口をまとめました。",
    meta: "Developers",
    href: "/developers"
  }
];

function LinkCardView({ card }: { card: LinkCard }) {
  const className = `link-card${card.primary ? " link-card-primary" : ""}`;
  const content = (
    <>
      <span className="link-card-label">{card.label}</span>
      <h3>
        {card.title}
        <span className="link-card-arrow" aria-hidden="true">
          {card.external ? "↗" : "→"}
        </span>
      </h3>
      <p>{card.body}</p>
      <span className="link-card-meta">{card.meta}</span>
    </>
  );
  return card.external ? (
    <a className={className} href={card.href} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <NavLink className={className} to={card.href}>
      {content}
    </NavLink>
  );
}

export function AboutPage() {
  useMetaTags(pageMetadata['/about']);
  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">About PEXserver</p>
        <h1>PEXserver について</h1>
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
          <p className="eyebrow">Links</p>
          <h2>つながる・遊ぶ・そろえる</h2>
          <p className="section-text">
            サーバーへの参加から、共有ストレージ、配布中のクライアント Mod まで、PEXserver の入口をまとめました。
          </p>
        </div>
        <div className="link-card-grid">
          {linkCards.map((card) => (
            <LinkCardView key={card.title} card={card} />
          ))}
        </div>
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
