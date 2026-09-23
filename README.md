# TOM Project Dashboard v0.2.1

開発中ツール 1〜16 の進捗・現在作業・次の作業・担当者・状態・優先度・最終更新時刻をWebで共有するリアルタイムダッシュボードです。

## 現在の構成
- GitHub: ソース管理
- GitHub Pages: 公開URL
- Supabase: PostgreSQL / Auth / Realtime
- フロント: HTML + CSS + Vanilla JS
- Supabase Project: `TOM Project Dashboard`
- Region: `ap-northeast-1`

## Supabaseセットアップ状況
以下はすでに設定済みです。
- `projects` : 1〜16のプロジェクト初期データ
- `project_members` : 管理者 / 編集者 / 閲覧者の権限管理
- `project_history` : 更新履歴
- Row Level Security (RLS)
- 公開閲覧
- 管理者 / 編集者だけ更新可能
- Realtime Postgres Changes
- 監査履歴トリガー
- 必要なインデックス

`config.js` にはブラウザ公開用のSupabase Publishable Keyを設定済みです。
Secret Key / service_role は含まれていません。

## 公開
GitHub Pages の公開ソースを `main` / `/(root)` に設定してください。

## 管理者ログイン設定
公開閲覧はログイン不要です。
編集するユーザーだけSupabase Authアカウントが必要です。

## セキュリティ
- ブラウザにはPublishable Keyのみ配置。
- Secret Key / service_role はフロントへ絶対に配置しない。
- `projects` は公開読み取り。
- 更新はRLSで `admin/editor` のみに制限。
- 変更履歴は `project_history` に自動保存。

## 主な機能
- 1〜16のリアルタイム進捗表示
- 総合進捗率
- 開発中 / 検証中 / 運用中の件数
- カテゴリ絞り込み
- 状態絞り込み
- 検索
- 進捗 / 更新日時 / 優先度で並び替え
- 管理者ログイン
- 進捗率 / 状態 / 優先度 / 担当者 / 現在作業 / 次作業の編集
- 公開URL・管理画面URL・外部サービスリンクの管理
- カード上の公開URL・管理画面・外部サービスロゴからの直接遷移
- 更新内容の即時反映
