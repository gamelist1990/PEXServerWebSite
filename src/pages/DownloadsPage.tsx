import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";
const categories = ["すべて", "Geyser", "PEXServer"] as const;
export function DownloadsPage() {
  useMetaTags(pageMetadata["/downloads"]);
  const [category, setCategory] =
    useState<(typeof categories)[number]>("すべて");
  return (
    <div className="page-grid downloads-page">
      <section className="download-heading">
        <p className="eyebrow">RESOURCE LIBRARY</p>
        <h1>遊びを、もっと快適に。</h1>
        <p className="section-text">
          Geyser向けの拡張機能・リソースパックと、PEXserverの公開ソフトウェアを配布しています。
        </p>
      </section>
      <div className="download-filter" aria-label="配布カテゴリ">
        {categories.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={category === item ? "selected" : ""}
          >
            {item}
          </button>
        ))}
      </div>
      {(category === "すべて" || category === "Geyser") && (
        <section aria-labelledby="geyser-title">
          <div className="library-title">
            <h2 id="geyser-title">Geyser</h2>
            <span>EXTENSION & RESOURCE PACK</span>
          </div>
          <div className="download-grid">
            <article className="download-card">
              <div
                className="download-preview cooldown-preview"
                aria-hidden="true"
              >
                <span>ATTACK COOLDOWN</span>
                <div className="cooldown-bars">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <i key={n} />
                  ))}
                </div>
                <strong>
                  Cooldown
                  <br />
                  Animation
                </strong>
                <small>JAVA COMBAT → BEDROCK</small>
              </div>
              <div className="download-card-body">
                <span className="download-kind">GEYSER EXTENSION</span>
                <h3>CooldownAnimation</h3>
                <p>
                  Javaの攻撃クールダウンを、Bedrockプレイヤーの手元のアニメーションで表示。Geyser拡張・Paper連携・専用パックを組み合わせて使用します。
                </p>
                <div className="mode-tags">
                  <span>Geyser API 2.11.0+</span>
                  <span>Paper 26.3</span>
                </div>
                <p className="download-note">
                  開発段階：実機での表示・Velocity経由の実接続は未検証。導入条件はGitHubのガイドをご確認ください。
                </p>
                <div className="download-actions">
                  <a
                    className="primary-button"
                    href="https://github.com/gamelist1990/GeyserCooldownAnimation/releases/latest"
                    target="_blank"
                    rel="noreferrer"
                  >
                    最新版をダウンロード ↗
                  </a>
                  <a
                    className="text-link"
                    href="https://github.com/gamelist1990/GeyserCooldownAnimation/blob/main/INSTALL.md"
                    target="_blank"
                    rel="noreferrer"
                  >
                    導入ガイド
                  </a>
                </div>
              </div>
            </article>
            <article className="download-card">
              <div className="download-preview glass-preview">
                <img
                  src={`${import.meta.env.BASE_URL}GeyserPack/2DGlass.png`}
                  alt="2D Glassのパックアイコン"
                  width="256"
                  height="256"
                />
                <span>RESOURCE PACK / v1.0.9</span>
              </div>
              <div className="download-card-body">
                <span className="download-kind">BEDROCK RESOURCE PACK</span>
                <h3>2D Glass</h3>
                <p>
                  ガラス板アイテムを2D表示にするリソースパック。BedrockのバニラUIを保ちながら、ガラス板の見た目を整えます。
                </p>
                <div className="mode-tags">
                  <span>Bedrock</span>
                  <span>v1.0.9</span>
                  <span>ZIP / MCPACK</span>
                </div>
                <p className="download-note">
                  MCPACKをGeyserのpacksフォルダに配置して再起動。Bedrockクライアントではファイルを開いてインポートできます。
                </p>
                <div className="download-actions">
                  <a
                    className="primary-button"
                    href={`${import.meta.env.BASE_URL}GeyserPack/2DGlass.mcpack`}
                    download="2DGlass.mcpack"
                  >
                    MCPACKをダウンロード ↓
                  </a>
                  <a
                    className="text-link"
                    href={`${import.meta.env.BASE_URL}GeyserPack/2DGlass.zip`}
                    download="2DGlass.zip"
                  >
                    元のZIP
                  </a>
                  <a
                    className="text-link"
                    href="https://github.com/gamelist1990/PEXServerWebSite/tree/main/public/GeyserPack"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ファイルを見る
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}
      {(category === "すべて" || category === "PEXServer") && (
        <section aria-labelledby="software-title">
          <div className="library-title">
            <h2 id="software-title">PEXServer</h2>
            <span>OPEN SOURCE SOFTWARE</span>
          </div>
          <NavLink
            to="/downloads/pexserver/ferrumproxy"
            className="software-download"
          >
            <div>
              <span className="download-kind">NETWORK CORE</span>
              <h3>FerrumProxy</h3>
              <p>
                PEXserverのネットワークを支えるプロキシ。Client・GUI・本体の配布はこちら。
              </p>
            </div>
            <span className="software-arrow" aria-hidden="true">
              ↗
            </span>
          </NavLink>
        </section>
      )}
    </div>
  );
}
