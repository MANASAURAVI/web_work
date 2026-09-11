import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, ArrowRight, Zap, Target, MessageSquare, Code2, Layout, Sparkles, Rocket, Mail } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { SERVICES, WHY_WORK_WITH_ME, PROCESS_STEPS, TECHNOLOGIES } from '@/data/services';
import { ProjectCard } from '@/components/ProjectCard';
import { MorphLineText } from '@/components/MorphLineText';
import { CornerBorder } from '@/components/CornerBorder';

export const HomePage = () => {
  const selectedWork = PROJECTS.slice(0, 4);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-emerald-400" />;
      case 'Target': return <Target className="w-5 h-5 text-amber-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-indigo-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-emerald-400" />;
      default: return <Layout className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getWhyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-5 h-5 text-cyan-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-indigo-400" />;
      default: return <Target className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-24 md:space-y-36 pb-24">
      {/* SECTION 1 — HERO */}
      <section className="relative pt-12 md:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto translate-y-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          
          {/* LEFT COLUMN — Main Hero Copy */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-7 lg:-translate-y-[10%]">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/15 text-xs font-mono text-slate-200 backdrop-blur-xl shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span>Freelance Web Developer & UI Engineer</span>
            </div>

            {/* Main Hero Headline with Line Morph Animation */}
            <MorphLineText />

            {/* Supporting Text with Bouncy Period Style */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
              Freelance web developer focused on modern SaaS, startup and product websites
              <motion.span
                className="inline-block text-cyan-400 font-bold ml-0.5"
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
              {" "}From UI design to frontend development and deployment
              <motion.span
                className="inline-block text-cyan-400 font-bold ml-0.5"
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 1.4,
                  delay: 0.35,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#selected-work"
                className="relative group overflow-hidden px-6 py-3.5 rounded-lg text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-300 shadow-md hover:-translate-y-1.5 hover:scale-[1.02] transform-gpu active:scale-95 inline-flex items-center justify-center gap-2"
              >
                <CornerBorder />
                <span className="relative z-30">View my work</span>
                <ArrowRight className="w-4 h-4 relative z-30 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                to="/contact"
                className="relative group overflow-hidden px-6 py-3.5 rounded-lg text-sm font-semibold text-slate-200 bg-white/[0.06] border border-white/15 backdrop-blur-xl hover:text-white hover:border-white/30 hover:bg-white/[0.12] transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1.5 hover:scale-[1.02] transform-gpu"
              >
                <CornerBorder />
                <span className="relative z-30">Start a project</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 relative z-30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Quick Metrics Bar with Glassmorphism */}
            <div className="relative group overflow-hidden mt-8 p-4 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-2xl shadow-xl shadow-black/40 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-left hover:-translate-y-1.5 hover:scale-[1.01] transform-gpu transition-all duration-300">
              <CornerBorder />
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">100%</p>
                <p className="text-[10px] text-slate-300 uppercase tracking-widest font-mono mt-1 font-medium">PRODUCT FOCUSED</p>
              </div>
              <div className="border-l border-white/15 pl-4 sm:pl-6">
                <p className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">Sub-1s</p>
                <p className="text-[10px] text-slate-300 uppercase tracking-widest font-mono mt-1 font-medium">PAGE LOAD SPEEDS</p>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-white/15 pt-3 sm:pt-0 sm:pl-6">
                <p className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">Direct</p>
                <p className="text-[10px] text-slate-300 uppercase tracking-widest font-mono mt-1 font-medium">FOUNDER COLLABORATION</p>
              </div>
              <div className="border-t sm:border-t-0 border-l border-white/15 pt-3 sm:pt-0 pl-4 sm:pl-6">
                <p className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">0 Layers</p>
                <p className="text-[10px] text-slate-300 uppercase tracking-widest font-mono mt-1 font-medium">NO AGENCY MIDDLEWARE</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN — Code Window & 3 Cards Stack */}
          <div className="lg:col-span-6 xl:col-span-6 relative space-y-6 pt-4 lg:pt-0 lg:translate-y-[35%] scale-100 sm:scale-105 lg:scale-110 origin-top-left">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
              
              {/* Code Editor Card (sm:col-span-7) with Glassmorphism */}
              <div className="relative group overflow-hidden sm:col-span-7 rounded-xl bg-slate-950/40 border border-white/15 shadow-[0_16px_36px_rgba(0,0,0,0.5)] p-4 font-mono text-xs backdrop-blur-2xl flex flex-col justify-between hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300">
                <CornerBorder />
                <div>
                  {/* Title bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    </div>
                    <span className="text-[11px] text-slate-300 font-mono">portfolio.jsx</span>
                  </div>

                  {/* Code snippet with Line Numbers 1 to 10 */}
                  <div className="flex gap-3.5 font-mono text-[11px] leading-relaxed">
                    {/* Line Numbers Column */}
                    <div className="flex flex-col text-slate-500 select-none text-right w-4 space-y-1 font-mono">
                      <span>1</span>
                      <span>2</span>
                      <span>3</span>
                      <span>4</span>
                      <span>5</span>
                      <span>6</span>
                      <span>7</span>
                      <span>8</span>
                      <span>9</span>
                      <span>10</span>
                    </div>

                    {/* Code Syntax Highlighting */}
                    <div className="space-y-1 text-slate-200 font-mono">
                      <p><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = &#123;</p>
                      <p className="pl-3"><span className="text-sky-400">name</span>: <span className="text-emerald-400">"Saurav"</span>,</p>
                      <p className="pl-3"><span className="text-sky-400">role</span>: <span className="text-emerald-400">"Frontend Developer"</span>,</p>
                      <p className="pl-3"><span className="text-sky-400">focus</span>: [<span className="text-emerald-400">"Web"</span>, <span className="text-emerald-400">"UI/UX"</span>, <span className="text-emerald-400">"Performance"</span>],</p>
                      <p className="pl-3"><span className="text-sky-400">currently</span>: <span className="text-emerald-400">"Building awesome things"</span>,</p>
                      <p className="pl-3"><span className="text-sky-400">location</span>: <span className="text-emerald-400">"India"</span>,</p>
                      <p className="pl-3"><span className="text-sky-400">status</span>: <span className="text-emerald-400">"Available for projects"</span>,</p>
                      <p>&#125;</p>
                      <p className="h-3"></p>
                      <p><span className="text-purple-400">return</span> &lt;<span className="text-blue-400">YourNextProject</span> /&gt;</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Feature Cards Stack (sm:col-span-5) with Glassmorphism & 3D Pop Up */}
              <div className="sm:col-span-5 flex flex-col justify-start gap-2.5 translate-y-[10%]">
                {/* Card 1 */}
                <div className="relative group overflow-hidden p-3.5 rounded-xl bg-slate-950/40 border border-white/15 backdrop-blur-2xl shadow-lg flex items-start gap-3 hover:bg-white/[0.08] hover:border-blue-500/50 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-cyan-500/20 transition-all duration-300 transform-gpu cursor-pointer">
                  <CornerBorder />
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Modern Design</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">Clean. Minimal. Impactful.</p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="relative group overflow-hidden p-3.5 rounded-xl bg-slate-950/40 border border-white/15 backdrop-blur-2xl shadow-lg flex items-start gap-3 hover:bg-white/[0.08] hover:border-blue-500/50 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-cyan-500/20 transition-all duration-300 transform-gpu cursor-pointer">
                  <CornerBorder />
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Frontend Development</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">Fast. Scalable. Optimized.</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="relative group overflow-hidden p-3.5 rounded-xl bg-slate-950/40 border border-white/15 backdrop-blur-2xl shadow-lg flex items-start gap-3 hover:bg-white/[0.08] hover:border-blue-500/50 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-cyan-500/20 transition-all duration-300 transform-gpu cursor-pointer">
                  <CornerBorder />
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Real Results</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">Ideas to production.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Handwritten Note Annotation */}
            <div className="pt-3 text-right pr-2">
              <span className="font-handwriting text-slate-300 text-2xl tracking-wide inline-block -rotate-6 select-none opacity-90">
                Turning ideas into real products.
              </span>
            </div>

            {/* Bottom Right Label */}
            <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest pt-2">
              <span>DESIGN / DEVELOP / DEPLOY</span>
              <span className="w-8 h-px bg-white/20" />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2 — SELECTED WORK */}
      <section id="selected-work" className="px-6 sm:px-10 lg:px-12 max-w-[1536px] mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">Featured Work</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Selected Work</h2>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors group"
          >
            <span>View all {PROJECTS.length} projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Strongest Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {selectedWork.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index === 0} />
          ))}
        </div>
      </section>

      {/* SECTION 3 — WHAT I DO (6 CORE SERVICES) */}
      <section className="px-6 sm:px-10 lg:px-12 max-w-[1536px] mx-auto space-y-12">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">What I can help you build</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Services</h2>
          <p className="text-slate-400 text-sm">
            Targeted web solutions built to solve business problems and drive conversion for startups.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="relative group overflow-hidden glass-card rounded-2xl border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.015] hover:shadow-2xl hover:shadow-cyan-500/20 transform-gpu"
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

                <div className="pt-4 border-t border-slate-900">
                  <Link
                    to={`/services#${service.id}`}
                    className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 group-hover:text-cyan-400 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Explore deliverables</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — WHY WORK WITH ME */}
      <section className="px-6 sm:px-10 lg:px-12 max-w-[1536px] mx-auto">
        <div className="relative group overflow-hidden glass-card rounded-3xl border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-1.5 hover:scale-[1.008] transform-gpu transition-all duration-300 shadow-xl">
          <CornerBorder />
          {/* Subtle background gradient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-3xl pointer-events-none" />

          <div className="p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & Lead */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">The Freelancer Advantage</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                {WHY_WORK_WITH_ME.headline}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {WHY_WORK_WITH_ME.lead}
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="relative group overflow-hidden inline-flex items-center gap-2 text-sm font-semibold text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 px-5 py-2.5 rounded-xl transition-all hover:-translate-y-1 hover:scale-[1.02] transform-gpu duration-300"
                >
                  <CornerBorder />
                  <span>More about my studio</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>
            </div>

            {/* Right 3 Points Grid */}
            <div className="lg:col-span-7 space-y-6">
              {WHY_WORK_WITH_ME.points.map((point) => (
                <div
                  key={point.title}
                  className="relative group overflow-hidden p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-4 hover:border-cyan-500/50 hover:-translate-y-1.5 hover:scale-[1.015] transform-gpu transition-all duration-300"
                >
                  <CornerBorder />
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    {getWhyIcon(point.icon)}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">{point.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed font-normal">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — PROCESS */}
      <section className="px-6 sm:px-10 lg:px-12 max-w-[1536px] mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">How We Work</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">4-Step Execution Process</h2>
          <p className="text-slate-400 text-sm">
            Streamlined timeline designed to take your project from concept to live production seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative group overflow-hidden glass-card rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300"
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

      {/* SECTION 6 — FINAL CTA */}
      <section className="px-6 sm:px-10 lg:px-12 max-w-[1536px] mx-auto text-center">
        <div className="relative group overflow-hidden glass-card rounded-3xl p-10 sm:p-14 border border-slate-800 hover:border-cyan-500/40 flex flex-col items-center gap-8 max-w-4xl mx-auto hover:-translate-y-1.5 hover:scale-[1.008] transform-gpu transition-all duration-300 shadow-2xl">
          <CornerBorder />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Have a product that deserves a better website?
            </h2>
            <p className="text-xl text-cyan-400 font-semibold">
              Let's build it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-4">
            <Link
              to="/contact"
              className="relative group overflow-hidden w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-slate-950 bg-white hover:bg-cyan-400 transition-all duration-300 shadow-xl shadow-white/10 hover:shadow-cyan-400/25 hover:-translate-y-1 hover:scale-[1.02] transform-gpu active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <CornerBorder />
              <span className="relative z-30">Start a project</span>
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
    </div>
  );
};
