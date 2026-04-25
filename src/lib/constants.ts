// All placeholder data — replace with real content later

export const services = [
  {
    number: "01",
    title: "Music Composition",
    description:
      "Original scores, background loops, and bonus round themes that capture the energy and emotion of every spin. From orchestral grandeur to electronic pulse.",
    tags: ["Orchestral", "Electronic", "Ambient", "Adaptive"],
    accent: "gold" as const,
  },
  {
    number: "02",
    title: "Sound Design",
    description:
      "Win cascades, bonus triggers, jackpot celebrations, UI feedback, and reel mechanics — every interaction tuned to maximise player engagement.",
    tags: ["SFX", "UI/UX Audio", "Foley", "Layering"],
    accent: "gold" as const,
  },
  {
    number: "03",
    title: "Voice Over",
    description:
      "Character voices, game narration, and live dealer audio. Multilingual casting and direction for authentic in-game performances.",
    tags: ["Casting", "Direction", "Multilingual", "Processing"],
    accent: "purple" as const,
  },
  {
    number: "04",
    title: "Trailer Audio",
    description:
      "Cinematic sound for game promotional content — teaser trailers, launch videos, and social media clips that demand attention.",
    tags: ["Cinematic", "Mix", "Sound-to-Picture", "Mastering"],
    accent: "purple" as const,
  },
];

/**
 * Portfolio items.
 *
 * Video options (per item):
 *   - youtubeId: YouTube video ID (e.g. "YXYg6JrIZJI" from youtu.be/YXYg6JrIZJI)
 *   - videoSrc:  absolute or /public path to an MP4 hosted by us
 *
 * Priority: youtubeId > videoSrc > image (poster fallback only).
 *
 * TO ADD GAME DEMO VIDEOS: download from the client's Google Drive
 * (https://drive.google.com/drive/folders/1EC8riJFeQaiBcGvUJPH0M1mya4oyH9PF)
 * → upload to /public/videos/<slug>.mp4 → set `videoSrc: "/videos/<slug>.mp4"`.
 */
export interface PortfolioItem {
  slug: string;
  title: string;
  type: string;
  services: string;
  tags: string[];
  gradient: string;
  image: string;
  heroImage: string;
  youtubeId?: string;
  videoSrc?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "haunted-spirit",
    title: "Haunted Spirit",
    type: "SLOT",
    services: "Music & Sound Design",
    tags: ["Horror", "Atmospheric", "Free Game"],
    gradient: "from-slate-900/50 to-purple-900/40",
    image: "/videos/posters/haunted-spirit.jpg",
    heroImage: "/videos/posters/haunted-spirit.jpg",
    videoSrc: "/videos/haunted-spirit.mp4",
  },
  {
    slug: "fortune-tiger-deluxe",
    title: "Fortune Tiger Deluxe",
    type: "SLOT",
    services: "Music & Sound Design",
    tags: ["Asian Theme", "Festive", "High Energy"],
    gradient: "from-red-900/50 to-amber-900/40",
    image: "/videos/posters/fortune-tiger-deluxe.jpg",
    heroImage: "/videos/posters/fortune-tiger-deluxe.jpg",
    videoSrc: "/videos/fortune-tiger-deluxe.mp4",
  },
  {
    slug: "golden-piggy-megaways",
    title: "Golden Piggy Megaways",
    type: "MEGAWAYS",
    services: "Full Audio Package",
    tags: ["Asian Theme", "Megaways", "Cascade"],
    gradient: "from-amber-900/50 to-yellow-900/40",
    image: "/videos/posters/golden-piggy-megaways.jpg",
    heroImage: "/videos/posters/golden-piggy-megaways.jpg",
    videoSrc: "/videos/golden-piggy-megaways.mp4",
  },
  {
    slug: "golden-sun-aztec",
    title: "Golden Sun Aztec",
    type: "SLOT",
    services: "Music & Sound Design",
    tags: ["Aztec Theme", "Cinematic", "Adventure"],
    gradient: "from-amber-900/50 to-emerald-900/40",
    image: "/videos/posters/golden-sun-aztec.jpg",
    heroImage: "/videos/posters/golden-sun-aztec.jpg",
    videoSrc: "/videos/golden-sun-aztec.mp4",
  },
  {
    slug: "audio-post-production",
    title: "Audio Post-Production",
    type: "POST-PRODUCTION",
    services: "Audio Post-Production",
    tags: ["Sound-to-Picture", "Mix", "Mastering"],
    gradient: "from-indigo-900/40 to-rose-900/40",
    image: `https://img.youtube.com/vi/YXYg6JrIZJI/hqdefault.jpg`,
    heroImage: `https://img.youtube.com/vi/YXYg6JrIZJI/hqdefault.jpg`,
    youtubeId: "YXYg6JrIZJI",
  },
];

// PLACEHOLDER: Replace with Amber's real portrait
export const aboutImage = "https://images.unsplash.com/photo-1623376550867-76153536e55a?w=800&q=80";

export const processSteps = [
  {
    step: 1,
    title: "Brief",
    description: "Discuss game theme, target audience, and audio requirements in detail.",
  },
  {
    step: 2,
    title: "Concept",
    description: "Deliver initial demos and style references for creative alignment.",
  },
  {
    step: 3,
    title: "Production",
    description: "Full audio asset creation with iterative feedback and revisions.",
  },
  {
    step: 4,
    title: "Delivery",
    description: "Mixed, mastered, and formatted assets ready for integration.",
  },
];

export const testimonials = [
  {
    quote:
      "Real-time, efficient responses. Precise timeline coordination. Zero-miss professional communication — combined with deep product understanding and top-tier audio quality, they deliver music experiences on par with AAA original soundtracks.",
    name: "Senior Game Producer",
    role: "Game Production Lead",
    company: "iGaming Studio",
    initials: "SP",
  },
];

export const tools = [
  "Pro Tools",
  "Logic Pro",
  "Ableton",
  "FMOD",
  "Wwise",
  "Unity",
];

export const stats = [
  { value: "10+", label: "Years in iGaming" },
  { value: "500+", label: "Audio assets delivered" },
  { value: "10+", label: "Studio partners" },
];

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// Page banner background images
export const bannerImages = {
  services: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80",
  about: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80",
  portfolio: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80",
  contact: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1600&q=80",
  insights: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80",
};

// Service card images
export const serviceImages = [
  "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80",   // Music Composition — piano
  "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=600&q=80",   // Sound Design — waveform
  "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80",   // Voice Over — microphone
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",   // Trailer Audio — cinema
];
