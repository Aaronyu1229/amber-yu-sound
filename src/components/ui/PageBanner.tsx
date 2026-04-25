"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PageBannerProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export default function PageBanner({ title, subtitle, backgroundImage }: PageBannerProps) {
  return (
    <section className="relative pt-24 pb-8 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover opacity-15"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/80 to-bg" />
        </div>
      )}

      {/* Fallback accents when no image */}
      {!backgroundImage && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[120px]" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[3px] uppercase text-purple mb-4"
        >
          / {title}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-ivory leading-tight max-w-3xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-ivory/50 mt-3 md:mt-4 max-w-xl text-sm md:text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
