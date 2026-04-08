"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/lib/i18n";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import { tools, aboutImage } from "@/lib/constants";

export default function About() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLocale();

  return (
    <section id="about" className="py-20 md:py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-bg2 rounded-2xl aspect-[3/4] overflow-hidden"
        >
          <Image
            src={aboutImage}
            alt="Amber Yu"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
          <span className="absolute bottom-6 left-6 text-xs tracking-[3px] uppercase text-purple z-10">
            {t.about.founderLabel}
          </span>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SectionTag>{t.about.tag}</SectionTag>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionTitle>{t.about.title}</SectionTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 text-ivory/70 leading-relaxed"
          >
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-6"
          >
            <span className="text-xs tracking-[3px] uppercase text-purple block mb-4">
              {t.about.toolsLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="text-xs px-4 py-2 rounded-full bg-bg2 text-ivory/60 border border-ivory/5"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
