"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/lib/i18n";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import { recentWorkTracks, type RecentTrack } from "@/lib/recent-work-data";

/**
 * Live-reactive waveform canvas — draws real-time frequency data from the
 * connected AnalyserNode. Falls back to a static decorative waveform when
 * no analyser is available.
 */
function LiveWaveform({
  analyser,
  playing,
}: {
  analyser: AnalyserNode | null;
  playing: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

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

      let amplitudes: number[] = [];
      if (analyser && playing) {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        // Downsample to BARS using weighted segments across low/mid range
        const useable = Math.floor(data.length * 0.7);
        for (let i = 0; i < BARS; i++) {
          const start = Math.floor((i / BARS) * useable);
          const end = Math.floor(((i + 1) / BARS) * useable);
          let sum = 0;
          for (let j = start; j < end; j++) sum += data[j];
          const avg = sum / Math.max(1, end - start);
          amplitudes.push(avg / 255);
        }
      } else {
        // Static decorative wave when not playing
        const t = performance.now() / 1000;
        for (let i = 0; i < BARS; i++) {
          const x = i / BARS;
          const env = Math.sin(x * Math.PI);
          const y = env * (0.15 + 0.08 * Math.sin(x * 6 + t * 0.8));
          amplitudes.push(Math.max(0.04, y));
        }
      }

      const mid = h / 2;
      for (let i = 0; i < BARS; i++) {
        const amp = amplitudes[i];
        const barH = Math.max(2, amp * h * 0.92);
        const x = i * (barW + gap);
        const y = mid - barH / 2;

        // Gradient: gold in center, fading to purple at edges
        const grad = ctx.createLinearGradient(0, y, 0, y + barH);
        grad.addColorStop(0, playing ? "rgba(212,175,55,0.9)" : "rgba(212,175,55,0.35)");
        grad.addColorStop(0.5, playing ? "rgba(212,175,55,1)" : "rgba(212,175,55,0.55)");
        grad.addColorStop(1, playing ? "rgba(139,92,246,0.8)" : "rgba(139,92,246,0.3)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        const r = Math.min(barW / 2, 2);
        ctx.roundRect(x, y, barW, barH, r);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", setSize);
    };
  }, [analyser, playing]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

export default function RecentWork() {
  const { ref, isVisible } = useScrollReveal();
  const { locale } = useLocale();

  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [analyserReady, setAnalyserReady] = useState(false);

  const track: RecentTrack = recentWorkTracks[trackIndex];

  // Set up audio graph on first interaction (autoplay policies require gesture)
  const ensureAudioGraph = () => {
    if (audioCtxRef.current || !audioRef.current) return;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new Ctx();
      const source = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.75;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
      setAnalyserReady(true);
    } catch {
      // Not fatal — fall back to decorative waveform
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    ensureAudioGraph();
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  const switchTrack = (i: number) => {
    if (i === trackIndex) return;
    const audio = audioRef.current;
    if (!audio) return;

    // Init the analyser graph BEFORE we mess with src — calling
    // createMediaElementSource after we've started loading a different
    // src can fail on some browsers.
    ensureAudioGraph();
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }

    setTrackIndex(i);

    // Reliable iOS-safe pattern: pause → set src → load → wait for
    // canplay → play. Without this, switching mid-playback often
    // leaves the element in a half-loaded state until a page refresh.
    audio.pause();
    audio.src = recentWorkTracks[i].file;
    audio.load();

    const onCanPlay = () => {
      audio.removeEventListener("canplay", onCanPlay);
      audio.play().catch(() => {});
    };
    audio.addEventListener("canplay", onCanPlay);
  };

  // Set the initial src once on mount. We deliberately DO NOT bind
  // <audio src=...> in JSX — React would re-set the attribute on every
  // render and fight our imperative pause/load/play flow during track
  // switches, leaving the element half-loaded until a page refresh.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src) audio.src = recentWorkTracks[0].file;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

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
              {locale === "zh"
                ? "聽得到的實力"
                : "Hear it. Feel it."}
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
          <audio
            ref={audioRef}
            crossOrigin="anonymous"
            preload="auto"
            playsInline
          />

          {/* Track meta */}
          <div className="mb-5">
            <p className="text-[10px] tracking-[3px] uppercase text-purple mb-2">
              {locale === "zh" ? "BGM 精華片段" : "BGM Highlight"}
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-ivory leading-tight">
              {track.title[locale]}
            </h3>
            <p className="text-sm text-ivory/50 mt-1">
              {track.album[locale]}
            </p>
          </div>

          {/* Waveform canvas */}
          <div className="min-h-[160px] md:min-h-[200px] rounded-xl bg-bg/60 border border-ivory/5 overflow-hidden mb-6">
            <LiveWaveform
              analyser={analyserReady ? analyserRef.current : null}
              playing={playing}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center hover:bg-gold/30 transition-colors cursor-pointer shrink-0"
            >
              {playing ? (
                <Pause size={16} className="text-gold" />
              ) : (
                <Play size={16} className="text-gold ml-0.5" />
              )}
            </button>
            <div className="flex-1 flex gap-2">
              {recentWorkTracks.map((tr, i) => {
                const active = i === trackIndex;
                return (
                  <button
                    key={tr.file}
                    onClick={() => switchTrack(i)}
                    className={`flex-1 min-w-0 px-3 py-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer text-left truncate ${
                      active
                        ? "bg-gold/12 border-gold/35 text-gold"
                        : "bg-bg/40 border-ivory/10 text-ivory/55 hover:text-ivory hover:border-ivory/25"
                    }`}
                  >
                    {tr.shortLabel[locale]}
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
