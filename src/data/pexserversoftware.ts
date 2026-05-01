import type { PexServerSoftware } from "../app/types";

const ferrumProxyReleaseBase = "https://github.com/gamelist1990/FerrumProxy/releases/download/FerrumProxy";

export const pexServerSoftwareIntro = {
  eyebrow: "Tools / PEXServer",
  title: "PEXServerで使用しているソフトウェア",
  body: "PEXServerで使用しているソフトウェアの中で、オープンソースソフトウェアとして公開しているものの配布場所です。"
};

export const pexServerSoftware: PexServerSoftware[] = [
  {
    eyebrow: "Network Core",
    title: "FerrumProxy",
    badge: "Open Source",
    description:
      "FerrumProxy は現在、PEXServer のネットワーク通信のコアを支えており、プレイヤーをバックエンドサーバーに適切に転送させています。",
    detailPath: "/tools/pexserver/ferrumproxy",
    facts: [
      {
        label: "Role",
        value: "プレイヤー転送"
      },
      {
        label: "Core",
        value: "Rust / TCP / UDP"
      },
      {
        label: "Release",
        value: "固定タグ配布"
      }
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/gamelist1990/FerrumProxy",
        variant: "primary"
      },
      {
        label: "FerrumProxy Release",
        href: "https://github.com/gamelist1990/FerrumProxy/releases/tag/FerrumProxy",
        variant: "secondary"
      },
      {
        label: "FerrumProxyGUI Release",
        href: "https://github.com/gamelist1990/FerrumProxy/releases/tag/FerrumProxyGUI",
        variant: "secondary"
      }
    ],
    downloads: [
      {
        platform: "Windows",
        filename: "FerrumProxy-windows-x64.exe",
        href: `${ferrumProxyReleaseBase}/FerrumProxy-windows-x64.exe`
      },
      {
        platform: "Linux",
        filename: "FerrumProxy-linux-x64",
        href: `${ferrumProxyReleaseBase}/FerrumProxy-linux-x64`
      },
      {
        platform: "Linux ARM64",
        filename: "FerrumProxy-linux-arm64",
        href: `${ferrumProxyReleaseBase}/FerrumProxy-linux-arm64`
      },
      {
        platform: "macOS",
        filename: "FerrumProxy-macos-arm64",
        href: `${ferrumProxyReleaseBase}/FerrumProxy-macos-arm64`
      }
    ]
  }
];
