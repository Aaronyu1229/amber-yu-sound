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
      { value: "10+", label: "Years in iGaming" },
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
      { type: "SLOT", services: "Music & Sound Design", tags: ["Horror", "Atmospheric", "Free Game"] },
      { type: "SLOT", services: "Music & Sound Design", tags: ["Asian Theme", "Festive", "High Energy"] },
      { type: "MEGAWAYS", services: "Full Audio Package", tags: ["Asian Theme", "Megaways", "Cascade"] },
      { type: "SLOT", services: "Music & Sound Design", tags: ["Aztec Theme", "Cinematic", "Adventure"] },
      { type: "POST-PRODUCTION", services: "Audio Post-Production", tags: ["Sound-to-Picture", "Mix", "Mastering"] },
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
      {
        quote:
          "For Amber, music and sound design have never been just an outsourced task — they are the soul that brings a product to life. She consistently delivers the most precise designs, seamlessly integrating every element of the product and completing the final, most critical piece of the puzzle. Highly recommended!",
        name: "Owen",
        role: "Brand Director",
        company: "iGaming Provider",
        initials: "O",
      },
      {
        quote:
          "Exceptionally professional! Dolce & Forte demonstrates outstanding command of rhythmic transitions and tonal fine-tuning, perfectly crafting the desired atmosphere. Working with them is a worry-free experience — their expert recommendations on music flow and pacing solve every pain point, delivering flawless results every time.",
        name: "Motion Designer",
        role: "Motion Design Team",
        company: "YILE Technology Co., Ltd.",
        initials: "YL",
      },
    ],
  },
  contact: {
    title: "Let's make your game sound incredible",
    description:
      "Whether you're developing a new slot title or refreshing an existing game's audio, we'd love to hear about your project. Reach out and let's create something players will remember.",
    email: "polanmusic2025@gmail.com",
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
        client: "Haunted Spirit",
        clientRole: "Spooky-themed slot built around restless spirits, candlelit corridors, and a trigger-on-fear free-game mode.",
        genre: "Horror / Atmospheric / Slot",
        year: "2025",
        platform: "Mobile & Web",
        duration: "6 weeks",
        overview: "Haunted Spirit is a horror-flavoured slot that lets players feel the chill before they see the symbols. The audio brief called for an atmosphere that hovers between unsettling and inviting — eerie enough to set the tone, but not so heavy it pushes players away from long sessions.",
        challenge: "Horror audio fatigues fast. We needed dread that survives a thousand spins, plus a free-game payoff that releases the tension without breaking the world. Layered ambience, restrained low-end, and carefully spaced 'reveals' were all on the table.",
        approach: "We built a base-game bed from breathy pads, sub-tonal whispers, and a slow-pulse heartbeat — quiet enough to hide behind reel SFX. Free-game mode swaps in a propulsive choir and modulated bells, signalling reward without abandoning the haunted vibe. Win stingers are designed as resolutions of the base ambience rather than departures from it.",
        result: "The horror tone tested strongly with the studio's target demographic, with players citing 'atmosphere' as the standout adjective in early feedback. The audio system was extended into a follow-up title that shares the same haunted universe.",
        assets: [
          { label: "Music Loops", count: "2" },
          { label: "Ambience Layers", count: "5" },
          { label: "Sound Effects", count: "50+" },
          { label: "Win Stingers", count: "8" },
        ],
        testimonial: "Watch the demo to feel the mood — the audio carries half the experience.",
        testimonialAuthor: "— Dolce & Forte",
      },
      {
        client: "Fortune Tiger Deluxe",
        clientRole: "Festive Asian-themed slot leaning into red, gold, and the energy of lunar new year — high tempo, bright timbres, and big-win payoffs.",
        genre: "Asian Theme / Festive / Slot",
        year: "2025",
        platform: "Mobile & Web",
        duration: "5 weeks",
        overview: "Fortune Tiger Deluxe is built around traditional lunar new year imagery and modern slot energy. Audio had to nail the festival-bright feel without slipping into pastiche — bright but never gaudy, energetic but never exhausting.",
        challenge: "Asian-themed slot music can fall into a familiar template fast. The brief was to feel unmistakably festive while sounding fresh — both for first-time players and for players who've heard a hundred lunar-themed titles. The win stingers also needed real impact without crossing into clipping or harshness.",
        approach: "We anchored the base game on bright suona and dizi melodies layered over driving percussion (taiko + clave) at 130 BPM. Ornaments were processed lightly with tape saturation to soften the high end. Free-game mode lifts to a wider mix with full string ensemble and choir hits. Win SFX use bell layers tuned to the music key, so wins always land in tune.",
        result: "Fortune Tiger Deluxe launched as one of the studio's strongest seasonal titles. Player feedback specifically called out the festive energy as a reason for repeat play during the lunar new year promotional window.",
        assets: [
          { label: "Music Tracks", count: "2" },
          { label: "Sound Effects", count: "70+" },
          { label: "Win Stingers", count: "12" },
          { label: "Ambience Layers", count: "3" },
        ],
        testimonial: "The festive energy lands every spin — that's what we hired Dolce & Forte for.",
        testimonialAuthor: "— Studio Producer",
      },
      {
        client: "Golden Piggy Megaways",
        clientRole: "Megaways slot with cascading wins, lucky-pig charm, and an audio system that rises with the cascade chain.",
        genre: "Megaways / Cascade / Asian Theme",
        year: "2025",
        platform: "Mobile & Web",
        duration: "8 weeks",
        overview: "Golden Piggy Megaways uses cascading wins to chain payouts together — and the audio system was designed to climb with them. Each cascade lifts the music, the SFX, and the player's anticipation in lock-step.",
        challenge: "Megaways gives audio a real opportunity and a real risk: rewarding chains feel incredible when audio escalates correctly, and they feel hollow when it doesn't. Each cascade level needed a distinguishable but coherent sound — and the system had to be cancel-friendly when the chain breaks.",
        approach: "We built a 5-tier audio escalation: each successful cascade adds an instrument layer (kalimba → strings → brass → choir → full ensemble) plus a higher-pitched stinger keyed to the music. When a cascade breaks, the layers gracefully fold back to the base — no abrupt cutoffs. The win stinger is reserved for resolution, so it always feels like a payoff.",
        result: "The cascade audio system was praised internally as a 'small-but-mighty' system that punches above its file count, and the title became a template for the studio's future Megaways releases.",
        assets: [
          { label: "Music Layers", count: "5" },
          { label: "Cascade Stingers", count: "5" },
          { label: "Sound Effects", count: "90+" },
          { label: "Win Resolutions", count: "10" },
        ],
        testimonial: "Watch the cascade build — that escalation is exactly the player feel we wanted.",
        testimonialAuthor: "— Studio Producer",
      },
      {
        client: "Golden Sun Aztec",
        clientRole: "Aztec-themed slot with cinematic ambition — broad orchestral textures, ceremonial percussion, and sun-temple imagery.",
        genre: "Aztec Theme / Cinematic / Adventure",
        year: "2025",
        platform: "Mobile & Web",
        duration: "7 weeks",
        overview: "Golden Sun Aztec leans into the cinematic side of slot audio. The game's iconography is grand — sun temples, golden masks, ceremonial dance — and the audio had to match that scale without slipping into generic 'adventure trailer' territory.",
        challenge: "Aztec-themed audio has been done many times. The risk is sounding like every other ancient-civilization slot. We needed instruments and rhythmic figures that felt grounded in the actual region, not in the trope.",
        approach: "We researched pre-Columbian percussion (huehuetl, teponaztli) and built a rhythm section around them, layered with low brass and breathy wood flutes. Free-game mode opens up the soundstage with a full string section and chant-like vocal layers. SFX took inspiration from natural materials — wood, stone, woven cloth — to keep the world feeling tactile rather than synthetic.",
        result: "The title received strong feedback for 'feeling different' from other Aztec-themed slots in the catalogue, and the audio system was reused with variations for a sequel set in the same universe.",
        assets: [
          { label: "Music Tracks", count: "2" },
          { label: "Sound Effects", count: "80+" },
          { label: "Vocal Layers", count: "4" },
          { label: "Win Stingers", count: "10" },
        ],
        testimonial: "It feels like an Aztec world, not an Aztec costume. That's the difference Dolce & Forte makes.",
        testimonialAuthor: "— Studio Producer",
      },
      {
        client: "Audio Post-Production Showcase",
        clientRole: "Selected reel demonstrating sound-to-picture workflow, cinematic mixing, and atmospheric design for on-screen content.",
        genre: "Sound-to-Picture / Mix / Mastering",
        year: "2025",
        platform: "Video",
        duration: "Ongoing",
        overview: "A short-form audio post-production reel showcasing our approach to sound-to-picture work — layered sound design, dialogue cleanup, music integration, and final mix for picture. The reel distills the same discipline we bring to slot game trailers, promotional content, and live-casino video assets.",
        challenge: "Post-production audio only works when every element sits in the right pocket — effects should punctuate the picture without stealing the eye, music should carry emotion without burying dialogue, and the final mix must hold up on everything from a flagship TV to a phone speaker on public transit.",
        approach: "We start by spotting the piece frame-by-frame and tagging every sync point — hits, transitions, and dialogue beats. Sound effects are built in layers (impact + sweetener + tail) for flexibility during the mix. Music is placed and edited to breathe around dialogue. The final mix is printed at broadcast-safe loudness with separate mobile-optimized stems where delivery requires it.",
        result: "The reel serves as a portable demonstration of our post-production capability for clients evaluating partners for trailer work, promotional videos, and in-game cinematics.",
        assets: [
          { label: "Mix Passes", count: "3+" },
          { label: "Sound Layers", count: "20+" },
          { label: "Dialogue Cleanup", count: "Full" },
          { label: "Deliverables", count: "Stereo / Stem" },
        ],
        testimonial: "Watch the reel on the right — the mix is the pitch.",
        testimonialAuthor: "— Dolce & Forte",
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
      { value: "10+", label: "iGaming 年資" },
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
      { type: "老虎機", services: "音樂與音效設計", tags: ["恐怖", "氛圍", "Free Game"] },
      { type: "老虎機", services: "音樂與音效設計", tags: ["東方節慶", "農曆新年", "高能量"] },
      { type: "MEGAWAYS", services: "全套音效方案", tags: ["東方主題", "Megaways", "連鎖中獎"] },
      { type: "老虎機", services: "音樂與音效設計", tags: ["阿茲特克", "電影感", "冒險"] },
      { type: "後期製作", services: "聲音後期製作", tags: ["聲畫同步", "混音", "母帶後期"] },
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
        description: "無需內部培訓，從開案就能全速投入。",
      },
      {
        title: "全流程支援",
        description: "從製作、修改到 QA 測試，每一個流程我們都陪你走到完成。",
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
      {
        quote:
          "對 Amber 而言，音樂與音效從來不是單純的「外包任務」，而是賦予產品生命力的靈魂。她總能用最精準的設計，完美整合產品的所有元素，補齊那最關鍵的最後一塊拼圖。強力推薦！",
        name: "Owen",
        role: "品牌總監",
        company: "iGaming 供應商",
        initials: "O",
      },
      {
        quote:
          "展現超強專業度！Dolce & Forte 對節奏切換與音色微調的掌握度極佳，完美營造氛圍。與他們合作很放心！團隊對音樂銜接的專業建議完美解決痛點，成品無可挑剔。",
        name: "動態影像設計師",
        role: "Motion Design 團隊",
        company: "奕樂科技股份有限公司",
        initials: "YL",
      },
    ],
  },
  contact: {
    title: "讓我們一起打造令人驚艷的遊戲音效",
    description:
      "無論您正在開發新的老虎機遊戲，還是想更新現有遊戲的音效，我們都很樂意了解您的專案。歡迎聯繫，讓我們共同創造玩家難忘的體驗。",
    email: "polanmusic2025@gmail.com",
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
        client: "Haunted Spirit 鬼魅幽靈",
        clientRole: "以鬼魅遊魂、燭光走廊與「恐懼觸發」Free Game 模式為核心的恐怖風老虎機。",
        genre: "恐怖氛圍 / 老虎機",
        year: "2025",
        platform: "手機 & 網頁",
        duration: "6 週",
        overview: "Haunted Spirit 是一款讓玩家還沒看到符號就先感到寒意的恐怖風老虎機。音效要求介於令人不安與引人入勝之間——足以營造氛圍，但又不能沉重到讓玩家放棄長時間遊戲。",
        challenge: "恐怖音效很容易讓人疲乏。我們需要那種能撐過上千次旋轉的恐懼感，加上能在不破壞世界觀前提下釋放張力的 Free Game 高潮。多層次氛圍、克制的低頻、以及精準節制的「揭露」時機都得仔細調整。",
        approach: "基本遊戲鋪上呼吸感的 Pad、低頻耳語與緩慢心跳節拍——安靜地隱身於轉軸音效之後。Free Game 切換到具推進感的合唱與調變鈴聲，傳達獎勵氛圍但不脫離鬼魅基調。大獎音樂以大調調性搭配正向光明的音色，透過音樂型音效精準對位中獎階層切換畫面的節奏，讓每一層獎勵都有清晰的聽覺回饋。",
        result: "恐怖基調在工作室目標族群測試中表現強勁，玩家在初期回饋裡特別點名「氛圍」是最突出的詞彙。音效系統後來延伸到續作中，共享同一個鬼魅宇宙。",
        assets: [
          { label: "音樂循環", count: "2" },
          { label: "氛圍音層", count: "5" },
          { label: "音效", count: "50+" },
          { label: "中獎音效", count: "8" },
        ],
        testimonial: "看那段 demo 就能感受到氛圍——音效本身就承擔了一半的體驗。",
        testimonialAuthor: "— Dolce & Forte",
      },
      {
        client: "Fortune Tiger Deluxe 招財虎豪華版",
        clientRole: "強調紅金色調與農曆新年能量的東方節慶主題老虎機，高節奏、明亮音色、強勁中獎回饋。",
        genre: "東方節慶 / 老虎機",
        year: "2025",
        platform: "手機 & 網頁",
        duration: "5 週",
        overview: "Fortune Tiger Deluxe 圍繞傳統農曆新年意象與現代老虎機能量打造。音效要傳達節慶的明亮感，但不能流於套路——亮而不俗、活力十足又不至於讓人疲憊。",
        challenge: "東方主題老虎機音樂很容易掉進熟悉的範本。任務是要既明顯帶有節慶氛圍、又能聽起來新鮮——對首次接觸的玩家、對聽過上百款農曆主題遊戲的玩家都成立。中獎音效也得有真實衝擊力而不削峰、不刺耳。",
        approach: "主遊戲以中國笛、古箏旋律疊在 130 BPM 的流行音樂編制裡，以爵士鼓融合傳統打擊樂為基底。主旋律以磁帶飽和輕度的合成器處理柔化高頻。Free Game 模式以原曲為基底拉開混音空間，加入完整 Synth Sequence 及電子音樂鼓組，呈現更強烈的張力及遊戲氛圍。連線音效採用與 BGM 同主調短促的音樂型音效，讓每次中獎都「在調上」。",
        result: "Fortune Tiger Deluxe 成為工作室最強勢的季節性作品之一。玩家回饋特別點名節慶能量是農曆新年檔期重複遊玩的主因。",
        assets: [
          { label: "音樂曲目", count: "2" },
          { label: "音效", count: "70+" },
          { label: "中獎音效", count: "12" },
          { label: "氛圍音層", count: "3" },
        ],
        testimonial: "節慶能量每次旋轉都到位——這就是我們找 Dolce & Forte 的原因。",
        testimonialAuthor: "— 工作室製作人",
      },
      {
        client: "Golden Piggy Megaways 黃金小豬 Megaways",
        clientRole: "Megaways 老虎機，以連鎖中獎與幸運小豬為主軸，音效系統會隨著連鎖層級往上堆疊。",
        genre: "Megaways / 連鎖機制 / 東方主題",
        year: "2025",
        platform: "手機 & 網頁",
        duration: "8 週",
        overview: "Golden Piggy Megaways 透過連鎖中獎把回饋串在一起——音效系統就是為了與這個機制同步上升而設計。每一段連鎖把音樂、音效與玩家的期待感同步往上推。",
        challenge: "Megaways 為音效帶來了真正的機會也帶來真正的風險：當音效正確堆疊時，連鎖中獎感覺無比爽快；做不好就空洞。每一層連鎖需要既能辨識又彼此連貫的聲音，並且在連鎖中斷時要能優雅收回。",
        approach: "我們建立了一套 5 層音效堆疊系統：每次成功連線及消除時會升高音階，以提高消除 Symbol 時的體感，加上一個調性對應主旋律的高音中獎音效。當連鎖中斷時，音層會優雅地折回基底——不會突兀切斷。中獎主要音效保留給最終結算，因此每次中獎都像真正的回報。",
        result: "連鎖音效系統內部被讚譽為「以小搏大」的標竿，並成為工作室未來 Megaways 系列作品的範本。",
        assets: [
          { label: "音樂層數", count: "5" },
          { label: "連鎖音效", count: "5" },
          { label: "音效", count: "90+" },
          { label: "中獎結算音", count: "10" },
        ],
        testimonial: "看連鎖堆疊的過程——那個推進感正是我們想要的玩家體驗。",
        testimonialAuthor: "— 工作室製作人",
      },
      {
        client: "Golden Sun Aztec 黃金太陽 阿茲特克",
        clientRole: "阿茲特克主題老虎機，具備電影感企圖心——寬廣管弦樂質感、儀式性打擊樂、太陽神殿意象。",
        genre: "阿茲特克 / 電影感 / 冒險",
        year: "2025",
        platform: "手機 & 網頁",
        duration: "7 週",
        overview: "Golden Sun Aztec 偏向老虎機音效的電影感面向。遊戲視覺氣勢宏大——太陽神殿、黃金面具、儀式舞蹈——音效必須匹配這個規模，又不能落入「通用冒險預告片」的套路。",
        challenge: "阿茲特克主題音效已被做過很多次。風險就是聽起來和其他古文明老虎機一樣。我們需要的樂器與節奏型必須真正紮根於該地區，而不是停留在刻板印象。",
        approach: "我們研究了哥倫布之前的打擊樂器（huehuetl、teponaztli），以此打造節奏部，疊上低音銅管與氣音木笛。Free Game 模式拉開聲場，加入完整弦樂群與類吟唱人聲層。音效靈感取自天然材質——木、石、編織布——讓世界感覺有質感而不合成。",
        result: "這款作品獲得「與其他阿茲特克主題老虎機感覺不同」的強烈回饋，音效系統後來被改寫變奏用於同宇宙的續作。",
        assets: [
          { label: "音樂曲目", count: "2" },
          { label: "音效", count: "80+" },
          { label: "人聲層", count: "4" },
          { label: "中獎音效", count: "10" },
        ],
        testimonial: "感覺像個阿茲特克世界，而不是阿茲特克的外殼。這就是 Dolce & Forte 帶來的差別。",
        testimonialAuthor: "— 工作室製作人",
      },
      {
        client: "聲音後期製作 精選集",
        clientRole: "展現聲畫同步工作流程、電影級混音與氛圍設計能力的精選影音作品。",
        genre: "聲畫同步 / 混音 / 母帶後期",
        year: "2025",
        platform: "影音",
        duration: "持續更新",
        overview: "一段短篇聲音後期精選集，展示我們處理聲畫同步的方式——堆疊式音效設計、對白修飾、音樂整合，以及最終的畫面定位混音。這段精選濃縮了我們應用於老虎機預告片、宣傳內容與真人賭場影片素材的相同功力。",
        challenge: "後期製作的音效只有在每個元素都放對位置時才會真正奏效——音效要點綴畫面而不搶鏡、音樂要承載情緒而不埋沒對白、最終混音要能在旗艦電視到公車上的手機喇叭都撐得住。",
        approach: "我們逐格檢視影片、標記每一個同步點（撞擊、轉場、對白節拍）。音效以分層方式製作（主體 + 點綴 + 尾韻）讓混音階段有更大彈性。音樂擺放與剪輯都刻意讓出對白呼吸空間。最終混音以符合廣播安全音量標準輸出，必要時另外製作行動裝置優化版本。",
        result: "這段精選作為可攜帶的後期製作能力展示，讓正在評估預告片、宣傳影片與遊戲內過場製作夥伴的客戶能快速看見我們的實力。",
        assets: [
          { label: "混音修改次數", count: "3+" },
          { label: "音層數", count: "20+" },
          { label: "對白修飾", count: "全面" },
          { label: "交付格式", count: "Stereo / Stem" },
        ],
        testimonial: "往右看這支精選——混音本身就是最好的提案。",
        testimonialAuthor: "— Dolce & Forte",
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
