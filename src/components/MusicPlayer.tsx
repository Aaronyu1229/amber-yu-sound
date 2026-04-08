"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Music,
  Volume2,
  VolumeX,
  X,
  SkipForward,
  SkipBack,
} from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { musicLibrary, type Track, type GameAlbum } from "@/lib/music-data";

function formatTime(sec: number): string {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface ActiveTrack {
  albumIndex: number;
  trackIndex: number;
}

/* ─── Abstract Waveform SVG ─── */
function Waveform({ seed, active }: { seed: number; active: boolean }) {
  // Generate a unique waveform path from seed
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
    // Envelope: fade in/out at edges
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
      {/* Mirror line for thickness */}
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
        expanded
          ? "col-span-1 sm:col-span-2"
          : "col-span-1"
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
        {/* Card header - clickable */}
        <button
          onClick={() => setExpanded((p) => !p)}
          className="w-full text-left p-5 cursor-pointer group"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <span className="text-[10px] tracking-[3px] uppercase text-ivory/40">
                {categoryLabel} · {album.tracks.length}{" "}
                {locale === "zh" ? "首" : album.tracks.length === 1 ? "track" : "tracks"}
              </span>
              <h3
                className={`text-lg font-medium mt-1 truncate ${
                  isAlbumActive ? "text-gold" : "text-ivory"
                }`}
              >
                {displayName}
              </h3>
            </div>

            {/* Waveform identity */}
            <div className="w-20 h-8 shrink-0 ml-3 opacity-80 group-hover:opacity-100 transition-opacity">
              <Waveform seed={albumIndex} active={isAlbumActive} />
            </div>
          </div>
        </button>

        {/* Expanded track list */}
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
                        isTrackActive
                          ? "bg-gold/10"
                          : "hover:bg-ivory/5"
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeTrack, setActiveTrack] = useState<ActiveTrack | null>(null);
  const activeTrackRef = useRef<ActiveTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [filter, setFilter] = useState<"all" | "slot" | "brand">("all");

  const filtered = musicLibrary.filter(
    (a) => filter === "all" || a.category === filter
  );

  const currentAlbum = activeTrack
    ? musicLibrary[activeTrack.albumIndex]
    : null;
  const currentTrackData = activeTrack
    ? musicLibrary[activeTrack.albumIndex].tracks[activeTrack.trackIndex]
    : null;

  const playTrack = useCallback(
    (albumIndex: number, trackIndex: number) => {
      if (
        activeTrack?.albumIndex === albumIndex &&
        activeTrack?.trackIndex === trackIndex
      ) {
        if (isPlaying) {
          audioRef.current?.pause();
          setIsPlaying(false);
        } else {
          audioRef.current?.play();
          setIsPlaying(true);
        }
        return;
      }

      const track = musicLibrary[albumIndex].tracks[trackIndex];
      if (audioRef.current) {
        audioRef.current.src = track.file;
        audioRef.current.play();
      }
      const next = { albumIndex, trackIndex };
      activeTrackRef.current = next;
      setActiveTrack(next);
      setIsPlaying(true);
      setCurrentTime(0);
    },
    [activeTrack, isPlaying]
  );

  const playNext = useCallback(() => {
    if (!activeTrack) return;
    const album = musicLibrary[activeTrack.albumIndex];
    if (activeTrack.trackIndex < album.tracks.length - 1) {
      playTrack(activeTrack.albumIndex, activeTrack.trackIndex + 1);
    } else if (activeTrack.albumIndex < musicLibrary.length - 1) {
      playTrack(activeTrack.albumIndex + 1, 0);
    }
  }, [activeTrack, playTrack]);

  const playPrev = useCallback(() => {
    if (!activeTrack) return;
    if (activeTrack.trackIndex > 0) {
      playTrack(activeTrack.albumIndex, activeTrack.trackIndex - 1);
    } else if (activeTrack.albumIndex > 0) {
      const prevAlbum = musicLibrary[activeTrack.albumIndex - 1];
      playTrack(activeTrack.albumIndex - 1, prevAlbum.tracks.length - 1);
    }
  }, [activeTrack, playTrack]);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener("timeupdate", () =>
      setCurrentTime(audio.currentTime)
    );
    audio.addEventListener("loadedmetadata", () =>
      setDuration(audio.duration)
    );

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Separate effect for ended handler — re-binds when activeTrack changes
  // so the closure always has the latest track position
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (!activeTrack) return;
      const album = musicLibrary[activeTrack.albumIndex];

      let nextAlbum = activeTrack.albumIndex;
      let nextTrackIdx = activeTrack.trackIndex;

      if (activeTrack.trackIndex < album.tracks.length - 1) {
        nextTrackIdx = activeTrack.trackIndex + 1;
      } else if (activeTrack.albumIndex < musicLibrary.length - 1) {
        nextAlbum = activeTrack.albumIndex + 1;
        nextTrackIdx = 0;
      } else {
        setIsPlaying(false);
        return;
      }

      const next = { albumIndex: nextAlbum, trackIndex: nextTrackIdx };
      const nextTrack = musicLibrary[next.albumIndex].tracks[next.trackIndex];
      activeTrackRef.current = next;
      setActiveTrack(next);
      audio.src = nextTrack.file;
      audio.play().catch(() => {});
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [activeTrack]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    audioRef.current.currentTime = ratio * duration;
  };

  const slotCount = musicLibrary.filter((a) => a.category === "slot").length;
  const brandCount = musicLibrary.filter((a) => a.category === "brand").length;

  return (
    <div className="space-y-8">
      {/* Filter tabs - centered */}
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
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
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

      {/* Sticky bottom player bar */}
      <AnimatePresence>
        {currentTrackData && currentAlbum && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            {/* Gradient top edge */}
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="bg-bg2/95 backdrop-blur-xl">
              <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-4">
                {/* Album color dot */}
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentAlbum.gradient} flex items-center justify-center shrink-0`}
                >
                  <Music size={14} className="text-ivory/70" />
                </div>

                {/* Track info + progress */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-ivory font-medium truncate">
                    {locale === "zh"
                      ? currentAlbum.gameZh
                      : currentAlbum.game}{" "}
                    <span className="text-ivory/30">—</span>{" "}
                    <span className="text-ivory/60">
                      {currentTrackData.title}
                    </span>
                  </p>

                  {/* Progress bar */}
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-ivory/30 w-8 text-right tabular-nums">
                      {formatTime(currentTime)}
                    </span>
                    <div
                      className="flex-1 h-1 bg-ivory/8 rounded-full cursor-pointer group"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-full bg-gold/70 rounded-full relative transition-all"
                        style={{
                          width: duration
                            ? `${(currentTime / duration) * 100}%`
                            : "0%",
                        }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-[10px] text-ivory/30 w-8 tabular-nums">
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={playPrev}
                    className="w-8 h-8 flex items-center justify-center text-ivory/40 hover:text-ivory transition-colors cursor-pointer"
                  >
                    <SkipBack size={14} />
                  </button>
                  <button
                    onClick={() => {
                      if (isPlaying) {
                        audioRef.current?.pause();
                        setIsPlaying(false);
                      } else {
                        audioRef.current?.play();
                        setIsPlaying(true);
                      }
                    }}
                    className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center cursor-pointer hover:bg-gold/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause size={14} className="text-gold" />
                    ) : (
                      <Play size={14} className="text-gold ml-0.5" />
                    )}
                  </button>
                  <button
                    onClick={playNext}
                    className="w-8 h-8 flex items-center justify-center text-ivory/40 hover:text-ivory transition-colors cursor-pointer"
                  >
                    <SkipForward size={14} />
                  </button>
                </div>

                {/* Mute */}
                <button
                  onClick={() => setMuted((m) => !m)}
                  className="text-ivory/30 hover:text-ivory transition-colors cursor-pointer shrink-0"
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
