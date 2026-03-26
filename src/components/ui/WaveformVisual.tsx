"use client";

import { useMemo } from "react";

// Pre-generate deterministic values to avoid hydration mismatch
function seededValues(count: number) {
  const bars = [];
  for (let i = 0; i < count; i++) {
    const seed = ((i * 7 + 13) % 100) / 100; // deterministic pseudo-random
    const seed2 = ((i * 11 + 3) % 100) / 100;
    bars.push({
      delay: (seed * 1.5).toFixed(2),
      duration: (0.8 + seed2 * 0.8).toFixed(2),
      height: 20 + seed * 60,
      isPurple: (i + 1) % 3 === 0,
    });
  }
  return bars;
}

export default function WaveformVisual() {
  const bars = useMemo(() => seededValues(60), []);

  return (
    <div className="relative bg-bg2 rounded-2xl p-8 flex items-center justify-center aspect-square md:aspect-auto md:h-full min-h-[320px]">
      <div className="flex items-end gap-[3px] h-40 w-full max-w-[320px]">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="flex-1 rounded-full min-w-[2px]"
            style={{
              backgroundColor: bar.isPurple
                ? "var(--purple)"
                : "var(--gold)",
              animation: `waveform ${bar.duration}s ease-in-out ${bar.delay}s infinite`,
              height: `${bar.height}%`,
            }}
          />
        ))}
      </div>
      {/* Play button overlay */}
      <button
        aria-label="Play audio"
        className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center hover:bg-gold/30 transition-colors cursor-pointer"
      >
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          className="ml-1"
        >
          <path d="M0 0L20 12L0 24V0Z" fill="var(--gold)" />
        </svg>
      </button>
    </div>
  );
}
