"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/lib/i18n";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLocale();

  return (
    <section className="py-20 md:py-24 bg-bg2" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>{t.testimonials.tag}</SectionTag>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4"
          >
            <SectionTitle>{t.testimonials.title}</SectionTitle>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.testimonials.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-bg rounded-xl p-8 border-l-2 border-gold"
            >
              <p className="font-display text-lg italic text-ivory/80 leading-relaxed mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <span className="text-xs font-medium text-gold">
                    {item.initials}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-ivory">
                    {item.name}
                  </div>
                  <div className="text-sm text-ivory/60">
                    {item.role}, {item.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
