import { NavLink } from "react-router-dom";
import { toolCards } from "../data/siteContent";

export function ToolsPage() {
  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">Tools</p>
        <h2>開発や運用に使えるツール集</h2>
        <p className="section-text">今後このページにツールを増やしていけるよう、一覧から選んで使える形にしています。最初の 1 つとして Bedrock Texture Explorer を追加しています。</p>
      </section>

      <section className="tool-grid">
        {toolCards.map((tool) => (
          <NavLink className="tool-card" key={tool.to} to={tool.to}>
            <p className="card-eyebrow">{tool.eyebrow}</p>
            <h3>{tool.title}</h3>
            <p>{tool.body}</p>
            <span className="tool-metric">{tool.metric}</span>
          </NavLink>
        ))}
      </section>
    </section>
  );
}
