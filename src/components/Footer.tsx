"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SoundCloudIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 17V13" /><path d="M5 17V9" /><path d="M8 17V5" /><path d="M11 17V7" /><path d="M14 17V3" /><path d="M17 17V9" /><path d="M20 17V13" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-ivory/5 bg-bg2">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Column 1: Services */}
          <div>
            <h3 className="text-xs tracking-[3px] uppercase text-gold font-medium mb-6">
              {t.footer.services}
            </h3>
            <ul className="space-y-3">
              {t.footer.serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-xs tracking-[3px] uppercase text-gold font-medium mb-6">
              {t.footer.company}
            </h3>
            <ul className="space-y-3">
              {t.footer.companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-xs tracking-[3px] uppercase text-gold font-medium mb-6">
              {t.footer.support}
            </h3>
            <ul className="space-y-3">
              {t.footer.supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Brand + Social */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-end gap-6 pt-6 md:pt-0 border-t border-ivory/5 md:border-0">
            <Link href="/" className="font-display text-xl">
              <span className="text-gold font-semibold">AMBER YU</span>{" "}
              <span className="text-ivory font-light">Studio</span>
            </Link>

            <div className="flex items-center gap-4">
              <a href="#" aria-label="LinkedIn" className="text-ivory/30 hover:text-gold transition-colors">
                <LinkedInIcon />
              </a>
              <a href="#" aria-label="YouTube" className="text-ivory/30 hover:text-gold transition-colors">
                <YouTubeIcon />
              </a>
              <a href="#" aria-label="SoundCloud" className="text-ivory/30 hover:text-gold transition-colors">
                <SoundCloudIcon />
              </a>
              <a href="#" aria-label="Instagram" className="text-ivory/30 hover:text-gold transition-colors">
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-muted tracking-wider">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p className="text-[11px] text-muted/50 tracking-wider">
            Taipei, Taiwan — Available Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
