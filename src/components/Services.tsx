"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/lib/i18n";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import { serviceImages } from "@/lib/constants";

const accents = ["gold", "gold", "purple", "purple"] as const;
const numbers = ["01", "02", "03", "04"];

export default function Services() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLocale();

  return (
    <section id="services" className="py-24 md:py-32 bg-bg2" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>{t.services.tag}</SectionTag>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4"
          >
            <SectionTitle highlight={t.services.titleHighlight}>
              {t.services.title}
            </SectionTitle>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.services.items.map((s, i) => (
            <motion.div
              key={numbers[i]}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className={`group relative bg-bg rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                accents[i] === "gold"
                  ? "border-gold/10 hover:border-gold/30 hover:shadow-gold/5"
                  : "border-purple/10 hover:border-purple/30 hover:shadow-purple/5"
              }`}
            >
              {/* Top image strip */}
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={serviceImages[i]}
                  alt={s.title}
                  fill
                  className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg" />
                {/* Large faded number */}
                <span className="absolute top-4 right-6 font-display text-6xl font-semibold text-ivory/[0.06]">
                  {numbers[i]}
                </span>
              </div>

              {/* Content */}
              <div className="p-8 pt-4">
                <h3
                  className={`text-xs tracking-[3px] uppercase font-medium mb-4 ${
                    accents[i] === "gold" ? "text-gold" : "text-purple"
                  }`}
                >
                  {s.title}
                </h3>

                <p className="text-ivory/60 text-sm leading-relaxed mb-6">
                  {s.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-wider uppercase px-3 py-1 rounded-full bg-ivory/5 text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
