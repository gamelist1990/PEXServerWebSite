import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { DISCORD_INVITE_URL } from "../../app/constants";
import { NavItem } from "../navigation/NavItem";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <nav className="topbar">
        <NavLink className="brand" onClick={closeMenu} to="/">
          <img className="brand-logo" src={`${import.meta.env.BASE_URL}server.png`} alt="PEXserver logo" />
          <div className="brand-copy">
            <span className="brand-title">PEXserver</span>
            <span className="brand-subtitle">Minecraft Network</span>
          </div>
        </NavLink>
        <button
          aria-controls="site-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <div aria-hidden={!menuOpen} id="site-menu" className={`topbar-links ${menuOpen ? "is-open" : ""}`}>
          <NavItem to="/" onNavigate={closeMenu}>
            Home
          </NavItem>
          <NavItem to="/status" onNavigate={closeMenu}>
            Status
          </NavItem>
          <NavItem to="/guide" onNavigate={closeMenu}>
            Guide
          </NavItem>
          <NavItem to="/tools" onNavigate={closeMenu}>
            Tools
          </NavItem>
          <NavItem to="/about" onNavigate={closeMenu}>
            About
          </NavItem>
          <NavItem to="/staff" onNavigate={closeMenu}>
            Staff
          </NavItem>
          <a className="nav-link" href={DISCORD_INVITE_URL} onClick={closeMenu} target="_blank" rel="noreferrer">
            Discord
          </a>
        </div>
      </nav>
    </header>
  );
}
