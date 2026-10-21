"use client";

import { useCallback, useEffect, useState } from "react";
import tracks from "@/lib/tension-tracks.json";
import { useAudioPlayer } from "@/lib/audio/AudioPlayerContext";
import type { TensionTarget, TensionTrack } from "@/lib/tension/types";
import TensionHero from "./TensionHero";
import TensionDemo from "./TensionDemo";
import TensionContentSections, { TensionProblem } from "./TensionContentSections";
import EarlyAccess from "./EarlyAccess";
import { useTensionAudio } from "./useTensionAudio";

const tensionTracks = tracks as TensionTrack[];

export default function TensionPageContent() {
  const { isPlaying: globalPlaying, togglePlay } = useAudioPlayer();
  const pauseGlobal = useCallback(() => { if (globalPlaying) togglePlay(); }, [globalPlaying, togglePlay]);
  const demoAudio = useTensionAudio(pauseGlobal);
  const [heroRequest, setHeroRequest] = useState<{ target: TensionTarget; moment?: string; kind?: "Music"; token: number } | null>(null);

  useEffect(() => { if (globalPlaying) demoAudio.stop(); }, [demoAudio.stop, globalPlaying]);

  const openDemo = (target: TensionTarget, preset: { moment: string; kind?: "Music" } | null) => {
    setHeroRequest({ target, moment: preset?.moment, kind: preset?.kind, token: Date.now() });
    document.querySelector("#demo")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return <><TensionHero tracks={tensionTracks} playingId={demoAudio.playingId} isPlaying={demoAudio.isPlaying} onPlay={demoAudio.play} onOpenDemo={openDemo} />{demoAudio.audio}<TensionProblem tracks={tensionTracks} /><TensionDemo tracks={tensionTracks} heroRequest={heroRequest} playingId={demoAudio.playingId} isPlaying={demoAudio.isPlaying} progress={demoAudio.progress} onPlay={demoAudio.play} /><TensionContentSections tracks={tensionTracks} /><EarlyAccess /></>;
}
