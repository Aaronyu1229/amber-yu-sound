export interface Track {
  title: string;
  file: string;
}

export interface GameAlbum {
  game: string;
  gameZh: string;
  category: "slot" | "brand";
  gradient: string;
  tracks: Track[];
}

// Each album gets a unique gradient for its showcase card
export const musicLibrary: GameAlbum[] = [
  {
    game: "Balloon Fiesta",
    gameZh: "氣球嘉年華",
    category: "slot",
    gradient: "from-rose-500/30 to-orange-500/20",
    tracks: [
      { title: "Base Game", file: "/audio/balloon-fiesta-base-game.mp3" },
      { title: "Free Game", file: "/audio/balloon-fiesta-free-game.mp3" },
      { title: "Winning Panel", file: "/audio/balloon-fiesta-winning-panel.mp3" },
    ],
  },
  {
    game: "Golden Piggy",
    gameZh: "金豬報喜",
    category: "slot",
    gradient: "from-amber-500/30 to-yellow-500/20",
    tracks: [
      { title: "Base Game", file: "/audio/golden-piggy-base-game.mp3" },
      { title: "Free Game", file: "/audio/golden-piggy-free-game.mp3" },
    ],
  },
  {
    game: "Kingdom of Apollo",
    gameZh: "阿波羅王國",
    category: "slot",
    gradient: "from-sky-500/30 to-indigo-500/20",
    tracks: [
      { title: "Base Game", file: "/audio/kingdom-of-apollo-base-game.mp3" },
      { title: "Free Game", file: "/audio/kingdom-of-apollo-free-game.mp3" },
    ],
  },
  {
    game: "Midnight Racing",
    gameZh: "午夜狂飆",
    category: "slot",
    gradient: "from-violet-500/30 to-fuchsia-500/20",
    tracks: [
      { title: "Base Game", file: "/audio/midnight-racing-base-game.mp3" },
      { title: "Free Game", file: "/audio/midnight-racing-free-game.mp3" },
      { title: "Winning Panel", file: "/audio/midnight-racing-winning-panel.mp3" },
    ],
  },
  {
    game: "Penguin Party Time",
    gameZh: "企鵝派對",
    category: "slot",
    gradient: "from-cyan-500/30 to-teal-500/20",
    tracks: [
      { title: "Base Game", file: "/audio/penguin-party-time-base-game.mp3" },
      { title: "Free Game", file: "/audio/penguin-party-time-free-game.mp3" },
      { title: "Winning Panel", file: "/audio/penguin-party-time-winning-panel.mp3" },
    ],
  },
  {
    game: "Sheep UFO",
    gameZh: "綿羊幽浮",
    category: "slot",
    gradient: "from-lime-500/30 to-emerald-500/20",
    tracks: [
      { title: "Base Game", file: "/audio/sheep-ufo-base-game.mp3" },
      { title: "Free Game", file: "/audio/sheep-ufo-free-game.mp3" },
      { title: "Winning Panel", file: "/audio/sheep-ufo-winning-panel.mp3" },
    ],
  },
  {
    game: "Sparkling Sweetheart",
    gameZh: "閃耀甜心",
    category: "slot",
    gradient: "from-pink-500/30 to-rose-500/20",
    tracks: [
      { title: "Base Game", file: "/audio/sparkling-sweetheart-base-game.mp3" },
      { title: "Free Game", file: "/audio/sparkling-sweetheart-free-game.mp3" },
    ],
  },
  {
    game: "LockKeyMeowMeow",
    gameZh: "鎖鑰喵喵",
    category: "slot",
    gradient: "from-orange-500/30 to-amber-500/20",
    tracks: [
      { title: "Main Game", file: "/audio/lockkeymeowmeow-main-game.mp3" },
      { title: "Free Game", file: "/audio/lockkeymeowmeow-free-game.mp3" },
    ],
  },
  {
    game: "Haunted Spirit",
    gameZh: "鬼魅幽靈",
    category: "slot",
    gradient: "from-slate-500/30 to-purple-500/20",
    tracks: [
      { title: "Main Game", file: "/audio/haunted-spirit-main-game.mp3" },
      { title: "Free Game", file: "/audio/haunted-spirit-free-game.mp3" },
    ],
  },
  {
    game: "Goddess Realm",
    gameZh: "女神領域",
    category: "slot",
    gradient: "from-fuchsia-500/30 to-pink-500/20",
    tracks: [
      { title: "Free Game", file: "/audio/goddess-realm-free-game.mp3" },
    ],
  },
  {
    game: "New Year Prosperity",
    gameZh: "新年旺旺來",
    category: "slot",
    gradient: "from-red-500/30 to-amber-500/20",
    tracks: [
      { title: "Base Game", file: "/audio/new-year-prosperity-base-game.mp3" },
      { title: "Free Game", file: "/audio/new-year-prosperity-free-game.mp3" },
    ],
  },
  {
    game: "Treasure Dragon",
    gameZh: "寶藏龍",
    category: "slot",
    gradient: "from-emerald-500/30 to-yellow-500/20",
    tracks: [
      { title: "Bonus Game", file: "/audio/treasure-dragon-bonus-game.mp3" },
      { title: "Free Game", file: "/audio/treasure-dragon-free-game.mp3" },
    ],
  },
  {
    game: "Volcano Goddess",
    gameZh: "火山女神",
    category: "slot",
    gradient: "from-red-600/30 to-orange-500/20",
    tracks: [
      { title: "Base Game", file: "/audio/volcano-goddess-base-game.mp3" },
      { title: "Free Game", file: "/audio/volcano-goddess-free-game.mp3" },
    ],
  },
  {
    game: "Wealth God's Blessing",
    gameZh: "財神賜福",
    category: "slot",
    gradient: "from-yellow-500/30 to-red-500/20",
    tracks: [
      { title: "Free Game", file: "/audio/wealth-god-s-blessing-free-game.mp3" },
    ],
  },
  {
    game: "Brand Theme: 寶利發",
    gameZh: "品牌主題曲：寶利發",
    category: "brand",
    gradient: "from-gold/30 to-amber-600/20",
    tracks: [
      { title: "AI Virtual Voice", file: "/audio/game-brand-theme-music-寶利發-ai-virtual-voice.mp3" },
    ],
  },
  {
    game: "Brand Theme: 金斗雲",
    gameZh: "品牌主題曲：金斗雲",
    category: "brand",
    gradient: "from-gold/30 to-purple-500/20",
    tracks: [
      { title: "AI Virtual Voice", file: "/audio/game-brand-theme-music-金斗雲-ai-virtual-voice.mp3" },
    ],
  },
  {
    game: "Brand Theme: 金鑫",
    gameZh: "品牌主題曲：金鑫",
    category: "brand",
    gradient: "from-gold/30 to-rose-500/20",
    tracks: [
      { title: "AI Virtual Voice", file: "/audio/game-brand-theme-music-金鑫-ai-virtual-voice.mp3" },
    ],
  },
];
