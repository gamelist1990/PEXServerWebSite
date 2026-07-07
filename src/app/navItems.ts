export type NavItemConfig = {
  label: string;
  subtitle: string;
  to: string;
  icon: string;
  end?: boolean;
};

export const navItems: NavItemConfig[] = [
  { label: "Home", subtitle: "トップ", to: "/", icon: "⌂", end: true },
  { label: "Status", subtitle: "稼働状況", to: "/status", icon: "◈" },
  { label: "Guide", subtitle: "参加方法", to: "/guide", icon: "❦" },
  { label: "Tools", subtitle: "ツール集", to: "/tools", icon: "✦" },
  { label: "About", subtitle: "サーバー紹介", to: "/about", icon: "✧" },
  { label: "Staff", subtitle: "運営メンバー", to: "/staff", icon: "♦" }
];
