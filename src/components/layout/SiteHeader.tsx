import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DISCORD_INVITE_URL } from "../../app/constants";
import { navItems } from "../../app/navItems";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-nav${open ? " is-open" : ""}`} aria-label="PEXserver navigation">
      <button
        className={`nav-drawer-toggle${open ? " is-open" : ""}`}
        type="button"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <NavLink className="nav-brand" to="/" end onClick={close}>
        <span className="nav-logo" aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}server.png`} alt="" />
        </span>
        <span className="nav-brand-copy">
          <strong>PEXserver</strong>
          <span>Minecraft Network</span>
        </span>
      </NavLink>

      <nav className="nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
            onClick={close}
          >
            <span className="nav-link-icon" aria-hidden="true">{item.icon}</span>
            <span className="nav-link-copy">
              <strong>{item.label}</strong>
              <small>{item.subtitle}</small>
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="nav-cta">
        <a className="nav-discord" href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer" onClick={close}>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.3 4.6A19.8 19.8 0 0015.4 3l-.3.5a13.5 13.5 0 015 2.5A18.4 18.4 0 002.5 6 13.9 13.9 0 018.5 3.5L8.2 3A19.8 19.8 0 003.3 4.6C1 8.1.4 11.5.7 14.9a19.9 19.9 0 006 3l.8-1.2c-.6-.2-1.3-.5-1.9-.9l.5-.4a14.2 14.2 0 0012.1 0l.5.4c-.6.4-1.3.7-1.9.9l.8 1.2a19.9 19.9 0 006-3c.4-4-.6-7.4-3.6-10.3zM8.9 13.1c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.2 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
          </svg>
          <span>Discord</span>
        </a>
      </div>
    </header>
  );
}
