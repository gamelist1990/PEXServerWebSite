import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DISCORD_INVITE_URL, SERVER_ADDRESS } from "../app/constants";
import { SpotlightItem } from "../components/common/SpotlightItem";
import { featureCards } from "../data/siteContent";
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
      <section className="hero-copy">
        <div className="hero-visual">
          <img className="hero-cover" src={`${import.meta.env.BASE_URL}server-header.png`} alt="PEXserver server view" />
          <div className="hero-overlay">
            <p className="eyebrow">Official Website</p>
            <h1>PEXserver</h1>
            <p className="hero-subtitle">Minecraft Java/Bedrock で運営している小規模のマイクラサーバー</p>
          </div>
        </div>
        <div className="hero-meta">
          <div className="hero-meta-item">
            <span>Address</span>
            <strong>
              <code className="inline-code">{SERVER_ADDRESS}</code>
            </strong>
          </div>
          <div className="hero-meta-item">
            <span>Bedrock Port</span>
            <strong>
              <code className="inline-code">25565</code>
            </strong>
          </div>
          <div className="hero-meta-item">
            <span>Overview</span>
            <strong>Home / Status / Guide / Tools / About / Staff</strong>
          </div>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={handleCopy} type="button">
            {copied ? "アドレスをコピーしました" : "アドレスをコピー"}
          </button>
          <NavLink className="secondary-button" to="/guide">
            参加方法を見る
          </NavLink>
          <NavLink className="secondary-button" to="/tools">
            ツールを見る
          </NavLink>
          <a className="secondary-button" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
            Discord に参加
          </a>
        </div>
      </section>

      <section className="panel spotlight-panel">
        <p className="panel-label">Quick Access</p>
        <h2 className="spotlight-title">参加前に確認したい情報</h2>
        <div className="spotlight-list">
          <SpotlightItem title="Server Address" body={SERVER_ADDRESS} />
          <SpotlightItem title="Main Content" body="PvP / MiniGame / Community" />
          <SpotlightItem title="Tools" body="Bedrock Texture Explorer" />
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Highlights</p>
          <h2>PEXserver で遊べる事</h2>
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
    </section>
  );
}
