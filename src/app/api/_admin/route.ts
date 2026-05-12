/**
 * Temporary admin endpoint — used once during the Resend domain
 * verification rollout, then deleted.
 *
 * Protected by ADMIN_TOKEN env var; verifies caller via the X-Admin-Token
 * header. The Resend API key is read from process.env on the server, so
 * it never leaves Vercel.
 *
 * Actions (?action=...):
 *   list-domains    — GET https://api.resend.com/domains
 *   add-domain      — POST  /domains  { name: "dolcenforte.com" }
 *   get-domain      — GET   /domains/:id  (id = body.id OR existing match)
 *   verify-domain   — POST  /domains/:id/verify
 */

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RESEND = "https://api.resend.com";

async function authed(request: Request): Promise<boolean> {
  const token = request.headers.get("x-admin-token");
  const expected = process.env.ADMIN_TOKEN;
  return Boolean(expected) && token === expected;
}

async function resendRequest(
  method: string,
  path: string,
  body?: unknown,
): Promise<{ status: number; data: unknown }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: 500, data: { error: "RESEND_API_KEY missing on server" } };
  }
  const res = await fetch(`${RESEND}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    data = { raw: await res.text() };
  }
  return { status: res.status, data };
}

export async function POST(request: Request) {
  if (!(await authed(request))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const action = url.searchParams.get("action") || "";
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  if (action === "list-domains") {
    const out = await resendRequest("GET", "/domains");
    return NextResponse.json(out, { status: out.status });
  }

  if (action === "add-domain") {
    const name = (body.name as string) || "dolcenforte.com";
    const out = await resendRequest("POST", "/domains", {
      name,
      region: "us-east-1",
    });
    return NextResponse.json(out, { status: out.status });
  }

  if (action === "get-domain") {
    const id = body.id as string;
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const out = await resendRequest("GET", `/domains/${id}`);
    return NextResponse.json(out, { status: out.status });
  }

  if (action === "verify-domain") {
    const id = body.id as string;
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const out = await resendRequest("POST", `/domains/${id}/verify`);
    return NextResponse.json(out, { status: out.status });
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
