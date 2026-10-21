import type {
  RankedTensionTrack,
  TensionDimension,
  TensionFilters,
  TensionTarget,
  TensionTrack,
} from "./types";

export function levelWord(value: number) {
  if (value < 3.5) return "low";
  if (value < 6.5) return "mid";
  return "high";
}

export function formatValue(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function sliderTarget(item: TensionDimension, target: TensionTarget) {
  const sliderKeys = {
    Tension: "tension",
    Excitement: "excitement",
    "Win impact": "winImpact",
  } as const;
  const key = item && item.slider ? sliderKeys[item.slider] : null;
  return key ? target[key] : null;
}

export function fitScore(track: TensionTarget, target: TensionTarget) {
  const tensionDelta = track.tension - target.tension;
  const excitementDelta = track.excitement - target.excitement;
  const winImpactDelta = track.winImpact - target.winImpact;
  const distance = Math.sqrt(
    (tensionDelta * tensionDelta +
      excitementDelta * excitementDelta +
      winImpactDelta * winImpactDelta) /
      3,
  );
  const score = Math.round(100 * (1 - distance / 10));
  return Math.max(0, Math.min(100, score));
}

function filtersFor(filters?: TensionFilters | string): TensionFilters {
  return typeof filters === "string" ? { moment: filters } : filters || {};
}

export function rank(
  tracks: TensionTrack[],
  target: TensionTarget,
  filters?: TensionFilters | string,
): RankedTensionTrack[] {
  const activeFilters = filtersFor(filters);
  return tracks
    .filter(
      (track) =>
        (!activeFilters.moment || track.moment === activeFilters.moment) &&
        (!activeFilters.kind || track.kind === activeFilters.kind) &&
        (!activeFilters.sfxType || track.sfxType === activeFilters.sfxType),
    )
    .map((track) => ({ ...track, fit: fitScore(track, target) }))
    .sort((left, right) => right.fit - left.fit || left.name.localeCompare(right.name));
}

export function queryText(target: TensionTarget, filters?: TensionFilters | string) {
  const activeFilters = filtersFor(filters);
  const labels = [activeFilters.moment || "All moments"];
  if (activeFilters.kind) labels.push(activeFilters.kind);
  if (activeFilters.sfxType) labels.push(activeFilters.sfxType);
  labels.push(`${levelWord(target.tension)} tension`);
  labels.push(`${levelWord(target.excitement)} excitement`);
  labels.push(`${levelWord(target.winImpact)} win impact`);
  return labels.join(" · ");
}
