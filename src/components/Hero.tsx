"use client";

import { motion } from "framer-motion";
import { Play, Mail } from "lucide-react";
import Button from "./ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

function WaveSVG({ color, opacity, delay }: { color: string; opacity: number; delay: number }) {
  return (
    <div className="absolute bottom-0 left-0 w-[200%] overflow-hidden" style={{ opacity }}>
      <svg
        viewBox="0 0 2400 120"
        className="w-full"
        style={{ animation: `wave-move ${20 + delay}s linear infinite` }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 C1400,20 1600,100 1800,60 C2000,20 2200,100 2400,60"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
      </div>

      {/* Wave lines */}
      <WaveSVG color="var(--gold)" opacity={0.3} delay={0} />
      <WaveSVG color="var(--purple)" opacity={0.15} delay={5} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-[10px] tracking-[5px] uppercase text-purple mb-6"
        >
          Premium Casino Game Audio
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display text-4xl md:text-5xl lg:text-7xl font-medium leading-tight max-w-3xl mb-6"
        >
          Sound design rooted in{" "}
          <span className="text-gold italic">musical artistry</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-ivory/70 text-base md:text-lg max-w-xl mb-10 leading-relaxed"
        >
          Classically trained composer crafting immersive audio for slot games,
          live casino &amp; iGaming studios worldwide.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap gap-4"
        >
          <Button href="#portfolio" variant="primary">
            <Play size={14} /> View Portfolio
          </Button>
          <Button href="#contact" variant="secondary">
            <Mail size={14} /> Get in Touch
          </Button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[4px] uppercase text-muted">
          Scroll
        </span>
        <div
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
          style={{ animation: "float 3s ease-in-out infinite" }}
        />
      </motion.div>
    </section>
  );
}
