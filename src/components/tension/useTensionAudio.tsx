"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TensionTrack } from "@/lib/tension/types";

export function useTensionAudio(onBeforePlay: () => void) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlayingId(null);
    setProgress(0);
  }, []);

  const play = useCallback(
    (track: TensionTrack, seekRatio?: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (playingId === track.id) {
        if (typeof seekRatio === "number") {
          audio.currentTime = seekRatio * (audio.duration || track.durationSec);
        }
        if (audio.paused) {
          onBeforePlay();
          audio.play().catch(() => {});
        }
        return;
      }

      onBeforePlay();
      audio.pause();
      audio.src = track.audio;
      audio.load();
      setPlayingId(track.id);
      const start = () => {
        if (typeof seekRatio === "number") {
          audio.currentTime = seekRatio * (audio.duration || track.durationSec);
        }
        audio.play().catch(() => {});
      };
      audio.addEventListener("canplay", start, { once: true });
    },
    [onBeforePlay, playingId],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    const onEnd = () => {
      setPlayingId(null);
      setProgress(0);
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  return { audio: <audio ref={audioRef} preload="metadata" playsInline />, playingId, isPlaying, progress, play, stop };
}
