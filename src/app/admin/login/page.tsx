"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
      },
    });
    setBusy(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-bg2 rounded-2xl p-8">
        <h1 className="font-display text-2xl text-ivory mb-2">Admin</h1>
        {sent ? (
          <p className="text-sm text-ivory/70 leading-relaxed">
            Check your email for a sign-in link.
          </p>
        ) : (
          <form onSubmit={sendLink} className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-gold/20 border border-gold/40 text-gold py-3 text-sm hover:bg-gold/30 transition-colors disabled:opacity-50"
            >
              {busy ? "Sending…" : "Send magic link"}
            </button>
            {error && <p className="text-xs text-rose-400">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
