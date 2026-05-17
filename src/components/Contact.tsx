"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/lib/i18n";
import SectionTitle from "./ui/SectionTitle";
import Button from "./ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  company: string;
  email: string;
  platform: string;
  gameType: string;
  audioNeeds: string[];
  deadline: string;
  details: string;
  /** Honeypot — must remain empty. Real users never see this field. */
  website: string;
}

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  platform: "",
  gameType: "",
  audioNeeds: [],
  deadline: "",
  details: "",
  website: "",
};

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const { t, locale } = useLocale();
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleAudioNeed = (opt: string) => {
    setForm((prev) => ({
      ...prev,
      audioNeeds: prev.audioNeeds.includes(opt)
        ? prev.audioNeeds.filter((o) => o !== opt)
        : [...prev.audioNeeds, opt],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        notifyDelivered?: boolean;
        autoReplyDelivered?: boolean;
        error?: string;
      };
      // notifyDelivered is the business-critical signal: if Amber's inbox got
      // the lead, the submission was a success even if the auto-reply bounced.
      // The server already returns ok:false / 502 when notify fails, so this
      // double-check is belt-and-braces.
      if (res.ok && data.ok && data.notifyDelivered !== false) {
        setStatus("success");
        setForm(initialState);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <SectionTitle>{t.contact.title}</SectionTitle>
          <p className="text-ivory/60 leading-relaxed">
            {t.contact.description}
          </p>

          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gold" />
              <a
                href={`mailto:${t.contact.email}`}
                className="text-sm text-ivory/80 hover:text-gold transition-colors"
              >
                {t.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-gold" />
              <span className="text-sm text-ivory/80">
                {t.contact.location}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <form
            className="bg-bg2 rounded-2xl p-8 space-y-5 relative"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Honeypot — visually + accessibly hidden, but bots will fill it.
                Submissions where this field is non-empty are silently dropped
                by the server. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-10000px",
                top: "auto",
                width: 1,
                height: 1,
                overflow: "hidden",
              }}
            >
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs tracking-[1.5px] uppercase text-ivory/50 block mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors"
                  placeholder={t.contact.form.namePlaceholder}
                />
              </div>
              <div>
                <label className="text-xs tracking-[1.5px] uppercase text-ivory/50 block mb-2">
                  {t.contact.form.company}
                </label>
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors"
                  placeholder={t.contact.form.companyPlaceholder}
                />
              </div>
            </div>

            <div>
              <label className="text-xs tracking-[1.5px] uppercase text-ivory/50 block mb-2">
                {t.contact.form.emailLabel}
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors"
                placeholder={t.contact.form.emailPlaceholder}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs tracking-[1.5px] uppercase text-ivory/50 block mb-2">
                  {t.contact.form.platform}
                </label>
                <select
                  value={form.platform}
                  onChange={(e) => update("platform", e.target.value)}
                  className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory focus:border-gold focus:outline-none transition-colors appearance-none"
                >
                  <option value="">
                    {t.contact.form.platformPlaceholder}
                  </option>
                  {t.contact.form.platformOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs tracking-[1.5px] uppercase text-ivory/50 block mb-2">
                  {t.contact.form.gameType}
                </label>
                <select
                  value={form.gameType}
                  onChange={(e) => update("gameType", e.target.value)}
                  className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory focus:border-gold focus:outline-none transition-colors appearance-none"
                >
                  <option value="">
                    {t.contact.form.gameTypePlaceholder}
                  </option>
                  {t.contact.form.gameTypeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs tracking-[1.5px] uppercase text-ivory/50 block mb-2">
                {t.contact.form.audioNeeds}
                <span className="ml-2 text-[10px] normal-case tracking-normal text-ivory/35">
                  {t.contact.form.audioNeedsHint}
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {t.contact.form.audioNeedsOptions.map((opt) => {
                  const active = form.audioNeeds.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => toggleAudioNeed(opt)}
                      className={`text-xs px-3.5 py-2 rounded-full border transition-colors cursor-pointer ${
                        active
                          ? "bg-gold/15 border-gold/40 text-gold"
                          : "bg-bg border-ivory/10 text-ivory/60 hover:border-ivory/25 hover:text-ivory/80"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs tracking-[1.5px] uppercase text-ivory/50 block mb-2">
                {t.contact.form.deadline}
              </label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => update("deadline", e.target.value)}
                onClick={(e) => {
                  // Native date inputs only open the calendar when the
                  // (small) indicator is clicked. Open it from anywhere
                  // on the field for a normal click affordance.
                  try {
                    e.currentTarget.showPicker();
                  } catch {
                    /* showPicker unsupported or blocked — ignore */
                  }
                }}
                className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory focus:border-gold focus:outline-none transition-colors cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs tracking-[1.5px] uppercase text-ivory/50 block mb-2">
                {t.contact.form.details}
              </label>
              <textarea
                rows={4}
                value={form.details}
                onChange={(e) => update("details", e.target.value)}
                className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors resize-none"
                placeholder={t.contact.form.detailsPlaceholder}
              />
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={status === "submitting"}
              className="w-full"
            >
              {status === "submitting"
                ? t.contact.form.submitting
                : t.contact.form.submit}
            </Button>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex gap-3 items-start rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-emerald-300">
                      {t.contact.form.successTitle}
                    </p>
                    <p className="text-xs text-emerald-200/80 leading-relaxed mt-1">
                      {t.contact.form.successBody}
                    </p>
                  </div>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex gap-3 items-start rounded-lg bg-rose-500/10 border border-rose-500/30 p-4"
                  role="alert"
                  aria-live="assertive"
                >
                  <AlertCircle
                    size={18}
                    className="text-rose-400 shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-rose-200/90 leading-relaxed">
                    {t.contact.form.errorBody}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
