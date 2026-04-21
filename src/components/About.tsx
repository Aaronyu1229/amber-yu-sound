"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Rocket,
  Workflow,
  Gamepad2,
  Target,
  Settings2,
  Users,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/lib/i18n";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import { tools, aboutImage } from "@/lib/constants";

const WHY_ICONS = [Rocket, Workflow, Gamepad2, Target, Settings2, Users];

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

      {/* Why Choose Us — Dolce & Forte differentiators */}
      <div className="max-w-7xl mx-auto px-6 mt-24 md:mt-32">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>{t.about.whyTag}</SectionTag>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4"
          >
            <SectionTitle>{t.about.whyTitle}</SectionTitle>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-ivory/65 leading-relaxed text-sm md:text-base"
          >
            {t.about.whyDescription}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {t.about.whyItems.map((item, i) => {
            const Icon = WHY_ICONS[i] ?? Rocket;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.07 }}
                className="group relative bg-bg2 rounded-2xl p-6 border border-ivory/5 hover:border-gold/25 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <h3 className="text-ivory font-medium mb-2">{item.title}</h3>
                <p className="text-ivory/55 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
