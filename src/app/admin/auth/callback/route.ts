import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        `${origin}/admin/login?error=link_expired`,
      );
    }
  } else {
    return NextResponse.redirect(
      `${origin}/admin/login?error=missing_code`,
    );
  }
  // Only ever redirect to an internal path (no open redirect).
  return NextResponse.redirect(`${origin}/admin`);
}
