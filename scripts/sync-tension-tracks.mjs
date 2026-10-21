import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";

const KEEP = [
  "id",
  "name",
  "label",
  "moment",
  "character",
  "kind",
  "sfxType",
  "tension",
  "excitement",
  "winImpact",
  "durationSec",
  "peaks",
  "raters",
  "dimensions",
];

const sourceRoot = process.argv[2];

if (!sourceRoot) {
  console.error("Usage: node scripts/sync-tension-tracks.mjs <path-to-tension-demo>");
  process.exit(1);
}

const demoRoot = resolve(sourceRoot);
const outputAudioDir = resolve("public/tension/audio");
const outputDataPath = resolve("src/lib/tension-tracks.json");
const sourceTracks = JSON.parse(
  await readFile(join(demoRoot, "data/tracks.json"), "utf8"),
);
const tracks = sourceTracks
  .filter((track) => track.approved !== false)
  .map((track) => {
    const packed = Object.fromEntries(
      KEEP.filter((key) => key in track).map((key) => [key, track[key]]),
    );
    const filename = basename(track.audio);
    return { ...packed, audio: `/tension/audio/${filename}`, sourceAudio: track.audio };
  });

await mkdir(outputAudioDir, { recursive: true });
for (const track of tracks) {
  await copyFile(join(demoRoot, track.sourceAudio), join(outputAudioDir, basename(track.sourceAudio)));
  delete track.sourceAudio;
}

await writeFile(outputDataPath, `${JSON.stringify(tracks, null, 2)}\n`);
console.log(`Synced ${tracks.length} Tension tracks.`);
