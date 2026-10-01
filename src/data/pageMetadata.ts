import { downloadResources, resourcePath } from "./downloads";
import type { MetaTagsConfig } from "../hooks/useMetaTags";

/**
 * Metadata configuration for each page
 * These are used to generate dynamic OG tags for social media sharing
 */
export const pageMetadata: Record<string, MetaTagsConfig> = {
  "/": {
    title: "PEXserver - Minecraft Java/Bedrock 統合サーバー",
    description:
      "PEXserver の Minecraft サーバー情報、参加方法、ライブステータスをまとめた公式サイト。",
    ogTitle: "PEXserver",
    ogDescription:
      "PEXserver の Minecraft サーバー情報、参加方法、ライブステータスをまとめた公式サイト。",
    ogType: "website",
    twitterCard: "summary",
  },
  "/status": {
    title: "サーバーステータス - PEXserver",
    description:
      "PEXserver の PvP・ミニゲームとサバイバルのJava / Bedrockステータスを確認できます。",
    ogTitle: "サーバーステータス - PEXserver",
    ogDescription:
      "PEXserver の PvP・ミニゲームとサバイバルのJava / Bedrockステータスを確認できます。",
    ogType: "website",
    twitterCard: "summary",
  },
  "/guide": {
    title: "参加ガイド - PEXserver",
    description:
      "PEXserver への参加方法を画像付きで詳しく解説。Java 版・Bedrock 版の両方に対応しています。",
    ogTitle: "参加ガイド - PEXserver",
    ogDescription:
      "PEXserver への参加方法を画像付きで詳しく解説。Java 版・Bedrock 版の両方に対応しています。",
    ogType: "website",
    twitterCard: "summary",
  },
  "/downloads": {
    title: "配布 - PEXserver",
    description:
      "Geyser向けCooldownAnimation・2D GlassとPEXserverの公開ソフトウェアを配布。",
    ogTitle: "配布 - PEXserver",
    ogDescription:
      "Geyser拡張・リソースパック・公開ソフトウェアのダウンロード。",
    ogType: "website",
    twitterCard: "summary",
  },
  "/survival": {
    title: "PEXSurvival - サバイバルサーバー",
    description:
      "play.pexserver.comのサバイバルサーバー。参加方法と動的バージョン情報。",
    ogTitle: "PEXSurvival",
    ogDescription: "自分のペースで冒険を続けよう。play.pexserver.com",
    ogType: "website",
    twitterCard: "summary",
  },
  "/downloads/pexserver": {
    title: "PEXServerで使用しているソフトウェア - PEXserver",
    description:
      "PEXServerで使用しているオープンソースソフトウェアの配布場所です。FerrumProxy は PEXServer のネットワーク通信のコアを支えています。",
    ogTitle: "PEXServerで使用しているソフトウェア - PEXserver",
    ogDescription:
      "PEXServerで使用しているオープンソースソフトウェアの配布場所です。FerrumProxy は PEXServer のネットワーク通信のコアを支えています。",
    ogType: "website",
    twitterCard: "summary",
  },
  "/downloads/pexserver/ferrumproxy": {
    title: "FerrumProxy - PEXserver",
    description:
      "FerrumProxy、FerrumProxyGUI、FerrumProxy Client の役割と配布リンクをまとめた PEXserver 向け特集ページです。",
    ogTitle: "FerrumProxy - PEXserver",
    ogDescription:
      "FerrumProxy、FerrumProxyGUI、FerrumProxy Client の役割と配布リンクをまとめた PEXserver 向け特集ページです。",
    ogType: "website",
    twitterCard: "summary",
  },
  "/tools/bedrock-textures": {
    title: "Bedrock Texture Explorer - PEXserver",
    description:
      "Bedrock Edition のテクスチャを検索・プレビュー。Icon.XXXX やテクスチャパスを簡単にコピーできます。",
    ogTitle: "Bedrock Texture Explorer - PEXserver",
    ogDescription:
      "Bedrock Edition のテクスチャを検索・プレビュー。Icon.XXXX やテクスチャパスを簡単にコピーできます。",
    ogType: "website",
    twitterCard: "summary",
  },
  "/tools/sounds": {
    title: "Minecraft Sound Explorer - PEXserver",
    description:
      "Minecraft のサウンドキーを検索して再生。/playsound コマンド用のキーを確認できます。",
    ogTitle: "Minecraft Sound Explorer - PEXserver",
    ogDescription:
      "Minecraft のサウンドキーを検索して再生。/playsound コマンド用のキーを確認できます。",
    ogType: "website",
    twitterCard: "summary",
  },
  "/about": {
    title: "About - PEXserver",
    description:
      "PEXserver について。サーバーの運営方針やコンセプトなどをご紹介します。",
    ogTitle: "About - PEXserver",
    ogDescription:
      "PEXserver について。サーバーの運営方針やコンセプトなどをご紹介します。",
    ogType: "website",
    twitterCard: "summary",
  },
  "/staff": {
    title: "スタッフ一覧 - PEXserver",
    description: "PEXserver の運営スタッフメンバーをご紹介します。",
    ogTitle: "スタッフ一覧 - PEXserver",
    ogDescription: "PEXserver の運営スタッフメンバーをご紹介します。",
    ogType: "website",
    twitterCard: "summary",
  },
};

for (const resource of downloadResources) {
  pageMetadata[resourcePath(resource)] = {
    title: `${resource.name} - Geyser配布 | PEXserver`,
    description: resource.description,
    ogTitle: resource.shareTitle,
    ogDescription: resource.description,
    ogType: "website",
    ogImage: resource.image,
    ogImageAlt: `${resource.name}のパックアイコン`,
    ogImageWidth: resource.id === "cooldown-animation" ? 456 : 1254,
    ogImageHeight: resource.id === "cooldown-animation" ? 456 : 1254,
    twitterCard: "summary",
  };
}
for (const [path, metadata] of Object.entries(pageMetadata))
  metadata.canonicalPath = path;
for (const [alias, target] of Object.entries({
  "/tools": "/downloads",
  "/tools/pexserver": "/downloads/pexserver",
  "/tools/pexserver/ferrumproxy": "/downloads/pexserver/ferrumproxy",
}))
  pageMetadata[alias] = { ...pageMetadata[target], noindex: true };
