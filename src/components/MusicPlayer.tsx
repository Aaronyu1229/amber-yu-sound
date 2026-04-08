"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronDown, ChevronUp, Volume2, VolumeX } from "lucide-react";
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

function TrackRow({
  track,
  isActive,
  isPlaying,
  onPlay,
  trackNumber,
}: {
  track: Track;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  trackNumber: number;
}) {
  return (
    <button
      onClick={onPlay}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer ${
        isActive
          ? "bg-gold/10 border border-gold/20"
          : "hover:bg-ivory/5 border border-transparent"
      }`}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
        {isActive && isPlaying ? (
          <Pause size={14} className="text-gold" />
        ) : isActive ? (
          <Play size={14} className="text-gold ml-0.5" />
        ) : (
          <span className="text-xs text-ivory/30">{trackNumber}</span>
        )}
      </div>
      <span
        className={`text-sm ${
          isActive ? "text-gold font-medium" : "text-ivory/70"
        }`}
      >
        {track.title}
      </span>
    </button>
  );
}

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
  const [expanded, setExpanded] = useState(isAlbumActive);

  useEffect(() => {
    if (isAlbumActive) setExpanded(true);
  }, [isAlbumActive]);

  const displayName = locale === "zh" ? album.gameZh : album.game;
  const categoryLabel =
    album.category === "brand"
      ? locale === "zh"
        ? "品牌主題"
        : "BRAND"
      : locale === "zh"
      ? "老虎機"
      : "SLOT";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
        isAlbumActive
          ? "bg-bg2 border-gold/20 shadow-lg shadow-gold/5"
          : "bg-bg2 border-ivory/5 hover:border-ivory/10"
      }`}
    >
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isAlbumActive
                ? "bg-gold/20 border border-gold/30"
                : "bg-ivory/5 border border-ivory/10"
            }`}
          >
            {isAlbumActive && isPlaying ? (
              <div className="flex items-end gap-[2px] h-4">
                <span className="w-[3px] bg-gold rounded-full animate-[waveform_0.6s_ease-in-out_infinite]" style={{ height: "60%" }} />
                <span className="w-[3px] bg-gold rounded-full animate-[waveform_0.6s_ease-in-out_infinite_0.15s]" style={{ height: "100%" }} />
                <span className="w-[3px] bg-gold rounded-full animate-[waveform_0.6s_ease-in-out_infinite_0.3s]" style={{ height: "40%" }} />
              </div>
            ) : (
              <Play
                size={14}
                className={isAlbumActive ? "text-gold ml-0.5" : "text-ivory/40 ml-0.5"}
              />
            )}
          </div>
          <div className="text-left">
            <h3
              className={`text-sm font-medium ${
                isAlbumActive ? "text-gold" : "text-ivory"
              }`}
            >
              {displayName}
            </h3>
            <p className="text-xs text-ivory/40 mt-0.5">
              {categoryLabel} · {album.tracks.length}{" "}
              {locale === "zh" ? "首" : "tracks"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {expanded ? (
            <ChevronUp size={16} className="text-ivory/30" />
          ) : (
            <ChevronDown size={16} className="text-ivory/30" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-1">
              {album.tracks.map((track, ti) => (
                <TrackRow
                  key={track.file}
                  track={track}
                  trackNumber={ti + 1}
                  isActive={
                    activeTrack?.albumIndex === albumIndex &&
                    activeTrack?.trackIndex === ti
                  }
                  isPlaying={
                    activeTrack?.albumIndex === albumIndex &&
                    activeTrack?.trackIndex === ti &&
                    isPlaying
                  }
                  onPlay={() => onPlayTrack(albumIndex, ti)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MusicPlayer() {
  const { locale } = useLocale();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeTrack, setActiveTrack] = useState<ActiveTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [filter, setFilter] = useState<"all" | "slot" | "brand">("all");

  const filtered = musicLibrary.filter(
    (a) => filter === "all" || a.category === filter
  );

  const currentAlbum = activeTrack ? musicLibrary[activeTrack.albumIndex] : null;
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
      setActiveTrack({ albumIndex, trackIndex });
      setIsPlaying(true);
      setCurrentTime(0);
    },
    [activeTrack, isPlaying]
  );

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("ended", () => {
      setActiveTrack((prev) => {
        if (!prev) return null;
        const album = musicLibrary[prev.albumIndex];
        if (prev.trackIndex < album.tracks.length - 1) {
          const next = { albumIndex: prev.albumIndex, trackIndex: prev.trackIndex + 1 };
          audio.src = album.tracks[next.trackIndex].file;
          audio.play();
          return next;
        }
        setIsPlaying(false);
        return prev;
      });
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = ratio * duration;
  };

  const slotCount = musicLibrary.filter((a) => a.category === "slot").length;
  const brandCount = musicLibrary.filter((a) => a.category === "brand").length;

  return (
    <div className="space-y-6">
      {/* Filter tabs */}
      <div className="flex gap-2">
        {(
          [
            { key: "all", label: locale === "zh" ? "全部" : "All", count: musicLibrary.length },
            { key: "slot", label: locale === "zh" ? "老虎機" : "Slots", count: slotCount },
            { key: "brand", label: locale === "zh" ? "品牌主題" : "Brand", count: brandCount },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`text-xs tracking-[1.5px] uppercase px-4 py-2 rounded-full border transition-colors cursor-pointer ${
              filter === tab.key
                ? "bg-gold/10 border-gold/30 text-gold"
                : "border-ivory/10 text-ivory/50 hover:text-ivory/70 hover:border-ivory/20"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Album list */}
      <div className="space-y-3">
        {filtered.map((album, i) => {
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
      </div>

      {/* Sticky bottom player bar */}
      <AnimatePresence>
        {currentTrackData && currentAlbum && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-bg2/95 backdrop-blur-xl border-t border-gold/20"
          >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
              {/* Play/pause */}
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
                className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center shrink-0 cursor-pointer hover:bg-gold/30 transition-colors"
              >
                {isPlaying ? (
                  <Pause size={16} className="text-gold" />
                ) : (
                  <Play size={16} className="text-gold ml-0.5" />
                )}
              </button>

              {/* Track info */}
              <div className="min-w-0 flex-1">
                <p className="text-sm text-ivory font-medium truncate">
                  {locale === "zh" ? currentAlbum.gameZh : currentAlbum.game}{" "}
                  <span className="text-ivory/40">—</span>{" "}
                  <span className="text-ivory/70">{currentTrackData.title}</span>
                </p>

                {/* Progress bar */}
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-ivory/40 w-10 text-right tabular-nums">
                    {formatTime(currentTime)}
                  </span>
                  <div
                    className="flex-1 h-1 bg-ivory/10 rounded-full cursor-pointer group"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-gold rounded-full relative transition-all"
                      style={{
                        width: duration ? `${(currentTime / duration) * 100}%` : "0%",
                      }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-xs text-ivory/40 w-10 tabular-nums">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Mute */}
              <button
                onClick={() => setMuted((m) => !m)}
                className="text-ivory/40 hover:text-ivory transition-colors cursor-pointer shrink-0"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
