export type NavItemConfig = {
  label: string;
  subtitle: string;
  to: string;
  icon: string;
  end?: boolean;
  external?: boolean;
};

export const navItems: NavItemConfig[] = [
  { label: "Home", subtitle: "トップ", to: "/", icon: "⌂", end: true },
  { label: "Status", subtitle: "稼働状況", to: "/status", icon: "◈" },
  { label: "Guide", subtitle: "参加方法", to: "/guide", icon: "❦" },
  { label: "FileShare", subtitle: "共有ストレージ", to: "https://share.pexserver.com/", icon: "▱", external: true },
  { label: "Blog", subtitle: "ブログ", to: "https://blog.pexserver.com/", icon: "✎", external: true },
  { label: "Downloads", subtitle: "配布", to: "/downloads", icon: "✦" },
  { label: "About", subtitle: "サーバー紹介", to: "/about", icon: "✧" },
  { label: "Staff", subtitle: "運営メンバー", to: "/staff", icon: "♦" },
  { label: "Developers", subtitle: "開発者向け", to: "/developers", icon: "</>" }
];
