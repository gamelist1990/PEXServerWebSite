export const downloadResources = [
  {
    id: "cooldown-animation",
    name: "CooldownAnimation",
    shareTitle: "Cooldown Animation — Geyser向け攻撃クールダウン表示",
    eyebrow: "ATTACK COOLDOWN",
    kind: "GEYSER EXTENSION",
    description:
      "Javaの攻撃クールダウンを、Bedrockプレイヤーの手元のアニメーションで表示。Geyser拡張・Paper連携・専用パックを組み合わせて使用します。",
    image: "GeyserPack/CooldownAnimation.png",
    tags: ["Geyser API 2.11.0+", "Paper 26.3"],
    note: "開発段階：実機での表示・Velocity経由の実接続は未検証。導入条件はGitHubのガイドをご確認ください。",
    links: [
      {
        label: "最新版をダウンロード ↗",
        href: "https://github.com/gamelist1990/GeyserCooldownAnimation/releases/latest",
        external: true,
      },
      {
        label: "導入ガイド",
        href: "https://github.com/gamelist1990/GeyserCooldownAnimation/blob/main/INSTALL.md",
        external: true,
      },
    ],
  },
  {
    id: "2d-glass",
    name: "2D Glass",
    shareTitle: "2D Glass — Bedrock向けガラス板リソースパック",
    eyebrow: "RESOURCE PACK / v1.0.9",
    kind: "BEDROCK RESOURCE PACK",
    description:
      "ガラス板アイテムを2D表示にするリソースパック。BedrockのバニラUIを保ちながら、ガラス板の見た目を整えます。",
    image: "GeyserPack/2DGlass.png",
    tags: ["Bedrock", "v1.0.9", "ZIP / MCPACK"],
    note: "MCPACKをGeyserのpacksフォルダに配置して再起動。Bedrockクライアントではファイルを開いてインポートできます。",
    links: [
      {
        label: "MCPACKをダウンロード ↓",
        href: "GeyserPack/2DGlass.mcpack",
        download: "2DGlass.mcpack",
      },
      {
        label: "元のZIP",
        href: "GeyserPack/2DGlass.zip",
        download: "2DGlass.zip",
      },
      {
        label: "ファイルを見る",
        href: "https://github.com/gamelist1990/PEXServerWebSite/tree/main/public/GeyserPack",
        external: true,
      },
    ],
  },
] as const;
export type DownloadResource = (typeof downloadResources)[number];
export const resourcePath = (resource: DownloadResource) =>
  `/downloads/geyser/${resource.id}`;
