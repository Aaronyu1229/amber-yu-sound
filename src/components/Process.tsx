"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import { processSteps } from "@/lib/constants";

export default function Process() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 md:py-32 bg-bg2" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>Process</SectionTag>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4"
          >
            <SectionTitle>From brief to final master</SectionTitle>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
          {/* Connection line (desktop only) */}
          <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-gold/20 via-purple/20 to-gold/20" />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {/* Circle node */}
              <div className="w-14 h-14 rounded-full bg-bg border-2 border-gold flex items-center justify-center mb-5 relative z-10">
                <span className="font-display text-lg text-gold font-medium">
                  {step.step}
                </span>
              </div>

              <h3 className="text-xs tracking-[3px] uppercase font-medium text-ivory mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed max-w-[200px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
