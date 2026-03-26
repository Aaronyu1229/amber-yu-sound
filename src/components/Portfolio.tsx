"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import { portfolioItems } from "@/lib/constants";

export default function Portfolio() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="portfolio" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionTag>Portfolio</SectionTag>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4"
            >
              <SectionTitle>Selected works</SectionTitle>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-ivory/50 max-w-sm text-sm leading-relaxed"
          >
            A curated selection of recent casino &amp; iGaming audio projects.
            Each one crafted to elevate the player experience.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="group bg-bg2 rounded-xl overflow-hidden border border-ivory/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5"
            >
              {/* Thumbnail placeholder */}
              <div
                className={`relative h-44 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
              >
                <span className="text-[10px] tracking-[3px] uppercase absolute top-4 left-4 bg-bg/60 backdrop-blur-sm px-3 py-1 rounded-full text-ivory/80">
                  {item.type}
                </span>
                {/* Hover play overlay */}
                <div className="absolute inset-0 bg-bg/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                    <Play size={16} className="text-gold ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-display text-xl font-medium text-ivory mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted mb-4">{item.services}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-wider uppercase px-3 py-1 rounded-full bg-purple-dim text-purple"
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
