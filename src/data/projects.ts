export interface CaseStudySection {
  title: string;
  subtitle?: string;
  description: string;
  items?: string[];
  metrics?: { label: string; value: string }[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  badge: string;
  shortDescription: string;
  image: string;
  technologies: string[];
  featured: boolean;
  order: number;
  client?: string;
  timeline?: string;
  role?: string;
  liveUrl?: string;
  challenge: string;
  designDirection: {
    typography: string;
    colors: { name: string; hex: string }[];
    layoutDescription: string;
    visualLanguage: string;
  };
  keySections: {
    title: string;
    description: string;
    features: string[];
  }[];
  finalResult: {
    summary: string;
    desktopVisual: string;
    metrics: { label: string; value: string }[];
  };
}

export const PROJECTS: Project[] = [
  {
    slug: "manav-rachna-times",
    name: "Manavrachna Times — News Platform",
    tagline: "Official Digital News & Broadcast Platform of Manav Rachna University",
    category: "Full-Stack News Portal",
    badge: "Full-Stack Publication",
    shortDescription: "Full-stack digital news publication built with Next.js 15, React 19, Express.js API, Prisma ORM, dual-token JWT security, and automated VPS disaster recovery.",
    image: "/projects/editorial.jpg",
    technologies: ["Next.js 15", "React 19", "Express.js", "Node.js", "Prisma", "SQLite", "Tailwind CSS", "Framer Motion", "Nginx", "PM2", "Bcrypt", "JWT"],
    featured: true,
    order: 1,
    client: "Manav Rachna University",
    timeline: "4 Weeks",
    role: "Full-Stack Architect & Lead Developer",
    liveUrl: "https://manavrachnatimes.com/",
    challenge: "Manav Rachna University required a secure, high-performance digital news publication to host campus news, student voices, MR TV video broadcasts, podcasts, and official university announcements. Key engineering requirements included building a decoupled Next.js 15 + Express.js architecture, dual-token JWT authentication with HttpOnly refresh cookies, zero hardcoded credentials, IP-based lockout protection, and automated daily VPS backups with a rolling 3-day retention policy.",
    designDirection: {
      typography: "Outfit & Inter Sans for modern, high-contrast digital journalism, clear metadata hierarchy, and responsive reading.",
      colors: [
        { name: "Obsidian Dark", hex: "#0F172A" },
        { name: "Cyan Accent", hex: "#38BDF8" },
        { name: "Emerald Signal", hex: "#10B981" },
        { name: "Slate Border", hex: "#1E293B" }
      ],
      layoutDescription: "Multi-channel news portal architecture featuring Beyond Campus (Current Affairs, Lifestyle, Sports), Campus Buzz, Social Buzz, MR TV Broadcasts, MR Podcast, Student Voices, Photo Gallery, and Official Announcements.",
      visualLanguage: "High-performance press style combining dark glassmorphism, real-time SSR article delivery, and an integrated /admin editorial management panel."
    },
    keySections: [
      {
        title: "01. Site Structure & Content Channels",
        description: "Organized into 10 distinct content sections: Beyond Campus (Current Affairs, Entertainment & Lifestyle, Sports), Campus Buzz, Social Buzz, MR TV (video broadcasts), MR Podcast (audio shows), Student Voices, Photo Gallery, Official Announcements, About Us, and Contact.",
        features: ["MR TV & MR Podcast broadcast suites", "Student Voices opinion submission portal", "Official University Announcement ticker"]
      },
      {
        title: "02. Decoupled Next.js 15 + Express.js Architecture",
        description: "Built with Next.js 15 App Router (TypeScript, Tailwind CSS, Framer Motion) on the frontend and Node.js + Express.js API on the backend with Prisma ORM and SQLite, deployed on VPS via Nginx reverse proxy and PM2 process manager.",
        features: ["Integrated /admin panel for article creation & editorial controls", "Dual-token JWT auth (Access Token + HttpOnly Refresh Cookie)", "Input sanitization (sanitize-html) & Multer upload security"]
      },
      {
        title: "03. Security & Zero Hardcoded Credentials",
        description: "Strict environment security with all credentials stored in .env files, dynamic password seeding with salted Bcrypt hashes (12 rounds), failed login tracking with IP-based lockout protection, and UFW network firewall isolation.",
        features: ["Bcrypt 12-round salted hashing & IP lockout protection", "Dynamic password seeding with process.env or 16-byte random hex", "Strict Multer MIME-type and extension upload validation"]
      },
      {
        title: "04. Automated VPS Backups & Disaster Recovery",
        description: "Automated daily backup system running at 02:00 AM via Cron (/root/vps_backups/auto_daily_backup.sh) backing up SQLite dev.db snapshots, .env configs, full codebase tar archives, and Git metadata with rolling 3-day retention and 1-click restore.",
        features: ["Daily 02:00 AM automated SQLite DB & code backups", "Rolling 3-day retention policy with automatic purge", "One-click restoration script (/root/vps_backups/latest/restore.sh)"]
      }
    ],
    finalResult: {
      summary: "Engineered a production-ready digital news publication for Manav Rachna University featuring 10+ custom content channels, zero-downtime PM2 process management, enterprise-grade JWT security, and automated disaster recovery.",
      desktopVisual: "/projects/editorial.jpg",
      metrics: [
        { label: "Frontend & API Stack", value: "Next.js 15 + Express" },
        { label: "Security Level", value: "Dual-Token JWT" },
        { label: "Backup Retention", value: "Rolling 3-Day" },
        { label: "Core Web Vitals", value: "100/100" }
      ]
    }
  },
  {
    slug: "mrisa",
    name: "MRISA — Security Event Platform",
    tagline: "Full-stack cybersecurity event management, dynamic registration & admin operations platform",
    category: "Full-Stack Security Platform",
    badge: "Full-Stack & MongoDB",
    shortDescription: "Full-stack cybersecurity event management platform with React 18, Node.js API, MongoDB persistence, Bcrypt/token auth, dynamic form builders, team registration, and winner tracking.",
    image: "/projects/mrisa.jpg",
    technologies: ["React 18", "TypeScript", "Node.js", "MongoDB", "Express.js", "Three.js", "TanStack Query", "Tailwind CSS", "Zod", "Bcrypt", "JWT", "Recharts"],
    featured: true,
    order: 2,
    client: "MRISA Community",
    timeline: "5 Weeks",
    role: "Full-Stack Security Architect",
    liveUrl: "https://mrisa-8nrr.vercel.app/",
    challenge: "MRISA required a secure, multi-tier platform for managing cybersecurity events, participant registrations, team submissions, competition winners, and administrative operations. Engineering requirements included building a dynamic registration form builder with customizable fields per event, team/organization member validation with Aadhaar format checks, duplicate transaction protection via normalized t_norm indexing, token-based administrator authentication with salted Bcrypt password verification, and real-time MongoDB database persistence.",
    designDirection: {
      typography: "JetBrains Mono & Inter for technical clarity, cybersecurity aesthetics, and administrative precision.",
      colors: [
        { name: "Midnight Cyber", hex: "#060911" },
        { name: "Cyan Terminal", hex: "#38BDF8" },
        { name: "Emerald Signal", hex: "#10B981" },
        { name: "Slate Border", hex: "#1E293B" }
      ],
      layoutDescription: "Multi-tier architecture separating public participant routes (/events, /winners, /team, /community-partners) from protected administrator portals (/dashboard, /admin/events, /admin/winners, /admin/registrations, /admin/submissions).",
      visualLanguage: "Cybersecurity visual system powered by Three.js + React Three Fiber 3D grid scene, Framer Motion transitions, and Radix UI accessible primitives."
    },
    keySections: [
      {
        title: "01. Full-Stack Node.js + MongoDB Data Layer",
        description: "Centralized MongoDB persistence layer (mongo.ts) handling admin_users, events, registrations, winners, contact_messages, and app_meta collections with automated seed (/api/seed) and health check (/api/health) endpoints.",
        features: ["MongoDB persistence with centralized mongo.ts helper", "Automated database seed script with seed marker protection", "Deployment availability health checks (/api/health)"]
      },
      {
        title: "02. Dynamic Registration & Team Validation Engine",
        description: "Dynamic form builder (RegistrationFormBuilder.tsx) allowing event-specific field definitions, team/organization category processing, member Aadhaar verification, and duplicate transaction protection.",
        features: ["Event-customizable registration form builder", "Organization/team member validation pipeline", "Duplicate transaction ID detection via normalized t_norm hash checking"]
      },
      {
        title: "03. Role-Based Admin Operations & Auth",
        description: "Token-based admin login (/api/auth.ts) with 12-round salted Bcrypt password verification, ProtectedRoute frontend route wrappers, and full event, winner, and submission CRUD controllers.",
        features: ["Salted Bcrypt password verification & token generation", "ProtectedRoute frontend guard wrapping admin dashboards", "Complete Event, Winner, and Submission management interfaces"]
      },
      {
        title: "04. Interactive 3D Cyber Scene Layer",
        description: "Embedded WebGL canvas (Scene3D.tsx) using Three.js, @react-three/fiber, Drei, and post-processing to create an interactive 3D cyber grid aesthetic.",
        features: ["Three.js + React Three Fiber WebGL scene", "Custom post-processing bloom & particle physics", "Cybersecurity visual atmosphere"]
      }
    ],
    finalResult: {
      summary: "Engineered a production-ready cybersecurity event management platform that processes participant registrations with zero-duplicate integrity, team workflows, and comprehensive admin controls.",
      desktopVisual: "/projects/mrisa.jpg",
      metrics: [
        { label: "Database Layer", value: "MongoDB Persistent" },
        { label: "Data Integrity", value: "Zero Duplicates" },
        { label: "Auth Hashing", value: "Bcrypt Salted" },
        { label: "Form Flexibility", value: "100% Dynamic" }
      ]
    }
  },
  {
    slug: "ofc",
    name: "OFC — Brand & Event Platform",
    tagline: "Next.js 15 App Router platform with Lenis smooth scrolling & fighter registration",
    category: "Next.js 15 Web Experience",
    badge: "Next.js 15 & Motion",
    shortDescription: "Modern Next.js 15 & React 19 brand and event platform featuring Lenis smooth scroll, Framer Motion, Cage visual patterns, and Zod-validated fighter registrations.",
    image: "/projects/ofc.jpg",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis Scroll", "React Hook Form", "Zod", "Radix UI", "Turbopack"],
    featured: true,
    order: 3,
    client: "OFC Global",
    timeline: "3 Weeks",
    role: "Frontend Architect & Motion Developer",
    liveUrl: "https://ofc-work.vercel.app/",
    challenge: "OFC required an ultra-premium brand and event experience to showcase organization fighters, fight night events, countdown timers, and structured athlete application workflows. Key requirements included building a modular Next.js 15 App Router architecture, zero-jank Lenis inertia smooth scrolling, custom Cage Pattern brand visual systems, and type-safe React Hook Form + Zod fighter registration pipelines.",
    designDirection: {
      typography: "Space Grotesk & Inter for bold athletic authority, high-impact headlines, and clean form inputs.",
      colors: [
        { name: "Void Dark", hex: "#06080D" },
        { name: "Electric Cyan", hex: "#06B6D4" },
        { name: "Neon Magenta", hex: "#D946EF" },
        { name: "Slate Glass", hex: "#1E293B" }
      ],
      layoutDescription: "Immersive full-screen visual layout with sticky header navigation, cage pattern backdrop overlays, stats counters, and slide-over registration drawers.",
      visualLanguage: "High-octane sports brand aesthetic powered by Framer Motion scroll animations, Lenis smooth scrolling, and Radix UI accessible primitives."
    },
    keySections: [
      {
        title: "01. Next.js 15 App Router Architecture",
        description: "File-system App Router structure (src/app) with dedicated pages for /, /events, /contact, /gallery-contact, shared layout shell (layout.tsx), and controlled error handling (error.tsx, not-found.tsx).",
        features: ["Next.js 15 App Router file-system routing", "Shared global layout shell with sticky navigation", "Custom error.tsx & not-found.tsx fallback boundaries"]
      },
      {
        title: "02. Lenis Smooth Scroll & Framer Motion Pipeline",
        description: "Inertia-based smooth scrolling via Lenis paired with Framer Motion viewport animation triggers, fade-in reveals, and custom Cage Pattern graphic component layers.",
        features: ["Lenis smooth scroll inertia integration", "Framer Motion scroll reveal animations", "Reusable Cage Pattern visual component"]
      },
      {
        title: "03. Fighter Registration Pipeline (React Hook Form + Zod)",
        description: "Type-safe athlete application form (fighter-registration-form.tsx) utilizing React Hook Form for state management and Zod schemas (@hookform/resolvers) for input validation.",
        features: ["React Hook Form state management", "Zod schema-driven input validation", "Structured athlete credential & stats processing"]
      },
      {
        title: "04. Event Countdown & Stats Component Suite",
        description: "Reusable component suite including countdown-timer.tsx for fight night urgency, stats-section.tsx for organization metrics, and logo branding primitives.",
        features: ["Live ticking event countdown timer", "Reusable quantitative statistics section", "Modular design system primitives"]
      }
    ],
    finalResult: {
      summary: "Architected a Next.js 15 brand ecosystem that delivered sub-second page rendering, 60fps smooth scrolling, and seamless fighter registration processing.",
      desktopVisual: "/projects/ofc.jpg",
      metrics: [
        { label: "Framework Stack", value: "Next.js 15 App Router" },
        { label: "Scroll Smoothness", value: "60 FPS Locked" },
        { label: "Form Validation", value: "React Hook Form + Zod" },
        { label: "Build Engine", value: "Turbopack" }
      ]
    }
  },
  {
    slug: "techevent-hq",
    name: "BSides Dharamshala & Event HQ",
    tagline: "Tactical cybersecurity conference platform with interactive Command HUD & CTF engine",
    category: "Cybersecurity & Interactive",
    badge: "Security & Tactical HUD",
    shortDescription: "Interactive cybersecurity conference & CTF platform featuring a command-center HUD, command palette (Cmd+K), CTF challenge modals, live weather radar, and custom Matrix theme engine.",
    image: "/projects/techevent.jpg",
    technologies: ["React 19", "Vite 6", "React Router 7", "Anime.js 4", "Lucide React", "Tailwind CSS", "Zod", "date-fns", "Embla Carousel", "Custom CSS"],
    featured: true,
    order: 4,
    client: "BSides Dharamshala",
    timeline: "4 Weeks",
    role: "Lead Frontend Security Architect",
    liveUrl: "https://test-chi-five-13.vercel.app/",
    challenge: "BSides Dharamshala needed a tactical command-center web platform to host cybersecurity talks, CTF competitions, workshop tracks, speaker submissions (CFP), and volunteer applications (CFV). Key requirements included building an application-like command interface with keyboard shortcuts (Cmd+K Command Palette), live mountain weather telemetry, radar overlays, Konami Code Easter eggs, and dynamic theme switching (Matrix Rain, Reader, and Low-Power modes).",
    designDirection: {
      typography: "JetBrains Mono & Orbitron for tactical terminal aesthetics, telemetry readouts, and cyber HUD controls.",
      colors: [
        { name: "Terminal Black", hex: "#07090E" },
        { name: "Red Warning Glow", hex: "#EF4444" },
        { name: "Cyan Telemetry", hex: "#38BDF8" },
        { name: "Matrix Green", hex: "#22C55E" }
      ],
      layoutDescription: "Tactical command-center architecture featuring floating HUD widgets, slide-over CTF challenge modals, live weather widgets, and terminal overlays.",
      visualLanguage: "Cyberpunk tactical aesthetic with Anime.js physics timelines, Matrix rain particle canvas, Konami code triggers, and 3,900+ lines of custom CSS controls."
    },
    keySections: [
      {
        title: "01. Command-Center HUD & Command Palette (Cmd+K)",
        description: "Interactive command HUD (CommandHUD.jsx, CommandPaletteModal.jsx) supporting keyboard-driven navigation, theme switching, CTF challenge launching, and weather telemetry checks.",
        features: ["Cmd+K keyboard command palette modal", "Konami Code Easter egg trigger (↑↑↓↓←→←→BA)", "Interactive admin terminal interface modal"]
      },
      {
        title: "02. CTF Challenge Engine & Interactive Modals",
        description: "Dedicated CTF challenge suite (CTFSection.jsx, CTFChallengeModal.jsx) displaying cybersecurity challenges with difficulty indicators, category tags, points, and modal interaction.",
        features: ["Interactive CTF challenge catalog & modal details", "Category & difficulty filtering pipeline", "Cybersecurity challenge submissions UI"]
      },
      {
        title: "03. Dharamshala Telemetry & Radar Suite",
        description: "Contextual location suite including DharamshalaTempWidget.jsx, WeatherHUDModal.jsx, VenueRadarModal.jsx, and mountain snow/matrix particle overlays.",
        features: ["Dharamshala live weather telemetry widget", "Tactical venue radar modal interface", "Matrix Rain & Himalayan snow canvas particle effects"]
      },
      {
        title: "04. App Router Structure & Lazy Code Splitting",
        description: "Modular route structure for /events, /workshops, /schedule, /sponsors, /faq, and /contact with 100% React.lazy() page code splitting and Suspense loading fallbacks.",
        features: ["React.lazy() & Suspense route code-splitting", "Dedicated Workshops, Schedule, Sponsor & FAQ routes", "Custom theme, Reader mode, and Low-Power performance toggles"]
      }
    ],
    finalResult: {
      summary: "Engineered an interactive cybersecurity conference platform blending tactical application UX with high-performance React 19 architecture and code-split route lazy loading.",
      desktopVisual: "/projects/techevent.jpg",
      metrics: [
        { label: "UI Experience", value: "Tactical Command HUD" },
        { label: "Command Shortcut", value: "Cmd + K Palette" },
        { label: "Animation Library", value: "Anime.js 4" },
        { label: "Page Code Splitting", value: "100% Lazy Loaded" }
      ]
    }
  },
  {
    slug: "event-platform",
    name: "Spectrum 2026 — Event Platform",
    tagline: "Modern Next.js 15 event management & promotion platform",
    category: "Next.js 15 Event Architecture",
    badge: "Next.js 15 & Radix UI",
    shortDescription: "Modern event management & promotion web application built with Next.js 15 App Router, React 19, TypeScript, Radix UI primitives, React Hook Form + Zod validation, and Framer Motion animations.",
    image: "/projects/event.jpg",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Radix UI", "Framer Motion", "React Hook Form", "Zod", "Lucide React", "date-fns", "Embla Carousel", "Handlebars", "Vercel"],
    featured: true,
    order: 5,
    client: "Spectrum 2026 Team",
    timeline: "3 Weeks",
    role: "Full-Stack Next.js Architect",
    liveUrl: "https://event-pi-beige.vercel.app/",
    challenge: "Spectrum 2026 required a dedicated modern event management and promotion web application to host main event details, workshop tracks, schedules, sponsor portals, interactive FAQs, and structured attendee registration workflows. Key engineering requirements included building a modular Next.js 15 App Router architecture, reusable layout shells, accessible Radix UI primitives, React Hook Form + Zod validation pipelines, and audio-visual atmospheric enhancements.",
    designDirection: {
      typography: "Inter & Outfit for high-contrast event marketing, clear temporal hierarchy, and accessible registration inputs.",
      colors: [
        { name: "Electric Blue", hex: "#3B82F6" },
        { name: "Void Dark", hex: "#07090E" },
        { name: "Cyan Signal", hex: "#38BDF8" },
        { name: "Slate Glass", hex: "#1E293B" }
      ],
      layoutDescription: "Modular App Router architecture featuring dedicated route segments for /events, /workshops, /schedule, /sponsors, /faq, and /contact wrapped inside a shared global layout shell.",
      visualLanguage: "High-impact dark mode visual language powered by Framer Motion entrance animations, Embla interactive carousels, background audio atmosphere, and Radix UI accessible primitives."
    },
    keySections: [
      {
        title: "01. App Router Modular Architecture",
        description: "File-system App Router structure (src/app) with dedicated pages for /events, /workshops, /schedule, /sponsors, /faq, and /contact with shared layout shell (layout.tsx) and controlled error boundaries (error.tsx, not-found.tsx).",
        features: ["App Router file-system route separation", "Shared layout shell for global navigation & metadata", "Custom error.tsx & not-found.tsx fallback boundaries"]
      },
      {
        title: "02. Registration Engine (React Hook Form + Zod)",
        description: "Type-safe attendee application form (registration-form.tsx) utilizing React Hook Form for state management and Zod schemas (@hookform/resolvers) for input validation.",
        features: ["React Hook Form state & error tracking", "Zod schema-driven input validation", "Validated form data pipeline"]
      },
      {
        title: "03. Radix UI Accessible System & Motion",
        description: "Extensive Radix UI dependency primitive integration (Accordion, Dialog, Tabs, Dropdown, Toast) paired with Tailwind CSS styling and Framer Motion interactive animations.",
        features: ["Radix UI WAI-ARIA accessible primitives", "Tailwind CSS design token system", "Framer Motion viewport scroll animations"]
      },
      {
        title: "04. Atmospheric Audio & Visual Layer",
        description: "Unique audio-visual experience layer featuring background audio controls (background-audio.tsx), custom background treatment (asmr-background.tsx), and Embla carousel content sliders.",
        features: ["Background audio atmosphere controls", "Custom ASMR visual background layer", "Embla interactive content carousels"]
      }
    ],
    finalResult: {
      summary: "Engineered a Next.js 15 event platform that separates multi-activity event schedules and workshops into clean App Router segments with zero accessibility compromises and type-safe registration.",
      desktopVisual: "/projects/event.jpg",
      metrics: [
        { label: "Framework Stack", value: "Next.js 15 App Router" },
        { label: "Validation Engine", value: "React Hook Form + Zod" },
        { label: "UI System", value: "Radix UI + Tailwind" },
        { label: "Deployment Host", value: "Vercel" }
      ]
    }
  }
];
