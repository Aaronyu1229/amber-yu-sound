import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { isAdminEmail } from "@/lib/admin/allowlist";

/**
 * Refreshes the Supabase session and enforces the admin allowlist for
 * /admin routes (except the login + auth-callback paths). Also exposes
 * the request path via the `x-pathname` header for server components.
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
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[],
        ) {
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

  response.headers.set("x-pathname", path);
  return response;
}
