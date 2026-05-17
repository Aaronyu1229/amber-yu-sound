/**
 * One-time, idempotent migration:
 *  - upserts ADMIN_EMAILS into the admin_emails table (RLS source)
 *  - upserts the existing static insights[] as published rows
 *
 * Uses the service-role key (bypasses RLS) — run locally only.
 * Usage: npm run seed:insights
 */
import { createClient } from "@supabase/supabase-js";
import { insights } from "../src/lib/insights-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmails = process.env.ADMIN_EMAILS;

if (!url || !serviceKey) {
  throw new Error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
  );
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

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
