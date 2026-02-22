# Current Task

## Task
- Obsidian + AI で情報収集/編集し、em-portal に反映できる運用基盤を整える

## Current Scope
- [x] Obsidian AI運用スクリプト追加（初期化 / ノート作成 / AIプロンプト生成）
- [x] `library` に status フィルタ追加
- [x] 一覧ページへ status フィルタ横展開
- [x] 検索で status 活用（インデックス + UIフィルタ）
- [x] トップで status 活用（AI作業ショートカット）
- [x] 実データ用の一括 `status` 付与スクリプトを追加
- [x] 調査ベースの初期コンテンツを Obsidian 側に作成し、tmp-appへ同期
- [ ] GitHub/Vercel 反映（コミット/プッシュ）

## Recent Changes
- `em-portal/ops/Setup-ObsidianAIWorkspace.ps1`
- `em-portal/ops/New-ObsidianResearchNote.ps1`
- `em-portal/ops/Build-AIEditPrompt.ps1`
- `em-portal/tmp-app/src/lib/status-filter.ts`
- `em-portal/tmp-app/src/app/*/page.tsx` (list pages)
- `em-portal/tmp-app/src/components/doc-card.tsx`
- `em-portal/tmp-app/scripts/generate-search-index.mjs`
- `em-portal/tmp-app/src/app/search/page.tsx`
- `em-portal/ops/Set-PortalContentStatus.ps1`
- `test/em-portal/content/*` (Obsidian source content)
- `em-portal/tmp-app/content/*` (synced)
- `em-portal/tmp-app/src/app/intro/page.tsx`
- `em-portal/tmp-app/src/components/source-links.tsx`

## Open Issues / Notes
- 既存の古いコンテンツ一式は欠損状態だったため、今回は最小の日本語コンテンツセットを新規作成した
- `status` 未設定のMarkdownは `unknown` 扱い（今回追加分は status 付与済み）
- GitHub/Vercel反映は未実施（この場では push まで未実行）

## Next Resume Point
1. 差分を確認してコミット（`em-portal` のみ）
2. `更新して公開する.bat` または `git push` で GitHub 反映
3. Vercelデプロイ後、トップ / glossary / library / search を確認

## Validation
- `cmd /c "set npm_config_cache=.npm-cache&& npx.cmd --yes pnpm run lint"` (`em-portal/tmp-app`) OK
- `cmd /c "set npm_config_cache=.npm-cache&& npx.cmd --yes pnpm run gen:search"` (`em-portal/tmp-app`) OK (`20 rows`)
- `cmd /c "set npm_config_cache=.npm-cache&& npx.cmd --yes pnpm run build"` (`em-portal/tmp-app`) OK
