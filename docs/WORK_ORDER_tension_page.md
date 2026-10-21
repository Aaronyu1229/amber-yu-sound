# Work order — Tension page on dolcenforte.com (`/tension`)

Client approved the proposal mockup. Port it into this Next.js site as a real, bilingual (en/zh) page.

## Hard rules

- Work on a new branch `feat/tension-page` from `master`. Open a PR to `master` with `gh pr create`. **Do not merge. Do not deploy (no `vercel` commands). Do not touch `.env*`.**
- This is NOT the Next.js you know (Next 16.2). Read the relevant guides in `node_modules/next/dist/docs/` before writing routes/metadata.
- Match the existing code style (client pages with `"use client"`, `useLocale()` from `@/lib/i18n`, Tailwind v4 + `globals.css` tokens, framer-motion as other pages use it).
- `npm run build` and `npm test` must both pass before you open the PR. Paste the real pass/fail counts in the PR body.

## Source of truth

- Mockup markup/CSS/JS: `/Users/aaron/dev/tension-demo/mockup/page.html` (vanilla HTML+CSS+JS, ~52KB; `window.TRACKS` is injected at build time by `/Users/aaron/dev/tension-demo/mockup/build.py`).
- Rendered reference (with data): `/Users/aaron/dev/tension-demo/dist/tension-site-mockup.html` — open it in a browser to see the intended behaviour. Port behaviour and visuals faithfully.
- Track data: `/Users/aaron/dev/tension-demo/data/tracks.json` (skip entries with `approved === false`; expect 32). Keep only the fields listed in `KEEP` in `build.py`.
- Audio files: `/Users/aaron/dev/tension-demo/` + each track's `audio` path (all under `assets/audio/`, 32 mp3, 3.6MB total).

## What to build

1. **Data sync script** `scripts/sync-tension-tracks.mjs <path-to-tension-demo>`: reads tracks.json, filters `approved !== false`, keeps the KEEP fields, copies each mp3 to `public/tension/audio/<basename>`, writes `src/lib/tension-tracks.json` with `audio: "/tension/audio/<basename>"`. Run it once and commit the output (JSON + 32 mp3). Do not inline audio as base64.
2. **Route** `src/app/tension/page.tsx` (client component) plus `src/app/tension/layout.tsx` exporting `metadata` (title `Tension — Emotion-tagged audio search for iGaming | Dolce & Forte`, matching description, OG title/description). Indexable (no noindex). Add `/tension` to `src/app/sitemap.ts` (priority 0.8, monthly).
3. **Sections, in mockup order**: hero (draggable triangle feeling picker + best-match card + auto-rotation through the example presets) → problem ("Searching today" vs "Searching with Tension") → interactive demo (presets, Music/SFX segment, the 3 sliders, game-moment chips, Function chips, ranked list, "show more", per-track info panel with 10 dimensions) → how it's tagged (3 axes + who it's for) → stats (1,290+ / 1,240+ / 10 / 32 — the 32 must come from the data length) → how it works (3 steps) → early-access CTA.
   - **Drop** from the mockup: the "Proposal mockup" ribbon, the mockup's own `<nav>` and `<footer>` (the site's `Nav`/`Footer` already wrap every page), `noindex`.
   - Put the ranking/scoring logic in a pure module `src/lib/tension/rank.ts` (port from the mockup script unchanged in behaviour) so it can be unit-tested.
   - Component code split into small files under `src/components/tension/` (each < 400 lines). Styles: port the mockup CSS into `src/components/tension/tension.module.css` (scoped; must not leak into other pages). Reuse the site's existing fonts — do not add another Google Fonts link if the site already loads Cormorant Garamond / Outfit (check `layout.tsx` / `globals.css`).
4. **Audio isolation**: the demo uses its own single `HTMLAudioElement`, never the global player. When demo playback starts and `useAudioPlayer().isPlaying` is true, call `togglePlay()` to pause the global player. When the global player starts playing, pause the demo. Only one demo track plays at a time; leaving the page stops it.
5. **Nav**: add `Tension` between Music and Insights in both `en` and `zh` nav links in `src/lib/i18n/dictionaries.ts` (zh label also `Tension`). Show the small gold `NEW` badge from the mockup next to it on desktop and in the mobile menu if `Nav.tsx` can do it cleanly; if it needs a large Nav refactor, skip the badge and say so in the PR.
6. **i18n**: every piece of UI copy goes in `dictionaries.ts` under `pages.tension` (update the type at the top of the file) for both `en` and `zh`. Write the zh copy in Traditional Chinese (Taiwan), matching the tone of the existing zh dictionary, addressing the reader as 您. Keep in English in both locales: the product name Tension, track names/labels (e.g. `Crown Rush — Big Win BGM`), game-moment chip names (Scatter, Near Win, Free Spins, Winning Panel), Function chip names (Basic, Foley, Musical), and the 10 dimension names in the info panel. "SiGMA World · Rome · 2–5 Nov 2026" stays as is.
7. **Early-access form** (name, company, work email, "I am a" select: Game studio / Slot provider / Sound designer / Investor / Other) posts to the existing `/api/contact` — do not change that route. Body: `{ name, company, email, gameType: <role>, details: "Tension early access request", locale, website: <hidden honeypot> }`. Show success, validation error, 429 rate-limit and network-error states using the response (`ok`, `error`), localized. Look at `src/components/Contact.tsx` for how the existing form calls it.
8. **Quality bars**: no horizontal scroll at 375px; hero picker usable by touch (pointer events) and keyboard (the mockup's handle focus/arrow behaviour if present, otherwise preset buttons are the keyboard path); auto-rotation stops on first user interaction and is disabled under `prefers-reduced-motion`; visible focus styles; buttons have accessible names.

## Tests (vitest, add to existing setup)

- `rank.ts`: a preset returns tracks in expected order (derive expectations from the mockup's logic, not from your port's output), filters by moment/kind/function work, empty result handled.
- Data integrity: `tension-tracks.json` has 32 entries, unique ids, every `audio` file exists under `public/`, no entry named `Gold Thread` or `Temple Gate`.
- Dictionary parity: `en.pages.tension` and `zh.pages.tension` have identical key sets.

## PR body must include

What was built, any deviation from this order and why, build + test output counts, and a list of every zh string you were unsure about.
