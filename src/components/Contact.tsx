"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/lib/i18n";
import SectionTitle from "./ui/SectionTitle";
import Button from "./ui/Button";

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLocale();

  return (
    <section id="contact" className="py-24 md:py-32" ref={ref}>
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
              <span className="text-sm text-ivory/80">{t.contact.email}</span>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] tracking-[2px] uppercase text-muted block mb-2">
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
                <label className="text-[10px] tracking-[2px] uppercase text-muted block mb-2">
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
              <label className="text-[10px] tracking-[2px] uppercase text-muted block mb-2">
                {t.contact.form.emailLabel}
              </label>
              <input
                type="email"
                required
                className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors"
                placeholder={t.contact.form.emailPlaceholder}
              />
            </div>

            <div>
              <label className="text-[10px] tracking-[2px] uppercase text-muted block mb-2">
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
              <label className="text-[10px] tracking-[2px] uppercase text-muted block mb-2">
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
