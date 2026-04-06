import { NavLink } from "react-router-dom";
import { toolCards } from "../data/siteContent";
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";

export function ToolsPage() {
  useMetaTags(pageMetadata['/tools']);
  return (
    <section className="page-grid">
      <section className="panel section-hero">
        <p className="eyebrow">Tools</p>
        <h2>開発や運用に使えるツール集</h2>
        <p className="section-text">用途ごとに一覧から選んで使えるようにしています。テクスチャ確認用の Explorer に加えて、PlaySound の確認をしやすくする Sound Explorer も追加しています。</p>
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
