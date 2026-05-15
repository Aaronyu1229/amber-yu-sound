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

// Recent Work BGMs sourced from the client's Google Drive folder
// (1g9O6d4CV7JZB05DaI_YuWJY8NYJnT3IT) — 2 tracks from the upcoming
// "Crown of Odin" slot title.
export const recentWorkTracks: RecentTrack[] = [
  {
    file: "/audio/crown-of-odin-main-game.mp3",
    title: {
      en: "Crown of Odin — Main Game",
      zh: "奧丁王冠 — Main Game",
    },
    album: {
      en: "Slot · 2026",
      zh: "老虎機 · 2026",
    },
    shortLabel: {
      en: "Main Game",
      zh: "Main Game",
    },
  },
  {
    file: "/audio/crown-of-odin-free-game.mp3",
    title: {
      en: "Crown of Odin — Free Game",
      zh: "奧丁王冠 — Free Game",
    },
    album: {
      en: "Slot · 2026",
      zh: "老虎機 · 2026",
    },
    shortLabel: {
      en: "Free Game",
      zh: "Free Game",
    },
  },
];
