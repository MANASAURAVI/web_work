export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  positioning: string;
  description: string;
  deliverables: string[];
  suitableFor: string[];
  exampleStructure?: string[];
  category: 'Website' | 'SaaS' | 'Landing' | 'Product UI' | 'Optimization' | 'Ongoing';
  iconName: string;
}

export interface Package {
  name: string;
  badge: string;
  target: string;
  features: string[];
  pricingText: string;
  highlighted?: boolean;
}

export const SERVICES: Service[] = [
  {
    id: "website-design-development",
    number: "01",
    title: "Website Design & Development",
    tagline: "Complete websites from concept to production launch.",
    positioning: "Your website is often the first interaction someone has with your company. We design and build websites that make your product easy to understand and your company easy to trust.",
    description: "End-to-end website creation that combines strategic UI/UX design with clean frontend engineering. I handle everything from initial sitemaps and wireframes to responsive coding and deployment.",
    category: "Website",
    iconName: "Layout",
    deliverables: [
      "Website structure & sitemap planning",
      "UX wireframes & interactive Figma prototype",
      "Custom visual direction, typography & color system",
      "Responsive desktop, tablet & mobile layouts",
      "Conversion-focused page architecture",
      "Pixel-perfect React & Tailwind development",
      "Animations, micro-interactions & form setups",
      "SEO fundamentals & production deployment"
    ],
    suitableFor: [
      "Startups & SaaS companies",
      "AI & Fintech platforms",
      "Cybersecurity & Tech agencies",
      "Growing B2B businesses",
      "Executive personal brands"
    ]
  },
  {
    id: "saas-startup-websites",
    number: "02",
    title: "SaaS & Startup Websites",
    tagline: "Product-focused websites for technology companies.",
    positioning: "Launch your product with a website that explains what you built and why customers should care.",
    description: "Tailored specifically for software and technology startups launching new products. I translate complex technical capabilities into scannable, persuasive product pages that convert visitors into active users.",
    category: "SaaS",
    iconName: "Rocket",
    deliverables: [
      "Product showcase homepage",
      "Feature & capability breakdown pages",
      "Transparent pricing page architecture",
      "Use cases & target industry pages",
      "Integration & partner showcase pages",
      "Documentation landing page design",
      "Waitlist & demo booking funnels",
      "Interactive product preview widgets"
    ],
    suitableFor: [
      "Early-stage & Series A SaaS startups",
      "AI tools & developer platforms",
      "Fintech & Web3 applications",
      "Product-led growth (PLG) companies"
    ],
    exampleStructure: [
      "Homepage",
      "Product Features",
      "Use Cases",
      "Integrations",
      "Pricing Tier Grid",
      "About / Team",
      "Contact / Demo Request"
    ]
  },
  {
    id: "landing-pages",
    number: "03",
    title: "Landing Pages",
    tagline: "Focused landing pages for launches, campaigns, and products.",
    positioning: "One focused page built around one goal. The fastest way to validate demand, capture leads, or launch a product.",
    description: "High-converting single-page websites designed for specific campaigns, product launches, or lead generation. Built to maximize conversion momentum without rebuilding your entire web presence.",
    category: "Landing",
    iconName: "Target",
    deliverables: [
      "High-converting Hero & value proposition section",
      "Problem-solution narrative breakdown",
      "Interactive feature cards & ROI calculators",
      "Social proof, logo wall & testimonial blocks",
      "Form integration (HubSpot, Mailchimp, Typeform, etc.)",
      "A/B testing-ready layout structure",
      "Sub-second page load speed",
      "Rapid 1 to 2-week execution timeline"
    ],
    suitableFor: [
      "Product launches & feature drops",
      "Waitlist & stealth mode announcements",
      "Ad campaign landing destinations",
      "Virtual events & web conferences"
    ]
  },
  {
    id: "product-ui-frontend",
    number: "04",
    title: "Product UI & Frontend Development",
    tagline: "SaaS dashboards, applications, and interactive interfaces.",
    positioning: "Have Figma designs for your software platform? I turn complex UI mockups into clean, production-ready frontend code.",
    description: "Dedicated frontend development for Web applications, SaaS platforms, and internal tools. I take your Figma design files and engineer clean, modular component architectures ready for backend API integration.",
    category: "Product UI",
    iconName: "Code2",
    deliverables: [
      "Production-ready React & TypeScript code",
      "Modular design system & UI component library",
      "SaaS dashboard & admin panel interfaces",
      "Interactive data visualization & chart widgets",
      "User settings, profile & onboarding screens",
      "API data fetching & state management hooks",
      "Responsive mobile & tablet viewport adaptation",
      "Clean handoff & version-controlled Git codebase"
    ],
    suitableFor: [
      "SaaS founders with Figma designs",
      "Engineering teams needing extra frontend bandwidth",
      "Companies building web apps & customer portals"
    ]
  },
  {
    id: "performance-optimization",
    number: "05",
    title: "Performance & UX Optimization",
    tagline: "Improve speed, usability, responsiveness, and conversion experience.",
    positioning: "Is your website slow or losing visitors? I audit your site, pinpoint bottlenecks, and implement speed and UX fixes.",
    description: "Technical auditing and code refinement to improve your website's Core Web Vitals, mobile user experience, and conversion pathway. You get immediate page speed improvements without an expensive complete rebuild.",
    category: "Optimization",
    iconName: "Zap",
    deliverables: [
      "Comprehensive Core Web Vitals & speed audit",
      "Image, asset & font loading optimization",
      "JavaScript bundle reduction & code splitting",
      "Layout shift (CLS) & responsiveness fixes",
      "Conversion pathway & CTA placement audit",
      "Mobile UX & tap-target refinement",
      "SEO markup & meta tag audit",
      "Before & after performance metric report"
    ],
    suitableFor: [
      "Slow or bloated existing websites",
      "Companies seeing high bounce rates on mobile",
      "Websites failing Google Core Web Vitals"
    ]
  },
  {
    id: "ongoing-development",
    number: "06",
    title: "Ongoing Website Development & Support",
    tagline: "Continuous improvements and technical support after launch.",
    positioning: "Your website shouldn't be finished after launch. We continuously improve it as your company grows.",
    description: "Ongoing monthly support for tech companies that need continuous website updates, new landing pages, UI tweaks, and performance monitoring without hiring a full-time developer.",
    category: "Ongoing",
    iconName: "Sparkles",
    deliverables: [
      "Monthly landing page & new section creation",
      "Content updates & blog template refinements",
      "UI enhancements & conversion tweaks",
      "Performance monitoring & speed maintenance",
      "Security updates & dependency upkeep",
      "Third-party tool & analytics integrations",
      "Priority bug fixing & direct developer slack access"
    ],
    suitableFor: [
      "Growing tech startups post-launch",
      "Marketing teams needing quick web turnarounds",
      "Companies wanting predictable monthly web support"
    ]
  }
];

export const PACKAGES: Package[] = [
  {
    name: "STARTER",
    badge: "Landing Page",
    target: "For startups launching a product or validating an idea.",
    pricingText: "Projects start from $500",
    features: [
      "1 High-converting landing page",
      "Custom responsive UI design",
      "React / Tailwind development",
      "Micro-animations & interactions",
      "Form & CTA integration",
      "Production deployment"
    ]
  },
  {
    name: "GROWTH",
    badge: "Startup Website",
    target: "For companies needing a complete, multi-page marketing website.",
    pricingText: "Projects start from $1,200",
    highlighted: true,
    features: [
      "4–6 Page custom website",
      "Product & feature breakdowns",
      "Pricing tier grid layout",
      "Custom responsive design system",
      "SEO fundamentals & metadata",
      "Fast production deployment",
      "30 Days post-launch support"
    ]
  },
  {
    name: "CUSTOM",
    badge: "Product & SaaS",
    target: "For companies needing complex web applications or custom UI systems.",
    pricingText: "Custom USD estimate based on scope",
    features: [
      "Tailored page count & scope",
      "SaaS product dashboard UI",
      "Advanced animations & widgets",
      "API & data integration",
      "Performance optimization",
      "Dedicated ongoing support"
    ]
  }
];

export const WHY_WORK_WITH_ME = {
  headline: "Design thinking + development",
  lead: "I don't just turn designs into code. I think about how the website communicates the product, guides visitors, and creates a clear path toward conversion.",
  points: [
    {
      title: "Product-focused",
      description: "I design around what your company actually sells, translating technical software capabilities into scannable, high-converting visual narratives.",
      icon: "Target"
    },
    {
      title: "Fast execution",
      description: "Direct design and engineering without agency overhead, endless middleman meetings, or bloated project management layers.",
      icon: "Zap"
    },
    {
      title: "Direct collaboration",
      description: "You work directly with the person designing and building the website — ensuring total alignment and instant feedback loops.",
      icon: "MessageSquare"
    }
  ]
};

export const PROCESS_STEPS = [
  {
    step: "01",
    name: "Discover",
    description: "Understand your product, target audience, competitive positioning, and core conversion goals.",
    detail: "We align on message hierarchy, layout inspiration, and target deliverables."
  },
  {
    step: "02",
    name: "Design",
    description: "Create visual directions, wireframes, and responsive Figma prototypes.",
    detail: "You get interactive desktop and mobile preview files to refine layout and typography."
  },
  {
    step: "03",
    name: "Build",
    description: "Develop the responsive frontend with clean component architecture and sub-second speed.",
    detail: "Pixel-perfect React code with micro-interactions and Core Web Vitals optimization."
  },
  {
    step: "04",
    name: "Launch",
    description: "Deploy to production, test across real devices, and verify search indexability.",
    detail: "Full domain configuration, SSL verification, and post-launch support."
  }
];

export const TECHNOLOGIES = [
  { name: "React", category: "Library" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Figma", category: "Design System" },
  { name: "Next.js / Vite", category: "Tooling" },
  { name: "Git", category: "Version Control" },
  { name: "Vercel", category: "Deployment" }
];
