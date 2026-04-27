"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { musicLibrary, type GameAlbum } from "@/lib/music-data";
import {
  useAudioPlayer,
  type ActiveTrack,
} from "@/lib/audio/AudioPlayerContext";

/* ─── Abstract Waveform SVG ─── */
function Waveform({ seed, active }: { seed: number; active: boolean }) {
  const points = 48;
  const width = 200;
  const height = 40;
  const mid = height / 2;

  const path = Array.from({ length: points }, (_, i) => {
    const x = (i / (points - 1)) * width;
    const freq1 = 2 + (seed % 5);
    const freq2 = 4 + (seed % 3);
    const phase1 = (seed * 0.7) % (Math.PI * 2);
    const phase2 = (seed * 1.3) % (Math.PI * 2);
    const amp1 = 8 + (seed % 6);
    const amp2 = 4 + (seed % 4);
    const t = i / (points - 1);
    const env = Math.sin(t * Math.PI);
    const y =
      mid +
      env *
        (amp1 * Math.sin(freq1 * t * Math.PI * 2 + phase1) +
          amp2 * Math.sin(freq2 * t * Math.PI * 2 + phase2));
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <path
        d={path}
        fill="none"
        stroke={active ? "rgba(212,175,55,0.5)" : "rgba(245,241,231,0.12)"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={path}
        fill="none"
        stroke={active ? "rgba(212,175,55,0.2)" : "rgba(245,241,231,0.06)"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Album Showcase Card ─── */
function AlbumCard({
  album,
  albumIndex,
  activeTrack,
  isPlaying,
  onPlayTrack,
  locale,
}: {
  album: GameAlbum;
  albumIndex: number;
  activeTrack: ActiveTrack | null;
  isPlaying: boolean;
  onPlayTrack: (albumIndex: number, trackIndex: number) => void;
  locale: string;
}) {
  const isAlbumActive = activeTrack?.albumIndex === albumIndex;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isAlbumActive) setExpanded(true);
  }, [isAlbumActive]);

  const displayName = locale === "zh" ? album.gameZh : album.game;
  const categoryLabel =
    album.category === "brand"
      ? locale === "zh"
        ? "品牌"
        : "BRAND"
      : locale === "zh"
      ? "老虎機"
      : "SLOT";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${
        expanded ? "col-span-1 sm:col-span-2" : "col-span-1"
      } ${
        isAlbumActive
          ? "border-gold/30 shadow-lg shadow-gold/10"
          : "border-ivory/8 hover:border-ivory/15"
      }`}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${album.gradient} opacity-80`}
      />
      <div className="absolute inset-0 bg-bg/50" />

      {/* Decorative background waveform */}
      <div className="absolute bottom-0 left-0 right-0 h-12 opacity-30 pointer-events-none">
        <Waveform seed={albumIndex * 3 + 7} active={isAlbumActive} />
      </div>

      {/* Card content */}
      <div className="relative z-10">
        <button
          onClick={() => setExpanded((p) => !p)}
          className="w-full text-left p-5 cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <span className="text-[10px] tracking-[3px] uppercase text-ivory/40">
                {categoryLabel} · {album.tracks.length}{" "}
                {locale === "zh"
                  ? "首"
                  : album.tracks.length === 1
                  ? "track"
                  : "tracks"}
              </span>
              <h3
                className={`text-lg font-medium mt-1 truncate ${
                  isAlbumActive ? "text-gold" : "text-ivory"
                }`}
              >
                {displayName}
              </h3>
            </div>
            <div className="w-20 h-8 shrink-0 ml-3 opacity-80 group-hover:opacity-100 transition-opacity">
              <Waveform seed={albumIndex} active={isAlbumActive} />
            </div>
          </div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-1 border-t border-ivory/5 pt-3">
                {album.tracks.map((track, ti) => {
                  const isTrackActive =
                    activeTrack?.albumIndex === albumIndex &&
                    activeTrack?.trackIndex === ti;
                  const isTrackPlaying = isTrackActive && isPlaying;

                  return (
                    <button
                      key={track.file}
                      onClick={() => onPlayTrack(albumIndex, ti)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                        isTrackActive ? "bg-gold/10" : "hover:bg-ivory/5"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-ivory/5">
                        {isTrackPlaying ? (
                          <Pause size={12} className="text-gold" />
                        ) : isTrackActive ? (
                          <Play size={12} className="text-gold ml-0.5" />
                        ) : (
                          <Play size={12} className="text-ivory/30 ml-0.5" />
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          isTrackActive
                            ? "text-gold font-medium"
                            : "text-ivory/70"
                        }`}
                      >
                        {track.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Main Player ─── */
export default function MusicPlayer() {
  const { locale } = useLocale();
  const { activeTrack, isPlaying, playTrack } = useAudioPlayer();
  const [filter, setFilter] = useState<"all" | "slot" | "brand">("all");

  const filtered = musicLibrary.filter(
    (a) => filter === "all" || a.category === filter
  );

  const slotCount = musicLibrary.filter((a) => a.category === "slot").length;
  const brandCount = musicLibrary.filter((a) => a.category === "brand").length;

  return (
    <div className="space-y-8 pb-32">
      {/* Filter tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
        {(
          [
            {
              key: "all",
              label: locale === "zh" ? "全部" : "All",
              count: musicLibrary.length,
            },
            {
              key: "slot",
              label: locale === "zh" ? "老虎機" : "Slots",
              count: slotCount,
            },
            {
              key: "brand",
              label: locale === "zh" ? "品牌主題" : "Brand",
              count: brandCount,
            },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`text-[10px] tracking-[3px] uppercase px-4 py-2 rounded-full border transition-colors cursor-pointer ${
              filter === tab.key
                ? "bg-gold/15 border-gold/40 text-gold shadow-sm shadow-gold/10"
                : "border-ivory/10 text-ivory/40 hover:text-ivory/60 hover:border-ivory/20"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Album grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((album) => {
          const realIndex = musicLibrary.indexOf(album);
          return (
            <AlbumCard
              key={album.game}
              album={album}
              albumIndex={realIndex}
              activeTrack={activeTrack}
              isPlaying={isPlaying}
              onPlayTrack={playTrack}
              locale={locale}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
