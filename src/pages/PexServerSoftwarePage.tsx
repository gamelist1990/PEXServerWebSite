import { NavLink } from "react-router-dom";
import { pageMetadata } from "../data/pageMetadata";
import { pexServerSoftware, pexServerSoftwareIntro } from "../data/pexserversoftware";
import { useMetaTags } from "../hooks/useMetaTags";

export function PexServerSoftwarePage() {
  useMetaTags(pageMetadata["/tools/pexserver"]);

  return (
    <section className="page-grid">
      <section className="panel section-hero software-hero">
        <p className="eyebrow">{pexServerSoftwareIntro.eyebrow}</p>
        <h2>{pexServerSoftwareIntro.title}</h2>
        <p className="section-text">{pexServerSoftwareIntro.body}</p>
      </section>

      {pexServerSoftware.map((software) => (
        <section className="software-entry" key={software.title}>
          <section className="panel software-release-panel">
            <div className="software-release-header">
              <div>
                <p className="card-eyebrow">{software.eyebrow}</p>
                <h3>{software.title}</h3>
              </div>
              <span className="tool-metric">{software.badge}</span>
            </div>

            <p className="software-lead">{software.description}</p>

            <div className="software-facts-grid">
              {software.facts.map((fact) => (
                <div className="software-fact" key={`${software.title}-${fact.label}`}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>

            <div className="software-actions">
              {software.links.map((link) => (
                <a
                  className={link.variant === "primary" ? "primary-button" : "secondary-button"}
                  href={link.href}
                  key={`${software.title}-${link.label}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>

          <section className="software-download-grid">
            {software.downloads.map((download) => (
              <a className="software-download-card" href={download.href} key={`${software.title}-${download.filename}`}>
                <p className="card-eyebrow">{download.platform}</p>
                <h3>{download.filename}</h3>
                <span>Download</span>
              </a>
            ))}
          </section>
        </section>
      ))}

      <NavLink className="secondary-button software-back-link" to="/tools">
        Toolsへ戻る
      </NavLink>
    </section>
  );
}
