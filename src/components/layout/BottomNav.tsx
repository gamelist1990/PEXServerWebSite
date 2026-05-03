import { NavLink } from "react-router-dom";

export function BottomNav() {
  return (
    <nav aria-label="Bottom Navigation" className="bottom-nav">
      <NavLink className={({ isActive }) => `bottom-nav-item${isActive ? " is-active" : ""}`} end to="/">
        <svg aria-hidden="true" fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
          <path d="M9 21V12h6v9" />
        </svg>
        <span>Home</span>
      </NavLink>

      <NavLink className={({ isActive }) => `bottom-nav-item${isActive ? " is-active" : ""}`} to="/status">
        <svg aria-hidden="true" fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
        </svg>
        <span>Status</span>
      </NavLink>

      <NavLink className={({ isActive }) => `bottom-nav-item${isActive ? " is-active" : ""}`} to="/guide">
        <svg aria-hidden="true" fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
        <span>Guide</span>
      </NavLink>

      <NavLink className={({ isActive }) => `bottom-nav-item${isActive ? " is-active" : ""}`} to="/tools">
        <svg aria-hidden="true" fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
        <span>Tools</span>
      </NavLink>

      <NavLink className={({ isActive }) => `bottom-nav-item${isActive ? " is-active" : ""}`} to="/about">
        <svg aria-hidden="true" fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        <span>About</span>
      </NavLink>
    </nav>
  );
}
