// Recent Work showcase — homepage module below Hero
//
// TO UPDATE: simply swap the `file`, `title`, `album` values below.
// BGMs should live in /public/audio/ (or an absolute CDN URL).

export interface RecentTrack {
  file: string;
  title: { en: string; zh: string };
  album: { en: string; zh: string };
  shortLabel: { en: string; zh: string };
}

// TODO(Dolce & Forte): replace with the 2 BGMs from
// https://drive.google.com/drive/folders/1g9O6d4CV7JZB05DaI_YuWJY8NYJnT3IT
// Drop the MP3s into /public/audio/ and update the file paths below.
// Currently using 2 recent tracks as showcase defaults.
export const recentWorkTracks: RecentTrack[] = [
  {
    file: "/audio/buffalo-ways-free-game.mp3",
    title: {
      en: "Buffalo Ways — Free Game",
      zh: "狂野水牛 — Free Game",
    },
    album: {
      en: "Slot · 2026",
      zh: "老虎機 · 2026",
    },
    shortLabel: {
      en: "Buffalo Ways",
      zh: "狂野水牛",
    },
  },
  {
    file: "/audio/treasure-dragon-free-game.mp3",
    title: {
      en: "Treasure Dragon — Free Game",
      zh: "寶藏龍 — Free Game",
    },
    album: {
      en: "Slot · 2025",
      zh: "老虎機 · 2025",
    },
    shortLabel: {
      en: "Treasure Dragon",
      zh: "寶藏龍",
    },
  },
];

// TODO(Dolce & Forte): paste the Winning Panel video here when the client
// approves release. Upload the MP4 to /public/videos/ and set `src`.
// Leave `src` empty to show the "coming soon" placeholder.
export const recentWorkVideo: {
  src: string;
  poster?: string;
  label: { en: string; zh: string };
} = {
  src: "", // e.g. "/videos/winning-panel.mp4"
  poster: undefined,
  label: {
    en: "Winning Panel",
    zh: "遊戲主視覺",
  },
};
