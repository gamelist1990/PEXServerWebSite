# 配布カタログの自動更新

`src/data/downloads.ts`は、生成されたJSONを読み込むだけです。

- 配布物の登録・名称・紹介文・取得元: `src/data/download-sources.json`
- Webサイトが読むスナップショット: `src/data/generated/downloads.json`
- 公開JSON: `/downloads.json`（GitHub Pagesでは`/PEXServerWebSite/downloads.json`）

`npm run sync:downloads`で、GitHub REST APIの最新正式リリースからバージョン、公開日時、配布ZIP、タグに対応する導入ガイドを取得します。下書きとプレリリースは対象外です。ローカルのMCPACKは内部のmanifest.jsonからバージョンを取得し、PNGからOG画像の寸法を取得します。紹介文などの編集内容は取得元設定で維持します。

GitHub Actionsはpush・手動実行・毎時17分の定期実行で同期→検証→ビルド→Pages公開を行います。API用トークンは既存のGITHUB_TOKENをRunner内だけで使用し、ブラウザやJSONに含めません。定期実行はGitHubの混雑状況で遅れることがあります。

取得失敗、配布ZIPの欠落、manifest不正の場合は同期を失敗させ、公開済みのサイトを維持します。Runnerは生成JSONをGitに自動commitせず、公開アーティファクトに組み込むため、更新によるpushループは発生しません。ローカルの通常ビルドでは保存済みのスナップショットを使用できます。

```sh
npm run sync:downloads
npm run test:downloads
npm run build
npm run test:seo
```

GitHub Releaseを持つ配布物は`github-release`、このリポジトリに置いたMCPACKは`local-pack`として登録します。配布物を追加すると一覧・詳細ページ・OGタグ・サイトマップも共通データから生成されます。
