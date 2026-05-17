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
  const isLogin =
    path.startsWith("/admin/login") || path.startsWith("/admin/auth");

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
