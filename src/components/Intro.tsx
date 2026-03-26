"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import WaveformVisual from "./ui/WaveformVisual";
import { stats } from "@/lib/constants";

export default function Intro() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — waveform visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <WaveformVisual />
        </motion.div>

        {/* Right — text */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SectionTag>Creative Sound Solutions</SectionTag>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionTitle highlight="music">
              Where music meets the machine
            </SectionTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 text-ivory/70 leading-relaxed"
          >
            <p>
              With a foundation in classical music and a passion for interactive
              media, I create audio experiences that resonate with players and
              elevate game brands. Every sound is intentional — designed to
              heighten emotion, reinforce mechanics, and keep players engaged.
            </p>
            <p>
              From the first spin to the jackpot celebration, I craft cohesive
              soundscapes that give your game a distinctive sonic identity in a
              crowded market.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 pt-4 border-t border-ivory/10"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl md:text-4xl text-gold font-medium">
                  {s.value}
                </div>
                <div className="text-xs text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
