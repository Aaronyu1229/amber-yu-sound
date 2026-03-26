"use client";

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SoundCloudIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 17V13" />
      <path d="M5 17V9" />
      <path d="M8 17V5" />
      <path d="M11 17V7" />
      <path d="M14 17V3" />
      <path d="M17 17V9" />
      <path d="M20 17V13" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-ivory/5 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#" className="font-display text-lg">
          <span className="text-gold font-semibold">AMBER YU</span>{" "}
          <span className="text-ivory font-light">Sound</span>
        </a>

        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Amber Yu Sound. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a href="#" aria-label="LinkedIn" className="text-muted hover:text-gold transition-colors">
            <LinkedInIcon />
          </a>
          <a href="#" aria-label="SoundCloud" className="text-muted hover:text-gold transition-colors">
            <SoundCloudIcon />
          </a>
          <a href="#" aria-label="YouTube" className="text-muted hover:text-gold transition-colors">
            <YouTubeIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
