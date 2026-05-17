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
