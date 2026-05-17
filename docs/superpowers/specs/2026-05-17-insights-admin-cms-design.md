# Insights Admin CMS — Design Spec

- **Date:** 2026-05-17
- **Status:** Approved (brainstorming) — pending implementation plan
- **Author:** Aaron + Claude (brainstorming session)
- **Scope:** A self-hosted admin backend so a non-technical admin (Amber)
  can create, edit, archive, and publish bilingual Insights articles
  (including cover + inline images) without touching code or redeploying.

---

## 1. Goal & Constraints

**Goal:** Replace the static `src/lib/insights-data.ts` array as the runtime
content source with a Supabase-backed store, and add an in-app `/admin`
editor for the Insights section.

**Decided constraints (from brainstorming):**

| Decision | Choice |
|---|---|
| Content/image storage | Supabase (free tier): Postgres + Storage + Auth |
| Editor | Self-built `/admin` inside this Next.js app |
| Bilingual | Amber fills both ZH + EN herself (no auto-translate) |
| Auth | Supabase Auth email magic link + admin email allowlist |
| Operations | Create, Edit, Delete (soft), Draft/Published status |
| Images | Cover image + inline body images (new `image` section kind) |
| Rendering strategy | **Approach A** — dynamic server rendering + short cache |

**Non-goals (YAGNI):** multi-user roles, autosave, revision history,
WYSIWYG editor, auto-translation, ISR/on-demand revalidation (Approach B).

---

## 2. Data Model & Supabase Schema

### 2.1 Section type extension

Add an `image` kind to the existing `InsightSection` union in
`src/lib/insights-data.ts`:

```ts
| { kind: "image"; url: string; alt: string; caption?: string }
```

The public section renderer gains one `image` branch; existing kinds
(`p | h2 | h3 | ul | quote`) are unchanged.

### 2.2 Table `insights`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK, default `gen_random_uuid()` | |
| `slug` | text, unique | URL key; auto-generated from EN title, editable; validated `^[a-z0-9-]+$` |
| `status` | text | `draft` \| `published` \| `archived` |
| `date` | date | display + sort |
| `author` | text | |
| `cover_image` | text | Supabase Storage URL |
| `gradient` | text | reuse existing class string; default provided |
| `en` | jsonb | `{ title, subtitle, excerpt, readTime, tag, sections[] }` |
| `zh` | jsonb | same shape as `en` |
| `created_at` | timestamptz, default `now()` | |
| `updated_at` | timestamptz | set on update |

`en`/`zh` are stored as whole jsonb objects matching the existing
`InsightBody` TS shape — no relational decomposition of nested sections
(YAGNI). Rows map back to the existing `Insight` type with near-zero
transformation.

### 2.3 Type ownership

`Insight` / `InsightSection` / `InsightBody` types stay in
`insights-data.ts` as the single source of truth (extended with the
`image` kind). After migration, the exported array is retained only as
**seed data** for the one-time migration; runtime reads go through the
data layer (§3.1).

### 2.4 Row Level Security (RLS)

- Anonymous/public: `SELECT` only where `status = 'published'`.
- Authenticated user whose email ∈ `ADMIN_EMAILS`: full CRUD.
- All writes go through server actions using the user session.
  The `service_role` key is never used in client code.

---

## 3. Public Rendering (Approach A)

### 3.1 Data layer — `src/lib/insights-source.ts`

- `getPublishedInsights(): Promise<Insight[]>` — `status='published'`,
  ordered by `date` desc.
- `getPublishedInsight(slug): Promise<Insight | null>`.
- Return types are exactly the existing `Insight` shape, so
  `InsightsList.tsx`, `/insights/[slug]/page.tsx`, `generateMetadata`,
  and JSON-LD need only their data source swapped, not their logic.

### 3.2 Rendering & caching

- `/insights` and `/insights/[slug]`: `export const revalidate = 60`
  (60s segment cache for published content; publish is effectively
  near-instant, worst case 1 min).
- Remove `generateStaticParams`; `/insights/[slug]` becomes dynamic.
  Missing or non-published slug → `notFound()`.
- i18n unaffected (data shape unchanged; existing locale switching works).

### 3.3 Draft preview

- Public site never shows drafts.
- Protected route `/admin/preview/[slug]` (server component,
  `no-store`, auth-gated) reuses the same article renderer component so
  Amber can preview a draft before publishing.

---

## 4. Auth Gating

**Flow:** `/admin/login` (enter email) → Supabase sends magic link →
`/admin/auth/callback` exchanges code → session cookie set → redirect
to `/admin`.

**Admin email allowlist (the real gate):** env `ADMIN_EMAILS`
(comma-separated). Magic links can be requested for any email, so
access control depends on verifying `session.user.email ∈ ADMIN_EMAILS`
in **both** `middleware.ts` and **every write server action** (defense
in depth — never trust middleware alone).

- `middleware.ts` guards `/admin/*` except `/admin/login` and the auth
  callback: no valid session or email not allowlisted → redirect to
  `/admin/login`.
- Session read via `@supabase/ssr` cookie-based client (shared across
  middleware / server components / route handlers).
- Frontend uses anon key only (safe under RLS); `service_role` key
  never bundled client-side. Logout action clears the session.
- Magic-link abuse mitigated by Supabase's built-in rate limiting.
- Auth callback redirects only to internal paths (no open redirect).

> Next.js 16 note: middleware / route handlers / async cookies APIs
> differ from older versions. Per `AGENTS.md`, verify against
> `node_modules/next/dist/docs/` during implementation.

---

## 5. Admin Editor UX

### 5.1 Routes

- `/admin` — article list (table: title, status, date; actions:
  edit / preview / delete). Filter: All / Draft / Published / Archived.
- `/admin/new` — create (shares the form component with edit).
- `/admin/edit/[id]` — edit.
- `/admin/login`, `/admin/auth/callback`, `/admin/preview/[slug]`.

### 5.2 Editor form

1. **Shared metadata block (single):** slug (auto from EN title,
   editable), date, author, cover image (upload widget), gradient
   (dropdown of preset classes — no free text), status.
2. **Language tab `[中文 | English]`:** each tab is that locale's full
   body form — title / subtitle / excerpt / readTime / tag + block
   editor. Tabs keep the form uncluttered for a non-technical user.
   Publish validation: both locales must have a title + ≥1 block,
   otherwise only "save draft" is allowed (with a clear message
   indicating what's missing).
3. **Block editor (maps to the section model; no heavy WYSIWYG):**
   - Ordered block list; each block has a type selector:
     paragraph / H2 / H3 / list / quote / **image**.
   - List type → multi-line textarea (one item per line).
   - Image type → upload button (→ Supabase Storage) + alt + caption.
   - Reorder via move-up / move-down buttons (no drag-drop dependency);
     per-block delete.
4. **Image upload widget (shared by cover + inline):** restrict to
   jpg/png/webp, ~5MB cap, upload to Supabase Storage bucket `insights`
   (public read, authenticated write), store returned URL.
5. **Save actions:** `Save draft` (status=draft) / `Publish`
   (status=published). Edit page also has `Unpublish` (→ draft) and
   `Delete`.
6. **Delete = soft delete:** set `status='archived'` with an explicit
   confirmation dialog (no permanent deletion; archived is restorable
   via the Archived filter). UI exposes no hard delete.

---

## 6. Migration, Env, Packages

### 6.1 Existing content migration

One-time idempotent seed script `scripts/seed-insights.ts`
(`npx tsx scripts/seed-insights.ts`) reads the existing `insights`
array and upserts into Supabase (key: `slug`, `status='published'`).
Safe to re-run.

### 6.2 Environment variables

User creates the Supabase project and supplies keys (account creation /
credential entry is the user's responsibility):

- `NEXT_PUBLIC_SUPABASE_URL` (public)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public, RLS-protected)
- `SUPABASE_SERVICE_ROLE_KEY` (server / seed only — never `NEXT_PUBLIC_`)
- `ADMIN_EMAILS` (comma-separated allowlist)

Set in Vercel prod, Vercel preview, and local `.env.local`.

### 6.3 Packages

- `@supabase/supabase-js`, `@supabase/ssr` (cookie session).
- Slug generation: small local util (~5 lines), no package.
- UUID: Postgres `gen_random_uuid()`, no package.

### 6.4 Supabase dashboard setup (user-performed; spec provides steps/SQL)

- Create free project → run schema + RLS + Storage bucket SQL.
- Auth: enable email magic link; set Site URL / Redirect URLs
  (production domain + localhost).
- Create Storage bucket `insights` (public read).

---

## 7. Security Wrap-up

This feature touches Auth, user input, file upload, and the DB; a
security pass runs before commit.

- RLS enforced: public reads only `published`; writes require an
  authenticated allowlisted email.
- Allowlist verified in middleware **and** every write server action.
- `service_role` key server-only; image upload validated **server-side**
  too (MIME + size), filename sanitized, path namespaced.
- Body renderer stays "kind → element" plain-text rendering — **no
  `dangerouslySetInnerHTML`** for body content (prevents stored XSS).
  `image` url/alt/caption are React-escaped attributes/text.
- `slug` validated `^[a-z0-9-]+$`.
- Auth callback redirects only to internal paths (no open redirect).
- Delete is soft (archived) + explicit confirmation.

---

## 8. Testing Strategy (pragmatic)

- Unit tests: data layer (`insights-source`), slug util, allowlist
  gating logic.
- Manual E2E acceptance checklist for admin forms (low-value to chase
  coverage on UI forms for a single-author internal tool).

---

## 9. Open Implementation Notes

- Verify all Next.js 16-specific APIs (middleware, route handlers,
  `cookies()`, server actions, caching/`revalidate`) against
  `node_modules/next/dist/docs/` before writing code, per `AGENTS.md`.
- The existing `/api/admin-temp` (Resend domain ops) is unrelated and
  left untouched.
