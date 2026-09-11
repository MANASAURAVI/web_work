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
    tagline: "Complete custom websites built from concept to production launch.",
    positioning: "Your website is the primary growth engine for your company. I design and engineer websites that make your product effortless to understand and your company easy to trust.",
    description: "End-to-end website creation that combines strategic UI/UX design with high-performance frontend engineering. I handle everything from sitemaps and Figma wireframes to responsive React coding and cloud deployment.",
    category: "Website",
    iconName: "Layout",
    deliverables: [
      "Website architecture & conversion sitemap planning",
      "UX wireframes & interactive Figma prototypes",
      "Custom visual design system, typography & color palette",
      "Responsive desktop, tablet & mobile viewports",
      "Conversion-focused page structure & CTA placement",
      "Pixel-perfect React, Next.js & Tailwind CSS development",
      "Smooth micro-interactions & animated scroll reveals",
      "SEO markup, open-graph metadata & production deployment"
    ],
    suitableFor: [
      "SaaS companies & AI startups",
      "Cybersecurity & Fintech platforms",
      "Developer tool & B2B technology providers",
      "Growing tech agencies & product companies"
    ]
  },
  {
    id: "saas-startup-websites",
    number: "02",
    title: "SaaS & Startup Websites",
    tagline: "Product-focused websites designed to convert visitors into active users.",
    positioning: "Launch your SaaS product with a website that translates complex technical features into intuitive, high-converting product showcases.",
    description: "Tailored specifically for software companies launching new products or scaling existing platforms. I translate technical capabilities into scannable visual narratives that drive signups and demo requests.",
    category: "SaaS",
    iconName: "Rocket",
    deliverables: [
      "Product showcase homepage with hero visual stack",
      "Feature breakdown & capability deep-dive pages",
      "Transparent pricing page architecture & tier toggles",
      "Use cases & target industry landing pages",
      "Integration ecosystem & API partner showcase pages",
      "Interactive product preview widgets & interactive demos",
      "Waitlist & demo booking funnel integrations",
      "Documentation & resource hub templates"
    ],
    suitableFor: [
      "Early-stage & Series A SaaS startups",
      "AI tools & developer infrastructure platforms",
      "Fintech & Web3 SaaS applications",
      "Product-led growth (PLG) technology companies"
    ],
    exampleStructure: [
      "Hero Product Showcase",
      "Core Feature Breakdown",
      "Use Cases by Industry",
      "Integrations & API Ecosystem",
      "Pricing Tiers & Plan Calculator",
      "Customer Success & Case Studies",
      "Demo Booking / Start Free Trial Funnel"
    ]
  },
  {
    id: "landing-pages",
    number: "03",
    title: "Landing Pages",
    tagline: "High-impact single pages for launches, campaigns, and key features.",
    positioning: "One focused landing page engineered around a single conversion goal. The fastest way to validate market demand, capture leads, or launch a product.",
    description: "High-converting standalone landing pages engineered for specific marketing campaigns, stealth launches, or product feature releases. Built to maximize conversion momentum with sub-second load speeds.",
    category: "Landing",
    iconName: "Target",
    deliverables: [
      "High-converting Hero & value proposition section",
      "Problem-solution narrative breakdown",
      "Interactive feature cards & ROI calculators",
      "Social proof, logo wall & technical highlight blocks",
      "Lead capture form & CRM integrations (HubSpot, Typeform, etc.)",
      "A/B testing-ready modular layout structure",
      "Sub-second page load speed & Core Web Vitals compliance",
      "Rapid 1 to 2-week execution timeline"
    ],
    suitableFor: [
      "Product launches & feature drops",
      "Waitlist & stealth mode announcements",
      "Paid ad campaign landing destinations",
      "Virtual events & product announcements"
    ]
  },
  {
    id: "product-ui-frontend",
    number: "04",
    title: "Product UI / Frontend",
    tagline: "SaaS dashboards, web applications, and modular UI component systems.",
    positioning: "Have Figma mockups for your software product? I turn design files into clean, production-ready frontend code ready for backend API integration.",
    description: "Dedicated frontend engineering for SaaS applications, admin dashboards, and customer portals. I take your Figma designs and build modular, type-safe React/TypeScript component systems.",
    category: "Product UI",
    iconName: "Code2",
    deliverables: [
      "Production-ready React 19 & TypeScript codebase",
      "Modular design system & reusable UI component library",
      "SaaS dashboard, analytics & admin panel interfaces",
      "Interactive data visualization & chart widgets",
      "User settings, profile management & onboarding flows",
      "API data fetching & state management hooks",
      "Responsive mobile & tablet viewport adaptation",
      "Clean Git handoff with version control & docs"
    ],
    suitableFor: [
      "SaaS founders with Figma designs ready for code",
      "Engineering teams needing extra frontend bandwidth",
      "Companies building web apps & customer portals"
    ]
  },
  {
    id: "performance-ux",
    number: "05",
    title: "Performance & UX",
    tagline: "Optimize speed, responsiveness, Core Web Vitals, and conversion pathways.",
    positioning: "Is your website slow or losing potential customers? I audit your code, eliminate bottlenecks, and upgrade user experience for maximum retention.",
    description: "Technical auditing and code refinement to improve your website's Core Web Vitals, mobile user experience, and conversion pathway. Achieve immediate page speed gains without an expensive complete rebuild.",
    category: "Optimization",
    iconName: "Zap",
    deliverables: [
      "Comprehensive Core Web Vitals & speed audit",
      "Image, media & font loading optimization",
      "JavaScript bundle reduction & code splitting",
      "Layout shift (CLS) & responsiveness fixes",
      "Conversion pathway & CTA placement audit",
      "Mobile UX & tap-target refinement",
      "SEO markup & open-graph meta tag audit",
      "Before & after performance metric report"
    ],
    suitableFor: [
      "Slow or bloated existing websites",
      "Companies seeing high bounce rates on mobile",
      "Websites failing Google Core Web Vitals"
    ]
  },
  {
    id: "ongoing-website-development",
    number: "06",
    title: "Ongoing Website Development",
    tagline: "Continuous improvements, new landing pages, and technical support after launch.",
    positioning: "Your website shouldn't stay static after launch. I provide continuous engineering support as your product and market grow.",
    description: "Ongoing monthly support for tech companies that need continuous website updates, new landing pages, UI tweaks, and performance monitoring without hiring a full-time developer.",
    category: "Ongoing",
    iconName: "Sparkles",
    deliverables: [
      "Monthly landing page & new section creation",
      "Content updates & feature showcase refinements",
      "UI enhancements & conversion tweaks",
      "Performance monitoring & speed maintenance",
      "Security updates & dependency maintenance",
      "Third-party tool & analytics integrations",
      "Priority bug fixing & direct developer slack/email access"
    ],
    suitableFor: [
      "Growing tech startups post-launch",
      "Marketing teams needing quick web turnarounds",
      "Companies wanting predictable monthly web support"
    ]
  }
];

export const WHO_I_WORK_WITH = [
  {
    title: "SaaS",
    description: "Subscription software platforms needing clear product communication, feature breakdowns, and conversion-focused pricing pages.",
    iconName: "Rocket"
  },
  {
    title: "AI & Automation",
    description: "Artificial intelligence and automation tools turning complex machine learning capabilities into intuitive user experiences.",
    iconName: "BrainCircuit"
  },
  {
    title: "Cybersecurity",
    description: "Security companies and threat intel platforms requiring high-trust technical design, authority branding, and zero-trust aesthetics.",
    iconName: "ShieldCheck"
  },
  {
    title: "Fintech",
    description: "Financial technology services demanding high-performance interfaces, rigorous security compliance, and clear financial workflows.",
    iconName: "Zap"
  },
  {
    title: "Developer Tools",
    description: "Infrastructure platforms, APIs, and dev tools needing technical documentation landing pages, code previews, and API showcases.",
    iconName: "Terminal"
  },
  {
    title: "B2B Technology",
    description: "Enterprise software and B2B technology providers focused on high-ticket lead generation, trust building, and demo booking.",
    iconName: "Layout"
  }
];

export const WHY_WORK_WITH_ME = {
  headline: "Why Work With Me",
  lead: "A product-focused web studio experience built for speed, quality, and seamless execution without agency overhead.",
  points: [
    {
      title: "Design + development by one person",
      description: "No handoff gaps or lost in translation between designer and developer. You get pixel-perfect design translated directly into clean production code.",
      icon: "Target"
    },
    {
      title: "Fast communication",
      description: "Direct founder-to-developer collaboration over Slack/Email. Rapid response times, zero account manager delays, and clear daily updates.",
      icon: "MessageSquare"
    },
    {
      title: "Product-focused approach",
      description: "I build around what your company actually sells — translating complex technical features into intuitive, high-converting user journeys.",
      icon: "Zap"
    },
    {
      title: "Design → Development → Deployment",
      description: "Complete end-to-end execution. From sitemaps and Figma wireframes to React coding, Core Web Vitals optimization, and Vercel/VPS production deployment.",
      icon: "CheckCircle2"
    }
  ]
};

export const PROCESS_STEPS = [
  {
    step: "01",
    name: "Discover",
    description: "Understand your product, target audience, competitive positioning, and core conversion goals.",
    detail: "We align on message hierarchy, sitemap structure, and project requirements."
  },
  {
    step: "02",
    name: "Design",
    description: "Create visual directions, wireframes, and responsive Figma prototypes.",
    detail: "You get interactive desktop and mobile preview files to refine layout, typography, and UX."
  },
  {
    step: "03",
    name: "Build",
    description: "Develop the responsive frontend with clean component architecture and sub-second speed.",
    detail: "Pixel-perfect React code with micro-interactions, accessibility, and Core Web Vitals optimization."
  },
  {
    step: "04",
    name: "Launch",
    description: "Deploy to production, test across real devices, and verify search indexability.",
    detail: "Full domain setup, SSL verification, open-graph metadata, and post-launch support."
  }
];

export const CREDIBILITY_HIGHLIGHTS = [
  {
    title: "OWASP Leadership",
    detail: "OWASP Delhi Chapter Lead, coordinating application security initiatives and technical community projects.",
    badge: "OWASP Delhi Lead"
  },
  {
    title: "Cybersecurity Background",
    detail: "VAPT, application security auditing, CTF competition engineering, and secure SDLC practices.",
    badge: "VAPT & AppSec"
  },
  {
    title: "Unreal Engine Contribution",
    detail: "Source developer contributor to Epic Games' Unreal Engine GitHub codebase and community.",
    badge: "Epic Games Contributor"
  },
  {
    title: "IEEE Publication",
    detail: "Published research paper on 'AI-Driven Techniques for Web Search Vulnerability Identification' indexed on IEEE Xplore.",
    badge: "IEEE Xplore Author"
  }
];

export const TECHNOLOGIES = [
  { name: "React 19", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Next.js 15", category: "Framework" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Node.js / Express", category: "Backend" },
  { name: "Figma", category: "UI/UX Design" },
  { name: "Framer Motion", category: "Animations" },
  { name: "Vercel / VPS", category: "Deployment" }
];
