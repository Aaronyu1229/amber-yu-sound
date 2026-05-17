import { createBrowserClient } from "@supabase/ssr";

/** Supabase client for Client Components (login page magic-link request). */
export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
