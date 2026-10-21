"use client";

import { useEffect, useMemo, useState } from "react";
import { Info, Pause, Play } from "lucide-react";
import { rank } from "@/lib/tension/rank";
import type { RankedTensionTrack, TensionFilters, TensionTarget, TensionTrack } from "@/lib/tension/types";
import { useLocale } from "@/lib/i18n";
import styles from "./tension.module.css";

type SearchState = TensionTarget & TensionFilters & { showAll: boolean; open: string | null };
type HeroRequest = { target: TensionTarget; moment?: string; kind?: "Music"; token: number } | null;

const moments = ["Scatter", "Near Win", "Free Spins", "Winning Panel"];
const functions = ["Basic", "Foley", "Musical"];

function duration(seconds: number) {
  const rounded = Math.round(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}

function Waveform({ track, progress, onSeek }: { track: TensionTrack; progress: number; onSeek: (ratio: number) => void }) {
  const { t } = useLocale();
  return <button type="button" className={styles.waveform} aria-label={`${t.pages.tension.demo.seek} ${track.name}`} onClick={(event) => { const box = event.currentTarget.getBoundingClientRect(); onSeek((event.clientX - box.left) / box.width); }}><svg viewBox={`0 0 ${track.peaks.length * 4} 30`} preserveAspectRatio="none" aria-hidden="true"><g className={styles.waveMuted}>{track.peaks.map((peak, index) => { const height = Math.max(1.5, peak * 28); return <rect key={index} x={index * 4 + 0.6} y={(30 - height) / 2} width="2.4" height={height} rx="1" />; })}</g><g className={styles.waveActive} style={{ clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)` }}>{track.peaks.map((peak, index) => { const height = Math.max(1.5, peak * 28); return <rect key={index} x={index * 4 + 0.6} y={(30 - height) / 2} width="2.4" height={height} rx="1" />; })}</g></svg></button>;
}

function TrackDimensions({ track }: { track: TensionTrack }) {
  const { t } = useLocale();
  return <div className={styles.dimensions}>
    {track.dimensions.map((axis) => <div key={axis.axis}><h4>{axis.axis}</h4>{axis.items.map((item) => <div className={`${styles.dimension} ${item.slider ? styles.sliderDimension : ""}`} key={item.key}><span>{item.label}{item.measured ? " *" : ""}</span>{item.text ? <b className={styles.dimensionText}>{item.text}</b> : <><i><i style={{ width: `${(item.value || 0) * 10}%` }} /></i><b>{item.value?.toFixed(1)}</b></>}</div>)}</div>)}
    <p className={styles.dimensionsNote}>{t.pages.tension.demo.dimensionsNote.replace("{count}", String(track.raters)).replace("{plural}", track.raters > 1 ? "s" : "")}</p>
  </div>;
}

export default function TensionDemo({
  tracks,
  heroRequest,
  playingId,
  isPlaying,
  progress,
  onPlay,
}: {
  tracks: TensionTrack[];
  heroRequest: HeroRequest;
  playingId: string | null;
  isPlaying: boolean;
  progress: number;
  onPlay: (track: TensionTrack, seekRatio?: number) => void;
}) {
  const { t } = useLocale();
  const [state, setState] = useState<SearchState>({ tension: 5, excitement: 5, winImpact: 5, moment: null, kind: null, sfxType: null, showAll: false, open: null });
  const [refineOpen, setRefineOpen] = useState(false);
  const ranked = useMemo(() => rank(tracks, state, state), [state, tracks]);
  const shown = state.showAll ? ranked : ranked.slice(0, 6);

  useEffect(() => {
    if (!heroRequest) return;
    setState({ ...heroRequest.target, moment: heroRequest.moment || null, kind: heroRequest.kind || null, sfxType: null, showAll: false, open: null });
  }, [heroRequest]);

  const levels = (value: number) => value < 3.5 ? t.pages.tension.demo.low : value < 6.5 ? t.pages.tension.demo.mid : t.pages.tension.demo.high;
  const query = [state.moment || t.pages.tension.demo.allMoments, state.kind, state.sfxType, `${levels(state.tension)} ${t.pages.tension.demo.sliders.tension.label}`, `${levels(state.excitement)} ${t.pages.tension.demo.sliders.excitement.label}`, `${levels(state.winImpact)} ${t.pages.tension.demo.sliders.winImpact.label}`].filter(Boolean).join(" · ");
  const update = (next: Partial<SearchState>) => setState((current) => ({ ...current, ...next }));
  const presets = [
    { moment: "Winning Panel", tension: 3, excitement: 9, winImpact: 8 },
    { moment: "Near Win", tension: 8, excitement: 8, winImpact: 5 },
    { moment: "Scatter", tension: 6, excitement: 6, winImpact: 4 },
    { moment: "Free Spins", kind: "Music" as const, tension: 7, excitement: 7, winImpact: 6 },
  ];
  const sliders = [
    { key: "tension" as const, ...t.pages.tension.demo.sliders.tension, color: "#8B7DB8" },
    { key: "excitement" as const, ...t.pages.tension.demo.sliders.excitement, color: "#C9A55C" },
    { key: "winImpact" as const, ...t.pages.tension.demo.sliders.winImpact, color: "#C9A55C" },
  ];

  return <section id="demo" className={styles.demo}>
    <div className={styles.wrap}>
      <div className={styles.demoHead}><div><span className={styles.tag}>{t.pages.tension.demo.tag}</span><h2 className={styles.h2}>{t.pages.tension.demo.title} <em>{t.pages.tension.demo.titleHighlight}</em></h2></div><span className={styles.demoBadge}>{t.pages.tension.demo.library.replace("{count}", String(tracks.length))}</span></div>
      <div className={styles.app}>
        <div className={styles.appBar}><i /><i /><i /><b>Tension</b> · {t.pages.tension.demo.librarySearch}</div>
        <div className={styles.appBody}>
          <aside className={styles.controls}>
            <div className={styles.presets}><h3>{t.pages.tension.demo.quickStart}<button type="button" onClick={() => setState({ tension: 5, excitement: 5, winImpact: 5, moment: null, kind: null, sfxType: null, showAll: false, open: null })}>{t.pages.tension.demo.reset}</button></h3><div>{presets.map((preset, index) => <button className={styles.chip} type="button" key={t.pages.tension.demo.presets[index]} onClick={() => setState({ ...preset, sfxType: null, showAll: false, open: null })}>{t.pages.tension.demo.presets[index]}</button>)}</div></div>
            <button type="button" className={styles.refine} aria-expanded={refineOpen} onClick={() => setRefineOpen((open) => !open)}>{t.pages.tension.demo.refine}</button>
            <div className={`${styles.controlMore} ${refineOpen ? styles.controlMoreOpen : ""}`}>
              <div><h3>{t.pages.tension.demo.lookingFor}</h3><div className={styles.segment}>{(["Music", "SFX"] as const).map((kind) => <button type="button" aria-pressed={state.kind === kind} className={state.kind === kind ? styles.active : ""} key={kind} onClick={() => update({ kind: state.kind === kind ? null : kind, sfxType: kind === "Music" ? null : state.sfxType, showAll: false })}>{kind === "Music" ? t.pages.tension.demo.music : t.pages.tension.demo.sfx}</button>)}</div></div>
              <div>{sliders.map((slider) => <div className={styles.slider} key={slider.key}><label htmlFor={`tension-${slider.key}`}><span>{slider.label}</span><output>{state[slider.key]}</output></label><small>{slider.hint}</small><input id={`tension-${slider.key}`} type="range" min="0" max="10" step="1" value={state[slider.key]} style={{ "--track-color": slider.color, "--track-progress": `${state[slider.key] * 10}%` } as React.CSSProperties} onChange={(event) => update({ [slider.key]: Number(event.target.value) })} /></div>)}</div>
              <div><h3>{t.pages.tension.demo.gameMoment}</h3><div className={styles.chips}>{moments.map((moment) => <button className={`${styles.chip} ${state.moment === moment ? styles.chipActive : ""}`} type="button" aria-pressed={state.moment === moment} key={moment} onClick={() => update({ moment: state.moment === moment ? null : moment, showAll: false })}>{moment}</button>)}</div></div>
              <div><h3>{t.pages.tension.demo.function}</h3><div className={styles.chips}>{functions.map((value) => <button className={`${styles.chip} ${state.sfxType === value ? styles.chipActive : ""}`} type="button" aria-pressed={state.sfxType === value} disabled={state.kind === "Music"} key={value} onClick={() => update({ sfxType: state.sfxType === value ? null : value, kind: value ? "SFX" : state.kind, showAll: false })}>{value}</button>)}</div></div>
            </div>
          </aside>
          <div className={styles.results}><div className={styles.queryBar}><span>{query}</span><span>{t.pages.tension.demo.rankedBy}</span></div><div className={styles.trackList}>{!ranked.length && <p className={styles.empty}>{t.pages.tension.demo.empty}</p>}{shown.map((track) => <TrackRow key={track.id} track={track} open={state.open === track.id} active={playingId === track.id && isPlaying} progress={playingId === track.id ? progress : 0} onPlay={onPlay} onOpen={() => update({ open: state.open === track.id ? null : track.id })} />)}</div>{ranked.length > 6 && <button type="button" className={styles.more} onClick={() => update({ showAll: !state.showAll })}>{state.showAll ? t.pages.tension.demo.showTop.replace("{count}", "6") : t.pages.tension.demo.showAll.replace("{count}", String(ranked.length))}</button>}</div>
        </div>
      </div>
    </div>
  </section>;
}

function TrackRow({ track, open, active, progress, onPlay, onOpen }: { track: RankedTensionTrack; open: boolean; active: boolean; progress: number; onPlay: (track: TensionTrack, seekRatio?: number) => void; onOpen: () => void }) {
  const { t } = useLocale();
  const title = `${track.name} — ${track.label || track.moment}`;
  return <div className={`${styles.trackRow} ${active ? styles.trackPlaying : ""}`}><button type="button" className={`${styles.playButton} ${active ? styles.playing : ""}`} aria-label={`${active ? t.pages.tension.demo.pause : t.pages.tension.demo.play} ${title}`} onClick={() => onPlay(track)}>{active ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}</button><div className={styles.trackText}><div className={styles.trackTitle}>{title}</div><div className={styles.trackMeta}>{[track.moment, track.character, track.kind === "Music" ? t.pages.tension.demo.music : track.sfxType || t.pages.tension.demo.sfx].join(" · ")}</div></div><Waveform track={track} progress={progress} onSeek={(ratio) => onPlay(track, ratio)} /><span className={styles.fit}>{track.fit}% {t.pages.tension.demo.fit}</span><span className={styles.duration}>{duration(track.durationSec)}</span><button type="button" className={styles.info} aria-label={t.pages.tension.demo.tagTrack.replace("{track}", track.name)} aria-expanded={open} onClick={onOpen}><Info size={13} /></button>{open && <TrackDimensions track={track} />}</div>;
}
