import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import tracks from "./tension-tracks.json";

describe("Tension track data", () => {
  it("contains the approved library and copied audio", () => {
    expect(tracks).toHaveLength(32);
    expect(new Set(tracks.map((track) => track.id)).size).toBe(32);
    expect(tracks.some((track) => track.name === "Gold Thread" || track.name === "Temple Gate")).toBe(false);

    for (const track of tracks) {
      expect(track.audio.startsWith("/tension/audio/")).toBe(true);
      expect(existsSync(resolve("public", `.${track.audio}`))).toBe(true);
    }
  });
});
