import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  children: string;
  onNavigate?: () => void;
};

export function NavItem({ to, children, onNavigate }: NavItemProps) {
  return (
    <NavLink className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")} onClick={onNavigate} to={to}>
      {children}
    </NavLink>
  );
}
