import { describe, expect, it } from "vitest";
import { fitScore, rank } from "./rank";
import type { TensionTrack } from "./types";

const target = { tension: 5, excitement: 5, winImpact: 5 };
const track = (overrides: Partial<TensionTrack>): TensionTrack => ({
  id: "1",
  name: "Track",
  moment: "Winning Panel",
  character: "Test",
  kind: "SFX",
  sfxType: "Basic",
  tension: 5,
  excitement: 5,
  winImpact: 5,
  durationSec: 1,
  peaks: [],
  raters: 2,
  audio: "/audio.mp3",
  dimensions: [],
  ...overrides,
});

describe("Tension ranking", () => {
  it("uses the mockup scoring formula and name tie-breaker", () => {
    const tracks = [
      track({ id: "1", name: "Zulu" }),
      track({ id: "2", name: "Alpha" }),
      track({ id: "3", name: "Far", tension: 10, excitement: 10, winImpact: 10 }),
    ];

    expect(fitScore(tracks[0], target)).toBe(100);
    expect(fitScore(tracks[2], target)).toBe(50);
    expect(rank(tracks, target).map((item) => item.name)).toEqual(["Alpha", "Zulu", "Far"]);
  });

  it("filters by moment, kind, and SFX function", () => {
    const tracks = [
      track({ id: "1", name: "Music", kind: "Music", sfxType: undefined, moment: "Free Spins" }),
      track({ id: "2", name: "Basic", moment: "Free Spins", sfxType: "Basic" }),
      track({ id: "3", name: "Foley", moment: "Scatter", sfxType: "Foley" }),
      track({ id: "4", name: "Musical", moment: "Free Spins", sfxType: "Musical" }),
    ];

    expect(rank(tracks, target, { kind: "Music" }).map((item) => item.name)).toEqual(["Music"]);
    expect(rank(tracks, target, { sfxType: "Foley" }).map((item) => item.name)).toEqual(["Foley"]);
    expect(
      rank(tracks, target, { moment: "Free Spins", kind: "SFX", sfxType: "Musical" }).map(
        (item) => item.name,
      ),
    ).toEqual(["Musical"]);
  });

  it("returns an empty list when no track matches", () => {
    expect(rank([track({ moment: "Scatter" })], target, { moment: "Free Spins" })).toEqual([]);
  });
});
