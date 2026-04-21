import type { MetaTagsConfig } from '../hooks/useMetaTags';

/**
 * Metadata configuration for each page
 * These are used to generate dynamic OG tags for social media sharing
 */
export const pageMetadata: Record<string, MetaTagsConfig> = {
  '/': {
    title: 'PEXserver - Minecraft Java/Bedrock 統合サーバー',
    description: 'PEXserver の Minecraft サーバー情報、参加方法、ライブステータスをまとめた公式サイト。',
    ogTitle: 'PEXserver',
    ogDescription: 'PEXserver の Minecraft サーバー情報、参加方法、ライブステータスをまとめた公式サイト。',
    ogType: 'website',
    ogImage: './server.png',
    twitterCard: 'summary_large_image',
  },
  '/status': {
    title: 'サーバーステータス - PEXserver',
    description: 'PEXserver の Java 版と Bedrock 版のリアルタイムサーバーステータスを確認できます。',
    ogTitle: 'サーバーステータス - PEXserver',
    ogDescription: 'PEXserver の Java 版と Bedrock 版のリアルタイムサーバーステータスを確認できます。',
    ogType: 'website',
    ogImage: './server.png',
    twitterCard: 'summary_large_image',
  },
  '/guide': {
    title: '参加ガイド - PEXserver',
    description: 'PEXserver への参加方法を画像付きで詳しく解説。Java 版・Bedrock 版の両方に対応しています。',
    ogTitle: '参加ガイド - PEXserver',
    ogDescription: 'PEXserver への参加方法を画像付きで詳しく解説。Java 版・Bedrock 版の両方に対応しています。',
    ogType: 'website',
    ogImage: './server.png',
    twitterCard: 'summary_large_image',
  },
  '/tools': {
    title: 'ツール集 - PEXserver',
    description: 'Minecraft 開発・運用に便利なツール集。テクスチャエクスプローラーやサウンドエクスプローラーなど。',
    ogTitle: 'ツール集 - PEXserver',
    ogDescription: 'Minecraft 開発・運用に便利なツール集。テクスチャエクスプローラーやサウンドエクスプローラーなど。',
    ogType: 'website',
    ogImage: './server.png',
    twitterCard: 'summary_large_image',
  },
  '/tools/pexserver': {
    title: 'PEXServerで使用しているソフトウェア - PEXserver',
    description: 'PEXServerで使用しているオープンソースソフトウェアの配布場所です。FerrumProxy は PEXServer のネットワーク通信のコアを支えています。',
    ogTitle: 'PEXServerで使用しているソフトウェア - PEXserver',
    ogDescription: 'PEXServerで使用しているオープンソースソフトウェアの配布場所です。FerrumProxy は PEXServer のネットワーク通信のコアを支えています。',
    ogType: 'website',
    ogImage: './server.png',
    twitterCard: 'summary_large_image',
  },
  '/tools/bedrock-textures': {
    title: 'Bedrock Texture Explorer - PEXserver',
    description: 'Bedrock Edition のテクスチャを検索・プレビュー。Icon.XXXX やテクスチャパスを簡単にコピーできます。',
    ogTitle: 'Bedrock Texture Explorer - PEXserver',
    ogDescription: 'Bedrock Edition のテクスチャを検索・プレビュー。Icon.XXXX やテクスチャパスを簡単にコピーできます。',
    ogType: 'website',
    ogImage: './server.png',
    twitterCard: 'summary_large_image',
  },
  '/tools/sounds': {
    title: 'Minecraft Sound Explorer - PEXserver',
    description: 'Minecraft のサウンドキーを検索して再生。/playsound コマンド用のキーを確認できます。',
    ogTitle: 'Minecraft Sound Explorer - PEXserver',
    ogDescription: 'Minecraft のサウンドキーを検索して再生。/playsound コマンド用のキーを確認できます。',
    ogType: 'website',
    ogImage: './server.png',
    twitterCard: 'summary_large_image',
  },
  '/about': {
    title: 'About - PEXserver',
    description: 'PEXserver について。サーバーの運営方針やコンセプトなどをご紹介します。',
    ogTitle: 'About - PEXserver',
    ogDescription: 'PEXserver について。サーバーの運営方針やコンセプトなどをご紹介します。',
    ogType: 'website',
    ogImage: './server.png',
    twitterCard: 'summary_large_image',
  },
  '/staff': {
    title: 'スタッフ一覧 - PEXserver',
    description: 'PEXserver の運営スタッフメンバーをご紹介します。',
    ogTitle: 'スタッフ一覧 - PEXserver',
    ogDescription: 'PEXserver の運営スタッフメンバーをご紹介します。',
    ogType: 'website',
    ogImage: './server.png',
    twitterCard: 'summary_large_image',
  },
};
