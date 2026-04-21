export type Locale = "en" | "zh";

export interface Dictionary {
  nav: {
    links: { label: string; href: string }[];
    langLabel: string;
  };
  hero: {
    tag: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    scroll: string;
  };
  intro: {
    tag: string;
    title: string;
    titleHighlight: string;
    p1: string;
    p2: string;
    stats: { value: string; label: string }[];
  };
  services: {
    tag: string;
    title: string;
    titleHighlight: string;
    items: {
      title: string;
      description: string;
      tags: string[];
    }[];
  };
  portfolio: {
    tag: string;
    title: string;
    description: string;
    items: {
      type: string;
      services: string;
      tags: string[];
    }[];
  };
  process: {
    tag: string;
    title: string;
    steps: { title: string; description: string }[];
  };
  about: {
    tag: string;
    title: string;
    founderLabel: string;
    p1: string;
    p2: string;
    toolsLabel: string;
    whyTag: string;
    whyTitle: string;
    whyDescription: string;
    whyItems: { title: string; description: string }[];
  };
  testimonials: {
    tag: string;
    title: string;
    items: {
      quote: string;
      name: string;
      role: string;
      company: string;
      initials: string;
    }[];
  };
  contact: {
    title: string;
    description: string;
    email: string;
    location: string;
    form: {
      name: string;
      company: string;
      emailLabel: string;
      platform: string;
      platformOptions: string[];
      gameType: string;
      gameTypeOptions: string[];
      gameTypePlaceholder: string;
      audioNeeds: string;
      audioNeedsOptions: string[];
      audioNeedsHint: string;
      deadline: string;
      details: string;
      submit: string;
      namePlaceholder: string;
      companyPlaceholder: string;
      emailPlaceholder: string;
      detailsPlaceholder: string;
      platformPlaceholder: string;
    };
  };
  footer: {
    copyright: string;
    services: string;
    serviceLinks: { label: string; href: string }[];
    company: string;
    companyLinks: { label: string; href: string }[];
    support: string;
    supportLinks: { label: string; href: string }[];
  };
  // Portfolio detail pages
  portfolioDetail: {
    backLabel: string;
    overviewTitle: string;
    challengeTitle: string;
    approachTitle: string;
    resultTitle: string;
    assetsTitle: string;
    ctaTitle: string;
    ctaButton: string;
    clientLabel: string;
    genreLabel: string;
    yearLabel: string;
    platformLabel: string;
    durationLabel: string;
    items: {
      client: string;
      clientRole: string;
      genre: string;
      year: string;
      platform: string;
      duration: string;
      overview: string;
      challenge: string;
      approach: string;
      result: string;
      assets: { label: string; count: string }[];
      testimonial: string;
      testimonialAuthor: string;
    }[];
  };
  // Multi-page: page-level hero banners
  pages: {
    services: { title: string; subtitle: string };
    portfolio: { title: string; subtitle: string };
    music: { title: string; subtitle: string; headphones: string; cta: string };
    about: { title: string; subtitle: string };
    contact: { title: string; subtitle: string };
    insights: {
      title: string;
      subtitle: string;
      readMore: string;
      backToList: string;
      publishedOn: string;
      shareLabel: string;
      ctaTitle: string;
      ctaButton: string;
      empty: string;
    };
  };
}

const en: Dictionary = {
  nav: {
    links: [
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Music", href: "/music" },
      { label: "Insights", href: "/insights" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    langLabel: "中文",
  },
  hero: {
    tag: "Premium Game Audio Studio",
    title: "Audio That Keeps Players Spinning.",
    titleHighlight: "Players Spinning.",
    subtitle:
      "Slot games · Live casino · iGaming — sound design crafted for retention, immersion, and brand recognition.",
    cta1: "View Portfolio",
    cta2: "Get in Touch",
    scroll: "Scroll",
  },
  intro: {
    tag: "Creative Sound Solutions",
    title: "Where music meets the machine",
    titleHighlight: "music",
    p1: "With a foundation in classical music and a passion for interactive media, we create audio experiences that resonate with players and elevate game brands. Every sound is intentional — designed to heighten emotion, reinforce mechanics, and keep players engaged.",
    p2: "From the first spin to the jackpot celebration, we craft cohesive soundscapes that give your game a distinctive sonic identity in a crowded market.",
    stats: [
      { value: "5+", label: "Years in iGaming" },
      { value: "500+", label: "Audio assets delivered" },
      { value: "10+", label: "Studio partners" },
    ],
  },
  services: {
    tag: "Services",
    title: "What we can do for your games",
    titleHighlight: "your games",
    items: [
      {
        title: "Music Composition",
        description:
          "Original scores, background loops, and bonus round themes that capture the energy and emotion of every spin. From orchestral grandeur to electronic pulse.",
        tags: ["Orchestral", "Electronic", "Ambient", "Adaptive"],
      },
      {
        title: "Sound Design",
        description:
          "Win cascades, bonus triggers, jackpot celebrations, UI feedback, and reel mechanics — every interaction tuned to maximise player engagement.",
        tags: ["SFX", "UI/UX Audio", "Foley", "Layering"],
      },
      {
        title: "Voice Over",
        description:
          "Character voices, game narration, and live dealer audio. Multilingual casting and direction for authentic in-game performances.",
        tags: ["Casting", "Direction", "Multilingual", "Processing"],
      },
      {
        title: "Trailer Audio",
        description:
          "Cinematic sound for game promotional content — teaser trailers, launch videos, and social media clips that demand attention.",
        tags: ["Cinematic", "Mix", "Sound-to-Picture", "Mastering"],
      },
    ],
  },
  portfolio: {
    tag: "Portfolio",
    title: "Selected works",
    description:
      "A curated selection of recent casino & iGaming audio projects. Each one crafted to elevate the player experience.",
    items: [
      { type: "SLOT", services: "Music & Sound Design", tags: ["Asian Theme", "Orchestral", "96 SFX"] },
      { type: "LIVE CASINO", services: "Sound Design & VO", tags: ["Jazz", "Minimal", "Dealer Audio"] },
      { type: "SLOT", services: "Full Audio Package", tags: ["Cinematic", "Epic", "120+ Assets"] },
    ],
  },
  process: {
    tag: "Process",
    title: "From brief to final master",
    steps: [
      { title: "Brief", description: "Discuss game theme, target audience, and audio requirements in detail." },
      { title: "Concept", description: "Deliver initial demos and style references for creative alignment." },
      { title: "Production", description: "Full audio asset creation with iterative feedback and revisions." },
      { title: "Delivery", description: "Mixed, mastered, and formatted assets ready for integration." },
    ],
  },
  about: {
    tag: "About",
    title: "The team behind the sound",
    founderLabel: "Founder & Composer — Amber Yu",
    p1: "Dolce & Forte is a Taipei-based audio studio led by founder and composer Amber Yu — a classically trained musician who turned her expertise to game audio. We're a collaborative network of composers, sound designers, voice actors, and mix engineers united by one goal: crafting audio that makes games unforgettable.",
    p2: "We focus exclusively on the iGaming space, building sonic identities for slot games, live casino products, and promotional content. Our musical foundation gives us a unique perspective — we don't just design sounds, we compose experiences that connect with players on an emotional level.",
    toolsLabel: "Tools & Technologies",
    whyTag: "Why Dolce & Forte?",
    whyTitle: "Your extended audio team",
    whyDescription:
      "With over 10 years of experience in music and audio production, Dolce & Forte specializes in games, animation, advertising, and voice-over production. Our end-to-end service covers everything from initial theme and style development through production, integration, revisions, and ongoing support — all targeting AAA-quality audio that perfectly matches the feel of your game. We are your dedicated, one-stop audio production partner.",
    whyItems: [
      {
        title: "Battle-Ready Team",
        description:
          "No internal training needed — we hit the ground running from day one.",
      },
      {
        title: "Full-Cycle Support",
        description:
          "From production to revisions and QA testing, we see every asset through.",
      },
      {
        title: "Game-Dev Fluent",
        description:
          "We integrate seamlessly with your planners, artists, and developers.",
      },
      {
        title: "Precision Delivery",
        description:
          "Consistent, spec-compliant file delivery every single time.",
      },
      {
        title: "Flexible Engagement",
        description:
          "Custom quotes and timelines tailored to your project's scope.",
      },
      {
        title: "Your Extended Audio Team",
        description:
          "Think of us as your lean, outsourced sound department.",
      },
    ],
  },
  testimonials: {
    tag: "Testimonials",
    title: "What clients say",
    items: [
      {
        quote:
          "Real-time, efficient responses. Precise timeline coordination. Zero-miss professional communication — combined with deep product understanding and top-tier audio quality, they deliver music experiences on par with AAA original soundtracks.",
        name: "Senior Game Producer",
        role: "Game Production Lead",
        company: "iGaming Studio",
        initials: "SP",
      },
    ],
  },
  contact: {
    title: "Let's make your game sound incredible",
    description:
      "Whether you're developing a new slot title or refreshing an existing game's audio, we'd love to hear about your project. Reach out and let's create something players will remember.",
    email: "hello@dolcenforte.com",
    location: "Taipei, Taiwan — Available worldwide",
    form: {
      name: "Name *",
      company: "Company *",
      emailLabel: "Email *",
      platform: "Platform",
      platformOptions: ["Mobile", "Web-based", "Land-based", "Multi-platform", "Other"],
      gameType: "Game Type",
      gameTypeOptions: ["Slot", "Live Casino", "Table Game", "Casual Game", "Other"],
      gameTypePlaceholder: "Select game type",
      audioNeeds: "Audio Needs",
      audioNeedsOptions: ["BGM", "SFX", "Voice Over", "Mixing", "Other"],
      audioNeedsHint: "Select all that apply",
      deadline: "Deadline",
      details: "Project Details",
      submit: "Send Message",
      namePlaceholder: "Your name",
      companyPlaceholder: "Studio name",
      emailPlaceholder: "you@studio.com",
      detailsPlaceholder:
        "Tell us about your game: theme, number of assets needed, and any reference audio you have in mind.",
      platformPlaceholder: "Select platform",
    },
  },
  footer: {
    copyright: "Dolce & Forte. All rights reserved.",
    services: "/ Services",
    serviceLinks: [
      { label: "Music Composition", href: "/services" },
      { label: "Sound Design", href: "/services" },
      { label: "Voice Over", href: "/services" },
      { label: "Trailer Audio", href: "/services" },
    ],
    company: "/ Company",
    companyLinks: [
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Our Music", href: "/music" },
      { label: "Insights", href: "/insights" },
    ],
    support: "/ Support",
    supportLinks: [
      { label: "Contact", href: "/contact" },
    ],
  },
  portfolioDetail: {
    backLabel: "Back to Portfolio",
    overviewTitle: "Project Overview",
    challengeTitle: "The Challenge",
    approachTitle: "Our Approach",
    resultTitle: "The Result",
    assetsTitle: "Delivered Assets",
    ctaTitle: "Interested in a similar project?",
    ctaButton: "Start a Conversation",
    clientLabel: "Client",
    genreLabel: "Genre",
    yearLabel: "Year",
    platformLabel: "Platform",
    durationLabel: "Duration",
    items: [
      {
        client: "Nexus Gaming",
        clientRole: "Leading Asian iGaming studio based in Manila, specializing in culturally authentic slot experiences for the Asia-Pacific market.",
        genre: "Asian Fantasy / Mythology",
        year: "2024",
        platform: "Mobile & Web",
        duration: "8 weeks",
        overview: "Fortune Dynasty is a 5-reel, 243-ways-to-win slot game steeped in Chinese mythology. The game features the Four Divine Beasts as scatter symbols and a progressive jackpot tied to a celestial palace bonus round. Audio needed to feel culturally authentic while meeting the fast-paced energy modern slot players expect.",
        challenge: "The client needed audio that respected traditional Chinese musical aesthetics without sounding like a stereotype. The game features rapid base-game spins alongside a slow, dramatic free-spins mode — requiring two distinct sonic worlds that still felt cohesive. Additionally, 96 unique SFX were needed for a complex symbol cascade mechanic.",
        approach: "We began with extensive research into traditional Chinese instruments — guzheng, erhu, dizi, and pipa — then layered them with modern orchestral arrangements and subtle electronic textures. The base game music uses a 120 BPM pentatonic-driven loop, while the bonus round transitions to a sweeping cinematic piece with taiko drums and full string section. Every SFX was designed to match the visual particle effects frame-by-frame.",
        result: "Fortune Dynasty launched as Nexus Gaming's highest-performing Q1 title. Player session times increased 23% compared to their previous release, with audio specifically cited in player feedback as a standout feature. The soundtrack was later featured on the studio's promotional reel at ICE London 2024.",
        assets: [
          { label: "Music Tracks", count: "12" },
          { label: "Sound Effects", count: "96" },
          { label: "Ambient Loops", count: "4" },
          { label: "Jingles", count: "8" },
        ],
        testimonial: "Dolce & Forte captured the essence of Chinese mythology in a way that feels modern and exciting. Players keep telling us the sound is what makes Fortune Dynasty special.",
        testimonialAuthor: "James Thompson, Creative Director — Nexus Gaming",
      },
      {
        client: "CasinoTech Studios",
        clientRole: "Premium European live casino provider headquartered in Riga, Latvia, serving tier-1 operators worldwide.",
        genre: "Jazz / Lounge / Minimal",
        year: "2024",
        platform: "Web & Land-based",
        duration: "6 weeks",
        overview: "Midnight Blackjack is a high-end live dealer blackjack product targeting VIP players. The game streams from a purpose-built studio with art deco aesthetics. Audio needed to complement a sophisticated, club-like atmosphere without competing with the live dealer's voice or distracting from gameplay decisions.",
        challenge: "Live casino audio is uniquely demanding — it must coexist with real-time dealer speech, player chat, and environmental noise from the physical studio. The client needed a sophisticated jazz soundtrack that would loop seamlessly for sessions lasting hours, plus dealer callout audio that felt natural rather than robotic. Multilingual VO (English, German, Mandarin) was also required.",
        approach: "We composed a set of modular jazz pieces using brushed drums, upright bass, Rhodes piano, and muted trumpet — all recorded with careful dynamic range to sit beneath conversation. The music system uses adaptive layers: quieter during active hands, slightly fuller during betting phases. For dealer VO, we directed three native-speaking voice actors with a focus on warmth and clarity, then processed the recordings to match the room tone of the physical studio.",
        result: "Midnight Blackjack became CasinoTech's flagship live dealer product. Operator partners reported a 15% increase in average session duration for VIP tables compared to their standard blackjack offering. The adaptive audio system has since been adopted as the template for all future CasinoTech live products.",
        assets: [
          { label: "Music Tracks", count: "6" },
          { label: "Sound Effects", count: "42" },
          { label: "VO Lines", count: "180" },
          { label: "Ambient Layers", count: "3" },
        ],
        testimonial: "The audio sets the perfect mood — sophisticated without being intrusive. Our VIP players love the atmosphere, and the multilingual dealer audio was flawless.",
        testimonialAuthor: "Maria Kovacs, Head of Product — CasinoTech Studios",
      },
      {
        client: "Pharaoh Interactive",
        clientRole: "Fast-growing global slot developer based in London, known for high-production-value themed slots with cinematic storytelling.",
        genre: "Cinematic / Epic / Ancient Egypt",
        year: "2023",
        platform: "Multi-platform",
        duration: "12 weeks",
        overview: "Golden Pharaoh is a feature-rich 6-reel megaways slot set in ancient Egypt. The game includes five distinct bonus modes, an expanding narrative system, and a multi-level progressive jackpot. This was a full audio package engagement — music, SFX, VO, and trailer audio — representing the most comprehensive project in the studio's history.",
        challenge: "With five bonus modes, each needing its own musical identity, plus a base game, jackpot sequences, and a cinematic intro, this project required an enormous volume of audio that still felt like one unified world. The client also wanted Hollywood-level production quality for their launch trailer, which would premiere at G2E Las Vegas.",
        approach: "We created a master musical theme — a powerful brass and choir motif — then derived five variations for each bonus mode: desert exploration (ambient + ethnic percussion), tomb raid (tense strings + heartbeat pulse), pharaoh's chamber (regal horns + harp), scarab swarm (aggressive electronic + distorted elements), and the ultimate Eye of Ra jackpot (full orchestral crescendo with 60-piece virtual orchestra). Over 120 SFX were designed with consistent tonal characteristics. The launch trailer received a separate cinematic mix with Dolby Atmos spatialisation.",
        result: "Golden Pharaoh became Pharaoh Interactive's most successful launch, reaching #3 on the global slot performance charts within its first month. The G2E trailer won a nomination for Best Marketing Content at the International Gaming Awards. The client has since engaged Dolce & Forte for three additional titles.",
        assets: [
          { label: "Music Tracks", count: "18" },
          { label: "Sound Effects", count: "124" },
          { label: "VO Lines", count: "60" },
          { label: "Trailer Mixes", count: "3" },
        ],
        testimonial: "This was our most ambitious game and Dolce & Forte delivered audio that matched our vision perfectly. The trailer alone was worth the investment — it stopped people in their tracks at G2E.",
        testimonialAuthor: "David Chen, CEO — Pharaoh Interactive",
      },
    ],
  },
  pages: {
    services: {
      title: "Our Services",
      subtitle: "Comprehensive audio solutions tailored for the iGaming industry.",
    },
    portfolio: {
      title: "Our Portfolio",
      subtitle: "Explore the games and projects we've brought to life through sound.",
    },
    music: {
      title: "Our Music",
      subtitle: "Listen to selected compositions and sound design demos.",
      headphones: "For the best experience, please use headphones.",
      cta: "Wish to collaborate? Let's talk.",
    },
    about: {
      title: "Our Story",
      subtitle: "The musician behind the machine.",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Ready to elevate your game's audio? Let's start a conversation.",
    },
    insights: {
      title: "Insights",
      subtitle:
        "Notes on game audio — craft, process, and lessons from the studio.",
      readMore: "Read article",
      backToList: "Back to Insights",
      publishedOn: "Published",
      shareLabel: "Share this article",
      ctaTitle: "Want audio that feels like this?",
      ctaButton: "Start a conversation",
      empty: "More articles coming soon.",
    },
  },
};

const zh: Dictionary = {
  nav: {
    links: [
      { label: "服務項目", href: "/services" },
      { label: "作品集", href: "/portfolio" },
      { label: "音樂試聽", href: "/music" },
      { label: "觀點分享", href: "/insights" },
      { label: "關於我們", href: "/about" },
      { label: "聯繫我們", href: "/contact" },
    ],
    langLabel: "EN",
  },
  hero: {
    tag: "頂級遊戲音效工作室",
    title: "讓玩家停不下來的遊戲音效。",
    titleHighlight: "停不下來",
    subtitle:
      "老虎機 · 真人賭場 · iGaming — 為留存、沉浸與品牌辨識度量身打造的聲音設計。",
    cta1: "瀏覽作品集",
    cta2: "聯繫我們",
    scroll: "往下滑",
  },
  intro: {
    tag: "創意聲音方案",
    title: "當音樂遇上機台",
    titleHighlight: "音樂",
    p1: "以古典音樂為根基，結合對互動媒體的熱情，我們創造能與玩家產生共鳴的音效體驗，並提升遊戲品牌形象。每一個聲音都是精心設計——用以強化情緒、輔助機制、讓玩家持續投入。",
    p2: "從第一次轉動到中獎慶祝，我們打造具有整體感的聲音景觀，讓你的遊戲在競爭激烈的市場中脫穎而出。",
    stats: [
      { value: "5+", label: "iGaming 年資" },
      { value: "500+", label: "音效素材交付" },
      { value: "10+", label: "合作工作室" },
    ],
  },
  services: {
    tag: "服務項目",
    title: "我們能為您的遊戲做什麼",
    titleHighlight: "您的遊戲",
    items: [
      {
        title: "音樂作曲",
        description:
          "原創配樂、背景循環音樂與獎勵回合主題曲，捕捉每一次旋轉的能量與情感。從管弦樂的恢弘到電子樂的脈動。",
        tags: ["管弦樂", "電子樂", "氛圍音樂", "自適應配樂"],
      },
      {
        title: "音效設計",
        description:
          "連贏音效、獎勵觸發、中獎慶祝、UI 回饋與轉軸機制——每一個互動都經過調校，最大化玩家參與感。",
        tags: ["音效", "UI/UX 音效", "擬音", "音層設計"],
      },
      {
        title: "配音錄製",
        description:
          "角色配音、遊戲旁白與真人荷官音效。多語言選角與指導，呈現道地的遊戲內表演。",
        tags: ["選角", "配音指導", "多語言", "後製處理"],
      },
      {
        title: "預告片音效",
        description:
          "為遊戲宣傳素材打造電影級音效——預告片、上線影片與社群媒體短片，讓人過目不忘。",
        tags: ["電影感", "混音", "音畫同步", "母帶後期"],
      },
    ],
  },
  portfolio: {
    tag: "作品集",
    title: "精選作品",
    description:
      "近期博弈與 iGaming 音效專案精選。每一個作品都用心打造，提升玩家體驗。",
    items: [
      { type: "老虎機", services: "音樂與音效設計", tags: ["亞洲主題", "管弦樂", "96 組音效"] },
      { type: "真人賭場", services: "音效設計與配音", tags: ["爵士", "極簡", "荷官音效"] },
      { type: "老虎機", services: "全套音效方案", tags: ["電影感", "史詩級", "120+ 素材"] },
    ],
  },
  process: {
    tag: "工作流程",
    title: "從需求到最終母帶",
    steps: [
      { title: "需求討論", description: "深入了解遊戲主題、目標受眾與音效需求。" },
      { title: "概念提案", description: "提交初始 Demo 與風格參考，確認創意方向。" },
      { title: "正式製作", description: "完整音效素材製作，搭配迭代回饋與修改。" },
      { title: "交付成品", description: "完成混音、母帶後期，以指定格式交付。" },
    ],
  },
  about: {
    tag: "關於我們",
    title: "聲音背後的團隊",
    founderLabel: "創辦人暨作曲家 — Amber Yu",
    p1: "Dolce & Forte 是一間位於台北的音效工作室，由創辦人暨作曲家 Amber Yu 領軍——她是一位古典音樂出身、將專業投入遊戲音效領域的音樂人。我們是一個由作曲家、音效設計師、配音員與混音工程師組成的協作網絡，凝聚於一個共同目標：打造讓遊戲令人難忘的音效。",
    p2: "我們專注於 iGaming 領域，為老虎機遊戲、真人賭場產品與宣傳內容打造獨特的聲音識別。音樂底蘊賦予我們獨特的視角——我們不只是設計聲音，我們是在譜寫能觸動玩家情感的體驗。",
    toolsLabel: "工具與技術",
    whyTag: "為什麼選擇 Dolce & Forte？",
    whyTitle: "您的延伸音效團隊",
    whyDescription:
      "擁有超過 10 年音樂與音效製作經驗，Dolce & Forte 專精於遊戲、動畫、廣告與配音製作。我們提供從初期主題風格發想、正式製作、整合測試、修改調整到後續維護的全流程服務——目標是打造貼合您遊戲氛圍的 AAA 級音效品質。我們是您專屬的一站式音效製作夥伴。",
    whyItems: [
      {
        title: "即戰力團隊",
        description: "無需內部培訓，從第一天就能全速投入。",
      },
      {
        title: "全流程支援",
        description: "從製作、修改到 QA 測試，每一個素材我們都陪你走到完成。",
      },
      {
        title: "熟悉遊戲開發",
        description: "能無縫融入您的企劃、美術與工程團隊的協作流程。",
      },
      {
        title: "精準交付",
        description: "每一次交付都符合規格，一致且準時。",
      },
      {
        title: "彈性合作",
        description: "依專案規模量身訂製報價與時程。",
      },
      {
        title: "您的延伸音效團隊",
        description: "把我們當成您精實、外包的音效部門。",
      },
    ],
  },
  testimonials: {
    tag: "客戶推薦",
    title: "客戶怎麼說",
    items: [
      {
        quote:
          "即時高效的回應、精準到位的時程配合，零漏接的專業溝通，加上對產品的深度理解與頂級音效品質，打造出媲美 OST 等級的動人音樂體驗。",
        name: "資深遊戲企劃主管",
        role: "遊戲企劃負責人",
        company: "iGaming 工作室",
        initials: "企劃",
      },
    ],
  },
  contact: {
    title: "讓我們一起打造令人驚艷的遊戲音效",
    description:
      "無論您正在開發新的老虎機遊戲，還是想更新現有遊戲的音效，我們都很樂意了解您的專案。歡迎聯繫，讓我們共同創造玩家難忘的體驗。",
    email: "hello@dolcenforte.com",
    location: "台灣台北 — 服務範圍遍及全球",
    form: {
      name: "姓名 *",
      company: "公司名稱 *",
      emailLabel: "電子郵件 *",
      platform: "遊戲平台",
      platformOptions: ["手機", "網頁", "實體機台", "跨平台", "其他"],
      gameType: "遊戲類型",
      gameTypeOptions: ["老虎機", "真人賭場", "桌遊", "休閒遊戲", "其他"],
      gameTypePlaceholder: "選擇遊戲類型",
      audioNeeds: "音效需求",
      audioNeedsOptions: ["背景音樂", "音效", "配音", "混音", "其他"],
      audioNeedsHint: "可複選",
      deadline: "交付期限",
      details: "專案詳情",
      submit: "發送訊息",
      namePlaceholder: "您的姓名",
      companyPlaceholder: "工作室名稱",
      emailPlaceholder: "you@studio.com",
      detailsPlaceholder:
        "請告訴我們遊戲主題、需要的素材數量，以及任何參考音效。",
      platformPlaceholder: "選擇平台",
    },
  },
  footer: {
    copyright: "Dolce & Forte. 版權所有。",
    services: "/ 服務項目",
    serviceLinks: [
      { label: "音樂作曲", href: "/services" },
      { label: "音效設計", href: "/services" },
      { label: "配音錄製", href: "/services" },
      { label: "預告片音效", href: "/services" },
    ],
    company: "/ 關於",
    companyLinks: [
      { label: "關於我們", href: "/about" },
      { label: "作品集", href: "/portfolio" },
      { label: "音樂試聽", href: "/music" },
      { label: "觀點分享", href: "/insights" },
    ],
    support: "/ 支援",
    supportLinks: [
      { label: "聯繫我們", href: "/contact" },
    ],
  },
  portfolioDetail: {
    backLabel: "返回作品集",
    overviewTitle: "專案概述",
    challengeTitle: "面臨的挑戰",
    approachTitle: "我們的做法",
    resultTitle: "最終成果",
    assetsTitle: "交付素材",
    ctaTitle: "對類似專案有興趣？",
    ctaButton: "開始對話",
    clientLabel: "客戶",
    genreLabel: "風格",
    yearLabel: "年份",
    platformLabel: "平台",
    durationLabel: "製作週期",
    items: [
      {
        client: "Nexus Gaming",
        clientRole: "總部位於馬尼拉的亞洲領先 iGaming 工作室，專精於亞太市場的文化主題老虎機體驗。",
        genre: "亞洲奇幻 / 神話",
        year: "2024",
        platform: "手機 & 網頁",
        duration: "8 週",
        overview: "Fortune Dynasty 是一款 5 軸、243 條連線的老虎機遊戲，以中國神話為主題。遊戲以四大神獸作為分散符號，並設有與天宮獎勵回合連動的累進彩金。音效需要在文化真實性與現代老虎機玩家期待的快節奏之間取得平衡。",
        challenge: "客戶需要的音效既要尊重中國傳統音樂美學，又不能流於刻板印象。遊戲的基本轉動模式節奏快速，而免費旋轉模式則是緩慢而戲劇性的——需要兩個截然不同卻又保持一致性的聲音世界。此外，複雜的符號連鎖機制需要 96 個獨特音效。",
        approach: "我們從深入研究中國傳統樂器開始——古箏、二胡、笛子、琵琶——然後將它們與現代管弦樂編曲及細膩的電子紋理疊加。基本遊戲音樂使用 120 BPM 的五聲音階循環，而獎勵回合則過渡到以太鼓和完整弦樂組為主的恢弘電影配樂。每一個音效都與視覺粒子效果逐幀對齊。",
        result: "Fortune Dynasty 成為 Nexus Gaming 第一季表現最佳的遊戲。玩家平均遊戲時間比前一款作品提升了 23%，音效在玩家回饋中被特別提及為亮點功能。配樂後來在 2024 年 ICE London 展會的工作室宣傳影片中亮相。",
        assets: [
          { label: "音樂曲目", count: "12" },
          { label: "音效", count: "96" },
          { label: "氛圍音樂", count: "4" },
          { label: "過場音樂", count: "8" },
        ],
        testimonial: "Dolce & Forte 以一種既現代又令人興奮的方式捕捉了中國神話的精髓。玩家不斷告訴我們，音效是 Fortune Dynasty 的最大亮點。",
        testimonialAuthor: "James Thompson，創意總監 — Nexus Gaming",
      },
      {
        client: "CasinoTech Studios",
        clientRole: "總部位於拉脫維亞里加的頂級歐洲真人賭場供應商，服務全球一級運營商。",
        genre: "爵士 / 沙龍 / 極簡",
        year: "2024",
        platform: "網頁 & 實體機台",
        duration: "6 週",
        overview: "Midnight Blackjack 是一款面向 VIP 玩家的高端真人荷官二十一點產品。遊戲從一個裝飾藝術風格的專用攝影棚進行直播。音效需要營造精緻的俱樂部氛圍，同時不能與真人荷官的聲音競爭，也不能干擾玩家的遊戲決策。",
        challenge: "真人賭場音效有獨特的挑戰——必須與即時荷官語音、玩家聊天和實體攝影棚的環境噪音共存。客戶需要一套精緻的爵士配樂，能在長達數小時的遊戲中無縫循環，還需要自然而不機械的荷官叫牌音效。此外還需要多語言配音（英語、德語、中文）。",
        approach: "我們使用刷鼓、立式貝斯、Rhodes 電鋼琴和加了弱音器的小號創作了一套模組化的爵士樂曲——全部錄製時特別注意動態範圍，確保能融入對話之下。音樂系統使用自適應音層：出牌時更安靜，下注階段則稍微豐富。荷官配音方面，我們指導了三位母語配音員，專注於溫暖感和清晰度，然後對錄音進行處理以匹配實體攝影棚的空間音色。",
        result: "Midnight Blackjack 成為 CasinoTech 的旗艦真人荷官產品。合作運營商報告 VIP 桌的平均遊戲時間比標準二十一點產品提升了 15%。自適應音效系統已被採用為所有未來 CasinoTech 真人產品的範本。",
        assets: [
          { label: "音樂曲目", count: "6" },
          { label: "音效", count: "42" },
          { label: "配音台詞", count: "180" },
          { label: "氛圍音層", count: "3" },
        ],
        testimonial: "音效營造了完美的氛圍——精緻而不突兀。我們的 VIP 玩家喜愛這個氛圍，多語言荷官音效更是無可挑剔。",
        testimonialAuthor: "Maria Kovacs，產品負責人 — CasinoTech Studios",
      },
      {
        client: "Pharaoh Interactive",
        clientRole: "總部位於倫敦的快速成長全球老虎機開發商，以高製作水準的主題老虎機和電影級敘事聞名。",
        genre: "電影感 / 史詩級 / 古埃及",
        year: "2023",
        platform: "跨平台",
        duration: "12 週",
        overview: "Golden Pharaoh 是一款功能豐富的 6 軸 Megaways 老虎機，背景設定在古埃及。遊戲包含五種不同的獎勵模式、擴展敘事系統和多層級累進彩金。這是一個全套音效委託——音樂、音效、配音和預告片音效——代表了該工作室歷史上最全面的專案。",
        challenge: "五種獎勵模式各需要獨立的音樂識別度，加上基本遊戲、彩金序列和電影級開場動畫，這個專案需要龐大的音效量，同時仍要感覺像一個統一的世界觀。客戶還希望為將在 G2E 拉斯維加斯首映的宣傳預告片獲得好萊塢級的製作品質。",
        approach: "我們創作了一個主旋律主題——強有力的銅管與合唱動機——然後為每種獎勵模式衍生出五個變奏：沙漠探險（氛圍音樂 + 民族打擊樂）、古墓突襲（緊張弦樂 + 心跳脈動）、法老寢殿（莊嚴號角 + 豎琴）、聖甲蟲風暴（激進電子 + 失真元素）以及終極荷魯斯之眼彩金（60 人虛擬管弦樂團的完整高潮）。超過 120 個音效都設計了一致的音色特徵。宣傳預告片則獲得了獨立的 Dolby Atmos 空間混音。",
        result: "Golden Pharaoh 成為 Pharaoh Interactive 最成功的發行作品，在上線首月即登上全球老虎機排行榜第三名。G2E 預告片獲得了國際博弈獎最佳行銷內容的提名。客戶隨後又委託 Dolce & Forte 製作了三款額外的遊戲。",
        assets: [
          { label: "音樂曲目", count: "18" },
          { label: "音效", count: "124" },
          { label: "配音台詞", count: "60" },
          { label: "預告片混音", count: "3" },
        ],
        testimonial: "這是我們最具野心的遊戲，Dolce & Forte 交付的音效完美匹配了我們的願景。光是預告片就值回票價——它在 G2E 現場讓人駐足不前。",
        testimonialAuthor: "David Chen，執行長 — Pharaoh Interactive",
      },
    ],
  },
  pages: {
    services: {
      title: "服務項目",
      subtitle: "專為 iGaming 產業量身打造的全方位音效解決方案。",
    },
    portfolio: {
      title: "作品集",
      subtitle: "探索我們透過聲音賦予生命的遊戲與專案。",
    },
    music: {
      title: "音樂試聽",
      subtitle: "聆聽精選作曲與音效設計作品。",
      headphones: "建議使用耳機以獲得最佳體驗。",
      cta: "想合作嗎？歡迎聯繫我們。",
    },
    about: {
      title: "關於我們",
      subtitle: "機台背後的音樂人。",
    },
    contact: {
      title: "聯繫我們",
      subtitle: "準備好提升您遊戲的音效了嗎？讓我們開始對話。",
    },
    insights: {
      title: "觀點分享",
      subtitle: "關於遊戲音效的筆記——工藝、流程，以及工作室的所見所學。",
      readMore: "閱讀文章",
      backToList: "返回觀點列表",
      publishedOn: "發布於",
      shareLabel: "分享這篇文章",
      ctaTitle: "想要這樣的音效嗎？",
      ctaButton: "聯繫我們",
      empty: "更多文章即將推出。",
    },
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, zh };
