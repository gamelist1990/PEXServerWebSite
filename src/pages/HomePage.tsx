import { SITE_BASE_PATH } from "../app/sitePaths";
import { NavLink } from "react-router-dom";
import { gameModes } from "../data/siteContent";
import { DISCORD_INVITE_URL } from "../app/constants";
import { ServerDirectory } from "../components/common/ServerDirectory";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";
export function HomePage() {
  useMetaTags(pageMetadata["/"]);
  return (
    <div className="page-grid renewal-home">
      <section className="renewal-hero">
        <div className="renewal-hero-copy">
          <p className="eyebrow">MINECRAFT / JAVA & BEDROCK</p>
          <h1>
            遊びたい世界が、
            <br />
            <em>ここにある。</em>
          </h1>
          <p className="hero-lead">
            勝負を楽しむ日も、のんびり冒険する日も。
            <br />
            PEXserverで、あなたの遊び方を見つけよう。
          </p>
          <div className="hero-link-row">
            <a className="primary-button" href={`${SITE_BASE_PATH}#servers`}>
              サーバーを選ぶ <span>↗</span>
            </a>
            <NavLink className="text-link" to="/downloads">
              配布ページを見る →
            </NavLink>
          </div>
          <div className="hero-caption">
            <span className="caption-line" /> TWO SERVERS. YOUR NEXT ADVENTURE.
          </div>
        </div>
        <div className="renewal-hero-art">
          <img
            src={`${SITE_BASE_PATH}server-header.png`}
            alt="PEXserverのMinecraftワールド"
            width="1200"
            height="800"
          />
          <div className="hero-art-label">
            <span>EXPLORE THE NETWORK</span>
            <strong>
              PEX<span>server</span>
            </strong>
            <small>遊ぶ。つながる。つくる。</small>
          </div>
        </div>
      </section>
      <section id="servers" className="directory-section">
        <div className="section-heading heading-row">
          <div>
            <p className="eyebrow">01 / OUR SERVERS</p>
            <h2>今日は、どこで遊ぶ？</h2>
          </div>
          <NavLink className="text-link" to="/status">
            稼働状況を詳しく見る ↗
          </NavLink>
        </div>
        <ServerDirectory />
        <p className="directory-note">
          バージョン・稼働状況は公開応答から自動取得。取得できない場合の参考バージョンは26.3です。
        </p>
      </section>
      <section className="games-section">
        <div className="section-heading heading-row">
          <div>
            <p className="eyebrow">02 / GAME MODES</p>
            <h2>一戦から、夢中になれる。</h2>
          </div>
          <p className="section-text">
            pexserver.comで遊べる対戦・ミニゲーム。
          </p>
        </div>
        <div className="mode-grid">
          {gameModes.map((mode, i) => (
            <article className="mode-card" key={mode.name}>
              <div className="mode-card-top">
                <span className="mode-category">{mode.category}</span>
                <span className="mode-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{mode.name}</h3>
              <p>{mode.body}</p>
              <div className="mode-tags">
                {mode.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="community-banner">
        <div>
          <p className="eyebrow">STAY CONNECTED</p>
          <h2>次の遊びは、みんなと。</h2>
          <p>お知らせやサーバーの案内はDiscordで。</p>
        </div>
        <a
          className="primary-button"
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noreferrer"
        >
          Discordに参加 ↗
        </a>
      </section>
    </div>
  );
}
