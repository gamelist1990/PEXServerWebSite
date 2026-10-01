import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { DISCORD_INVITE_URL } from "../../app/constants";
import { navItems } from "../../app/navItems";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const focusable = () =>
      [
        toggleRef.current,
        ...Array.from(
          linksRef.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
        ),
      ].filter(Boolean) as HTMLElement[];
    const focusTimer = window.setTimeout(() => focusable()[1]?.focus(), 0);
    const onResize = () => {
      if (window.matchMedia("(min-width: 921px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const elements = focusable();
        const first = elements[0],
          last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`site-nav${open ? " is-open" : ""}`}
      aria-label="PEXserver navigation"
    >
      <button
        className={`nav-drawer-toggle${open ? " is-open" : ""}`}
        ref={toggleRef}
        aria-controls="primary-navigation"
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

      <nav
        className="nav-links"
        id="primary-navigation"
        ref={linksRef}
        aria-label="メインナビゲーション"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `nav-link${isActive ? " is-active" : ""}`
            }
            onClick={close}
          >
            <span className="nav-link-icon" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d={
                    item.to === "/"
                      ? "M3 10 12 3l9 7v11h-6v-7H9v7H3Z"
                      : item.to === "/status"
                        ? "M3 12h4l3-8 4 16 3-8h4"
                        : item.to === "/downloads"
                          ? "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"
                          : item.to === "/guide"
                            ? "M4 4h6l2 2 2-2h6v16h-6l-2 2-2-2H4Zm8 2v16"
                            : item.to === "/staff"
                              ? "M16 21v-3a4 4 0 0 0-8 0v3m8-14a4 4 0 1 1-8 0 4 4 0 0 1 8 0M20 14v7M4 14v7"
                              : "M12 11v6m0-10h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0"
                  }
                />
              </svg>
            </span>
            <span className="nav-link-copy">
              <strong>{item.label}</strong>
              <small>{item.subtitle}</small>
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="nav-cta">
        <a
          className="nav-discord"
          aria-label="Discordに参加"
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noreferrer"
          onClick={close}
        >
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.3 4.6A19.8 19.8 0 0015.4 3l-.3.5a13.5 13.5 0 015 2.5A18.4 18.4 0 002.5 6 13.9 13.9 0 018.5 3.5L8.2 3A19.8 19.8 0 003.3 4.6C1 8.1.4 11.5.7 14.9a19.9 19.9 0 006 3l.8-1.2c-.6-.2-1.3-.5-1.9-.9l.5-.4a14.2 14.2 0 0012.1 0l.5.4c-.6.4-1.3.7-1.9.9l.8 1.2a19.9 19.9 0 006-3c.4-4-.6-7.4-3.6-10.3zM8.9 13.1c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm6.2 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
          </svg>
          <span>Discord</span>
        </a>
      </div>
    </header>
  );
}
