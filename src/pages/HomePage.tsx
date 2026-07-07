import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DISCORD_INVITE_URL, SERVER_ADDRESS } from "../app/constants";
import { gameModes, serverFacts } from "../data/siteContent";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";

export function HomePage() {
  useMetaTags(pageMetadata['/']);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_ADDRESS);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="page-grid page-grid-home">
      <section className="hero-panel">
        <div className="hero-visual">
          <img className="hero-cover" src={`${import.meta.env.BASE_URL}server-header.png`} alt="PEXserver server view" />
          <div className="hero-overlay">
            <p className="eyebrow">Official Website</p>
            <h1>PEXserver</h1>
            <p className="hero-subtitle">
              Minecraft Java / Bedrock で運営している小規模のマイクラサーバー。Duel・Pot PvP・ミニゲームを中心に遊べます。
            </p>
          </div>
        </div>

        <div className="hero-actions">
          <div className="hero-address">
            <span>Server Address</span>
            <button className="hero-address-copy" onClick={handleCopy} type="button">
              <code>{SERVER_ADDRESS}</code>
              <em>{copied ? "コピー済み" : "コピー"}</em>
            </button>
            <small>Bedrock Port: 25565 / Java・Bedrock 両対応</small>
          </div>
          <NavLink className="primary-button" to="/guide">参加方法を見る</NavLink>
          <NavLink className="secondary-button" to="/tools">ツールを見る</NavLink>
          <a className="secondary-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
            Discord に参加
          </a>
        </div>
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
          <p className="eyebrow">Game Modes</p>
          <h2>PEXserver で遊べるゲーム</h2>
          <p className="section-text">
            対人戦の Duel や Pot PvP から、大人数で楽しむパーティゲームまで。実装済みのモードを紹介します。
          </p>
        </div>
        <div className="mode-grid">
          {gameModes.map((mode) => (
            <article className="mode-card" key={mode.name}>
              <span className="mode-category">{mode.category}</span>
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
    </section>
  );
}
