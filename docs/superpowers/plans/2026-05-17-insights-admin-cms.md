# Insights Admin CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a self-built `/admin` backend so a non-technical admin can create/edit/archive/publish bilingual Insights articles (with cover + inline images), backed by Supabase, without touching code.

**Architecture:** Supabase (Postgres + Storage + Auth magic link) is the runtime store. Public Insights pages become Server Components that fetch published rows through a data layer and pass them to existing client presentational components (kept for framer-motion + i18n). A Next.js 16 `proxy.ts` plus per-action allowlist checks gate `/admin`. Writes go through `'use server'` actions using the authenticated user session under RLS.

**Tech Stack:** Next.js 16.2 (App Router, `proxy.ts`, classic caching model — no Cache Components), React 19, TypeScript, Tailwind v4, `@supabase/supabase-js`, `@supabase/ssr`, Vitest + Testing Library.

**Spec:** `docs/superpowers/specs/2026-05-17-insights-admin-cms-design.md`

---

## File Structure

**Created:**
- `vitest.config.mts` — test runner config
- `supabase/schema.sql` — table, RLS, admin_emails table, storage bucket + policies (run by user in Supabase SQL editor)
- `.env.local.example` — documents required env vars
- `src/lib/supabase/server.ts` — server Supabase client (RSC / server actions / route handlers)
- `src/lib/supabase/browser.ts` — browser Supabase client (login page only)
- `src/lib/supabase/proxy.ts` — Supabase client + session refresh for `proxy.ts`
- `src/lib/admin/allowlist.ts` — `isAdminEmail()` pure util (+ test)
- `src/lib/slug.ts` — `slugify()` pure util (+ test)
- `src/lib/insights-source.ts` — public + admin data layer (+ test)
- `proxy.ts` (project root) — admin route gating
- `src/components/InsightsPageContent.tsx` — client wrapper (banner i18n + list)
- `src/components/InsightDetail.tsx` — client presentational detail (moved out of page)
- `src/app/admin/layout.tsx` — server-side gate fallback + admin shell
- `src/app/admin/login/page.tsx` — magic-link login (client)
- `src/app/admin/auth/callback/route.ts` — code exchange route handler
- `src/app/admin/page.tsx` — article list (server)
- `src/components/admin/ArticleListTable.tsx` — list + actions (client)
- `src/app/admin/new/page.tsx` — create (server shell)
- `src/app/admin/edit/[id]/page.tsx` — edit (server shell)
- `src/app/admin/preview/[slug]/page.tsx` — draft preview (server, no-store)
- `src/components/admin/ArticleForm.tsx` — create/edit form (client)
- `src/components/admin/BlockEditor.tsx` — section block editor (client)
- `src/components/admin/ImageUpload.tsx` — image upload widget (client)
- `src/app/admin/actions.ts` — `'use server'` actions (save/publish/archive/restore/upload/signOut)
- `scripts/seed-insights.ts` — one-time migration of the existing article
- Test files under `src/**/__tests__/`

**Modified:**
- `package.json` — scripts + deps
- `next.config.ts` — add Supabase Storage hostname to `images.remotePatterns`
- `src/lib/insights-data.ts` — add `image` section kind; keep array as seed only
- `src/app/insights/page.tsx` — Client → Server Component (fetch + pass props)
- `src/components/InsightsList.tsx` — accept `insights` prop instead of module import
- `src/app/insights/[slug]/page.tsx` — Client → Server Component + `generateMetadata` + `revalidate`

---

## Conventions

- Run all commands from repo root `/Users/aaron/Desktop/github/amber-yu-sound`.
- Test command: `npx vitest run <path>`.
- Commit after each task. Commit messages follow `type: description`.
- `npx tsc --noEmit -p .` must pass before any commit that changes `.ts/.tsx`.
- Async Server Components are not unit-tested (Vitest limitation, per Next.js testing guide) — they are covered by the manual E2E checklist (Task 22).

---

## Phase 0 — Tooling & Env Scaffolding

### Task 1: Install dependencies

**Files:** Modify `package.json`

- [ ] **Step 1: Install runtime + dev deps**

```bash
npm install @supabase/supabase-js@^2 @supabase/ssr@^0.5
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths tsx
```

- [ ] **Step 2: Add scripts to package.json**

In `package.json` `"scripts"`, add:

```json
"test": "vitest run",
"test:watch": "vitest",
"seed:insights": "tsx scripts/seed-insights.ts"
```

- [ ] **Step 3: Verify install**

Run: `npx vitest --version`
Expected: prints a version number (e.g. `vitest/2.x`).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add supabase + vitest dependencies"
```

### Task 2: Vitest config

**Files:** Create `vitest.config.mts`

- [ ] **Step 1: Write config**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
```

- [ ] **Step 2: Smoke test**

Create `src/lib/__tests__/smoke.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("vitest", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 3: Run it**

Run: `npx vitest run src/lib/__tests__/smoke.test.ts`
Expected: 1 passed.

- [ ] **Step 4: Delete the smoke test and commit**

```bash
rm src/lib/__tests__/smoke.test.ts
git add vitest.config.mts
git commit -m "chore: configure vitest"
```

### Task 3: Env example + next.config image host

**Files:** Create `.env.local.example`; Modify `next.config.ts`

- [ ] **Step 1: Write `.env.local.example`**

```
# Supabase project — created by the site owner in the Supabase dashboard
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
# Server / seed script ONLY. Never prefix with NEXT_PUBLIC_.
SUPABASE_SERVICE_ROLE_KEY=YOUR-SERVICE-ROLE-KEY
# Comma-separated admin emails allowed into /admin
ADMIN_EMAILS=amber@example.com
```

- [ ] **Step 2: Add Supabase Storage host to `next.config.ts`**

In `next.config.ts`, add to `images.remotePatterns` array (keep existing entries):

```ts
{
  protocol: "https",
  hostname: "*.supabase.co",
},
```

- [ ] **Step 3: Verify build still compiles config**

Run: `npx tsc --noEmit -p .`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add .env.local.example next.config.ts
git commit -m "chore: env example + supabase image remote pattern"
```

---

## Phase 1 — Data Model, Schema, Pure Utils

### Task 4: Add `image` section kind

**Files:** Modify `src/lib/insights-data.ts:4-9`

- [ ] **Step 1: Extend the `InsightSection` union**

Replace the `InsightSection` type (currently lines 4-9) with:

```ts
export type InsightSection =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "quote"; text: string }
  | { kind: "image"; url: string; alt: string; caption?: string };
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no errors (existing renderer's `switch` has a `default` branch, so it still compiles).

- [ ] **Step 3: Commit**

```bash
git add src/lib/insights-data.ts
git commit -m "feat(insights): add image section kind"
```

### Task 5: `slugify` util (TDD)

**Files:** Create `src/lib/slug.ts`, `src/lib/__tests__/slug.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/__tests__/slug.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("5 Key Principles of Sound")).toBe("5-key-principles-of-sound");
  });
  it("strips punctuation and collapses dashes", () => {
    expect(slugify("Hello --- World!!!")).toBe("hello-world");
  });
  it("trims leading/trailing hyphens", () => {
    expect(slugify("  --Edge--  ")).toBe("edge");
  });
  it("drops non-ascii (CJK) leaving ascii", () => {
    expect(slugify("奧丁 Crown of Odin")).toBe("crown-of-odin");
  });
  it("returns empty string for no ascii", () => {
    expect(slugify("奧丁王冠")).toBe("");
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/lib/__tests__/slug.test.ts`
Expected: FAIL — cannot resolve `@/lib/slug`.

- [ ] **Step 3: Implement**

`src/lib/slug.ts`:

```ts
/** Produce a URL-safe slug: lowercase ascii words joined by single hyphens. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/lib/__tests__/slug.test.ts`
Expected: 5 passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/slug.ts src/lib/__tests__/slug.test.ts
git commit -m "feat: slugify util with tests"
```

### Task 6: `isAdminEmail` allowlist util (TDD)

**Files:** Create `src/lib/admin/allowlist.ts`, `src/lib/admin/__tests__/allowlist.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/admin/__tests__/allowlist.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { isAdminEmail } from "@/lib/admin/allowlist";

describe("isAdminEmail", () => {
  it("matches case-insensitively and trims", () => {
    expect(isAdminEmail("Amber@Example.com", "amber@example.com")).toBe(true);
    expect(isAdminEmail("amber@example.com", " amber@example.com , bob@x.com")).toBe(true);
  });
  it("rejects non-listed", () => {
    expect(isAdminEmail("eve@evil.com", "amber@example.com")).toBe(false);
  });
  it("rejects when email or list is empty/undefined", () => {
    expect(isAdminEmail(undefined, "amber@example.com")).toBe(false);
    expect(isAdminEmail("amber@example.com", undefined)).toBe(false);
    expect(isAdminEmail("amber@example.com", "")).toBe(false);
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/lib/admin/__tests__/allowlist.test.ts`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Implement**

`src/lib/admin/allowlist.ts`:

```ts
/** True iff `email` is present (case-insensitive) in the comma-separated `list`. */
export function isAdminEmail(
  email: string | undefined | null,
  list: string | undefined | null,
): boolean {
  if (!email || !list) return false;
  const target = email.trim().toLowerCase();
  if (!target) return false;
  return list
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .includes(target);
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/lib/admin/__tests__/allowlist.test.ts`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/admin/allowlist.ts src/lib/admin/__tests__/allowlist.test.ts
git commit -m "feat: admin email allowlist util with tests"
```

### Task 7: Supabase schema SQL

**Files:** Create `supabase/schema.sql`

- [ ] **Step 1: Write the schema**

`supabase/schema.sql`:

```sql
-- ============ Insights CMS schema ============
-- Run this in the Supabase SQL editor for the project.

-- 1. Admin allowlist table (RLS source of truth, kept in sync by seed script)
create table if not exists public.admin_emails (
  email text primary key
);
alter table public.admin_emails enable row level security;
-- No policies: table is only read by SECURITY DEFINER helper below and
-- written by the service-role seed script (which bypasses RLS).

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_emails
    where email = lower((auth.jwt() ->> 'email'))
  );
$$;

-- 2. Insights table
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  status text not null default 'draft'
    check (status in ('draft','published','archived')),
  date date not null,
  author text not null,
  cover_image text not null default '',
  gradient text not null default 'from-amber-900/40 to-purple-900/40',
  en jsonb not null,
  zh jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.insights enable row level security;

-- Public: read only published
create policy "public reads published"
  on public.insights for select
  using (status = 'published');

-- Admin: full read
create policy "admin reads all"
  on public.insights for select
  using (public.is_admin());

create policy "admin inserts"
  on public.insights for insert
  with check (public.is_admin());

create policy "admin updates"
  on public.insights for update
  using (public.is_admin())
  with check (public.is_admin());

-- No DELETE policy: deletion is soft (status='archived'). Hard delete blocked.

-- 3. Storage bucket for images
insert into storage.buckets (id, name, public)
values ('insights', 'insights', true)
on conflict (id) do nothing;

create policy "public reads insight images"
  on storage.objects for select
  using (bucket_id = 'insights');

create policy "admin writes insight images"
  on storage.objects for insert
  with check (bucket_id = 'insights' and public.is_admin());

create policy "admin updates insight images"
  on storage.objects for update
  using (bucket_id = 'insights' and public.is_admin());
```

- [ ] **Step 2: Commit**

```bash
git add supabase/schema.sql
git commit -m "feat: supabase schema (insights, RLS, storage, admin allowlist)"
```

> **User action (not a code step):** The site owner runs `supabase/schema.sql`
> in the Supabase SQL editor, enables Email magic-link auth, and sets
> Site URL + redirect URLs (`https://dolcenforte.com`, `http://localhost:3000`).
> Document this in Task 21.

### Task 8: Supabase client factories

**Files:** Create `src/lib/supabase/server.ts`, `src/lib/supabase/browser.ts`

- [ ] **Step 1: Write the server client**

`src/lib/supabase/server.ts`:

```ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Supabase client for Server Components, Server Actions, and Route Handlers.
 * Uses the anon key; all authority is enforced by Postgres RLS.
 */
export async function createSupabaseServer() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component render — safe to ignore;
            // session refresh is handled in proxy.ts.
          }
        },
      },
    },
  );
}
```

- [ ] **Step 2: Write the browser client**

`src/lib/supabase/browser.ts`:

```ts
import { createBrowserClient } from "@supabase/ssr";

/** Supabase client for Client Components (login page magic-link request). */
export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/supabase/server.ts src/lib/supabase/browser.ts
git commit -m "feat: supabase server + browser client factories"
```

### Task 9: Data layer + row→Insight mapping (TDD)

**Files:** Create `src/lib/insights-source.ts`, `src/lib/__tests__/insights-source.test.ts`

- [ ] **Step 1: Write the failing test (pure mapper only)**

`src/lib/__tests__/insights-source.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { rowToInsight, type InsightRow } from "@/lib/insights-source";

const row: InsightRow = {
  id: "1",
  slug: "a",
  status: "published",
  date: "2026-04-18",
  author: "Amber",
  cover_image: "https://x.supabase.co/c.jpg",
  gradient: "from-a to-b",
  en: { title: "T", subtitle: "S", excerpt: "E", readTime: "6 min", tag: "Tag", sections: [{ kind: "p", text: "hi" }] },
  zh: { title: "標題", subtitle: "副", excerpt: "摘", readTime: "6 分鐘", tag: "標籤", sections: [{ kind: "p", text: "嗨" }] },
  created_at: "2026-04-18T00:00:00Z",
  updated_at: "2026-04-18T00:00:00Z",
};

describe("rowToInsight", () => {
  it("maps a DB row to the public Insight shape", () => {
    const i = rowToInsight(row);
    expect(i.slug).toBe("a");
    expect(i.coverImage).toBe("https://x.supabase.co/c.jpg");
    expect(i.gradient).toBe("from-a to-b");
    expect(i.en.title).toBe("T");
    expect(i.zh.sections[0]).toEqual({ kind: "p", text: "嗨" });
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/lib/__tests__/insights-source.test.ts`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Implement the data layer**

`src/lib/insights-source.ts`:

```ts
import { createSupabaseServer } from "@/lib/supabase/server";
import type { Insight, InsightBody } from "@/lib/insights-data";

export interface InsightRow {
  id: string;
  slug: string;
  status: "draft" | "published" | "archived";
  date: string;
  author: string;
  cover_image: string;
  gradient: string;
  en: InsightBody;
  zh: InsightBody;
  created_at: string;
  updated_at: string;
}

export interface AdminInsight extends Insight {
  id: string;
  status: InsightRow["status"];
}

/** Pure mapper: DB row -> public Insight shape used by components. */
export function rowToInsight(r: InsightRow): AdminInsight {
  return {
    id: r.id,
    slug: r.slug,
    status: r.status,
    date: r.date,
    author: r.author,
    coverImage: r.cover_image,
    gradient: r.gradient,
    en: r.en,
    zh: r.zh,
  };
}

export async function getPublishedInsights(): Promise<Insight[]> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false });
  if (error) throw new Error(`getPublishedInsights: ${error.message}`);
  return (data as InsightRow[]).map(rowToInsight);
}

export async function getPublishedInsight(slug: string): Promise<Insight | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw new Error(`getPublishedInsight: ${error.message}`);
  return data ? rowToInsight(data as InsightRow) : null;
}

/** Admin: all rows regardless of status (RLS still requires admin session). */
export async function getAllInsightsAdmin(): Promise<AdminInsight[]> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw new Error(`getAllInsightsAdmin: ${error.message}`);
  return (data as InsightRow[]).map(rowToInsight);
}

export async function getInsightByIdAdmin(id: string): Promise<AdminInsight | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`getInsightByIdAdmin: ${error.message}`);
  return data ? rowToInsight(data as InsightRow) : null;
}

export async function getInsightBySlugAdmin(slug: string): Promise<AdminInsight | null> {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`getInsightBySlugAdmin: ${error.message}`);
  return data ? rowToInsight(data as InsightRow) : null;
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/lib/__tests__/insights-source.test.ts`
Expected: 1 passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/insights-source.ts src/lib/__tests__/insights-source.test.ts
git commit -m "feat: insights data layer + row mapper with test"
```

---

## Phase 2 — Public Read Refactor (Server fetch + client presentational)

### Task 10: `InsightsList` accepts a prop

**Files:** Modify `src/components/InsightsList.tsx`

- [ ] **Step 1: Replace the module import with a prop**

In `src/components/InsightsList.tsx`:
- Delete line 9: `import { insights } from "@/lib/insights-data";`
- Add import: `import type { Insight } from "@/lib/insights-data";`
- Change the component signature (line 23) from `export default function InsightsList() {` to:

```tsx
export default function InsightsList({ insights }: { insights: Insight[] }) {
```

(Keep the rest of the body unchanged — it already uses the local `insights` variable.)

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: errors only in `src/app/insights/page.tsx` (still passes no prop) — that is fixed in Task 11.

- [ ] **Step 3: Commit**

```bash
git add src/components/InsightsList.tsx
git commit -m "refactor(insights): InsightsList takes insights prop"
```

### Task 11: `/insights` → Server Component + client banner wrapper

**Files:** Create `src/components/InsightsPageContent.tsx`; Modify `src/app/insights/page.tsx`

- [ ] **Step 1: Create the client wrapper**

`src/components/InsightsPageContent.tsx`:

```tsx
"use client";

import PageBanner from "@/components/ui/PageBanner";
import InsightsList from "@/components/InsightsList";
import { useLocale } from "@/lib/i18n";
import { bannerImages } from "@/lib/constants";
import type { Insight } from "@/lib/insights-data";

export default function InsightsPageContent({
  insights,
}: {
  insights: Insight[];
}) {
  const { t } = useLocale();
  return (
    <>
      <PageBanner
        title={t.pages.insights.title}
        subtitle={t.pages.insights.subtitle}
        backgroundImage={bannerImages.insights}
      />
      <InsightsList insights={insights} />
    </>
  );
}
```

- [ ] **Step 2: Replace `src/app/insights/page.tsx` with a Server Component**

```tsx
import InsightsPageContent from "@/components/InsightsPageContent";
import { getPublishedInsights } from "@/lib/insights-source";

export const revalidate = 60;

export default async function InsightsPage() {
  const insights = await getPublishedInsights();
  return <InsightsPageContent insights={insights} />;
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/insights/page.tsx src/components/InsightsPageContent.tsx
git commit -m "refactor(insights): server-render list from Supabase"
```

### Task 12: Extract `InsightDetail` client component (add image kind render)

**Files:** Create `src/components/InsightDetail.tsx`

- [ ] **Step 1: Create the client presentational component**

Copy the current rendering logic out of `src/app/insights/[slug]/page.tsx` into a client component that receives data as props. `src/components/InsightDetail.tsx`:

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import type { Insight, InsightSection } from "@/lib/insights-data";
import Button from "@/components/ui/Button";

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  if (locale === "zh") {
    return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
  }
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Section({ block }: { block: InsightSection }) {
  switch (block.kind) {
    case "h2":
      return (
        <h2 className="font-display text-2xl md:text-3xl font-medium text-ivory mt-12 mb-4 leading-tight">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-display text-xl font-medium text-ivory mt-8 mb-3">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-ivory/75 leading-[1.85] text-[15px] md:text-base mb-5">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="space-y-2 mb-6 pl-1">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-ivory/75 leading-relaxed text-[15px]"
            >
              <span className="text-gold mt-[6px] shrink-0 w-1.5 h-1.5 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-10 pl-6 border-l-2 border-gold">
          <p className="font-display text-xl md:text-2xl italic text-ivory/90 leading-relaxed">
            &ldquo;{block.text}&rdquo;
          </p>
        </blockquote>
      );
    case "image":
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-ivory/10">
            <Image
              src={block.url}
              alt={block.alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          {block.caption ? (
            <figcaption className="mt-3 text-center text-xs text-ivory/45">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    default:
      return null;
  }
}

export default function InsightDetail({
  item,
  prev,
  next,
}: {
  item: Insight;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}) {
  const { t, locale } = useLocale();
  const body = item[locale];

  return (
    <>
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <Image
          src={item.coverImage}
          alt={body.title}
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 pb-14 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm text-ivory/60 hover:text-gold transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              {t.pages.insights.backToList}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <span className="text-[10px] tracking-[3px] uppercase text-gold">
              {body.tag} · {body.readTime}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-medium text-ivory leading-tight">
              {body.title}
            </h1>
            <p className="text-ivory/70 text-base md:text-lg leading-relaxed max-w-2xl">
              {body.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-10 pb-8 border-b border-ivory/10"
        >
          <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center shrink-0">
            <span className="text-xs font-medium text-gold">
              {item.author.slice(0, 1)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-ivory">{item.author}</span>
            <span className="text-xs text-ivory/50">
              {t.pages.insights.publishedOn} {formatDate(item.date, locale)}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {body.sections.map((block, i) => (
            <Section key={i} block={block} />
          ))}
        </motion.div>
      </article>

      <section className="border-t border-ivory/5 bg-bg2">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-ivory mb-6">
            {t.pages.insights.ctaTitle}
          </h2>
          <Button href="/contact" variant="primary">
            <Mail size={14} /> {t.pages.insights.ctaButton}
          </Button>
        </div>
      </section>

      {(prev || next) && (
        <nav className="border-t border-ivory/5">
          <div className="max-w-3xl mx-auto px-6 py-12 grid gap-6 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/insights/${prev.slug}`}
                className="group flex flex-col gap-1 text-left"
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[3px] uppercase text-ivory/40">
                  <ArrowLeft size={11} /> PREV
                </span>
                <span className="text-sm text-ivory group-hover:text-gold transition-colors">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/insights/${next.slug}`}
                className="group flex flex-col gap-1 sm:text-right sm:items-end"
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[3px] uppercase text-ivory/40">
                  NEXT <ArrowRight size={11} />
                </span>
                <span className="text-sm text-ivory group-hover:text-gold transition-colors">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </nav>
      )}
    </>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no errors (the old page still compiles independently).

- [ ] **Step 3: Commit**

```bash
git add src/components/InsightDetail.tsx
git commit -m "feat(insights): extract InsightDetail client component + image block"
```

### Task 13: `/insights/[slug]` → Server Component + metadata + revalidate

**Files:** Modify `src/app/insights/[slug]/page.tsx` (full replace)

- [ ] **Step 1: Replace the file**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedInsights, getPublishedInsight } from "@/lib/insights-source";
import InsightDetail from "@/components/InsightDetail";

const SITE_URL = "https://dolcenforte.com";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedInsight(slug);
  if (!item) return { title: "Article not found — Dolce & Forte" };

  const title = `${item.en.title} — Dolce & Forte`;
  const description = item.en.excerpt;
  const ogImage = item.coverImage.startsWith("http")
    ? item.coverImage
    : `${SITE_URL}${item.coverImage}`;
  const canonical = `${SITE_URL}/insights/${item.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: ogImage, width: 1280, height: 720, alt: item.en.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPublishedInsight(slug);
  if (!item) notFound();

  const all = await getPublishedInsights(); // already date-desc
  const idx = all.findIndex((i) => i.slug === slug);
  const prevRow = all[idx + 1];
  const nextRow = all[idx - 1];
  const prev = prevRow ? { slug: prevRow.slug, title: prevRow.en.title } : null;
  const next = nextRow ? { slug: nextRow.slug, title: nextRow.en.title } : null;

  return <InsightDetail item={item} prev={prev} next={next} />;
}
```

> Note: prev/next titles use `en.title` for a stable server payload; the
> client `InsightDetail` already localizes the main body via `useLocale`.
> Localizing prev/next labels is out of scope (matches existing behavior
> closely enough; YAGNI).

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no errors.

- [ ] **Step 3: Build**

Run: `rm -rf .next && npx next build`
Expected: build succeeds; `/insights` and `/insights/[slug]` listed as dynamic (`ƒ`).

- [ ] **Step 4: Commit**

```bash
git add src/app/insights/[slug]/page.tsx
git commit -m "refactor(insights): server-render detail + metadata from Supabase"
```

---

## Phase 3 — Auth & Gating

### Task 14: `proxy.ts` admin gate

**Files:** Create `src/lib/supabase/proxy.ts`, `proxy.ts` (repo root)

- [ ] **Step 1: Supabase proxy helper**

`src/lib/supabase/proxy.ts`:

```ts
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isAdminEmail } from "@/lib/admin/allowlist";

/**
 * Refreshes the Supabase session and enforces the admin allowlist for
 * /admin routes (except the login + auth-callback paths).
 */
export async function updateSessionAndGuard(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isPublicAdminPath =
    path === "/admin/login" || path.startsWith("/admin/auth/");

  if (path.startsWith("/admin") && !isPublicAdminPath) {
    const allowed = isAdminEmail(user?.email, process.env.ADMIN_EMAILS);
    if (!allowed) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return response;
}
```

- [ ] **Step 2: Root `proxy.ts`**

`proxy.ts` (repo root, sibling of `src/`):

```ts
import type { NextRequest } from "next/server";
import { updateSessionAndGuard } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSessionAndGuard(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add proxy.ts src/lib/supabase/proxy.ts
git commit -m "feat(admin): proxy.ts gate with allowlist"
```

### Task 15: Login page + auth callback + signOut action

**Files:** Create `src/app/admin/login/page.tsx`, `src/app/admin/auth/callback/route.ts`, `src/app/admin/actions.ts`

- [ ] **Step 1: Login page (client)**

`src/app/admin/login/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
      },
    });
    setBusy(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-bg2 rounded-2xl p-8">
        <h1 className="font-display text-2xl text-ivory mb-2">Admin</h1>
        {sent ? (
          <p className="text-sm text-ivory/70 leading-relaxed">
            Check your email for a sign-in link.
          </p>
        ) : (
          <form onSubmit={sendLink} className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-gold/20 border border-gold/40 text-gold py-3 text-sm hover:bg-gold/30 transition-colors disabled:opacity-50"
            >
              {busy ? "Sending…" : "Send magic link"}
            </button>
            {error && <p className="text-xs text-rose-400">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Auth callback route handler**

`src/app/admin/auth/callback/route.ts`:

```ts
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServer();
    await supabase.auth.exchangeCodeForSession(code);
  }
  // Only ever redirect to an internal path (no open redirect).
  return NextResponse.redirect(`${origin}/admin`);
}
```

- [ ] **Step 3: signOut server action**

`src/app/admin/actions.ts`:

```ts
"use server";

import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/admin/login/page.tsx src/app/admin/auth/callback/route.ts src/app/admin/actions.ts
git commit -m "feat(admin): magic-link login, auth callback, signOut"
```

### Task 16: Admin layout (server gate fallback + shell)

**Files:** Create `src/app/admin/layout.tsx`

- [ ] **Step 1: Write the layout**

`src/app/admin/layout.tsx`:

```tsx
import Link from "next/link";
import { headers } from "next/headers";
import { createSupabaseServer } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin/allowlist";
import { signOut } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // proxy.ts already redirects unauthorized users; this is defense in
  // depth so a misconfigured matcher can never expose admin content.
  const hdrs = await headers();
  const path = hdrs.get("x-pathname") ?? "";
  const isLogin = path.startsWith("/admin/login") || path.startsWith("/admin/auth");

  if (!isLogin) {
    const supabase = await createSupabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!isAdminEmail(user?.email, process.env.ADMIN_EMAILS)) {
      return (
        <div className="min-h-screen flex items-center justify-center text-ivory/60">
          <Link href="/admin/login" className="text-gold underline">
            Sign in
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-ivory/10 px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="font-display text-lg text-ivory">
          Insights Admin
        </Link>
        {!isLogin && (
          <form action={signOut}>
            <button className="text-xs text-ivory/60 hover:text-gold">
              Sign out
            </button>
          </form>
        )}
      </header>
      <main className="px-6 py-8 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
```

> Note: `x-pathname` is not set by default. Add it in `proxy.ts` Step:
> in `src/lib/supabase/proxy.ts`, before returning `response`, add
> `response.headers.set("x-pathname", request.nextUrl.pathname);`
> (applies to the non-redirect return path).

- [ ] **Step 2: Patch proxy to set `x-pathname`**

In `src/lib/supabase/proxy.ts`, immediately before the final `return response;`, add:

```ts
  response.headers.set("x-pathname", request.nextUrl.pathname);
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/admin/layout.tsx src/lib/supabase/proxy.ts
git commit -m "feat(admin): server gate fallback layout + x-pathname header"
```

---

## Phase 4 — Admin List, Soft Delete, Status

### Task 17: Write actions for save/publish/archive/restore

**Files:** Modify `src/app/admin/actions.ts`

- [ ] **Step 1: Append CRUD actions**

Add to `src/app/admin/actions.ts` (below `signOut`):

```ts
import { revalidatePath } from "next/cache";
import { isAdminEmail } from "@/lib/admin/allowlist";
import type { InsightBody } from "@/lib/insights-data";

export interface ArticleInput {
  id?: string;
  slug: string;
  date: string;
  author: string;
  coverImage: string;
  gradient: string;
  status: "draft" | "published";
  en: InsightBody;
  zh: InsightBody;
}

async function requireAdmin() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email, process.env.ADMIN_EMAILS)) {
    throw new Error("Unauthorized");
  }
  return supabase;
}

function assertSlug(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error("Invalid slug");
}

function bodyComplete(b: InsightBody): boolean {
  return Boolean(b.title?.trim()) && Array.isArray(b.sections) && b.sections.length > 0;
}

export async function saveArticle(input: ArticleInput) {
  const supabase = await requireAdmin();
  assertSlug(input.slug);

  if (input.status === "published" && (!bodyComplete(input.en) || !bodyComplete(input.zh))) {
    return { ok: false as const, error: "Both languages need a title and at least one block to publish." };
  }

  const row = {
    slug: input.slug,
    date: input.date,
    author: input.author,
    cover_image: input.coverImage,
    gradient: input.gradient,
    status: input.status,
    en: input.en,
    zh: input.zh,
    updated_at: new Date().toISOString(),
  };

  const query = input.id
    ? supabase.from("insights").update(row).eq("id", input.id)
    : supabase.from("insights").insert(row);

  const { error } = await query;
  if (error) return { ok: false as const, error: error.message };

  revalidatePath("/insights");
  revalidatePath(`/insights/${input.slug}`);
  revalidatePath("/admin");
  return { ok: true as const };
}

export async function setStatus(
  id: string,
  slug: string,
  status: "draft" | "published" | "archived",
) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("insights")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/insights");
  revalidatePath(`/insights/${slug}`);
  revalidatePath("/admin");
  return { ok: true as const };
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/admin/actions.ts
git commit -m "feat(admin): save + status server actions with allowlist guard"
```

### Task 18: Admin list page + table

**Files:** Create `src/app/admin/page.tsx`, `src/components/admin/ArticleListTable.tsx`

- [ ] **Step 1: List table (client)**

`src/components/admin/ArticleListTable.tsx`:

```tsx
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { setStatus } from "@/app/admin/actions";
import type { AdminInsight } from "@/lib/insights-source";

const FILTERS = ["all", "draft", "published", "archived"] as const;
type Filter = (typeof FILTERS)[number];

export default function ArticleListTable({ items }: { items: AdminInsight[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [pending, start] = useTransition();

  const shown = items.filter((i) => filter === "all" || i.status === filter);

  function confirmArchive(i: AdminInsight) {
    if (
      !window.confirm(
        `Archive "${i.en.title || i.slug}"? It will be hidden from the public site but can be restored from the Archived filter.`,
      )
    )
      return;
    start(() => setStatus(i.id, i.slug, "archived").then(() => location.reload()));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border ${
                filter === f
                  ? "bg-gold/15 border-gold/40 text-gold"
                  : "border-ivory/10 text-ivory/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <Link
          href="/admin/new"
          className="text-xs px-4 py-2 rounded-lg bg-gold/20 border border-gold/40 text-gold"
        >
          + New article
        </Link>
      </div>

      <table className="w-full text-sm">
        <thead className="text-ivory/40 text-xs uppercase tracking-wider">
          <tr className="text-left border-b border-ivory/10">
            <th className="py-3">Title</th>
            <th>Status</th>
            <th>Date</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((i) => (
            <tr key={i.id} className="border-b border-ivory/5">
              <td className="py-3 text-ivory">{i.en.title || i.slug}</td>
              <td className="text-ivory/60">{i.status}</td>
              <td className="text-ivory/60">{i.date}</td>
              <td className="text-right space-x-3">
                <Link href={`/admin/edit/${i.id}`} className="text-gold">
                  Edit
                </Link>
                <Link href={`/admin/preview/${i.slug}`} className="text-ivory/60">
                  Preview
                </Link>
                {i.status === "archived" ? (
                  <button
                    disabled={pending}
                    onClick={() =>
                      start(() =>
                        setStatus(i.id, i.slug, "draft").then(() => location.reload()),
                      )
                    }
                    className="text-ivory/60"
                  >
                    Restore
                  </button>
                ) : (
                  <button
                    disabled={pending}
                    onClick={() => confirmArchive(i)}
                    className="text-rose-400"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
          {shown.length === 0 && (
            <tr>
              <td colSpan={4} className="py-8 text-center text-ivory/40">
                No articles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 2: List page (server)**

`src/app/admin/page.tsx`:

```tsx
import { getAllInsightsAdmin } from "@/lib/insights-source";
import ArticleListTable from "@/components/admin/ArticleListTable";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const items = await getAllInsightsAdmin();
  return <ArticleListTable items={items} />;
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/admin/page.tsx src/components/admin/ArticleListTable.tsx
git commit -m "feat(admin): article list with status filter + soft delete"
```

---

## Phase 5 — Editor (Form, Block Editor, Image Upload)

### Task 19: Image upload action + widget

**Files:** Modify `src/app/admin/actions.ts`; Create `src/components/admin/ImageUpload.tsx`

- [ ] **Step 1: Add `uploadImage` action**

Append to `src/app/admin/actions.ts`:

```ts
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;

export async function uploadImage(formData: FormData) {
  const supabase = await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File)) return { ok: false as const, error: "No file" };
  if (!ALLOWED.includes(file.type))
    return { ok: false as const, error: "Only JPG, PNG, or WebP allowed" };
  if (file.size > MAX_BYTES)
    return { ok: false as const, error: "Max 5MB" };

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("insights")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { ok: false as const, error: error.message };

  const { data } = supabase.storage.from("insights").getPublicUrl(path);
  return { ok: true as const, url: data.publicUrl };
}
```

- [ ] **Step 2: Image upload widget**

`src/components/admin/ImageUpload.tsx`:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/app/admin/actions";

export default function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    const fd = new FormData();
    fd.set("file", file);
    const res = await uploadImage(fd);
    setBusy(false);
    if (res.ok) onChange(res.url);
    else setError(res.error);
  }

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-ivory/10">
          <Image src={value} alt="" fill className="object-cover" sizes="160px" />
        </div>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handle}
        disabled={busy}
        className="text-xs text-ivory/60"
      />
      {busy && <p className="text-xs text-ivory/40">Uploading…</p>}
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/admin/actions.ts src/components/admin/ImageUpload.tsx
git commit -m "feat(admin): server-validated image upload + widget"
```

### Task 20: Block editor + article form + create/edit pages + preview

**Files:** Create `src/components/admin/BlockEditor.tsx`, `src/components/admin/ArticleForm.tsx`, `src/app/admin/new/page.tsx`, `src/app/admin/edit/[id]/page.tsx`, `src/app/admin/preview/[slug]/page.tsx`

- [ ] **Step 1: Block editor**

`src/components/admin/BlockEditor.tsx`:

```tsx
"use client";

import type { InsightSection } from "@/lib/insights-data";
import ImageUpload from "@/components/admin/ImageUpload";

const KINDS: InsightSection["kind"][] = ["p", "h2", "h3", "ul", "quote", "image"];

function emptyBlock(kind: InsightSection["kind"]): InsightSection {
  switch (kind) {
    case "ul":
      return { kind: "ul", items: [""] };
    case "image":
      return { kind: "image", url: "", alt: "", caption: "" };
    default:
      return { kind, text: "" };
  }
}

export default function BlockEditor({
  blocks,
  onChange,
}: {
  blocks: InsightSection[];
  onChange: (next: InsightSection[]) => void;
}) {
  function update(i: number, next: InsightSection) {
    onChange(blocks.map((b, idx) => (idx === i ? next : b)));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const copy = [...blocks];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  }
  function remove(i: number) {
    onChange(blocks.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-3">
      {blocks.map((b, i) => (
        <div key={i} className="border border-ivory/10 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <select
              value={b.kind}
              onChange={(e) =>
                update(i, emptyBlock(e.target.value as InsightSection["kind"]))
              }
              className="bg-bg border border-ivory/10 rounded px-2 py-1 text-xs text-ivory"
            >
              {KINDS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <div className="space-x-2 text-xs">
              <button type="button" onClick={() => move(i, -1)} className="text-ivory/50">↑</button>
              <button type="button" onClick={() => move(i, 1)} className="text-ivory/50">↓</button>
              <button type="button" onClick={() => remove(i)} className="text-rose-400">✕</button>
            </div>
          </div>

          {b.kind === "ul" ? (
            <textarea
              rows={4}
              value={b.items.join("\n")}
              onChange={(e) =>
                update(i, { kind: "ul", items: e.target.value.split("\n") })
              }
              placeholder="One item per line"
              className="w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
            />
          ) : b.kind === "image" ? (
            <div className="space-y-2">
              <ImageUpload value={b.url} onChange={(url) => update(i, { ...b, url })} />
              <input
                value={b.alt}
                onChange={(e) => update(i, { ...b, alt: e.target.value })}
                placeholder="Alt text (required)"
                className="w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
              />
              <input
                value={b.caption ?? ""}
                onChange={(e) => update(i, { ...b, caption: e.target.value })}
                placeholder="Caption (optional)"
                className="w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
              />
            </div>
          ) : (
            <textarea
              rows={b.kind === "p" ? 4 : 2}
              value={b.text}
              onChange={(e) => update(i, { ...b, text: e.target.value })}
              className="w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
            />
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...blocks, emptyBlock("p")])}
        className="text-xs text-gold border border-gold/30 rounded px-3 py-1.5"
      >
        + Add block
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Article form**

`src/components/admin/ArticleForm.tsx`:

```tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveArticle, type ArticleInput } from "@/app/admin/actions";
import { slugify } from "@/lib/slug";
import type { InsightBody } from "@/lib/insights-data";
import type { AdminInsight } from "@/lib/insights-source";
import BlockEditor from "@/components/admin/BlockEditor";
import ImageUpload from "@/components/admin/ImageUpload";

const GRADIENTS = [
  "from-amber-900/40 to-purple-900/40",
  "from-purple-900/40 to-amber-900/40",
  "from-emerald-900/40 to-bg",
];

const emptyBody = (): InsightBody => ({
  title: "",
  subtitle: "",
  excerpt: "",
  readTime: "",
  tag: "",
  sections: [],
});

export default function ArticleForm({ existing }: { existing?: AdminInsight }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<"zh" | "en">("zh");

  const [slug, setSlug] = useState(existing?.slug ?? "");
  const [date, setDate] = useState(existing?.date ?? new Date().toISOString().slice(0, 10));
  const [author, setAuthor] = useState(existing?.author ?? "Amber Yu, Founder & Composer");
  const [coverImage, setCoverImage] = useState(existing?.coverImage ?? "");
  const [gradient, setGradient] = useState(existing?.gradient ?? GRADIENTS[0]);
  const [en, setEn] = useState<InsightBody>(existing?.en ?? emptyBody());
  const [zh, setZh] = useState<InsightBody>(existing?.zh ?? emptyBody());

  const body = lang === "zh" ? zh : en;
  const setBody = lang === "zh" ? setZh : setEn;

  function field<K extends keyof InsightBody>(key: K, value: InsightBody[K]) {
    setBody({ ...body, [key]: value });
  }

  function submit(status: "draft" | "published") {
    setError(null);
    const finalSlug = slug.trim() || slugify(en.title);
    const input: ArticleInput = {
      id: existing?.id,
      slug: finalSlug,
      date,
      author,
      coverImage,
      gradient,
      status,
      en,
      zh,
    };
    start(async () => {
      const res = await saveArticle(input);
      if (res.ok) router.push("/admin");
      else setError(res.error);
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="text-xs text-ivory/50">
          Slug
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto from EN title"
            className="mt-1 w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
          />
        </label>
        <label className="text-xs text-ivory/50">
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory [color-scheme:dark]"
          />
        </label>
        <label className="text-xs text-ivory/50">
          Author
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
          />
        </label>
        <label className="text-xs text-ivory/50">
          Gradient
          <select
            value={gradient}
            onChange={(e) => setGradient(e.target.value)}
            className="mt-1 w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
          >
            {GRADIENTS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <p className="text-xs text-ivory/50 mb-1">Cover image</p>
        <ImageUpload value={coverImage} onChange={setCoverImage} />
      </div>

      <div className="flex gap-2">
        {(["zh", "en"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={`text-xs px-3 py-1.5 rounded-full border ${
              lang === l ? "bg-gold/15 border-gold/40 text-gold" : "border-ivory/10 text-ivory/60"
            }`}
          >
            {l === "zh" ? "中文" : "English"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {(["title", "subtitle", "excerpt", "readTime", "tag"] as const).map((k) => (
          <label key={k} className="block text-xs text-ivory/50">
            {k}
            <input
              value={body[k] as string}
              onChange={(e) => field(k, e.target.value)}
              className="mt-1 w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
            />
          </label>
        ))}
      </div>

      <div>
        <p className="text-xs text-ivory/50 mb-2">Body blocks ({lang})</p>
        <BlockEditor
          blocks={body.sections}
          onChange={(sections) => field("sections", sections)}
        />
      </div>

      {error && <p className="text-sm text-rose-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={() => submit("draft")}
          className="px-4 py-2 rounded-lg border border-ivory/15 text-ivory/80 text-sm disabled:opacity-50"
        >
          Save draft
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => submit("published")}
          className="px-4 py-2 rounded-lg bg-gold/20 border border-gold/40 text-gold text-sm disabled:opacity-50"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create + edit + preview pages**

`src/app/admin/new/page.tsx`:

```tsx
import ArticleForm from "@/components/admin/ArticleForm";

export const dynamic = "force-dynamic";

export default function NewArticlePage() {
  return <ArticleForm />;
}
```

`src/app/admin/edit/[id]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { getInsightByIdAdmin } from "@/lib/insights-source";
import ArticleForm from "@/components/admin/ArticleForm";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const existing = await getInsightByIdAdmin(id);
  if (!existing) notFound();
  return <ArticleForm existing={existing} />;
}
```

`src/app/admin/preview/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { getInsightBySlugAdmin } from "@/lib/insights-source";
import InsightDetail from "@/components/InsightDetail";

export const dynamic = "force-dynamic";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getInsightBySlugAdmin(slug);
  if (!item) notFound();
  return <InsightDetail item={item} prev={null} next={null} />;
}
```

- [ ] **Step 4: Type-check + build**

Run: `npx tsc --noEmit -p . && rm -rf .next && npx next build`
Expected: no type errors; build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/admin/BlockEditor.tsx src/components/admin/ArticleForm.tsx src/app/admin/new/page.tsx "src/app/admin/edit/[id]/page.tsx" "src/app/admin/preview/[slug]/page.tsx"
git commit -m "feat(admin): article form, block editor, create/edit/preview"
```

---

## Phase 6 — Migration, Security Pass, Acceptance

### Task 21: Seed script (migrate existing article + sync admin emails)

**Files:** Create `scripts/seed-insights.ts`

- [ ] **Step 1: Write the seed script**

`scripts/seed-insights.ts`:

```ts
/**
 * One-time, idempotent migration:
 *  - upserts ADMIN_EMAILS into the admin_emails table (RLS source)
 *  - upserts the existing static insights[] as published rows
 *
 * Uses the service-role key (bypasses RLS) — run locally only.
 * Usage: npm run seed:insights
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { insights } from "../src/lib/insights-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmails = process.env.ADMIN_EMAILS;

if (!url || !serviceKey) {
  throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

async function main() {
  // 1. Sync admin allowlist
  if (adminEmails) {
    const rows = adminEmails
      .split(",")
      .map((e) => ({ email: e.trim().toLowerCase() }))
      .filter((r) => r.email);
    const { error } = await supabase
      .from("admin_emails")
      .upsert(rows, { onConflict: "email" });
    if (error) throw error;
    console.log(`Synced ${rows.length} admin email(s).`);
  }

  // 2. Upsert existing articles as published
  for (const a of insights) {
    const { error } = await supabase.from("insights").upsert(
      {
        slug: a.slug,
        status: "published",
        date: a.date,
        author: a.author,
        cover_image: a.coverImage,
        gradient: a.gradient,
        en: a.en,
        zh: a.zh,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" },
    );
    if (error) throw error;
    console.log(`Upserted: ${a.slug}`);
  }
  console.log("Seed complete.");
}

// Touch readFileSync import-free lint guard removed; node:fs kept for future use.
void readFileSync;
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

> Remove the `readFileSync` import + `void readFileSync;` line if your
> linter flags unused — it is a placeholder-free no-op kept intentionally
> minimal; simplest is to delete both lines. (Decision: delete both.)

- [ ] **Step 2: Correct the script (delete the unused import)**

Delete the line `import { readFileSync } from "node:fs";` and the line
`void readFileSync;` and its comment. Final script must have no unused imports.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit -p .`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add scripts/seed-insights.ts
git commit -m "feat: seed script for article migration + admin allowlist sync"
```

> **User action (documented, not executed by the worker):**
> 1. Create the Supabase project; run `supabase/schema.sql` in the SQL editor.
> 2. Enable Auth → Email → magic link; set Site URL `https://dolcenforte.com`
>    and additional redirect `http://localhost:3000/admin/auth/callback`.
> 3. Put `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
>    `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS` into `.env.local`, Vercel
>    Production, and Vercel Preview.
> 4. Run `npm run seed:insights` locally once.

### Task 22: Security pass + manual E2E acceptance

**Files:** none (verification only)

- [ ] **Step 1: Static security review**

Confirm by reading the diff:
- No `SUPABASE_SERVICE_ROLE_KEY` reference in any file under `src/` (only `scripts/`). Run: `grep -rn "SERVICE_ROLE" src/ ; echo "exit:$?"` — expected: no matches.
- No `dangerouslySetInnerHTML` added. Run: `grep -rn "dangerouslySetInnerHTML" src/components/InsightDetail.tsx` — expected: no matches.
- Every write action calls `requireAdmin()`. Run: `grep -n "requireAdmin\|export async function" src/app/admin/actions.ts` — verify `saveArticle`, `setStatus`, `uploadImage` each call `requireAdmin()`.
- Slug validated: `grep -n "assertSlug\|a-z0-9-" src/app/admin/actions.ts` — expected: regex present and called in `saveArticle`.

- [ ] **Step 2: Run full test + typecheck + build**

Run: `npx vitest run && npx tsc --noEmit -p . && rm -rf .next && npx next build`
Expected: all tests pass, no type errors, build succeeds.

- [ ] **Step 3: Manual E2E checklist (against `npm run dev` with real env)**

Verify each:
- [ ] Visiting `/admin` while logged out redirects to `/admin/login`.
- [ ] Requesting a magic link for a non-allowlisted email, then opening the link, still cannot reach `/admin` (redirected to login).
- [ ] Allowlisted email magic link → lands on `/admin` list.
- [ ] Create a draft (ZH + EN), upload a cover image + an inline image block, Save draft → appears under "draft".
- [ ] `/insights` (public) does NOT show the draft.
- [ ] `/admin/preview/<slug>` renders the draft including the inline image.
- [ ] Publish → appears on `/insights` within ~60s (or immediately after `revalidatePath`); inline image renders.
- [ ] Edit the published article, change a title, Publish → public reflects change.
- [ ] "Delete" archives (confirm dialog shown); article disappears from `/insights`; "Restore" from Archived filter brings it back as draft.
- [ ] Publishing with one language missing a title/blocks is blocked with the validation message; Save draft still works.
- [ ] Uploading a 6MB file or a `.gif` is rejected with an error message.

- [ ] **Step 4: Commit verification notes (if any fixes were needed)**

```bash
git add -A
git commit -m "chore(admin): security pass + acceptance fixes"
```

> If any checklist item fails, debug with superpowers:systematic-debugging
> before marking the plan complete.

---

## Self-Review

**Spec coverage:**
- §2 data model → Tasks 4, 7, 9 ✓
- §3 public rendering (Approach A, revalidate=60, draft preview) → Tasks 10–13, 20 ✓
- §4 auth gating (magic link, allowlist, proxy + per-action) → Tasks 6, 14–17, 19 ✓
- §5 editor UX (routes, language tabs, block editor, soft delete) → Tasks 18, 20 ✓
- §6 migration/env/packages → Tasks 1, 3, 21 ✓
- §7 security wrap-up → Tasks 7 (RLS), 17/19 (requireAdmin), 22 ✓
- §8 testing strategy → Tasks 2, 5, 6, 9 (unit) + 22 (manual E2E) ✓

**Placeholder scan:** Task 21 originally contained an intentional unused
import; resolved by an explicit Step 2 deletion (no placeholder remains).

**Type consistency:** `ArticleInput`, `AdminInsight`, `InsightRow`,
`InsightBody`, `InsightSection` are defined once (Tasks 9, 17) and reused
consistently in Tasks 18–21. Action names `saveArticle`, `setStatus`,
`uploadImage`, `signOut` are consistent across form, table, and layout.

**Open risk:** The Next.js 16 `proxy.ts` + `@supabase/ssr` cookie
adapter is verified against bundled docs but the SSR adapter API should
be re-confirmed against the installed `@supabase/ssr` version during
Task 14; if `getAll/setAll` differs, adjust to that version's documented
shape (no behavior change to the gate logic).
