import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
  MessageSquare,
  Code2,
  Monitor,
  Globe,
  Cloud,
  Building2,
  RefreshCw,
  Mail,
  ShieldCheck,
  Terminal,
  BookOpen,
  Cpu
} from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { SERVICES, WHY_WORK_WITH_ME, PROCESS_STEPS, WHO_I_WORK_WITH, CREDIBILITY_HIGHLIGHTS, Service } from '@/data/services';
import { ProjectCard } from '@/components/ProjectCard';
import { CornerBorder } from '@/components/CornerBorder';
import { ServiceDetailModal } from '@/components/ServiceDetailModal';

export const HomePage = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Show 4 strongest completed real projects
  const selectedWork = PROJECTS.slice(0, 4);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor': return <Monitor className="w-5 h-5 text-cyan-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-emerald-400" />;
      case 'Target': return <Target className="w-5 h-5 text-amber-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-indigo-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'RefreshCw': return <RefreshCw className="w-5 h-5 text-emerald-400" />;
      default: return <Monitor className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud': return <Cloud className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-sky-400" />;
      default: return <Cloud className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getWhyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-5 h-5 text-cyan-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-indigo-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-amber-400" />;
      default: return <Target className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-24 md:space-y-36 pb-24">
      {/* 01 — HERO SECTION */}
      <section className="relative pt-12 md:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          
          {/* LEFT COLUMN — Main Hero Copy */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-7">
            {/* Status Badge: Positioning as SaaS / Product Web Developer */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/15 text-xs font-mono text-slate-200 backdrop-blur-xl shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span>SaaS / Product Web Developer</span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
              I design & build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">websites for SaaS & tech products</span>.
            </h1>

            {/* Clear Statement of What I Do */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              High-converting website design, product UI, and frontend engineering for software startups and tech platforms.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="relative group overflow-hidden px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-xl shadow-cyan-400/20 hover:-translate-y-1.5 hover:scale-[1.02] transform-gpu active:scale-95 inline-flex items-center justify-center gap-2"
              >
                <CornerBorder />
                <span className="relative z-30">Start a Project</span>
                <ArrowRight className="w-4 h-4 relative z-30 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#selected-work"
                className="relative group overflow-hidden px-6 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.06] border border-white/15 backdrop-blur-xl hover:text-white hover:border-white/30 hover:bg-white/[0.12] transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1.5 hover:scale-[1.02] transform-gpu"
              >
                <CornerBorder />
                <span className="relative z-30">Selected Work</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 relative z-30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN — Code Window & 3 Feature Cards Stack */}
          <div className="lg:col-span-6 xl:col-span-6 relative space-y-6 pt-4 lg:pt-10 xl:pt-12">
            <div className="relative group overflow-hidden rounded-2xl p-4 sm:p-5 bg-slate-950/40 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-cyan-400/50">
              <CornerBorder />
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch relative z-30">
                
                {/* Code Editor Card (sm:col-span-7) with Glassmorphism */}
                <div className="relative group overflow-hidden sm:col-span-7 rounded-xl bg-slate-950/60 border border-white/15 shadow-[0_16px_36px_rgba(0,0,0,0.5)] p-4 font-mono text-xs backdrop-blur-2xl flex flex-col justify-between hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300">
                  <CornerBorder />
                  <div>
                    {/* Title bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                      </div>
                      <span className="text-[11px] text-slate-300 font-mono">web-studio.config.ts</span>
                    </div>

                    {/* Code snippet */}
                    <div className="flex gap-3 font-mono text-[11px] leading-relaxed">
                      <div className="flex flex-col text-slate-500 select-none text-right w-4 space-y-1 font-mono">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                      </div>

                      <div className="space-y-1 text-slate-200 font-mono">
                        <p><span className="text-purple-400">export const</span> <span className="text-blue-400">studio</span> = &#123;</p>
                        <p className="pl-3"><span className="text-sky-400">role</span>: <span className="text-emerald-400">"SaaS / Product Web Developer"</span>,</p>
                        <p className="pl-3"><span className="text-sky-400">focus</span>: <span className="text-emerald-400">"High-Converting Websites"</span>,</p>
                        <p className="pl-3"><span className="text-sky-400">pipeline</span>: [<span className="text-emerald-400">"Design"</span>, <span className="text-emerald-400">"Build"</span>, <span className="text-emerald-400">"Launch"</span>],</p>
                        <p className="pl-3"><span className="text-sky-400">stack</span>: [<span className="text-emerald-400">"React"</span>, <span className="text-emerald-400">"Next.js"</span>, <span className="text-emerald-400">"Tailwind"</span>],</p>
                        <p className="pl-3"><span className="text-sky-400">status</span>: <span className="text-emerald-400">"Available for Projects"</span>,</p>
                        <p>&#125;</p>
                        <p className="pt-1"><span className="text-purple-400">return</span> &lt;<span className="text-cyan-400">HighImpactWebsite</span> /&gt;</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Feature Cards Stack (sm:col-span-5) */}
                <div className="sm:col-span-5 flex flex-col justify-start gap-2.5">
                  {/* Card 1 */}
                  <div className="relative group overflow-hidden p-3.5 rounded-xl bg-slate-950/60 border border-white/15 backdrop-blur-2xl shadow-lg flex items-start gap-3 hover:bg-white/[0.08] hover:border-cyan-500/50 hover:-translate-y-1.5 hover:scale-[1.02] transform-gpu transition-all duration-300 cursor-pointer">
                    <CornerBorder />
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Conversion UI Design</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">Sitemaps & Figma prototypes</p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="relative group overflow-hidden p-3.5 rounded-xl bg-slate-950/60 border border-white/15 backdrop-blur-2xl shadow-lg flex items-start gap-3 hover:bg-white/[0.08] hover:border-cyan-500/50 hover:-translate-y-1.5 hover:scale-[1.02] transform-gpu transition-all duration-300 cursor-pointer">
                    <CornerBorder />
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Frontend Engineering</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">React, Next.js & Tailwind</p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="relative group overflow-hidden p-3.5 rounded-xl bg-slate-950/60 border border-white/15 backdrop-blur-2xl shadow-lg flex items-start gap-3 hover:bg-white/[0.08] hover:border-cyan-500/50 hover:-translate-y-1.5 hover:scale-[1.02] transform-gpu transition-all duration-300 cursor-pointer">
                    <CornerBorder />
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-110 transition-transform">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Production Launch</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">Vercel, SSL & optimization</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Right Label */}
            <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest pt-2">
              <span>DESIGN / BUILD / LAUNCH</span>
              <span className="w-8 h-px bg-white/20" />
            </div>
          </div>

        </div>
      </section>

      {/* 02 — SELECTED WORK */}
      <section id="selected-work" className="px-6 sm:px-10 lg:px-12 max-w-[1536px] mx-auto space-y-12 scroll-mt-24 pt-20 sm:pt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6 pt-10 sm:pt-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">Featured Projects</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Selected Work</h2>
            <p className="text-slate-400 text-sm mt-1">
              Top completed real web applications and product platforms.
            </p>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors group"
          >
            <span>View all {PROJECTS.length} projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Strongest Completed Real Projects Grid (Compact 3-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5">
          {selectedWork.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index === 0} />
          ))}
        </div>
      </section>

      {/* 03 — SERVICES */}
      <section className="px-6 sm:px-10 lg:px-12 max-w-[1536px] mx-auto space-y-12">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">What I Build</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Services</h2>
          <p className="text-slate-400 text-sm">
            Product-focused web offerings engineered to communicate your value proposition and drive conversion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="relative group glass-card rounded-2xl border border-white/15 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.015] hover:shadow-2xl hover:shadow-cyan-500/20 transform-gpu cursor-pointer flex flex-col justify-between"
            >
              <CornerBorder />
              <div className="p-8 flex flex-col justify-between h-full gap-6 relative z-30">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-mono text-cyan-400 font-bold">{service.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {service.tagline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — WHO I WORK WITH */}
      <section className="px-6 sm:px-10 lg:px-12 max-w-[1536px] mx-auto space-y-12">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">Target Industries</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Who I Work With</h2>
          <p className="text-slate-400 text-sm">
            I partner with technology companies, startups, and founders in high-growth industries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5">
          {WHO_I_WORK_WITH.map((item) => (
            <div
              key={item.title}
              className="relative group glass-card rounded-2xl p-7 border border-white/15 hover:border-cyan-400 hover:-translate-y-1.5 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-lg"
            >
              <CornerBorder />
              <div className="relative z-30 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIndustryIcon(item.iconName)}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05 — WHY WORK WITH ME (4 PILLARS) */}
      <section className="px-6 sm:px-10 lg:px-12 max-w-[1536px] mx-auto pt-6 sm:pt-10">
        <div className="relative group glass-card rounded-3xl border border-white/15 hover:border-cyan-400 hover:-translate-y-1.5 hover:scale-[1.008] transform-gpu transition-all duration-300 shadow-xl">
          <CornerBorder />
          <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-3xl" />
          </div>

          <div className="p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Headline */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">Studio Advantage</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                {WHY_WORK_WITH_ME.headline}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {WHY_WORK_WITH_ME.lead}
              </p>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="relative group overflow-hidden inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 px-6 py-3.5 rounded-xl transition-all hover:-translate-y-1 hover:scale-[1.02] transform-gpu duration-300 shadow-lg shadow-cyan-400/20"
                >
                  <CornerBorder />
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right 4 Pillars Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY_WORK_WITH_ME.points.map((point) => (
                <div
                  key={point.title}
                  className="relative group p-6 rounded-2xl bg-slate-950/90 border border-white/15 hover:border-cyan-400 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.015] transform-gpu transition-all duration-300"
                >
                  <CornerBorder />
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 relative z-30">
                    {getWhyIcon(point.icon)}
                  </div>
                  <div className="space-y-1 relative z-30">
                    <h3 className="text-base font-bold text-white">{point.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06 — PROCESS (DISCOVER → DESIGN → BUILD → LAUNCH) */}
      <section className="px-6 sm:px-10 lg:px-12 max-w-[1536px] mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">How We Work</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">4-Step Execution Process</h2>
          <p className="text-slate-400 text-sm">
            Discover → Design → Build → Launch. Streamlined pipeline from initial concept to live product.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative group glass-card rounded-2xl border border-white/15 hover:border-cyan-400 hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300"
            >
              <CornerBorder />
              <div className="p-8 flex flex-col justify-between h-full gap-6 relative z-30">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold font-mono text-cyan-400">
                      {step.step}
                    </span>
                    {idx < PROCESS_STEPS.length - 1 && (
                      <ArrowRight className="hidden lg:block w-5 h-5 text-slate-700" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">{step.name}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900/80">
                  <p className="text-xs text-slate-400 font-mono">
                    {step.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 07 — CONCISE CREDIBILITY */}
      <section className="px-6 sm:px-10 lg:px-12 max-w-[1536px] mx-auto space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">Technical Background</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Credibility & Authority</h2>
          <p className="text-slate-400 text-sm">
            Proven application security, open-source engineering, and published research.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
          {CREDIBILITY_HIGHLIGHTS.map((cred) => (
            <div
              key={cred.title}
              className="relative group glass-card rounded-2xl p-6 border border-white/15 hover:border-amber-400/80 hover:-translate-y-1.5 transform-gpu transition-all duration-300 flex flex-col justify-between"
            >
              <CornerBorder />
              <div className="relative z-30 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/40 inline-block font-semibold">
                  {cred.badge}
                </span>
                <h3 className="text-lg font-bold text-white">{cred.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {cred.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 08 — FINAL CTA SECTION */}
      <section className="px-6 sm:px-10 lg:px-12 max-w-[1536px] mx-auto text-center pt-6 sm:pt-10">
        <div className="relative group glass-card rounded-3xl p-10 sm:p-14 border border-white/15 hover:border-cyan-400 flex flex-col items-center gap-8 max-w-4xl mx-auto hover:-translate-y-1.5 hover:scale-[1.008] transform-gpu transition-all duration-300 shadow-2xl">
          <CornerBorder />
          <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-3xl" />
          </div>

          <div className="space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Have a product that deserves a better website?
            </h2>
            <p className="text-xl text-cyan-400 font-semibold">
              Let's build it together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-4">
            <Link
              to="/contact"
              className="relative group overflow-hidden w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-xl shadow-cyan-400/20 hover:-translate-y-1 hover:scale-[1.02] transform-gpu active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <CornerBorder />
              <span className="relative z-30">Start a Project</span>
              <ArrowRight className="w-4 h-4 relative z-30 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="mailto:0501sauravkumar0501@gmail.com"
              className="relative group overflow-hidden w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-mono text-slate-300 bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] transform-gpu inline-flex items-center justify-center gap-2"
            >
              <CornerBorder />
              <Mail className="w-4 h-4 text-slate-400 relative z-30" />
              <span className="relative z-30">0501sauravkumar0501@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Service Detail Modal Popup */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};
