"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import { services } from "@/lib/constants";

export default function Services() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="services" className="py-24 md:py-32 bg-bg2" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>Services</SectionTag>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4"
          >
            <SectionTitle highlight="your games">
              What I can do for your games
            </SectionTitle>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className={`group relative bg-bg rounded-xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                s.accent === "gold"
                  ? "border-gold/10 hover:border-gold/30 hover:shadow-gold/5"
                  : "border-purple/10 hover:border-purple/30 hover:shadow-purple/5"
              }`}
            >
              {/* Large faded number */}
              <span className="absolute top-6 right-8 font-display text-6xl font-semibold text-ivory/[0.03]">
                {s.number}
              </span>

              <h3
                className={`text-xs tracking-[3px] uppercase font-medium mb-4 ${
                  s.accent === "gold" ? "text-gold" : "text-purple"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
