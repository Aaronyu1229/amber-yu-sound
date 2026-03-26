"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import { tools } from "@/lib/constants";

export default function About() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — portrait placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative bg-bg2 rounded-2xl aspect-[3/4] flex items-center justify-center overflow-hidden"
        >
          <span className="font-display text-8xl text-ivory/[0.04] font-semibold select-none">
            AY
          </span>
          <span className="absolute bottom-6 left-6 text-[10px] tracking-[3px] uppercase text-purple">
            Founder &amp; Composer
          </span>
        </motion.div>

        {/* Right — bio */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SectionTag>About</SectionTag>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionTitle>The person behind the sound</SectionTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 text-ivory/70 leading-relaxed"
          >
            <p>
              Hi, I&apos;m Amber — a classically trained musician turned game audio
              specialist. After years of studying composition and performance, I
              discovered the world of interactive entertainment and never looked
              back.
            </p>
            <p>
              Today I focus exclusively on the iGaming space, crafting sonic
              identities for slot games, live casino products, and promotional
              content. My musical background gives me a unique perspective — I
              don&apos;t just design sounds, I compose experiences that connect with
              players on an emotional level.
            </p>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-6"
          >
            <span className="text-[10px] tracking-[3px] uppercase text-purple block mb-4">
              Tools &amp; Technologies
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
