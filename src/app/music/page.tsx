"use client";

import { motion } from "framer-motion";
import { Headphones } from "lucide-react";
import Button from "@/components/ui/Button";
import MusicPlayer from "@/components/MusicPlayer";
import { useLocale } from "@/lib/i18n";

export default function MusicPage() {
  const { t } = useLocale();

  return (
    <>
      {/* Hero: single-column centered layout */}
      <section className="relative min-h-screen pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Header - centered */}
          <div className="text-center mb-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[5px] uppercase text-purple mb-4"
            >
              / {t.pages.music.title}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ivory leading-tight mb-6"
            >
              {t.pages.music.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-dim border border-purple/10"
            >
              <Headphones size={16} className="text-purple shrink-0" />
              <p className="text-xs text-purple">
                {t.pages.music.headphones}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-ivory/50 text-sm leading-relaxed mt-6 max-w-lg mx-auto"
            >
              {t.pages.music.subtitle}
            </motion.p>
          </div>

          {/* Music Player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <MusicPlayer />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-bg2">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl md:text-4xl font-medium text-ivory mb-4"
          >
            {t.pages.music.cta}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button href="/contact" variant="primary">
              {t.hero.cta2}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Spacer for bottom player bar */}
      <div className="h-20" />
    </>
  );
}
