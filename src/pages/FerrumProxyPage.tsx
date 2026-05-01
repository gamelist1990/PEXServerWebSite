import { NavLink } from "react-router-dom";
import { pageMetadata } from "../data/pageMetadata";
import { useMetaTags } from "../hooks/useMetaTags";

const releaseCards = [
  {
    eyebrow: "公開したい人向け",
    title: "FerrumProxy Client",
    badge: "2026-04-28",
    updateMessage: "機能追加: 待機中のリレー割り当てを表示するモーダルを追加し、キューの状態を管理するテストを実装",
    description:
      "自分のPCやローカル環境から公開リレーへ接続し、Minecraft サーバーなどを外部に公開するためのユーザー向けアプリです。",
    facts: ["TCP / UDP を選択", "ローカル port を指定", "PROXY protocol に対応"],
    releaseHref: "https://github.com/gamelist1990/FerrumProxy/releases/tag/FerrumProxyClient",
    downloads: [
      ["Windows Installer", "FerrumProxy.Client_0.1.0_x64-setup.exe", "https://github.com/gamelist1990/FerrumProxy/releases/download/FerrumProxyClient/FerrumProxy.Client_0.1.0_x64-setup.exe"],
      ["Windows MSI", "FerrumProxy.Client_0.1.0_x64_en-US.msi", "https://github.com/gamelist1990/FerrumProxy/releases/download/FerrumProxyClient/FerrumProxy.Client_0.1.0_x64_en-US.msi"],
      ["Linux AppImage", "FerrumProxy.Client_0.1.0_amd64.AppImage", "https://github.com/gamelist1990/FerrumProxy/releases/download/FerrumProxyClient/FerrumProxy.Client_0.1.0_amd64.AppImage"],
      ["macOS Apple Silicon", "FerrumProxy.Client_0.1.0_aarch64.dmg", "https://github.com/gamelist1990/FerrumProxy/releases/download/FerrumProxyClient/FerrumProxy.Client_0.1.0_aarch64.dmg"]
    ]
  },
  {
    eyebrow: "リレー管理者向け",
    title: "FerrumProxyGUI",
    badge: "2026-04-21",
    updateMessage: "機能追加: シェアセッションの統計情報を管理する機能を追加",
    description:
      "公開リレーサーバー側で FerrumProxy インスタンスを管理するための GUI です。設定編集や relay limits の管理を扱います。",
    facts: ["Web GUI で管理", "config editor", "本体バイナリ取得に対応"],
    releaseHref: "https://github.com/gamelist1990/FerrumProxy/releases/tag/FerrumProxyGUI",
    downloads: [
      ["Windows", "FerrumProxyGUI-windows-x64.exe", "https://github.com/gamelist1990/FerrumProxy/releases/download/FerrumProxyGUI/FerrumProxyGUI-windows-x64.exe"],
      ["Linux x64", "FerrumProxyGUI-linux-x64", "https://github.com/gamelist1990/FerrumProxy/releases/download/FerrumProxyGUI/FerrumProxyGUI-linux-x64"],
      ["Linux ARM64", "FerrumProxyGUI-linux-arm64", "https://github.com/gamelist1990/FerrumProxy/releases/download/FerrumProxyGUI/FerrumProxyGUI-linux-arm64"],
      ["macOS Apple Silicon", "FerrumProxyGUI-macos-arm64", "https://github.com/gamelist1990/FerrumProxy/releases/download/FerrumProxyGUI/FerrumProxyGUI-macos-arm64"]
    ]
  },
  {
    eyebrow: "転送の本体",
    title: "FerrumProxy",
    badge: "2026-04-21",
    updateMessage: "機能追加: 待機中のリレー割り当てを表示するモーダルを追加し、キューの状態を管理するテストを実装",
    description:
      "Minecraft Bedrock と HTTP/HTTPS 転送向けの Rust 製プロキシ本体です。低遅延な TCP/UDP 転送や TLS listener を備えています。",
    facts: ["Rust 製", "TCP / UDP forwarding", "Bedrock pong rewrite"],
    releaseHref: "https://github.com/gamelist1990/FerrumProxy/releases/tag/FerrumProxy",
    downloads: [
      ["Windows", "FerrumProxy-windows-x64.exe", "https://github.com/gamelist1990/FerrumProxy/releases/download/FerrumProxy/FerrumProxy-windows-x64.exe"],
      ["Linux x64", "FerrumProxy-linux-x64", "https://github.com/gamelist1990/FerrumProxy/releases/download/FerrumProxy/FerrumProxy-linux-x64"],
      ["Linux ARM64", "FerrumProxy-linux-arm64", "https://github.com/gamelist1990/FerrumProxy/releases/download/FerrumProxy/FerrumProxy-linux-arm64"],
      ["macOS Apple Silicon", "FerrumProxy-macos-arm64", "https://github.com/gamelist1990/FerrumProxy/releases/download/FerrumProxy/FerrumProxy-macos-arm64"]
    ]
  }
];

const featureCards = [
  ["Bedrock 転送", "UDP 通信の転送と Unconnected Pong の advertised port 書き換えに対応します。"],
  ["HTTP / HTTPS 転送", "URL形式ターゲット、TLS 終端、Location rewrite、HTTPS backend 接続を扱えます。"],
  ["共有サービス", "Client から relay へ接続し、公開用 share port を一時的に払い出す構成です。"],
  ["運用機能", "REST API、Discord webhook 通知、DNS cache、debug log などを備えています。"]
];

export function FerrumProxyPage() {
  useMetaTags(pageMetadata["/tools/pexserver/ferrumproxy"]);

  return (
    <section className="page-grid ferrum-page">
      <section className="panel ferrum-hero">
        <div>
          <p className="eyebrow">Tools / PEXServer / FerrumProxy</p>
          <h2>FerrumProxy</h2>
          <p className="section-text">
            PEXServer のネットワーク公開・転送まわりを支える Rust 製プロキシです。使う人向けの Client、管理者向けの GUI、通信を転送する本体の3つに分かれています。
          </p>
          <div className="software-actions">
            <a className="primary-button" href="https://github.com/gamelist1990/FerrumProxy" rel="noreferrer" target="_blank">
              GitHub
            </a>
            <a className="secondary-button" href="https://github.com/gamelist1990/FerrumProxy/releases" rel="noreferrer" target="_blank">
              Releases
            </a>
            <a className="secondary-button" href="https://github.com/gamelist1990/FerrumProxy/blob/main/README.md" rel="noreferrer" target="_blank">
              README
            </a>
          </div>
        </div>
        <div className="ferrum-hero-card">
          <p className="card-eyebrow">Shared Service</p>
          <div className="ferrum-shared-step">
            <span>Client</span>
            <strong>公開したいPCから接続</strong>
          </div>
          <div className="ferrum-shared-step">
            <span>Relay</span>
            <strong>公開ポートを一時払い出し</strong>
          </div>
          <div className="ferrum-shared-step">
            <span>Backend</span>
            <strong>ローカルサーバーへ転送</strong>
          </div>
        </div>
      </section>

      <section className="panel ferrum-section">
        <div className="ferrum-section-heading">
          <p className="eyebrow">Roles</p>
          <h3>3つの役割</h3>
        </div>
        <div className="ferrum-flow">
          <div className="ferrum-flow-step">
            <span>1</span>
            <strong>FerrumProxy Client</strong>
            <p>自分のサーバーを公開したいユーザーが使うアプリ。</p>
          </div>
          <div className="ferrum-flow-step">
            <span>2</span>
            <strong>FerrumProxyGUI</strong>
            <p>公開リレー側の管理、設定、制限を扱う GUI。</p>
          </div>
          <div className="ferrum-flow-step">
            <span>3</span>
            <strong>FerrumProxy</strong>
            <p>TCP/UDP/HTTP/HTTPS を実際に転送するプロキシ本体。</p>
          </div>
        </div>
      </section>

      <section className="panel ferrum-section">
        <div className="ferrum-section-heading">
          <p className="eyebrow">Features</p>
          <h3>主な機能</h3>
        </div>
        <div className="ferrum-feature-grid">
          {featureCards.map(([title, body]) => (
            <div className="ferrum-feature-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel ferrum-section">
        <div className="ferrum-section-heading ferrum-section-heading-wide">
          <div>
            <p className="eyebrow">Downloads</p>
            <h3>ダウンロード</h3>
          </div>
          <p>必要な役割の欄から、使っているOSに合うファイルを選んでください。</p>
        </div>
        <div className="ferrum-release-grid">
          {releaseCards.map((release) => (
            <article className="ferrum-release-card" key={release.title}>
              <div className="software-release-header">
                <div>
                  <p className="card-eyebrow">{release.eyebrow}</p>
                  <h3>{release.title}</h3>
                </div>
                <span className="tool-metric">{release.badge}</span>
              </div>
              <p className="software-lead">{release.description}</p>
              <div className="ferrum-chip-row">
                {release.facts.map((fact) => (
                  <span key={`${release.title}-${fact}`}>{fact}</span>
                ))}
              </div>
              <div className="ferrum-download-list">
                {release.downloads.map(([platform, filename, href]) => (
                  <a href={href} key={`${release.title}-${filename}`} rel="noreferrer" target="_blank">
                    <span>{platform}</span>
                    <strong>{filename}</strong>
                  </a>
                ))}
              </div>
              <a className="secondary-button" href={release.releaseHref} rel="noreferrer" target="_blank">
                Releaseを見る
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="panel ferrum-note-panel">
        <div className="ferrum-section-heading ferrum-section-heading-wide">
          <div>
            <p className="eyebrow">Latest updates</p>
            <h3>更新点</h3>
          </div>
          <p>GitHub Releases の各タグに掲載されている最新メッセージです。</p>
        </div>
        <div className="ferrum-update-list">
          {releaseCards.map((release) => (
            <a href={release.releaseHref} key={`${release.title}-update`} rel="noreferrer" target="_blank">
              <span>{release.title}</span>
              <strong>{release.updateMessage}</strong>
              <small>{release.badge}</small>
            </a>
          ))}
        </div>
      </section>

      <NavLink className="secondary-button software-back-link" to="/tools/pexserver">
        PEXServerソフトウェア一覧へ戻る
      </NavLink>
    </section>
  );
}
