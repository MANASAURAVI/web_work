import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, PROCESS_STEPS, WHO_I_WORK_WITH } from '@/data/services';
import { CheckCircle2, ArrowRight, Layout, Code2, Sparkles, Rocket, Zap, Target, BrainCircuit, ShieldCheck, Terminal } from 'lucide-react';
import { CornerBorder } from '@/components/CornerBorder';

export const ServicesPage = () => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-6 h-6 text-cyan-400" />;
      case 'Rocket': return <Rocket className="w-6 h-6 text-emerald-400" />;
      case 'Target': return <Target className="w-6 h-6 text-amber-400" />;
      case 'Code2': return <Code2 className="w-6 h-6 text-indigo-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-cyan-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-emerald-400" />;
      default: return <Layout className="w-6 h-6 text-cyan-400" />;
    }
  };

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Rocket': return <Rocket className="w-5 h-5 text-cyan-400" />;
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5 text-indigo-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-sky-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-purple-400" />;
      default: return <Rocket className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-12 py-12 md:py-20 space-y-24">
      {/* 01 — PAGE HEADER */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 px-3.5 py-1.5 rounded-full border border-cyan-800/40">
          <Zap className="w-3.5 h-3.5" />
          <span>SaaS & Product Offerings</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Services
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed font-normal">
          Designed specifically for startup founders, SaaS companies, and technology businesses. High-converting website design, product UI, and frontend engineering delivered directly without agency bloat.
        </p>
      </div>

      {/* 02 — QUICK OVERVIEW GRID (6 CORE SERVICES) */}
      <section className="space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
            6 Core Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="relative group overflow-hidden glass-card rounded-2xl border border-slate-800/80 hover:border-cyan-500/50 hover:-translate-y-2 hover:scale-[1.015] hover:shadow-xl hover:shadow-cyan-500/10 transform-gpu transition-all duration-300 block h-full"
            >
              <CornerBorder />
              <div className="p-6 flex flex-col justify-between h-full gap-4 relative z-30">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-bold">{s.number}</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {s.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {s.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center gap-1 text-xs font-mono font-semibold uppercase text-slate-400 group-hover:text-cyan-400 transition-colors">
                  <span>View deliverables</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 03 — DEEP SERVICE BREAKDOWN */}
      <section className="space-y-16">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold font-mono">Service Details</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Full Scope & Deliverables</h2>
        </div>

        <div className="space-y-12">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="relative group overflow-hidden glass-card rounded-3xl border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-1.5 hover:scale-[1.008] transform-gpu transition-all duration-300 shadow-xl scroll-mt-24"
            >
              <CornerBorder />
              <div className="p-8 sm:p-12 flex flex-col gap-8 relative z-30">
                {/* Header block */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-mono font-black text-cyan-400">{service.number}</span>
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                        {getServiceIcon(service.iconName)}
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {service.title}
                    </h3>
                    <p className="text-cyan-300 text-sm font-semibold">
                      {service.tagline}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed font-normal pt-2 border-t border-slate-900">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="lg:col-span-7 bg-slate-950/80 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                      Key Deliverables Included:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.deliverables.map((item) => (
                        <div key={item} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-300 font-normal leading-normal">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-900/80 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">Suitable for: {service.suitableFor.join(', ')}</span>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
                      >
                        <span>Start a Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — WHO I WORK WITH */}
      <section className="space-y-12">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">Target Industries</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Who I Work With</h2>
          <p className="text-slate-400 text-sm">
            Specialized web development for software startups and technology platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHO_I_WORK_WITH.map((item) => (
            <div
              key={item.title}
              className="relative group overflow-hidden glass-card rounded-2xl p-7 border border-slate-800/80 hover:border-cyan-500/50 hover:-translate-y-1.5 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-lg"
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

      {/* 05 — PROCESS (DISCOVER → DESIGN → BUILD → LAUNCH) */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">Execution Workflow</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Process</h2>
          <p className="text-slate-400 text-sm">
            Discover → Design → Build → Launch. Standardized timeline designed for predictable delivery.
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

      {/* 06 — CTA */}
      <section className="relative group overflow-hidden glass-card rounded-3xl p-10 sm:p-14 border border-slate-800 hover:border-cyan-500/40 text-center max-w-4xl mx-auto hover:-translate-y-1.5 hover:scale-[1.008] transform-gpu transition-all duration-300 shadow-2xl">
        <CornerBorder />
        <div className="relative z-30 flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to start your project?</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Get a tailored scope, timeline, and proposal for your SaaS or product website.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-400/20 hover:-translate-y-1 hover:scale-[1.02] transform-gpu"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
