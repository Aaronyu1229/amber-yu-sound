import type { NextRequest } from "next/server";
import { updateSessionAndGuard } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSessionAndGuard(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
