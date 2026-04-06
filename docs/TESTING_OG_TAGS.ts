/**
 * Manual Test Instructions for Dynamic OG Tags
 *
 * This file contains instructions for manually verifying that dynamic OG tags
 * are working correctly on each page.
 *
 * ## How to Test:
 *
 * 1. Start the development server:
 *    npm run dev
 *
 * 2. Open the application in your browser
 *
 * 3. Open browser DevTools (F12) and inspect the <head> element
 *
 * 4. Navigate to each page and verify the meta tags update:
 *
 * ### Home Page (/)
 * Expected:
 * - <title>PEXserver - Minecraft Java/Bedrock 統合サーバー</title>
 * - <meta property="og:title" content="PEXserver">
 * - <meta property="og:description" content="PEXserver の Minecraft サーバー情報、参加方法、ライブステータスをまとめた公式サイト。">
 *
 * ### Status Page (/status)
 * Expected:
 * - <title>サーバーステータス - PEXserver</title>
 * - <meta property="og:title" content="サーバーステータス - PEXserver">
 * - <meta property="og:description" content="PEXserver の Java 版と Bedrock 版のリアルタイムサーバーステータスを確認できます。">
 *
 * ### Guide Page (/guide)
 * Expected:
 * - <title>参加ガイド - PEXserver</title>
 * - <meta property="og:title" content="参加ガイド - PEXserver">
 * - <meta property="og:description" content="PEXserver への参加方法を画像付きで詳しく解説。Java 版・Bedrock 版の両方に対応しています。">
 *
 * ### Tools Page (/tools)
 * Expected:
 * - <title>ツール集 - PEXserver</title>
 * - <meta property="og:title" content="ツール集 - PEXserver">
 *
 * ### Bedrock Textures Page (/tools/bedrock-textures)
 * Expected:
 * - <title>Bedrock Texture Explorer - PEXserver</title>
 * - <meta property="og:title" content="Bedrock Texture Explorer - PEXserver">
 *
 * ### Sounds Page (/tools/sounds)
 * Expected:
 * - <title>Minecraft Sound Explorer - PEXserver</title>
 * - <meta property="og:title" content="Minecraft Sound Explorer - PEXserver">
 *
 * ### About Page (/about)
 * Expected:
 * - <title>About - PEXserver</title>
 * - <meta property="og:title" content="About - PEXserver">
 *
 * ### Staff Page (/staff)
 * Expected:
 * - <title>スタッフ一覧 - PEXserver</title>
 * - <meta property="og:title" content="スタッフ一覧 - PEXserver">
 *
 * ## Automated Testing with DevTools Console:
 *
 * You can run this in the browser console to verify OG tags:
 *
 * ```javascript
 * // Check current page meta tags
 * console.log('Title:', document.title);
 * console.log('OG Title:', document.querySelector('meta[property="og:title"]')?.content);
 * console.log('OG Description:', document.querySelector('meta[property="og:description"]')?.content);
 * console.log('OG Type:', document.querySelector('meta[property="og:type"]')?.content);
 * console.log('OG Image:', document.querySelector('meta[property="og:image"]')?.content);
 * console.log('Twitter Card:', document.querySelector('meta[name="twitter:card"]')?.content);
 * ```
 *
 * ## Testing Social Media Sharing:
 *
 * After deployment, use these tools to verify OG tags are working:
 * - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
 * - Twitter Card Validator: https://cards-dev.twitter.com/validator
 * - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
 *
 * ## Notes:
 * - Meta tags should update immediately when navigating between pages
 * - All pages should have their own unique title and description
 * - OG image should be consistent across all pages (./server.png)
 * - Twitter card should be "summary_large_image" for all pages
 */

export {};
