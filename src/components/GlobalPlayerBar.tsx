"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Music,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useAudioPlayer } from "@/lib/audio/AudioPlayerContext";
import { useLocale } from "@/lib/i18n";
import { musicLibrary } from "@/lib/music-data";

function formatTime(sec: number): string {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Persistent mini-player rendered at the bottom of every page once a
 * track has been started. Click the track info area to navigate back
 * to /music for the full album browser.
 */
export default function GlobalPlayerBar() {
  const {
    activeTrack,
    isPlaying,
    currentTime,
    duration,
    muted,
    volume,
    togglePlay,
    playNext,
    playPrev,
    seek,
    setMuted,
    setVolume,
  } = useAudioPlayer();
  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [volumeOpen, setVolumeOpen] = useState(false);

  if (!activeTrack) return null;

  const album = musicLibrary[activeTrack.albumIndex];
  const track = album.tracks[activeTrack.trackIndex];
  const onMusicPage = pathname === "/music";

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    seek(ratio * duration);
  };

  const handleTrackClick = () => {
    if (!onMusicPage) router.push("/music");
  };

  return (
    <AnimatePresence>
      <motion.div
        key="global-player"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        {/* Gradient top edge */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="bg-bg2/95 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-4">
            {/* Album color dot — also a "back to /music" button when off-page */}
            <button
              onClick={handleTrackClick}
              aria-label={onMusicPage ? "Now playing" : "Back to Music page"}
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${album.gradient} flex items-center justify-center shrink-0 ${
                onMusicPage ? "" : "cursor-pointer hover:scale-105 transition-transform"
              }`}
            >
              <Music size={14} className="text-ivory/70" />
            </button>

            {/* Track info + progress */}
            <div className="min-w-0 flex-1">
              <button
                onClick={handleTrackClick}
                className={`text-sm text-ivory font-medium truncate text-left w-full ${
                  onMusicPage ? "cursor-default" : "cursor-pointer hover:text-gold transition-colors"
                }`}
              >
                {locale === "zh" ? album.gameZh : album.game}{" "}
                <span className="text-ivory/30">—</span>{" "}
                <span className="text-ivory/60">{track.title}</span>
              </button>

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
                aria-label="Previous track"
                className="w-8 h-8 flex items-center justify-center text-ivory/40 hover:text-ivory transition-colors cursor-pointer"
              >
                <SkipBack size={14} />
              </button>
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
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
                aria-label="Next track"
                className="w-8 h-8 flex items-center justify-center text-ivory/40 hover:text-ivory transition-colors cursor-pointer"
              >
                <SkipForward size={14} />
              </button>
            </div>

            {/* Volume control — click icon to mute, hover for slider */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setVolumeOpen(true)}
              onMouseLeave={() => setVolumeOpen(false)}
            >
              <button
                onClick={() => setMuted(!muted)}
                aria-label={muted ? "Unmute" : "Mute"}
                className="text-ivory/30 hover:text-ivory transition-colors cursor-pointer p-1"
              >
                {muted || volume === 0 ? (
                  <VolumeX size={16} />
                ) : (
                  <Volume2 size={16} />
                )}
              </button>
              {volumeOpen && (
                <div className="absolute right-0 bottom-full mb-2 bg-bg2 border border-ivory/10 rounded-lg p-3 shadow-xl">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={muted ? 0 : volume}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (muted && v > 0) setMuted(false);
                      setVolume(v);
                    }}
                    aria-label="Volume"
                    className="w-24 accent-gold cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
