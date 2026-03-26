"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionTitle from "./ui/SectionTitle";
import Button from "./ui/Button";

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Left — info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <SectionTitle>
            {"Let's make your game sound incredible"}
          </SectionTitle>
          <p className="text-ivory/60 leading-relaxed">
            Whether you&apos;re developing a new slot title or refreshing an
            existing game&apos;s audio, I&apos;d love to hear about your project.
            Reach out and let&apos;s create something players will remember.
          </p>

          <div className="flex flex-col gap-4 pt-4">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gold" />
              <span className="text-sm text-ivory/80">
                hello@amberyusound.com
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-gold" />
              <span className="text-sm text-ivory/80">
                Taipei, Taiwan — Available worldwide
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <form
            className="bg-bg2 rounded-2xl p-8 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] tracking-[2px] uppercase text-muted block mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[2px] uppercase text-muted block mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors"
                  placeholder="Studio name"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] tracking-[2px] uppercase text-muted block mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors"
                placeholder="you@studio.com"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-[2px] uppercase text-muted block mb-2">
                Platform
              </label>
              <select className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory focus:border-gold focus:outline-none transition-colors appearance-none">
                <option value="">Select platform</option>
                <option value="mobile">Mobile</option>
                <option value="web">Web-based</option>
                <option value="land">Land-based</option>
                <option value="multi">Multi-platform</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] tracking-[2px] uppercase text-muted block mb-2">
                Project Details
              </label>
              <textarea
                rows={4}
                className="w-full bg-bg border border-ivory/10 rounded-lg px-4 py-3 text-sm text-ivory placeholder:text-muted/50 focus:border-gold focus:outline-none transition-colors resize-none"
                placeholder="Tell me about your game and audio needs..."
              />
            </div>

            <Button variant="primary" type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
