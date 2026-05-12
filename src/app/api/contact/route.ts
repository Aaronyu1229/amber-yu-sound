/**
 * POST /api/contact — handle contact form submissions
 *
 * Flow:
 *   1. Validate body (zod-style hand check, no extra dep)
 *   2. Reject obvious bots via honeypot field
 *   3. Email Amber via Resend  (reply-to = the visitor, so she can hit reply)
 *   4. Auto-reply confirmation to the visitor
 *   5. Always log the full submission so it survives even if email fails
 *   6. Optionally POST to BACKUP_WEBHOOK_URL (Google Sheet / Discord)
 *
 * Required env (Vercel project settings):
 *   - RESEND_API_KEY            — from resend.com dashboard
 *   - CONTACT_TO_EMAIL          — defaults to polanmusic2025@gmail.com
 *   - CONTACT_FROM_EMAIL        — defaults to onboarding@resend.dev
 *                                  (set to "Dolce & Forte <hello@dolcenforte.com>"
 *                                   once the domain is verified in Resend)
 *
 * Optional env:
 *   - BACKUP_WEBHOOK_URL        — every submission is POSTed here as JSON
 */

import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ─── Type & validation ───────────────────────────────────────────────────

interface ContactPayload {
  name: string;
  company: string;
  email: string;
  platform?: string;
  gameType?: string;
  audioNeeds?: string[];
  deadline?: string;
  details?: string;
  /** Honeypot — humans see nothing, bots fill it. Reject if non-empty. */
  website?: string;
  /** Submitter locale, used for the auto-reply language */
  locale?: "en" | "zh";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = {
  name: 200,
  company: 200,
  email: 320,
  text: 5000,
};

function validate(p: Partial<ContactPayload>): string | null {
  if (!p || typeof p !== "object") return "Invalid body";
  if (!p.name || typeof p.name !== "string" || !p.name.trim()) return "Name is required";
  if (p.name.length > MAX.name) return "Name too long";
  if (!p.company || typeof p.company !== "string" || !p.company.trim()) return "Company is required";
  if (p.company.length > MAX.company) return "Company too long";
  if (!p.email || typeof p.email !== "string" || !EMAIL_RE.test(p.email)) return "Valid email is required";
  if (p.email.length > MAX.email) return "Email too long";
  if (p.details && p.details.length > MAX.text) return "Details too long";
  if (p.audioNeeds && (!Array.isArray(p.audioNeeds) || p.audioNeeds.some((x) => typeof x !== "string"))) {
    return "Invalid audio needs";
  }
  return null;
}

// ─── HTML escaping for safe insertion into the email template ────────────

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | undefined | null): string {
  if (!value) return "";
  const safe = escapeHtml(value).replace(/\n/g, "<br/>");
  return `
    <tr>
      <td style="padding:6px 12px 6px 0;color:#888;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;vertical-align:top;width:140px;">${escapeHtml(label)}</td>
      <td style="padding:6px 0;color:#222;font-size:14px;line-height:1.6;">${safe}</td>
    </tr>`;
}

// ─── Email bodies ────────────────────────────────────────────────────────

function notifyHtml(p: ContactPayload): string {
  const audioNeeds = p.audioNeeds?.join(", ") ?? "";
  return `<!doctype html><html><body style="margin:0;padding:24px;font-family:'Helvetica Neue',Arial,sans-serif;background:#f7f6f1;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #eae6d8;">
    <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#b8860b;margin:0 0 4px;">DOLCE &amp; FORTE</p>
    <h1 style="font-size:22px;margin:0 0 24px;color:#222;">New contact form submission</h1>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Name", p.name)}
      ${row("Company", p.company)}
      ${row("Email", p.email)}
      ${row("Platform", p.platform)}
      ${row("Game Type", p.gameType)}
      ${row("Audio Needs", audioNeeds)}
      ${row("Deadline", p.deadline)}
      ${row("Details", p.details)}
    </table>
    <p style="margin:24px 0 0;font-size:12px;color:#888;">Reply directly to this email to respond to ${escapeHtml(p.name)}.</p>
  </div>
</body></html>`;
}

function autoReplyHtml(p: ContactPayload): string {
  const isZh = p.locale === "zh";
  const greeting = isZh ? `${escapeHtml(p.name)} 您好，` : `Hi ${escapeHtml(p.name)},`;
  const body = isZh
    ? `感謝您聯繫 <strong>Dolce &amp; Forte</strong>！我們已經收到您的詢問，會在 1–2 個工作天內回覆。<br/><br/>同時，您可以參考我們的<a href="https://dolcenforte.com/portfolio" style="color:#b8860b;">作品集</a>與<a href="https://dolcenforte.com/music" style="color:#b8860b;">音樂作品</a>。`
    : `Thanks for reaching out to <strong>Dolce &amp; Forte</strong>! We've received your inquiry and will get back to you within 1–2 business days.<br/><br/>In the meantime, feel free to browse our <a href="https://dolcenforte.com/portfolio" style="color:#b8860b;">portfolio</a> and <a href="https://dolcenforte.com/music" style="color:#b8860b;">music samples</a>.`;
  const sign = isZh ? "— Dolce &amp; Forte 團隊" : "— The Dolce & Forte team";

  return `<!doctype html><html><body style="margin:0;padding:24px;font-family:'Helvetica Neue',Arial,sans-serif;background:#f7f6f1;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #eae6d8;">
    <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#b8860b;margin:0 0 4px;">DOLCE &amp; FORTE</p>
    <h1 style="font-size:22px;margin:0 0 16px;color:#222;">${isZh ? "我們已收到您的訊息" : "We've received your message"}</h1>
    <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 16px;">${greeting}</p>
    <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 24px;">${body}</p>
    <p style="color:#888;font-size:13px;margin:0;">${sign}</p>
  </div>
</body></html>`;
}

// ─── Optional backup webhook ─────────────────────────────────────────────

async function fireBackupWebhook(p: ContactPayload): Promise<void> {
  const url = process.env.BACKUP_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        receivedAt: new Date().toISOString(),
        source: "dolcenforte.com/contact",
        ...p,
        // Strip honeypot from logged payload
        website: undefined,
      }),
    });
  } catch (err) {
    console.error("[contact] backup webhook failed:", err);
  }
}

// ─── Route handler ───────────────────────────────────────────────────────

export async function POST(request: Request) {
  let payload: Partial<ContactPayload>;
  try {
    payload = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — silently accept (return success) so bots don't learn
  if (payload.website && payload.website.trim() !== "") {
    console.warn("[contact] honeypot triggered, ignoring submission");
    return NextResponse.json({ ok: true });
  }

  const err = validate(payload);
  if (err) {
    return NextResponse.json({ ok: false, error: err }, { status: 400 });
  }

  const clean: ContactPayload = {
    name: payload.name!.trim(),
    company: payload.company!.trim(),
    email: payload.email!.trim().toLowerCase(),
    platform: payload.platform?.trim() || undefined,
    gameType: payload.gameType?.trim() || undefined,
    audioNeeds: payload.audioNeeds?.length ? payload.audioNeeds : undefined,
    deadline: payload.deadline?.trim() || undefined,
    details: payload.details?.trim() || undefined,
    locale: payload.locale === "zh" ? "zh" : "en",
  };

  // Always log — this is the third-line backup in case email + webhook both fail
  console.log(
    "[contact] submission",
    JSON.stringify({ at: new Date().toISOString(), ...clean }),
  );

  // Fire backup webhook in parallel — never blocks the user
  fireBackupWebhook(clean);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Graceful degradation: form still "succeeds" so visitors aren't stranded;
    // owner sees the submission in Vercel function logs until the env var is set.
    console.warn("[contact] RESEND_API_KEY missing — submission logged only");
    return NextResponse.json({ ok: true, degraded: true });
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || "polanmusic2025@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Dolce & Forte <onboarding@resend.dev>";
  const subject = `[Dolce & Forte] New inquiry from ${clean.name} (${clean.company})`;

  try {
    // Send the notification first — this is the critical one
    const notify = await resend.emails.send({
      from,
      to: [to],
      replyTo: clean.email,
      subject,
      html: notifyHtml(clean),
    });
    if (notify.error) {
      console.error("[contact] resend notify error:", notify.error);
      return NextResponse.json(
        { ok: false, error: "Email delivery failed" },
        { status: 502 },
      );
    }

    // Auto-reply — non-critical, don't fail the request if it errors
    try {
      const ack = await resend.emails.send({
        from,
        to: [clean.email],
        subject:
          clean.locale === "zh"
            ? "我們已收到您的訊息 — Dolce & Forte"
            : "We've received your message — Dolce & Forte",
        html: autoReplyHtml(clean),
      });
      if (ack.error) console.warn("[contact] auto-reply failed:", ack.error);
    } catch (autoReplyErr) {
      console.warn("[contact] auto-reply threw:", autoReplyErr);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] resend threw:", e);
    return NextResponse.json(
      { ok: false, error: "Email delivery failed" },
      { status: 502 },
    );
  }
}
