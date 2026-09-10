import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, PACKAGES, PROCESS_STEPS } from '@/data/services';
import { CheckCircle2, ArrowRight, Layout, Code2, Sparkles, Rocket, Zap, Target, ShieldCheck, Layers, ArrowUpRight } from 'lucide-react';
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

  return (
    <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-12 py-12 md:py-20 space-y-24">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/40">
          <Zap className="w-3.5 h-3.5" />
          <span>Strategic Web Offerings</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Services
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed font-normal">
          Designed specifically for startup founders, SaaS companies, and technology businesses. High-converting web design and frontend engineering delivered directly without agency bloat.
        </p>
      </div>

      {/* QUICK OVERVIEW GRID — "What I can help you build" */}
      <section className="space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
            What I can help you build
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

      {/* DEEP SERVICE BREAKDOWN (01 - 06) */}
      <section className="space-y-16">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">Service Details</span>
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

                    <h3 className="text-3xl font-bold text-white">{service.title}</h3>
                    <p className="text-cyan-400 font-medium text-sm">{service.tagline}</p>
                    
                    <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs italic text-slate-300 border-l-2 border-l-cyan-400">
                      "{service.positioning}"
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">{service.description}</p>

                    {/* Suitable For */}
                    <div className="pt-2 space-y-2">
                      <p className="text-xs font-mono uppercase text-slate-400 font-semibold">Suitable For:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.suitableFor.map((item) => (
                          <span
                            key={item}
                            className="relative group/pill overflow-hidden text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(56,189,248,0.2)] hover:-translate-y-0.5 hover:scale-[1.03] transform-gpu transition-all duration-300 cursor-pointer"
                          >
                            <CornerBorder />
                            <span className="relative z-30">{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Example SaaS Structure preview if available */}
                    {service.exampleStructure && (
                      <div className="pt-2 space-y-2">
                        <p className="text-xs font-mono uppercase text-slate-400 font-semibold">Typical Page Structure:</p>
                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                          {service.exampleStructure.map((page, i) => (
                            <div key={page} className="flex items-center gap-2">
                              <span className="text-slate-600">{i === 0 ? "Homepage" : `├── ${page}`}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Deliverables Column */}
                  <div className="lg:col-span-7 bg-slate-950/80 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Included Deliverables</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.deliverables.map((item) => (
                        <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-xs font-mono text-slate-200">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-900 flex justify-end">
                      <Link
                        to={`/contact?service=${service.id}`}
                        className="relative group overflow-hidden inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-white hover:bg-cyan-400 px-5 py-2.5 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] transform-gpu"
                      >
                        <CornerBorder />
                        <span className="relative z-30">Inquire for {service.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 relative z-30 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT PACKAGES SECTION */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">Structured Options</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Project Packages</h2>
          <p className="text-slate-400 text-sm">
            Transparent scope options tailored to your company's stage and timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative group overflow-hidden glass-card rounded-3xl border hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 h-full ${
                pkg.highlighted 
                  ? 'border-cyan-500/60 shadow-xl shadow-cyan-500/10 bg-slate-900/90' 
                  : 'border-slate-800'
              }`}
            >
              <CornerBorder />
              {pkg.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-950 font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-30">
                  Most Popular for Startups
                </div>
              )}

              <div className="p-8 flex flex-col justify-between h-full space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold font-mono text-white">{pkg.name}</h3>
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                        {pkg.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{pkg.target}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                    <p className="text-xs font-mono text-slate-400 uppercase">Investment:</p>
                    <p className="text-sm font-bold font-mono text-emerald-400 mt-0.5">{pkg.pricingText}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-mono uppercase text-slate-400 font-semibold">What's Included:</p>
                    <ul className="space-y-2 text-xs">
                      {pkg.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <Link
                    to="/contact"
                    className={`relative group overflow-hidden w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] transform-gpu ${
                      pkg.highlighted
                        ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-md'
                        : 'bg-white text-slate-950 hover:bg-cyan-400'
                    }`}
                  >
                    <CornerBorder />
                    <span>Select {pkg.name} Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* "DON'T SEE EXACTLY WHAT YOU NEED?" CALLOUT */}
      <section className="relative group overflow-hidden glass-card rounded-3xl border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 text-center max-w-4xl mx-auto shadow-xl">
        <CornerBorder />
        <div className="p-10 sm:p-16 space-y-6">
          <div className="space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Don't see exactly what you need?
            </h2>
            <p className="text-slate-300 text-lg max-w-xl mx-auto font-normal">
              Tell me what you're building. I'll tell you what I can do.
            </p>
          </div>
          <div className="relative z-10 pt-2">
            <Link
              to="/contact"
              className="relative group overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-400/20 hover:-translate-y-1 hover:scale-[1.02] transform-gpu"
            >
              <CornerBorder />
              <span>Start a project →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
