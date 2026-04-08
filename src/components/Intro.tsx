"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/lib/i18n";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import WaveformVisual from "./ui/WaveformVisual";

export default function Intro() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLocale();

  return (
    <section className="py-20 md:py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <WaveformVisual />
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SectionTag>{t.intro.tag}</SectionTag>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionTitle highlight={t.intro.titleHighlight}>
              {t.intro.title}
            </SectionTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 text-ivory/70 leading-relaxed"
          >
            <p>{t.intro.p1}</p>
            <p>{t.intro.p2}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 pt-4 border-t border-ivory/10"
          >
            {t.intro.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl md:text-4xl text-gold font-medium">
                  {s.value}
                </div>
                <div className="text-sm text-ivory/60 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
