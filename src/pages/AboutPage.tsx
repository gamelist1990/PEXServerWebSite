import { featureCards } from "../data/siteContent";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";

export function AboutPage() {
  useMetaTags(pageMetadata['/about']);
  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">About PEXserver</p>
        <h2>PEXserver について</h2>
        <p className="section-text">このページでは、PEXserver で遊べる内容や参加しやすさを中心に、サーバーの特徴をわかりやすくまとめています。</p>
      </section>

      <section className="feature-grid">
        {featureCards.map((card) => (
          <article className="feature-card" key={card.title}>
            <p className="card-eyebrow">{card.eyebrow}</p>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </article>
        ))}
      </section>
    </section>
  );
}
