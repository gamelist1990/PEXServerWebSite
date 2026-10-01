# リバースプロキシ / GitHub Pages 共通配信

同じ `dist/` を以下の両方から配信できます。

- 主サイト: `https://pexserver.com/`
- GitHub Pages: `https://gamelist1990.github.io/PEXServerWebSite/`

HTMLの起動スクリプトが、URLの先頭が `/PEXServerWebSite/` の場合はそのパスを、それ以外は `/` を基点に設定します。JS・CSSは相対参照、React Router・画像・配布ファイルは実行時の基点を使います。ビルドを切り替える必要はありません。

既存のリバースプロキシが `pexserver.com/<path>` をGitHub Pagesへ転送する場合は、転送先を `/PEXServerWebSite/<path>` にしてください。レスポンス本文のパス書き換えは不要です。ディレクトリへのアクセスで上流がLocationリダイレクトを返す場合は、ブラウザが主サイトのホストとパスを維持するようプロキシ側で調整してください。

共有用の静的OGタグは主サイト `pexserver.com` を指します。ブラウザ起動後のOG URLと画像URLは実際のアクセス先に合わせて更新します。
