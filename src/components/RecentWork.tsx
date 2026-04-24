"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Film } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/lib/i18n";
import SectionTag from "./ui/SectionTag";
import SectionTitle from "./ui/SectionTitle";
import {
  recentWorkTracks,
  recentWorkVideo,
  type RecentTrack,
} from "@/lib/recent-work-data";

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
  const { t, locale } = useLocale();

  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [analyserReady, setAnalyserReady] = useState(false);

  const track: RecentTrack = recentWorkTracks[trackIndex];
  const hasVideo = Boolean(recentWorkVideo.src);

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
    setTrackIndex(i);
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = recentWorkTracks[i].file;
    ensureAudioGraph();
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
    audio.play().catch(() => {});
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
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

  const playVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => setVideoPlaying(true))
      .catch(() => {});
  };

  return (
    <section className="py-20 md:py-24 relative overflow-hidden" ref={ref}>
      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
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
                  ? "看得到、也聽得到的實力"
                  : "See it. Hear it. Feel it."}
              </SectionTitle>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-ivory/60 text-sm max-w-sm leading-relaxed"
          >
            {locale === "zh"
              ? "近期代表作的主視覺與配樂精華片段，感受我們為遊戲注入的聲音能量。"
              : "A taste of our recent work — game visuals paired with BGM highlights. Hit play and feel the energy we bring to every title."}
          </motion.p>
        </div>

        {/* Main grid: video + player */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Video panel (3/5) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3 relative aspect-video rounded-2xl overflow-hidden border border-ivory/10 bg-gradient-to-br from-amber-950/40 via-bg2 to-purple-950/40"
          >
            {hasVideo ? (
              <>
                <video
                  ref={videoRef}
                  src={recentWorkVideo.src}
                  poster={recentWorkVideo.poster}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                  onEnded={() => setVideoPlaying(false)}
                  controls={videoPlaying}
                />
                {!videoPlaying && (
                  <button
                    onClick={playVideo}
                    className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                    aria-label="Play video"
                  >
                    <div className="absolute inset-0 bg-bg/40 group-hover:bg-bg/30 transition-colors" />
                    <div className="relative w-20 h-20 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center group-hover:bg-gold/25 group-hover:scale-105 transition-all">
                      <Play size={24} className="text-gold ml-1" />
                    </div>
                  </button>
                )}
                <div className="absolute top-4 left-4 text-[10px] tracking-[3px] uppercase bg-bg/70 backdrop-blur-sm px-3 py-1 rounded-full text-gold z-10">
                  {recentWorkVideo.label[locale]}
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                {/* Placeholder when video not yet available */}
                <div className="absolute inset-0 opacity-[0.08]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.25)_0%,transparent_60%)]" />
                </div>
                <div className="relative w-14 h-14 rounded-2xl bg-gold/10 border border-gold/25 flex items-center justify-center mb-5">
                  <Film size={22} className="text-gold" />
                </div>
                <p className="relative text-ivory font-medium text-base mb-1">
                  {locale === "zh"
                    ? "遊戲主視覺影片即將上線"
                    : "Game trailer coming soon"}
                </p>
                <p className="relative text-ivory/45 text-xs max-w-xs">
                  {locale === "zh"
                    ? "Winning Panel 表演影片客戶放行中。"
                    : "Winning Panel performance video awaiting client approval."}
                </p>
              </div>
            )}
          </motion.div>

          {/* Audio player panel (2/5) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 relative rounded-2xl border border-ivory/10 bg-bg2/80 backdrop-blur-sm p-6 md:p-7 flex flex-col"
          >
            <audio
              ref={audioRef}
              src={track.file}
              crossOrigin="anonymous"
              preload="auto"
              playsInline
            />

            {/* Track meta */}
            <div className="mb-4">
              <p className="text-[10px] tracking-[3px] uppercase text-purple mb-2">
                {locale === "zh" ? "BGM 精華片段" : "BGM Highlight"}
              </p>
              <h3 className="font-display text-2xl text-ivory leading-tight">
                {track.title[locale]}
              </h3>
              <p className="text-sm text-ivory/50 mt-1">
                {track.album[locale]}
              </p>
            </div>

            {/* Waveform canvas — grows to fill */}
            <div className="flex-1 min-h-[140px] md:min-h-[160px] rounded-xl bg-bg/60 border border-ivory/5 overflow-hidden mb-5">
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
      </div>
    </section>
  );
}
