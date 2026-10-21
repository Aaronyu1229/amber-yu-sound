"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import styles from "./tension.module.css";

type FormStatus = "idle" | "submitting" | "success" | "validation" | "rateLimit" | "network";
const emptyForm = { name: "", company: "", email: "", role: "", website: "" };

export default function EarlyAccess() {
  const { t, locale } = useLocale();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const update = (key: keyof typeof emptyForm, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    if (!form.name.trim() || !form.company.trim() || !form.email.trim() || !form.role) {
      setStatus("validation");
      return;
    }
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name, company: form.company, email: form.email, gameType: form.role, details: "Tension early access request", locale, website: form.website }) });
      const data = await response.json().catch(() => ({})) as { ok?: boolean; error?: string };
      if (response.status === 429) setStatus("rateLimit");
      else if (response.ok && data.ok) { setStatus("success"); setForm(emptyForm); }
      else if (response.status === 400 && data.error) setStatus("validation");
      else setStatus("network");
    } catch {
      setStatus("network");
    }
  };
  const message = status === "success" ? t.pages.tension.access.success : status === "validation" ? t.pages.tension.access.validation : status === "rateLimit" ? t.pages.tension.access.rateLimit : status === "network" ? t.pages.tension.access.network : null;

  return <section className={styles.access} id="access"><div className={`${styles.glow} ${styles.accessGlow}`} aria-hidden="true" /><div className={styles.wrap}><div className={styles.accessCard}><div><span className={styles.event}>{t.pages.tension.access.event}</span><h2 className={styles.h2}>{t.pages.tension.access.title} <em>{t.pages.tension.access.titleHighlight}</em></h2><p className={styles.lead}>{t.pages.tension.access.description}</p></div><form className={styles.form} onSubmit={submit} noValidate><div className={styles.honeypot} aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => update("website", event.target.value)} /></label></div><label htmlFor="tension-name">{t.pages.tension.access.name}</label><input id="tension-name" autoComplete="name" required value={form.name} onChange={(event) => update("name", event.target.value)} /><label htmlFor="tension-company">{t.pages.tension.access.company}</label><input id="tension-company" autoComplete="organization" required value={form.company} onChange={(event) => update("company", event.target.value)} /><label htmlFor="tension-email">{t.pages.tension.access.email}</label><input id="tension-email" type="email" autoComplete="email" required value={form.email} onChange={(event) => update("email", event.target.value)} /><label htmlFor="tension-role">{t.pages.tension.access.role}</label><select id="tension-role" required value={form.role} onChange={(event) => update("role", event.target.value)}><option value="" disabled>{t.pages.tension.access.rolePlaceholder}</option>{t.pages.tension.access.roles.map((role) => <option key={role} value={role}>{role}</option>)}</select><button type="submit" className={`${styles.button} ${styles.buttonGold}`} disabled={status === "submitting"}>{status === "submitting" ? t.pages.tension.access.submitting : t.pages.tension.access.submit}</button>{message && <p className={`${styles.formMessage} ${status === "success" ? styles.formSuccess : styles.formError}`} role={status === "success" ? "status" : "alert"} aria-live="polite">{status === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}{message}</p>}<small>{t.pages.tension.access.privacy}</small></form></div></div></section>;
}
