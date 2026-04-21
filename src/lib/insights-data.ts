// Insights / Blog articles
// Content is i18n-aware. Each article has EN + ZH versions.

export type InsightSection =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "quote"; text: string };

export interface InsightBody {
  title: string;
  subtitle: string;
  excerpt: string;
  readTime: string;
  tag: string;
  sections: InsightSection[];
}

export interface Insight {
  slug: string;
  date: string;           // ISO date — used for sorting + display
  author: string;
  coverImage: string;
  gradient: string;
  en: InsightBody;
  zh: InsightBody;
}

export const insights: Insight[] = [
  {
    slug: "5-principles-of-slot-game-sound-design",
    date: "2026-04-18",
    author: "Amber Yu, Founder & Composer",
    coverImage:
      "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=1600&q=80",
    gradient: "from-amber-900/40 to-purple-900/40",
    en: {
      title: "5 Key Principles of Slot Game Sound Design",
      subtitle:
        "What separates audio that players tolerate from audio that keeps them coming back.",
      excerpt:
        "Great slot audio isn't about loud, flashy sounds — it's about deliberate choices that reward the player's brain. Here are five principles we follow on every project at Dolce & Forte.",
      readTime: "6 min read",
      tag: "Sound Design",
      sections: [
        {
          kind: "p",
          text: "Slot games live or die by retention. A player may try a new title for a single session, but whether they come back for a second, third, or thirtieth time depends on how the experience feels — and sound is a massive, often undervalued, part of that feel. At Dolce & Forte we've shipped hundreds of audio assets across dozens of slot titles, and the same five principles surface on every project.",
        },
        { kind: "h2", text: "1. Reinforce the reward loop, don't compete with it" },
        {
          kind: "p",
          text: "A slot game is fundamentally a reward-loop engine: anticipation, outcome, feedback. Audio's job is to amplify each beat of that loop without talking over it. The spin sound builds tension, the stop sound delivers resolution, and the win cascade pays off the promise. If any of those three steps is muddled — too busy, too quiet, too similar to the others — the loop feels broken.",
        },
        {
          kind: "p",
          text: "A common mistake is treating the win sound as the only important moment. In reality, the few hundred milliseconds before the reels stop are where the player's brain locks in. Nail that, and the rest follows.",
        },
        { kind: "h2", text: "2. Design for the thousandth spin, not the first" },
        {
          kind: "p",
          text: "Most audio demos are built for a 30-second viewing. Slot audio has to survive 10,000 spins over a multi-hour session. That means ruthlessly auditing anything that could become fatiguing: shrill transients, repetitive musical phrases, aggressive stereo widening, and anything that sits in the same narrow frequency band as the dealer voice or ambient mix.",
        },
        {
          kind: "ul",
          items: [
            "Use subtle variation — multiple versions of each SFX swapped randomly",
            "Keep loop points inaudible; no one should notice the music repeating",
            "Leave headroom — a slot session is a marathon, not a sprint",
          ],
        },
        { kind: "h2", text: "3. Cultural fluency matters" },
        {
          kind: "p",
          text: "An Asian-themed slot using generic 'oriental' pentatonic riffs will feel cheap to any player from the region. A Norse-themed slot scored with modern orchestral trailer music misses the opportunity to evoke the actual texture of the setting. We invest real research time into instruments, scales, and production conventions specific to each theme — then layer that authenticity with modern production polish so the game feels both rooted and current.",
        },
        {
          kind: "quote",
          text: "Cultural authenticity is not decoration — it's what separates a memorable game from a generic one.",
        },
        { kind: "h2", text: "4. Integrate with the engine, not around it" },
        {
          kind: "p",
          text: "Audio quality at the studio level means nothing if the in-engine implementation is sloppy. We work closely with developers and technical designers to ensure proper mix levels, ducking behavior, latency-tight triggers, and correct file formats (sample rate, bit depth, loop flags). A brilliant soundtrack that clips on mobile devices because it was rendered at the wrong LUFS is a brilliant soundtrack nobody will actually hear.",
        },
        { kind: "h2", text: "5. Make the brand audible" },
        {
          kind: "p",
          text: "The most successful slot studios have a recognizable sonic signature — a specific win stinger, a jingle motif, a production style — that players and partners associate with their brand. This doesn't happen by accident. It's designed, refined across multiple titles, and protected as carefully as the visual identity. If your studio doesn't have one yet, start with a single motif and extend it through your next three releases.",
        },
        { kind: "h2", text: "The throughline" },
        {
          kind: "p",
          text: "None of these principles are glamorous. They require planning, iteration, and a willingness to delete your most clever ideas when they don't serve the player. But when you get them right — spin after spin, session after session — you end up with audio that doesn't just decorate the game. It becomes the reason players keep spinning.",
        },
      ],
    },
    zh: {
      title: "老虎機音效設計的 5 個核心原則",
      subtitle:
        "什麼樣的音效只是讓玩家勉強接受，什麼樣的音效能讓他們不斷回來？",
      excerpt:
        "真正優秀的老虎機音效不是靠響亮、浮誇的聲音，而是靠每一個深思熟慮的決定去獎勵玩家的大腦。以下是我們在 Dolce & Forte 每個專案都會遵循的五個原則。",
      readTime: "閱讀約 6 分鐘",
      tag: "音效設計",
      sections: [
        {
          kind: "p",
          text: "老虎機遊戲的成敗繫於留存率。玩家可能只會試玩一款新作品一次，但他們是否會再回來玩第二次、第三次、第三十次，取決於整體體驗的手感——而音效是這個手感中被低估、卻佔比極大的一環。我們在 Dolce & Forte 交付過數百個音效素材、參與過數十款老虎機製作，以下這五個原則，幾乎每個專案都會出現。",
        },
        { kind: "h2", text: "1. 強化獎勵迴圈，不是跟它搶戲" },
        {
          kind: "p",
          text: "老虎機本質上是一台獎勵迴圈引擎：期待、結果、回饋。音效的任務是放大這個迴圈的每一個節拍，而不是蓋過它。旋轉音累積期待、停止音提供解答、中獎音效兌現承諾。只要這三步中有任何一步是模糊的——太吵、太輕、彼此太像——整個迴圈就會失靈。",
        },
        {
          kind: "p",
          text: "最常見的錯誤是把中獎音效當成唯一重要的時刻。實際上，輪軸停下前的那幾百毫秒才是玩家大腦真正鎖定的關鍵。只要這一瞬間做對了，後面都會順。",
        },
        { kind: "h2", text: "2. 為第一千次旋轉設計，不是第一次" },
        {
          kind: "p",
          text: "大多數音效 demo 是為 30 秒的瀏覽設計的，但老虎機音效必須在一場數小時、上萬次旋轉的遊戲中存活。這代表任何會讓人聽膩的元素都得嚴格檢視：刺耳的瞬態、重複的旋律句子、過度的立體聲擴張、以及任何與荷官語音或環境音混在同一窄頻段的聲音。",
        },
        {
          kind: "ul",
          items: [
            "使用細微的變化——每個音效做多個版本隨機播放",
            "讓循環點完全聽不出來；沒人應該注意到音樂在重複",
            "保留動態空間——老虎機是馬拉松，不是百米衝刺",
          ],
        },
        { kind: "h2", text: "3. 文化熟稔度很重要" },
        {
          kind: "p",
          text: "一款亞洲主題老虎機只用通用的「東方風」五聲音階，對任何來自那個地區的玩家來說都會顯得廉價。一款北歐主題老虎機用現代電影預告音樂配樂，就錯過了真正傳達場景質感的機會。我們會投入真正的研究時間，鑽研每個主題特有的樂器、音階與製作慣例——再用現代製作手法把這份真實感打磨出來，讓遊戲同時具有根源感與時代感。",
        },
        {
          kind: "quote",
          text: "文化真實度不是裝飾品——它是一款令人記憶深刻的遊戲與一款通用型遊戲之間的分水嶺。",
        },
        { kind: "h2", text: "4. 與引擎整合，而不是繞過它" },
        {
          kind: "p",
          text: "錄音室等級的音效品質，只要在引擎內實作得草率就全無意義。我們會與開發者、技術設計師緊密合作，確保混音音量、ducking 行為、低延遲觸發、以及正確的檔案格式（取樣率、位元深度、循環旗標）都到位。一首在手機上因為 LUFS 設定錯誤而破音的神曲，就是一首沒人真的聽到的神曲。",
        },
        { kind: "h2", text: "5. 讓品牌變得可以被聽見" },
        {
          kind: "p",
          text: "最成功的老虎機工作室都有一個可辨識的聲音簽名——特定的中獎音、一組短動機、一種製作風格——讓玩家與合作夥伴一聽就知道是誰的作品。這不是意外，而是設計出來的：跨越多款遊戲去迭代、像守護視覺識別一樣守護它。如果你的工作室還沒有這樣的簽名，就從一個短動機開始，延伸到接下來的三款作品裡。",
        },
        { kind: "h2", text: "貫穿這一切的核心" },
        {
          kind: "p",
          text: "這些原則沒有一個是華麗的。它們需要規劃、需要反覆迭代、需要願意刪掉自己最聰明卻不服務玩家的點子。但當你把它們做對——一次旋轉接著一次、一場遊戲接著一場——最後留下的音效就不只是遊戲的裝飾，它會成為玩家為什麼一直想繼續轉下去的原因。",
        },
      ],
    },
  },
];
