import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { isAdminEmail } from "@/lib/admin/allowlist";

/**
 * Refreshes the Supabase session and enforces the admin allowlist for
 * /admin routes (except the login + auth-callback paths). Also exposes
 * the *real* request path to server components via a rewritten
 * `x-pathname` request header — any client-supplied `x-pathname` is
 * stripped first so the value the admin layout reads cannot be spoofed.
 */
export async function updateSessionAndGuard(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Trustworthy request headers: drop any client-injected x-pathname,
  // then set the proxy-derived one. Server components read this via
  // next/headers (request headers), not response headers.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("x-pathname");
  requestHeaders.set("x-pathname", path);

  let response = NextResponse.next({ request: { headers: requestHeaders } });

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
          response = NextResponse.next({
            request: { headers: requestHeaders },
          });
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
