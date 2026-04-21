import type { Plugin } from 'vite';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

interface MetaTagsConfig {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
}

const pageMetadata: Record<string, MetaTagsConfig> = {
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

// Base URL for the site
const SITE_URL = 'https://pexserver.mooo.com';

function generateMetaTags(config: MetaTagsConfig, route: string): string {
  const tags: string[] = [];

  if (config.description) {
    tags.push(`    <meta name="description" content="${config.description}" />`);
  }

  if (config.ogTitle) {
    tags.push(`    <meta property="og:title" content="${config.ogTitle}" />`);
  }

  if (config.ogDescription) {
    tags.push(`    <meta property="og:description" content="${config.ogDescription}" />`);
  }

  if (config.ogType) {
    tags.push(`    <meta property="og:type" content="${config.ogType}" />`);
  }

  // Add og:url for proper social sharing
  const pageUrl = route === '/' ? SITE_URL : `${SITE_URL}${route}`;
  tags.push(`    <meta property="og:url" content="${pageUrl}" />`);

  if (config.ogImage) {
    // Convert relative image path to absolute URL
    const imageUrl = config.ogImage.startsWith('http')
      ? config.ogImage
      : `${SITE_URL}/${config.ogImage.replace(/^\.\//, '')}`;
    tags.push(`    <meta property="og:image" content="${imageUrl}" />`);
  }

  if (config.twitterCard) {
    tags.push(`    <meta name="twitter:card" content="${config.twitterCard}" />`);
  }

  return tags.join('\n');
}

export function ogTagsPlugin(): Plugin {
  return {
    name: 'vite-plugin-og-tags',
    apply: 'build',
    closeBundle() {
      const distDir = join(process.cwd(), 'dist');
      const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');

      // Generate HTML file for each route
      Object.entries(pageMetadata).forEach(([route, metadata]) => {
        if (route === '/') return; // Skip homepage, it's already index.html

        let html = indexHtml;

        // Replace title
        if (metadata.title) {
          html = html.replace(/<title>.*?<\/title>/, `<title>${metadata.title}</title>`);
        }

        // Replace meta tags
        const metaTags = generateMetaTags(metadata, route);

        // Remove old meta tags (with multiline support)
        html = html.replace(/<meta\s+name="description"[^>]*>\s*/g, '');
        html = html.replace(/<meta\s+property="og:title"[^>]*>\s*/g, '');
        html = html.replace(/<meta\s+property="og:description"[^>]*>\s*/g, '');
        html = html.replace(/<meta\s+property="og:type"[^>]*>\s*/g, '');
        html = html.replace(/<meta\s+property="og:url"[^>]*>\s*/g, '');
        html = html.replace(/<meta\s+property="og:image"[^>]*>\s*/g, '');
        html = html.replace(/<meta\s+name="twitter:card"[^>]*>\s*/g, '');

        // Add new meta tags before the theme-color meta tag
        html = html.replace(
          /(<meta name="theme-color")/,
          `${metaTags}\n    $1`
        );

        // Determine output path
        const routePath = route.substring(1); // Remove leading slash
        const outputPath = join(distDir, routePath, 'index.html');

        // Create directory if it doesn't exist
        mkdirSync(dirname(outputPath), { recursive: true });

        // Write the HTML file
        writeFileSync(outputPath, html, 'utf-8');
        console.log(`Generated: ${outputPath}`);
      });
    },
  };
}
