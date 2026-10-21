export type TensionTarget = {
  tension: number;
  excitement: number;
  winImpact: number;
};

export type TensionFilters = {
  moment?: string | null;
  kind?: string | null;
  sfxType?: string | null;
};

export type TensionDimension = {
  key: string;
  label: string;
  hint?: string;
  text?: string;
  value?: number;
  slider?: "Tension" | "Excitement" | "Win impact";
  measured?: boolean;
};

export type TensionTrack = TensionTarget & {
  id: string;
  name: string;
  label?: string;
  moment: string;
  character: string;
  kind: "Music" | "SFX";
  sfxType?: "Basic" | "Foley" | "Musical";
  durationSec: number;
  peaks: number[];
  raters: number;
  audio: string;
  dimensions: { axis: string; items: TensionDimension[] }[];
};

export type RankedTensionTrack = TensionTrack & { fit: number };
