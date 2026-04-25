"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/lib/i18n";
import SectionTitle from "./ui/SectionTitle";
import Button from "./ui/Button";

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLocale();
  const [audioNeeds, setAudioNeeds] = useState<string[]>([]);

  const toggleAudioNeed = (opt: string) => {
    setAudioNeeds((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
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
          <p className="text-ivory/60 leading-relaxed">{t.contact.description}</p>

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
              <span className="text-sm text-ivory/80">{t.contact.location}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <form
            className="bg-bg2 rounded-2xl p-8 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs tracking-[1.5px] uppercase text-ivory/50 block mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  required
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
                className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors"
                placeholder={t.contact.form.emailPlaceholder}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs tracking-[1.5px] uppercase text-ivory/50 block mb-2">
                  {t.contact.form.platform}
                </label>
                <select className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory focus:border-gold focus:outline-none transition-colors appearance-none">
                  <option value="">{t.contact.form.platformPlaceholder}</option>
                  {t.contact.form.platformOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs tracking-[1.5px] uppercase text-ivory/50 block mb-2">
                  {t.contact.form.gameType}
                </label>
                <select className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory focus:border-gold focus:outline-none transition-colors appearance-none">
                  <option value="">{t.contact.form.gameTypePlaceholder}</option>
                  {t.contact.form.gameTypeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
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
                  const active = audioNeeds.includes(opt);
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
                className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-xs tracking-[1.5px] uppercase text-ivory/50 block mb-2">
                {t.contact.form.details}
              </label>
              <textarea
                rows={4}
                className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors resize-none"
                placeholder={t.contact.form.detailsPlaceholder}
              />
            </div>

            <Button variant="primary" type="submit" className="w-full">
              {t.contact.form.submit}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
