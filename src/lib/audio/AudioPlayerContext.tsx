"use client";

/**
 * Global audio player.
 *
 * The single <audio> element lives inside the Provider, which is mounted
 * once at the app layout level. That means audio state and playback
 * survive page navigation — when the user starts a track on /music and
 * routes to /about, the music keeps playing seamlessly because nothing
 * unmounts.
 *
 * Both the /music page UI and the global mini-player consume this
 * context, so they stay in sync automatically.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { musicLibrary } from "@/lib/music-data";

export interface ActiveTrack {
  albumIndex: number;
  trackIndex: number;
}

interface AudioPlayerContextValue {
  activeTrack: ActiveTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  muted: boolean;
  volume: number; // 0–1
  playTrack: (albumIndex: number, trackIndex: number) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  seek: (time: number) => void;
  setMuted: (m: boolean) => void;
  setVolume: (v: number) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function useAudioPlayer(): AudioPlayerContextValue {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error(
      "useAudioPlayer must be used inside <AudioPlayerProvider>"
    );
  }
  return ctx;
}

export function AudioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeTrackRef = useRef<ActiveTrack | null>(null);

  const [activeTrack, setActiveTrack] = useState<ActiveTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMutedState] = useState(false);
  const [volume, setVolumeState] = useState(1);

  // Reliable iOS-safe play flow: pause → set src → load → wait for canplay → play.
  const loadAndPlay = useCallback(
    (albumIndex: number, trackIndex: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      const track = musicLibrary[albumIndex].tracks[trackIndex];

      const next = { albumIndex, trackIndex };
      activeTrackRef.current = next;
      setActiveTrack(next);
      setIsPlaying(true);
      setCurrentTime(0);

      audio.pause();
      audio.src = track.file;
      audio.load();

      const onCanPlay = () => {
        audio.removeEventListener("canplay", onCanPlay);
        audio.play().catch(() => {});
      };
      audio.addEventListener("canplay", onCanPlay);
    },
    []
  );

  const playTrack = useCallback(
    (albumIndex: number, trackIndex: number) => {
      const current = activeTrackRef.current;
      if (
        current &&
        current.albumIndex === albumIndex &&
        current.trackIndex === trackIndex
      ) {
        // Same track — toggle play/pause
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) {
          audio.play().catch(() => {});
        } else {
          audio.pause();
        }
        return;
      }
      loadAndPlay(albumIndex, trackIndex);
    },
    [loadAndPlay]
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !activeTrackRef.current) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  const playNext = useCallback(() => {
    const current = activeTrackRef.current;
    if (!current) return;
    const album = musicLibrary[current.albumIndex];
    if (current.trackIndex < album.tracks.length - 1) {
      loadAndPlay(current.albumIndex, current.trackIndex + 1);
    } else if (current.albumIndex < musicLibrary.length - 1) {
      loadAndPlay(current.albumIndex + 1, 0);
    }
  }, [loadAndPlay]);

  const playPrev = useCallback(() => {
    const current = activeTrackRef.current;
    if (!current) return;
    if (current.trackIndex > 0) {
      loadAndPlay(current.albumIndex, current.trackIndex - 1);
    } else if (current.albumIndex > 0) {
      const prevAlbum = musicLibrary[current.albumIndex - 1];
      loadAndPlay(current.albumIndex - 1, prevAlbum.tracks.length - 1);
    }
  }, [loadAndPlay]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
  }, []);

  const setMuted = useCallback((m: boolean) => {
    setMutedState(m);
    if (audioRef.current) audioRef.current.muted = m;
  }, []);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (audioRef.current) audioRef.current.volume = clamped;
  }, []);

  // One-time event wiring on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    // iOS Safari quirk: calling audio.play() with a fresh src synchronously
    // inside an `ended` handler is rejected. setTimeout(0) escapes the
    // event handler context.
    const onEnded = () => {
      const current = activeTrackRef.current;
      if (!current) return;
      const album = musicLibrary[current.albumIndex];
      let nextAlbum = current.albumIndex;
      let nextTrackIdx = current.trackIndex;
      if (current.trackIndex < album.tracks.length - 1) {
        nextTrackIdx = current.trackIndex + 1;
      } else if (current.albumIndex < musicLibrary.length - 1) {
        nextAlbum = current.albumIndex + 1;
        nextTrackIdx = 0;
      } else {
        setIsPlaying(false);
        return;
      }
      setTimeout(() => loadAndPlay(nextAlbum, nextTrackIdx), 0);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [loadAndPlay]);

  return (
    <AudioPlayerContext.Provider
      value={{
        activeTrack,
        isPlaying,
        currentTime,
        duration,
        muted,
        volume,
        playTrack,
        togglePlay,
        playNext,
        playPrev,
        seek,
        setMuted,
        setVolume,
      }}
    >
      {/* The single audio element — lives forever for this app session */}
      <audio ref={audioRef} preload="auto" playsInline />
      {children}
    </AudioPlayerContext.Provider>
  );
}
