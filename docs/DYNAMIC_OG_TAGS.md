# 動的OGタグ実装ガイド

## 概要

このWebサイトでは、各ページに専用の動的OG（Open Graph）タグをサポートしています。これにより、SNSでのシェア時に各ページに適切なメタデータが表示されます。

## 実装詳細

### 1. カスタムフック: `useMetaTags`

**場所**: `src/hooks/useMetaTags.ts`

各ページのメタタグを動的に更新するカスタムReactフックです。

**機能**:
- ページタイトルの更新
- メタディスクリプションの更新
- OGタグ（og:title, og:description, og:type, og:image）の更新
- Twitterカードタグの更新

**使用例**:
```typescript
import { useMetaTags } from "../hooks/useMetaTags";

export function MyPage() {
  useMetaTags({
    title: "ページタイトル - PEXserver",
    description: "ページの説明",
    ogTitle: "OGタイトル",
    ogDescription: "OG説明",
    ogType: "website",
    ogImage: "./image.png",
    twitterCard: "summary_large_image"
  });

  return <div>ページコンテンツ</div>;
}
```

### 2. ページメタデータ設定

**場所**: `src/data/pageMetadata.ts`

全ページのメタデータ設定を一元管理しています。

**対応ページ**:
- `/` - ホームページ
- `/status` - サーバーステータス
- `/guide` - 参加ガイド
- `/tools` - ツール集
- `/tools/bedrock-textures` - Bedrock Texture Explorer
- `/tools/sounds` - Minecraft Sound Explorer
- `/about` - About
- `/staff` - スタッフ一覧

### 3. 各ページへの統合

全ページコンポーネントで `useMetaTags` フックを使用しています：

```typescript
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";

export function HomePage() {
  useMetaTags(pageMetadata['/']);
  // ページコンテンツ...
}
```

## 新しいページの追加方法

1. `src/data/pageMetadata.ts` に新しいページのメタデータを追加:

```typescript
export const pageMetadata: Record<string, MetaTagsConfig> = {
  // 既存のページ...
  '/new-page': {
    title: '新しいページ - PEXserver',
    description: 'ページの説明',
    ogTitle: '新しいページ - PEXserver',
    ogDescription: 'ページの説明',
    ogType: 'website',
    ogImage: './server.png',
    twitterCard: 'summary_large_image',
  },
};
```

2. 新しいページコンポーネントで `useMetaTags` を使用:

```typescript
import { useMetaTags } from "../hooks/useMetaTags";
import { pageMetadata } from "../data/pageMetadata";

export function NewPage() {
  useMetaTags(pageMetadata['/new-page']);

  return (
    <div>新しいページのコンテンツ</div>
  );
}
```

## メタタグの確認方法

1. **開発環境で確認**:
   ```bash
   npm run dev
   ```
   ブラウザの開発者ツールでHTMLの`<head>`タグを確認

2. **本番ビルドで確認**:
   ```bash
   npm run build
   npm run preview
   ```

3. **SNSシェアテスト**:
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## 注意事項

- このサイトはクライアントサイドSPA（Single Page Application）のため、OGタグの更新はクライアント側で行われます
- SNSのクローラーはJavaScriptを実行しない場合があるため、`index.html`のデフォルトOGタグも保持しています
- より完全なSEO対応が必要な場合は、サーバーサイドレンダリング（SSR）の導入を検討してください

## 技術スタック

- React 18
- TypeScript
- React Router v6
- Vite

## 関連ファイル

- `/src/hooks/useMetaTags.ts` - メタタグ更新フック
- `/src/data/pageMetadata.ts` - ページメタデータ設定
- `/index.html` - デフォルトメタタグ
- 全ページコンポーネント (`/src/pages/*.tsx`)
