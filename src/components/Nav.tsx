"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLocale } from "@/lib/i18n";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, toggleLocale } = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-lg border-b border-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-xl md:text-2xl">
          <span className="text-gold font-semibold">Dolce</span>
          <span className="text-ivory/60 font-light mx-1.5">&</span>
          <span className="text-gold font-semibold">Forte</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {t.nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] tracking-[1.5px] uppercase transition-colors ${
                pathname === link.href
                  ? "text-gold"
                  : link.href === "/contact"
                  ? "text-gold hover:text-gold-light"
                  : "text-ivory/70 hover:text-ivory"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 text-xs tracking-[1.5px] uppercase border border-ivory/20 px-3 py-1.5 rounded-full text-ivory/60 hover:text-gold hover:border-gold/40 transition-colors cursor-pointer"
          >
            <Globe size={12} />
            {t.nav.langLabel}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-ivory"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg2/95 backdrop-blur-lg border-b border-gold/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {t.nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-xs tracking-[2px] uppercase ${
                    pathname === link.href
                      ? "text-gold"
                      : "text-ivory/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 text-xs tracking-[2px] uppercase text-ivory/60 mt-2 cursor-pointer"
              >
                <Globe size={12} />
                {t.nav.langLabel}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
