export interface Track {
  title: string;
  file: string;
}

export interface GameAlbum {
  game: string;
  gameZh: string;
  category: "slot" | "brand";
  tracks: Track[];
}

export const musicLibrary: GameAlbum[] = [
  {
    game: "Balloon Fiesta",
    gameZh: "氣球嘉年華",
    category: "slot",
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
    tracks: [
      { title: "Base Game", file: "/audio/golden-piggy-base-game.mp3" },
      { title: "Free Game", file: "/audio/golden-piggy-free-game.mp3" },
    ],
  },
  {
    game: "Kingdom of Apollo",
    gameZh: "阿波羅王國",
    category: "slot",
    tracks: [
      { title: "Base Game", file: "/audio/kingdom-of-apollo-base-game.mp3" },
      { title: "Free Game", file: "/audio/kingdom-of-apollo-free-game.mp3" },
    ],
  },
  {
    game: "Midnight Racing",
    gameZh: "午夜狂飆",
    category: "slot",
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
    tracks: [
      { title: "Base Game", file: "/audio/sparkling-sweetheart-base-game.mp3" },
      { title: "Free Game", file: "/audio/sparkling-sweetheart-free-game.mp3" },
    ],
  },
  {
    game: "LockKeyMeowMeow",
    gameZh: "鎖鑰喵喵",
    category: "slot",
    tracks: [
      { title: "Main Game", file: "/audio/lockkeymeowmeow-main-game.mp3" },
      { title: "Free Game", file: "/audio/lockkeymeowmeow-free-game.mp3" },
    ],
  },
  {
    game: "Haunted Spirit",
    gameZh: "鬼魅幽靈",
    category: "slot",
    tracks: [
      { title: "Main Game", file: "/audio/haunted-spirit-main-game.mp3" },
      { title: "Free Game", file: "/audio/haunted-spirit-free-game.mp3" },
    ],
  },
  {
    game: "Goddess Realm",
    gameZh: "女神領域",
    category: "slot",
    tracks: [
      { title: "Free Game", file: "/audio/goddess-realm-free-game.mp3" },
    ],
  },
  {
    game: "New Year Prosperity",
    gameZh: "新年旺旺來",
    category: "slot",
    tracks: [
      { title: "Base Game", file: "/audio/new-year-prosperity-base-game.mp3" },
      { title: "Free Game", file: "/audio/new-year-prosperity-free-game.mp3" },
    ],
  },
  {
    game: "Treasure Dragon",
    gameZh: "寶藏龍",
    category: "slot",
    tracks: [
      { title: "Bonus Game", file: "/audio/treasure-dragon-bonus-game.mp3" },
      { title: "Free Game", file: "/audio/treasure-dragon-free-game.mp3" },
    ],
  },
  {
    game: "Volcano Goddess",
    gameZh: "火山女神",
    category: "slot",
    tracks: [
      { title: "Base Game", file: "/audio/volcano-goddess-base-game.mp3" },
      { title: "Free Game", file: "/audio/volcano-goddess-free-game.mp3" },
    ],
  },
  {
    game: "Wealth God's Blessing",
    gameZh: "財神賜福",
    category: "slot",
    tracks: [
      { title: "Free Game", file: "/audio/wealth-god-s-blessing-free-game.mp3" },
    ],
  },
  {
    game: "Brand Theme: 寶利發",
    gameZh: "品牌主題曲：寶利發",
    category: "brand",
    tracks: [
      { title: "AI Virtual Voice", file: "/audio/game-brand-theme-music-寶利發-ai-virtual-voice.mp3" },
    ],
  },
  {
    game: "Brand Theme: 金斗雲",
    gameZh: "品牌主題曲：金斗雲",
    category: "brand",
    tracks: [
      { title: "AI Virtual Voice", file: "/audio/game-brand-theme-music-金斗雲-ai-virtual-voice.mp3" },
    ],
  },
  {
    game: "Brand Theme: 金鑫",
    gameZh: "品牌主題曲：金鑫",
    category: "brand",
    tracks: [
      { title: "AI Virtual Voice", file: "/audio/game-brand-theme-music-金鑫-ai-virtual-voice.mp3" },
    ],
  },
];
