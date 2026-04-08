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
  };
}

const en: Dictionary = {
  nav: {
    links: [
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Music", href: "/music" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    langLabel: "中文",
  },
  hero: {
    tag: "Premium Casino Game Audio",
    title: "Sound design rooted in musical artistry",
    titleHighlight: "musical artistry",
    subtitle:
      "Classically trained composer crafting immersive audio for slot games, live casino & iGaming studios worldwide.",
    cta1: "View Portfolio",
    cta2: "Get in Touch",
    scroll: "Scroll",
  },
  intro: {
    tag: "Creative Sound Solutions",
    title: "Where music meets the machine",
    titleHighlight: "music",
    p1: "With a foundation in classical music and a passion for interactive media, I create audio experiences that resonate with players and elevate game brands. Every sound is intentional — designed to heighten emotion, reinforce mechanics, and keep players engaged.",
    p2: "From the first spin to the jackpot celebration, I craft cohesive soundscapes that give your game a distinctive sonic identity in a crowded market.",
    stats: [
      { value: "50+", label: "Games delivered" },
      { value: "10+", label: "Studio partners" },
      { value: "365", label: "Days available" },
    ],
  },
  services: {
    tag: "Services",
    title: "What I can do for your games",
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
      { type: "WEB DESIGN", services: "Website Design & Development", tags: ["Brand Site", "Responsive", "Motion"] },
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
    title: "The person behind the sound",
    founderLabel: "Founder & Composer",
    p1: "Hi, I'm Amber — a classically trained musician turned game audio specialist. After years of studying composition and performance, I discovered the world of interactive entertainment and never looked back.",
    p2: "Today I focus exclusively on the iGaming space, crafting sonic identities for slot games, live casino products, and promotional content. My musical background gives me a unique perspective — I don't just design sounds, I compose experiences that connect with players on an emotional level.",
    toolsLabel: "Tools & Technologies",
  },
  testimonials: {
    tag: "Testimonials",
    title: "What clients say",
    items: [
      {
        quote:
          "Amber transformed our slot game with a soundtrack that players genuinely love. The attention to detail in every win sound and bonus trigger is remarkable.",
        name: "James Thompson",
        role: "Creative Director",
        company: "Nexus Gaming",
        initials: "JT",
      },
      {
        quote:
          "Working with Amber Yu Studio was seamless. She understood our brief instantly and delivered audio that elevated the entire player experience.",
        name: "Maria Kovacs",
        role: "Head of Product",
        company: "CasinoTech Studios",
        initials: "MK",
      },
    ],
  },
  contact: {
    title: "Let's make your game sound incredible",
    description:
      "Whether you're developing a new slot title or refreshing an existing game's audio, I'd love to hear about your project. Reach out and let's create something players will remember.",
    email: "hello@amberyustudio.com",
    location: "Taipei, Taiwan — Available worldwide",
    form: {
      name: "Name *",
      company: "Company *",
      emailLabel: "Email *",
      platform: "Platform",
      platformOptions: ["Mobile", "Web-based", "Land-based", "Multi-platform", "Other"],
      details: "Project Details",
      submit: "Send Message",
      namePlaceholder: "Your name",
      companyPlaceholder: "Studio name",
      emailPlaceholder: "you@studio.com",
      detailsPlaceholder: "Tell me about your game and audio needs...",
      platformPlaceholder: "Select platform",
    },
  },
  footer: {
    copyright: "Amber Yu Studio. All rights reserved.",
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
        approach: "I began with extensive research into traditional Chinese instruments — guzheng, erhu, dizi, and pipa — then layered them with modern orchestral arrangements and subtle electronic textures. The base game music uses a 120 BPM pentatonic-driven loop, while the bonus round transitions to a sweeping cinematic piece with taiko drums and full string section. Every SFX was designed to match the visual particle effects frame-by-frame.",
        result: "Fortune Dynasty launched as Nexus Gaming's highest-performing Q1 title. Player session times increased 23% compared to their previous release, with audio specifically cited in player feedback as a standout feature. The soundtrack was later featured on the studio's promotional reel at ICE London 2024.",
        assets: [
          { label: "Music Tracks", count: "12" },
          { label: "Sound Effects", count: "96" },
          { label: "Ambient Loops", count: "4" },
          { label: "Jingles", count: "8" },
        ],
        testimonial: "Amber captured the essence of Chinese mythology in a way that feels modern and exciting. Players keep telling us the sound is what makes Fortune Dynasty special.",
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
        approach: "I composed a set of modular jazz pieces using brushed drums, upright bass, Rhodes piano, and muted trumpet — all recorded with careful dynamic range to sit beneath conversation. The music system uses adaptive layers: quieter during active hands, slightly fuller during betting phases. For dealer VO, I directed three native-speaking voice actors with a focus on warmth and clarity, then processed the recordings to match the room tone of the physical studio.",
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
        approach: "I created a master musical theme — a powerful brass and choir motif — then derived five variations for each bonus mode: desert exploration (ambient + ethnic percussion), tomb raid (tense strings + heartbeat pulse), pharaoh's chamber (regal horns + harp), scarab swarm (aggressive electronic + distorted elements), and the ultimate Eye of Ra jackpot (full orchestral crescendo with 60-piece virtual orchestra). Over 120 SFX were designed with consistent tonal characteristics. The launch trailer received a separate cinematic mix with Dolby Atmos spatialisation.",
        result: "Golden Pharaoh became Pharaoh Interactive's most successful launch, reaching #3 on the global slot performance charts within its first month. The G2E trailer won a nomination for Best Marketing Content at the International Gaming Awards. The client has since engaged Amber Yu Studio for three additional titles.",
        assets: [
          { label: "Music Tracks", count: "18" },
          { label: "Sound Effects", count: "124" },
          { label: "VO Lines", count: "60" },
          { label: "Trailer Mixes", count: "3" },
        ],
        testimonial: "This was our most ambitious game and Amber delivered audio that matched our vision perfectly. The trailer alone was worth the investment — it stopped people in their tracks at G2E.",
        testimonialAuthor: "David Chen, CEO — Pharaoh Interactive",
      },
      {
        client: "鹿飛 LuFei",
        clientRole: "An emerging lifestyle brand based in Taipei, blending traditional Taiwanese craftsmanship with contemporary design sensibilities.",
        genre: "Brand Website / Responsive Design",
        year: "2025",
        platform: "Mobile & Web",
        duration: "6 weeks",
        overview: "鹿飛 LuFei needed a digital home that captured their brand philosophy — the grace and agility of a deer in flight. The website serves as both a brand storytelling platform and an e-commerce gateway, requiring seamless transitions between editorial content and product showcases across all devices.",
        challenge: "The brand's identity bridges Eastern heritage and modern aesthetics, which needed to translate into a web experience that felt neither overly traditional nor generically trendy. Performance was critical — the site needed to load under 2 seconds on 4G mobile networks while delivering rich motion design and high-resolution imagery.",
        approach: "I designed a visual system rooted in natural motion — scroll-triggered animations inspired by a deer's fluid movement, paired with a muted earth-tone palette accented by jade green. The layout uses asymmetric grids for editorial sections and clean product cards for commerce. Built with Next.js for server-side rendering and optimized with lazy loading, responsive images, and a custom motion library to keep the bundle lean.",
        result: "The new site launched to overwhelmingly positive reception, with average session duration reaching 4 minutes 30 seconds — 2.5x the industry benchmark for brand sites. Mobile conversion rates increased 38% compared to their previous Shopify storefront. The site was featured in Taiwan Design Week's digital showcase.",
        assets: [
          { label: "UI Screens", count: "24" },
          { label: "Animations", count: "16" },
          { label: "Icons", count: "40" },
          { label: "Style Guides", count: "2" },
        ],
        testimonial: "Amber understood our vision from day one. The website doesn't just look beautiful — it moves and breathes like our brand. Our customers constantly tell us it's the best brand site they've seen in Taiwan.",
        testimonialAuthor: "Lin Wei-Chen, Founder — 鹿飛 LuFei",
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
  },
};

const zh: Dictionary = {
  nav: {
    links: [
      { label: "服務項目", href: "/services" },
      { label: "作品集", href: "/portfolio" },
      { label: "音樂試聽", href: "/music" },
      { label: "關於我們", href: "/about" },
      { label: "聯繫我們", href: "/contact" },
    ],
    langLabel: "EN",
  },
  hero: {
    tag: "頂級博弈遊戲音效",
    title: "根植於音樂藝術的聲音設計",
    titleHighlight: "音樂藝術",
    subtitle:
      "古典音樂背景出身的作曲家，為全球老虎機、真人賭場與 iGaming 工作室打造沉浸式音效體驗。",
    cta1: "瀏覽作品集",
    cta2: "聯繫我們",
    scroll: "往下滑",
  },
  intro: {
    tag: "創意聲音方案",
    title: "當音樂遇上機台",
    titleHighlight: "音樂",
    p1: "以古典音樂為根基，結合對互動媒體的熱情，我創造能與玩家產生共鳴的音效體驗，並提升遊戲品牌形象。每一個聲音都是精心設計——用以強化情緒、輔助機制、讓玩家持續投入。",
    p2: "從第一次轉動到中獎慶祝，我打造具有整體感的聲音景觀，讓你的遊戲在競爭激烈的市場中脫穎而出。",
    stats: [
      { value: "50+", label: "完成遊戲數" },
      { value: "10+", label: "合作工作室" },
      { value: "365", label: "天全年無休" },
    ],
  },
  services: {
    tag: "服務項目",
    title: "我能為您的遊戲做什麼",
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
      { type: "網頁設計", services: "網站設計與開發", tags: ["品牌官網", "響應式", "動態設計"] },
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
    title: "聲音背後的人",
    founderLabel: "創辦人暨作曲家",
    p1: "嗨，我是 Amber——一位古典音樂出身、轉型為遊戲音效專家的作曲家。在多年的作曲與演奏學習後，我發現了互動娛樂的世界，從此一頭栽入。",
    p2: "現在我專注於 iGaming 領域，為老虎機遊戲、真人賭場產品與宣傳內容打造獨特的聲音識別。我的音樂背景賦予我獨特的視角——我不只是設計聲音，我是在譜寫能觸動玩家情感的體驗。",
    toolsLabel: "工具與技術",
  },
  testimonials: {
    tag: "客戶推薦",
    title: "客戶怎麼說",
    items: [
      {
        quote:
          "Amber 為我們的老虎機遊戲打造了一首玩家真心喜愛的配樂。她對每一個中獎音效和獎勵觸發的細膩程度令人驚嘆。",
        name: "James Thompson",
        role: "創意總監",
        company: "Nexus Gaming",
        initials: "JT",
      },
      {
        quote:
          "與 Amber Yu Studio 的合作非常順暢。她立刻理解了我們的需求，交付的音效將整個玩家體驗提升到了新層次。",
        name: "Maria Kovacs",
        role: "產品負責人",
        company: "CasinoTech Studios",
        initials: "MK",
      },
    ],
  },
  contact: {
    title: "讓我們一起打造令人驚艷的遊戲音效",
    description:
      "無論您正在開發新的老虎機遊戲，還是想更新現有遊戲的音效，我都很樂意了解您的專案。歡迎聯繫，讓我們共同創造玩家難忘的體驗。",
    email: "hello@amberyustudio.com",
    location: "台灣台北 — 服務範圍遍及全球",
    form: {
      name: "姓名 *",
      company: "公司名稱 *",
      emailLabel: "電子郵件 *",
      platform: "遊戲平台",
      platformOptions: ["手機", "網頁", "實體機台", "跨平台", "其他"],
      details: "專案詳情",
      submit: "發送訊息",
      namePlaceholder: "您的姓名",
      companyPlaceholder: "工作室名稱",
      emailPlaceholder: "you@studio.com",
      detailsPlaceholder: "請描述您的遊戲和音效需求...",
      platformPlaceholder: "選擇平台",
    },
  },
  footer: {
    copyright: "Amber Yu Studio. 版權所有。",
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
        approach: "我從深入研究中國傳統樂器開始——古箏、二胡、笛子、琵琶——然後將它們與現代管弦樂編曲及細膩的電子紋理疊加。基本遊戲音樂使用 120 BPM 的五聲音階循環，而獎勵回合則過渡到以太鼓和完整弦樂組為主的恢弘電影配樂。每一個音效都與視覺粒子效果逐幀對齊。",
        result: "Fortune Dynasty 成為 Nexus Gaming 第一季表現最佳的遊戲。玩家平均遊戲時間比前一款作品提升了 23%，音效在玩家回饋中被特別提及為亮點功能。配樂後來在 2024 年 ICE London 展會的工作室宣傳影片中亮相。",
        assets: [
          { label: "音樂曲目", count: "12" },
          { label: "音效", count: "96" },
          { label: "氛圍音樂", count: "4" },
          { label: "過場音樂", count: "8" },
        ],
        testimonial: "Amber 以一種既現代又令人興奮的方式捕捉了中國神話的精髓。玩家不斷告訴我們，音效是 Fortune Dynasty 的最大亮點。",
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
        approach: "我使用刷鼓、立式貝斯、Rhodes 電鋼琴和加了弱音器的小號創作了一套模組化的爵士樂曲——全部錄製時特別注意動態範圍，確保能融入對話之下。音樂系統使用自適應音層：出牌時更安靜，下注階段則稍微豐富。荷官配音方面，我指導了三位母語配音員，專注於溫暖感和清晰度，然後對錄音進行處理以匹配實體攝影棚的空間音色。",
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
        approach: "我創作了一個主旋律主題——強有力的銅管與合唱動機——然後為每種獎勵模式衍生出五個變奏：沙漠探險（氛圍音樂 + 民族打擊樂）、古墓突襲（緊張弦樂 + 心跳脈動）、法老寢殿（莊嚴號角 + 豎琴）、聖甲蟲風暴（激進電子 + 失真元素）以及終極荷魯斯之眼彩金（60 人虛擬管弦樂團的完整高潮）。超過 120 個音效都設計了一致的音色特徵。宣傳預告片則獲得了獨立的 Dolby Atmos 空間混音。",
        result: "Golden Pharaoh 成為 Pharaoh Interactive 最成功的發行作品，在上線首月即登上全球老虎機排行榜第三名。G2E 預告片獲得了國際博弈獎最佳行銷內容的提名。客戶隨後又委託 Amber Yu Studio 製作了三款額外的遊戲。",
        assets: [
          { label: "音樂曲目", count: "18" },
          { label: "音效", count: "124" },
          { label: "配音台詞", count: "60" },
          { label: "預告片混音", count: "3" },
        ],
        testimonial: "這是我們最具野心的遊戲，Amber 交付的音效完美匹配了我們的願景。光是預告片就值回票價——它在 G2E 現場讓人駐足不前。",
        testimonialAuthor: "David Chen，執行長 — Pharaoh Interactive",
      },
      {
        client: "鹿飛 LuFei",
        clientRole: "一個立足台北的新銳生活風格品牌，融合台灣傳統工藝與當代設計美學。",
        genre: "品牌官網 / 響應式設計",
        year: "2025",
        platform: "手機 & 網頁",
        duration: "6 週",
        overview: "鹿飛 LuFei 需要一個能完美傳達品牌哲學的數位據點——如飛鹿般優雅而敏捷。網站同時作為品牌故事平台與電商入口，需要在編輯內容與產品展示之間實現跨裝置的無縫切換。",
        challenge: "品牌識別橫跨東方傳統與現代美學，這需要轉化為一個既不過於傳統、也不流於泛泛的網頁體驗。效能至關重要——網站需要在 4G 行動網路下 2 秒內載入，同時呈現豐富的動態設計與高解析度影像。",
        approach: "我設計了一套以自然動態為核心的視覺系統——以鹿的流暢動作為靈感的滾動觸發動畫，搭配以翡翠綠為點綴的大地色系。版面採用非對稱網格呈現編輯內容，簡潔的產品卡片用於電商區塊。使用 Next.js 實現伺服器端渲染，透過延遲載入、響應式圖片與自訂動態庫來保持套件精簡。",
        result: "新網站上線後獲得壓倒性好評，平均瀏覽時間達 4 分 30 秒——是品牌網站產業基準的 2.5 倍。行動端轉換率較先前的 Shopify 店面提升了 38%。網站入選台灣設計週數位展示。",
        assets: [
          { label: "介面頁面", count: "24" },
          { label: "動畫", count: "16" },
          { label: "圖示", count: "40" },
          { label: "風格指南", count: "2" },
        ],
        testimonial: "Amber 從第一天就理解了我們的願景。這個網站不只是好看——它像我們的品牌一樣會呼吸、會流動。客戶不斷告訴我們，這是他們在台灣見過最好的品牌官網。",
        testimonialAuthor: "林韋辰，創辦人 — 鹿飛 LuFei",
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
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, zh };
