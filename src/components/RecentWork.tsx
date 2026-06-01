"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/lib/i18n";
import { useAudioPlayer } from "@/lib/audio/AudioPlayerContext";
import { musicLibrary } from "@/lib/music-data";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";

/**
 * Decorative waveform: gentle, animated bars. No live audio analysis
 * (the global player owns the single <audio> element and we deliberately
 * don't tap a MediaElementSource off it — that would prevent the music
 * page from sharing the same element). The animation subtly intensifies
 * when `playing` is true.
 */
function Waveform({ playing }: { playing: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const playingRef = useRef(playing);
  playingRef.current = playing;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const BARS = 64;
      const gap = 3;
      const barW = Math.max(1, (w - gap * (BARS - 1)) / BARS);
      const t = performance.now() / 1000;
      const intensity = playingRef.current ? 1 : 0.35;

      const mid = h / 2;
      for (let i = 0; i < BARS; i++) {
        const x = i / BARS;
        const env = Math.sin(x * Math.PI);
        const wobble = playingRef.current
          ? 0.18 + 0.55 * Math.abs(Math.sin(x * 9 + t * 3.2 + i * 0.07))
          : 0.12 + 0.08 * Math.sin(x * 6 + t * 0.8);
        const amp = Math.max(0.04, env * wobble);
        const barH = Math.max(2, amp * h * 0.92);
        const px = i * (barW + gap);
        const py = mid - barH / 2;

        const grad = ctx.createLinearGradient(0, py, 0, py + barH);
        grad.addColorStop(0, `rgba(212,175,55,${0.35 + 0.55 * intensity})`);
        grad.addColorStop(0.5, `rgba(212,175,55,${0.55 + 0.45 * intensity})`);
        grad.addColorStop(1, `rgba(139,92,246,${0.3 + 0.5 * intensity})`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        const r = Math.min(barW / 2, 2);
        ctx.roundRect(px, py, barW, barH, r);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// Crown of Odin is the recent-work showcase. Locate its index once at
// module load — fail loud (in dev) if it ever goes missing so we don't
// silently lose homepage playback.
const COO_ALBUM_INDEX = musicLibrary.findIndex(
  (a) => a.game === "Crown of Odin",
);

export default function RecentWork() {
  const { ref, isVisible } = useScrollReveal();
  const { locale } = useLocale();
  const { activeTrack, isPlaying, playTrack } = useAudioPlayer();

  const album = musicLibrary[COO_ALBUM_INDEX];

  // The track shown as "active" on this widget:
  //  - if the global player is currently on this album, mirror it
  //  - otherwise, keep the user's last-clicked selection (default 0)
  const [localIndex, setLocalIndex] = useState(0);
  const isOnThisAlbum = activeTrack?.albumIndex === COO_ALBUM_INDEX;
  const displayedIndex = isOnThisAlbum ? activeTrack!.trackIndex : localIndex;
  const isThisPlaying = isOnThisAlbum && isPlaying;

  const trackMeta = useMemo(
    () => ({
      title:
        locale === "zh"
          ? `${album.gameZh} — ${album.tracks[displayedIndex].title}`
          : `${album.game} — ${album.tracks[displayedIndex].title}`,
      albumLabel: locale === "zh" ? "老虎機 · 2026" : "Slot · 2026",
    }),
    [album, displayedIndex, locale],
  );

  function handleMainToggle() {
    playTrack(COO_ALBUM_INDEX, displayedIndex, { stopAtAlbumEnd: true });
  }

  function handleTrackPick(i: number) {
    setLocalIndex(i);
    playTrack(COO_ALBUM_INDEX, i, { stopAtAlbumEnd: true });
  }

  if (COO_ALBUM_INDEX < 0) return null; // safety: album somehow removed

  return (
    <section className="py-20 md:py-24 relative overflow-hidden" ref={ref}>
      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Section header — centered above the single player card */}
        <div className="text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <SectionTag>
              {locale === "zh" ? "最新作品" : "Recent Work"}
            </SectionTag>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4"
          >
            <SectionTitle>
              {locale === "zh" ? "聽得到的實力" : "Hear it. Feel it."}
            </SectionTitle>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-ivory/60 text-sm leading-relaxed max-w-xl mx-auto"
          >
            {locale === "zh"
              ? "近期代表作的配樂精華片段，感受我們為遊戲注入的聲音能量。"
              : "A taste of our recent work — BGM highlights from the latest titles. Hit play and feel the energy we bring to every game."}
          </motion.p>
        </div>

        {/* Audio player card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative rounded-2xl border border-ivory/10 bg-bg2/80 backdrop-blur-sm p-6 md:p-8 flex flex-col"
        >
          {/* Track meta */}
          <div className="mb-5">
            <p className="text-[10px] tracking-[3px] uppercase text-purple mb-2">
              {locale === "zh" ? "BGM 精華片段" : "BGM Highlight"}
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-ivory leading-tight">
              {trackMeta.title}
            </h3>
            <p className="text-sm text-ivory/50 mt-1">{trackMeta.albumLabel}</p>
          </div>

          {/* Decorative waveform */}
          <div className="min-h-[160px] md:min-h-[200px] rounded-xl bg-bg/60 border border-ivory/5 overflow-hidden mb-6">
            <Waveform playing={isThisPlaying} />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleMainToggle}
              aria-label={isThisPlaying ? "Pause" : "Play"}
              className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center hover:bg-gold/30 transition-colors cursor-pointer shrink-0"
            >
              {isThisPlaying ? (
                <Pause size={16} className="text-gold" />
              ) : (
                <Play size={16} className="text-gold ml-0.5" />
              )}
            </button>
            <div className="flex-1 flex gap-2">
              {album.tracks.map((tr, i) => {
                const active = i === displayedIndex;
                return (
                  <button
                    key={tr.file}
                    onClick={() => handleTrackPick(i)}
                    className={`flex-1 min-w-0 px-3 py-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer text-left truncate ${
                      active
                        ? "bg-gold/12 border-gold/35 text-gold"
                        : "bg-bg/40 border-ivory/10 text-ivory/55 hover:text-ivory hover:border-ivory/25"
                    }`}
                  >
                    {tr.title}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
