"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { rank } from "@/lib/tension/rank";
import type { TensionTarget, TensionTrack } from "@/lib/tension/types";
import { useLocale } from "@/lib/i18n";
import styles from "./tension.module.css";

type Preset = TensionTarget & { moment: string; kind?: "Music" };

const AXES = [
  { key: "tension", deg: -90 },
  { key: "excitement", deg: 30 },
  { key: "winImpact", deg: 150 },
] as const;
const CENTER = { x: 200, y: 196 };
const INNER_RADIUS = 26;
const RADIUS = 136;

function point(deg: number, value: number) {
  const radians = (deg * Math.PI) / 180;
  const distance = INNER_RADIUS + (value / 10) * RADIUS;
  return { x: CENTER.x + Math.cos(radians) * distance, y: CENTER.y + Math.sin(radians) * distance };
}

export default function TensionHero({
  tracks,
  playingId,
  isPlaying,
  onPlay,
  onOpenDemo,
}: {
  tracks: TensionTrack[];
  playingId: string | null;
  isPlaying: boolean;
  onPlay: (track: TensionTrack) => void;
  onOpenDemo: (target: TensionTarget, preset: Preset | null) => void;
}) {
  const { t } = useLocale();
  const presets = useMemo<Preset[]>(
    () => [
      { label: t.pages.tension.demo.presets[0], moment: "Winning Panel", tension: 3, excitement: 9, winImpact: 8 },
      { label: t.pages.tension.demo.presets[1], moment: "Near Win", tension: 8, excitement: 8, winImpact: 5 },
      { label: t.pages.tension.demo.presets[2], moment: "Scatter", tension: 6, excitement: 6, winImpact: 4 },
      { label: t.pages.tension.demo.presets[3], moment: "Free Spins", kind: "Music", tension: 7, excitement: 7, winImpact: 6 },
    ],
    [t.pages.tension.demo.presets],
  ) as (Preset & { label: string })[];
  const [target, setTarget] = useState<TensionTarget>(presets[0]);
  const [presetIndex, setPresetIndex] = useState(0);
  const [userTouched, setUserTouched] = useState(false);
  const pickerRef = useRef<SVGSVGElement>(null);
  const activePreset = userTouched ? null : presets[presetIndex];
  const bestTrack = useMemo(() => {
    const pool = activePreset ? tracks.filter((track) => track.moment === activePreset.moment) : tracks;
    return rank(pool, target)[0];
  }, [activePreset, target, tracks]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (userTouched || media.matches || (bestTrack?.id === playingId && isPlaying)) return;
    const timer = window.setInterval(() => {
      setPresetIndex((index) => {
        const next = (index + 1) % presets.length;
        setTarget(presets[next]);
        return next;
      });
    }, 3600);
    return () => window.clearInterval(timer);
  }, [bestTrack?.id, isPlaying, playingId, presets, userTouched]);

  const takeOver = () => setUserTouched(true);
  const valueAt = (event: React.PointerEvent<SVGCircleElement>, axis: (typeof AXES)[number]) => {
    const box = pickerRef.current?.getBoundingClientRect();
    if (!box) return;
    const scale = 400 / box.width;
    const x = (event.clientX - box.left) * scale - CENTER.x;
    const y = (event.clientY - box.top) * scale - CENTER.y;
    const radians = (axis.deg * Math.PI) / 180;
    const value = ((x * Math.cos(radians) + y * Math.sin(radians) - INNER_RADIUS) / RADIUS) * 10;
    setTarget((current) => ({ ...current, [axis.key]: Math.max(0, Math.min(10, value)) }));
  };
  const updateFromKey = (event: React.KeyboardEvent<SVGCircleElement>, key: keyof TensionTarget) => {
    const change = event.key === "Home" ? -10 : event.key === "End" ? 10 : ["ArrowUp", "ArrowRight"].includes(event.key) ? 1 : ["ArrowDown", "ArrowLeft"].includes(event.key) ? -1 : null;
    if (change === null) return;
    event.preventDefault();
    takeOver();
    setTarget((current) => ({ ...current, [key]: Math.max(0, Math.min(10, Math.round(current[key]) + change)) }));
  };
  const title = bestTrack ? `${bestTrack.name} — ${bestTrack.label || bestTrack.moment}` : "";
  const path = AXES.map((axis) => {
    const position = point(axis.deg, target[axis.key]);
    return `${position.x.toFixed(1)},${position.y.toFixed(1)}`;
  }).join(" ");

  return (
    <section className={styles.hero}>
      <div className={`${styles.glow} ${styles.heroGlowPurple}`} aria-hidden="true" />
      <div className={`${styles.glow} ${styles.heroGlowGold}`} aria-hidden="true" />
      <div className={styles.wrap}>
        <div className={styles.heroGrid}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={styles.heroHead}>
            <p className={styles.eyebrow}>/ {t.pages.tension.hero.crumb}</p>
            <h1 className={styles.h1}>{t.pages.tension.hero.title} <em>{t.pages.tension.hero.titleHighlight}</em></h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={styles.heroBody}>
            <p className={styles.lead}>{t.pages.tension.hero.description}</p>
            <div className={styles.heroActions}>
              <a href="#demo" className={`${styles.button} ${styles.buttonGold}`}>{t.pages.tension.hero.tryDemo}</a>
              <a href="#access" className={`${styles.button} ${styles.buttonLine}`}>{t.pages.tension.hero.earlyAccess}</a>
            </div>
            <p className={styles.status}><span />{t.pages.tension.hero.status.replace("32", String(tracks.length))}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }} className={styles.heroArt}>
            <svg ref={pickerRef} className={styles.picker} viewBox="0 -34 400 418" aria-label={t.pages.tension.hero.dragHint}>
              <defs><linearGradient id="tension-gradient" x1="0" x2="1"><stop offset="0" stopColor="#8B7DB8" /><stop offset="1" stopColor="#C9A55C" /></linearGradient><radialGradient id="tension-fill"><stop offset="0" stopColor="rgba(201,165,92,.22)" /><stop offset="1" stopColor="rgba(139,125,184,.06)" /></radialGradient></defs>
              {[0, 5, 10].map((value) => <circle key={value} className={styles.pickerRing} cx={CENTER.x} cy={CENTER.y} r={INNER_RADIUS + (value / 10) * RADIUS} />)}
              {AXES.map((axis, index) => {
                const end = point(axis.deg, 10.6);
                const label = point(axis.deg, 12.4);
                const position = point(axis.deg, target[axis.key]);
                const text = t.pages.tension.demo.sliders[axis.key].label;
                const anchor = axis.deg === -90 ? "middle" : axis.deg === 30 ? "end" : "start";
                const lx = axis.deg === -90 ? label.x : axis.deg === 30 ? Math.min(label.x + 30, 398) : Math.max(label.x - 30, 2);
                const ly = axis.deg === -90 ? label.y - 4 : label.y + 34;
                return <g key={axis.key}><line className={styles.pickerSpoke} x1={CENTER.x} y1={CENTER.y} x2={end.x} y2={end.y} /><text className={styles.pickerLabel} x={lx} y={ly} textAnchor={anchor}>{text.toUpperCase()}</text><text className={styles.pickerValue} x={lx} y={ly - 19} textAnchor={anchor}>{Math.round(target[axis.key])}</text><circle className={styles.pickerHit} cx={position.x} cy={position.y} r="24" tabIndex={0} role="slider" aria-label={text} aria-valuemin={0} aria-valuemax={10} aria-valuenow={Math.round(target[axis.key])} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); takeOver(); valueAt(event, axis); }} onPointerMove={(event) => event.currentTarget.hasPointerCapture(event.pointerId) && valueAt(event, axis)} onKeyDown={(event) => updateFromKey(event, axis.key)} /><circle className={styles.pickerKnob} cx={position.x} cy={position.y} r="7" /></g>;
              })}
              <polygon className={styles.pickerShape} points={path} />
            </svg>
            <div className={styles.matchCard} aria-live={userTouched ? "polite" : "off"}>
              <div className={styles.matchTop}><span>{activePreset ? `${t.pages.tension.hero.example} · ${activePreset.label}` : t.pages.tension.hero.yourFeeling}</span><span>{userTouched ? t.pages.tension.hero.bestMatch : t.pages.tension.hero.dragHint}</span></div>
              {bestTrack && <div className={styles.matchRow}><button type="button" className={`${styles.playButton} ${bestTrack.id === playingId && isPlaying ? styles.playing : ""}`} aria-label={`${bestTrack.id === playingId && isPlaying ? t.pages.tension.demo.pause : t.pages.tension.demo.play} ${title}`} onClick={() => onPlay(bestTrack)}>{bestTrack.id === playingId && isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}</button><div className={styles.trackText}><div className={styles.trackTitle}>{title}</div><div className={styles.trackMeta}>{[bestTrack.moment, bestTrack.character, bestTrack.kind === "Music" ? t.pages.tension.demo.music : bestTrack.sfxType || t.pages.tension.demo.sfx].join(" · ")}</div></div><span className={styles.fit}>{bestTrack.fit}% {t.pages.tension.demo.fit}</span></div>}
              <button type="button" className={styles.matchGo} onClick={() => onOpenDemo({ tension: Math.round(target.tension), excitement: Math.round(target.excitement), winImpact: Math.round(target.winImpact) }, activePreset)}>{t.pages.tension.hero.openDemo}</button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
