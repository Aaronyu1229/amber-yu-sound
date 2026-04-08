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
      {/* Hero: two-column layout */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          {/* Left column: title + headphone notice */}
          <div className="md:sticky md:top-32">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs tracking-[3px] uppercase text-purple mb-4"
            >
              / {t.pages.music.title}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ivory leading-tight mb-8"
            >
              {t.pages.music.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-start gap-3 p-5 rounded-xl bg-purple-dim border border-purple/10 mb-8"
            >
              <Headphones size={20} className="text-purple shrink-0 mt-0.5" />
              <p className="text-sm text-purple leading-relaxed">
                {t.pages.music.headphones}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-ivory/70 text-sm leading-relaxed"
            >
              {t.pages.music.subtitle}
            </motion.p>
          </div>

          {/* Right column: custom music player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MusicPlayer />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-bg2">
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
