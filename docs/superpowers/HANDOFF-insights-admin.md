# Insights Admin CMS — 交接 / 啟用步驟

分支：`feat/insights-admin-cms`（22 任務全數完成，已通過 tsc / 9 單元測試 / next build / code review）

程式碼已全部寫完。下面是**只有你能做**的步驟（開帳號、填金鑰）。做完即可上線。

## 1. 建 Supabase 專案

1. https://supabase.com 開一個免費專案。
2. 進 SQL Editor，貼上並執行 `supabase/schema.sql` 全部內容（建表 + RLS + Storage bucket + `is_admin()`）。
3. Authentication → Providers → Email：開啟，並開啟 **magic link**。
4. Authentication → URL Configuration：
   - Site URL：`https://dolcenforte.com`
   - Additional Redirect URLs：加 `https://dolcenforte.com/admin/auth/callback` 與 `http://localhost:3000/admin/auth/callback`

## 2. 環境變數（四個）

Supabase → Project Settings → API 取得：

| 變數 | 值 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key（**只給 seed 用，勿加 NEXT_PUBLIC_**）|
| `ADMIN_EMAILS` | Amber 的 email（多個用逗號分隔）|

三處都要設：
- 本機 `.env.local`（可參考 `.env.local.example`）
- Vercel → Project → Settings → Environment Variables → **Production**
- 同上 → **Preview**

## 3. 遷移既有文章 + 同步管理者白名單

本機設好 `.env.local` 後跑一次：

```bash
npm run seed:insights
```

會把現有那篇文章寫進 DB（published），並把 `ADMIN_EMAILS` 寫進 `admin_emails` 表（RLS 的權限來源）。

## 4. 本機驗收（手動 E2E）

```bash
npm run dev
```

逐項確認：
- 未登入開 `/admin` → 自動導到 `/admin/login`
- 用**不在白名單**的 email 收信點連結 → 仍進不去 `/admin`
- 用白名單 email 收信點連結 → 進到 `/admin` 列表
- 新增草稿（中+英、上傳封面、插一個圖片區塊）→ Save draft
- `/insights` 公開頁**看不到**草稿
- `/admin/preview/<slug>` 看得到草稿（含內文圖片）
- Publish → `/insights` 出現（內文圖片正常）
- 編輯已發佈文章改標題 → Publish → 前台更新
- Delete → 確認框 → 文章從 `/insights` 消失；Archived 篩選可 Restore（回 draft）
- 只填單一語言就按 Publish → 被擋（顯示訊息）；Save draft 仍可
- 上傳 6MB 或 .gif → 被拒並顯示錯誤

## 5. 部署

驗收 OK 後（需要你授權我才會 push / 部署）：
- merge `feat/insights-admin-cms` → master，push master + main
- `rm -rf .next && npx vercel --prod --force`
- Supabase 環境變數務必已在 Vercel Production 設好，否則 `/insights` 與 `/admin` 會 500

## 已知後續優化（code review 列出，非阻擋，單人內部工具可日後處理）

- MEDIUM：admin 列表查詢用 `select("*")`，文章量大時可改只取需要欄位
- MEDIUM：`is_admin()` 用 JWT email claim，email 變更後舊 token 仍有效到過期（單人情境影響小）
- MEDIUM：封面/內文圖 URL 未做 `https://` 前綴檢查（next/image 已擋非白名單網域）
- MEDIUM：列表狀態變更後用 `location.reload()`，可改 `router.refresh()`
- LOW：BlockEditor 用 array index 當 key，重排區塊時 textarea 內容會錯位（編輯體驗，非資料正確性）
- LOW：`next.config.ts` 圖片網域 `*.supabase.co` 偏寬，知道專案 ID 後可收斂

兩個 HIGH（x-pathname 可偽造、auth callback 靜默失敗）**已在本分支修掉**。
