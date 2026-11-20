import { NavLink } from "react-router-dom";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";

const apiPoints = [
  {
    title: "封筒化された通信",
    body: "ブラウザと API の間の通信は、PEXSecureEnvelope の traffic プロトコル（P-256 ECDH で鍵を共有し、AES-256-GCM で封入）を通ります。生の JSON を直接受け付ける口はありません。",
  },
  {
    title: "短命セッションと単回パケット",
    body: "接続はハンドシェイクで始まる約10分の短命セッションで、各リクエストのパケットは1回だけ使用できます。再送（リプレイ）は拒否され、異常なアクセスは一時的に遮断されます。",
  },
  {
    title: "提供中のオペレーション",
    body: "サーバーステータスを返す status.get と、配布カタログを返す downloads.get を提供しています。外部サービスへの問い合わせはブラウザではなく API サーバー側が行い、短いキャッシュを持ちます。",
  },
];

type RepoCard = {
  label: string;
  title: string;
  body: string;
  meta: string;
  href: string;
};

const repositories: RepoCard[] = [
  {
    label: "WEBSITE",
    title: "PEXServerWebSite",
    body: "このサイト（pexserver.com）のソースコード。Vite + React 製の静的サイトです。",
    meta: "github.com/gamelist1990/PEXServerWebSite",
    href: "https://github.com/gamelist1990/PEXServerWebSite",
  },
  {
    label: "CLIENT MOD SDK",
    title: "BedrockDynamicSDK",
    body: "Minecraft Bedrock（Windows）向けクライアント Mod の SDK 本体。DynamicClient などの Mod はこれで作られています。",
    meta: "github.com/gamelist1990/BedrockDynamicSDK",
    href: "https://github.com/gamelist1990/BedrockDynamicSDK",
  },
  {
    label: "CRYPTO LIBRARY",
    title: "PEXSecureEnvelope",
    body: "Web API の通信を封筒化する暗号ライブラリ。このサイトの API 通信にも使われています。",
    meta: "github.com/gamelist1990/PEXSecureEnvelope",
    href: "https://github.com/gamelist1990/PEXSecureEnvelope",
  },
  {
    label: "MOD TOOLING",
    title: "PEXModStudio",
    body: "BedrockDynamicSDK 向け Mod の制作・管理を支援するツールです。",
    meta: "github.com/gamelist1990/PEXModStudio",
    href: "https://github.com/gamelist1990/PEXModStudio",
  },
  {
    label: "NETWORK CORE",
    title: "FerrumProxy",
    body: "PEXserver のネットワーク通信のコアを支えるプロキシです。",
    meta: "github.com/gamelist1990/FerrumProxy",
    href: "https://github.com/gamelist1990/FerrumProxy",
  },
  {
    label: "GEYSER EXTENSION",
    title: "GeyserCooldownAnimation",
    body: "Java の攻撃クールダウンを Bedrock プレイヤー向けに表示する Geyser 拡張です。",
    meta: "github.com/gamelist1990/GeyserCooldownAnimation",
    href: "https://github.com/gamelist1990/GeyserCooldownAnimation",
  },
];

const modPoints = [
  {
    eyebrow: "C++ SDK",
    title: "BedrockDynamicSDK",
    body: "署名・プロファイル解決、パケット層、バニラ設定画面への Mod 設定の組み込みなどを土台に、クライアント Mod を DLL として開発できます。統合 Mod「DynamicClient」が参照実装です。",
  },
  {
    eyebrow: "TYPESCRIPT PLUGINS",
    title: "TS プラグイン（開発中）",
    body: "本体 DLL をホストとして、mods フォルダに置いた TypeScript プラグインを自動で読み込む仕組みを開発中です。SDK は C++ 側の定義から生成され、コマンド登録や補完も型付きで書けます。",
  },
  {
    eyebrow: "SAMPLE MOD",
    title: "EffectFake",
    body: "TS プラグインのサンプルとして開発中の Mod です。サーバー側ではなくクライアント側だけでポーション効果を付ける /effectfake コマンド（give / clear、時間は Infinity 対応、全引数に補完付き）を追加します。",
  },
];

export function DevelopersPage() {
  useMetaTags(pageMetadata["/developers"]);
  return (
    <div className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">For Developers</p>
        <h1>開発者向け情報</h1>
        <p className="section-text">
          PEXserver のサイトやサーバーを支える技術の入口です。Web API の仕組み、公開している GitHub リポジトリ、Bedrock 向け Mod 開発の案内をまとめました。
        </p>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Web API</p>
          <h2>api.pexserver.com</h2>
          <p className="section-text">
            このサイトのステータス表示と配布カタログは、自前の API から取得しています。入口はセッション確立と呼び出しの2つだけで、すべての通信が暗号エンベロープを通ります。
          </p>
        </div>
        <div className="feature-grid">
          {apiPoints.map((point) => (
            <article className="feature-card" key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
        <section className="notes-panel">
          <p className="eyebrow">Note</p>
          <h2>一般公開 API ではありません</h2>
          <p>
            この API は pexserver.com の表示専用に運用しており、API キーの発行や外部アプリ向けの提供は行っていません。サイトの正規の流れ以外からのリクエストは受け付けず、異常なアクセスを検知した場合は一定時間の遮断や、サイト上で警告ダイアログの表示を行うことがあります。
          </p>
        </section>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Open Source</p>
          <h2>GitHub リポジトリ</h2>
          <p className="section-text">
            PEXserver に関わるソフトウェアは GitHub で公開しています。
          </p>
        </div>
        <div className="link-card-grid">
          {repositories.map((repo) => (
            <a
              className="link-card"
              key={repo.title}
              href={repo.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="link-card-label">{repo.label}</span>
              <h3>
                {repo.title}
                <span className="link-card-arrow" aria-hidden="true">
                  ↗
                </span>
              </h3>
              <p>{repo.body}</p>
              <span className="link-card-meta">{repo.meta}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Mod Development</p>
          <h2>Bedrock Mod 開発</h2>
          <p className="section-text">
            Bedrock（統合版 Windows）向けのクライアント Mod は、BedrockDynamicSDK を土台に開発できます。
          </p>
        </div>
        <div className="feature-grid">
          {modPoints.map((point) => (
            <article className="feature-card" key={point.title}>
              <p className="card-eyebrow">{point.eyebrow}</p>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
        <div className="hero-actions">
          <a
            className="primary-button"
            href="https://github.com/gamelist1990/BedrockDynamicSDK"
            target="_blank"
            rel="noreferrer"
          >
            SDK を GitHub で見る ↗
          </a>
          <NavLink
            className="secondary-button"
            to="/downloads/client-mod/dynamic-client"
          >
            DynamicClient の配布ページ
          </NavLink>
        </div>
      </section>
    </div>
  );
}
