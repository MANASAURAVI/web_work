import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PROJECTS } from '@/data/projects';
import { ArrowLeft, CheckCircle2, Cpu, ArrowUpRight } from 'lucide-react';
import { CornerBorder } from '@/components/CornerBorder';

export const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <article className="max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-16">
      {/* Navigation Back Link */}
      <div>
        <Link
          to="/work"
          className="relative group overflow-hidden inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-all duration-300 px-4 py-2 rounded-xl border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-0.5 hover:scale-[1.02] transform-gpu bg-slate-950/60"
        >
          <CornerBorder />
          <ArrowLeft className="w-4 h-4 relative z-30" />
          <span className="relative z-30">Back to Selected Work</span>
        </Link>
      </div>

      {/* 01 — HERO */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
              {project.category}
            </span>
            {project.client && (
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800">
                Client: {project.client}
              </span>
            )}
            {project.timeline && (
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800">
                Timeline: {project.timeline}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {project.name}
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
            {project.tagline}
          </p>

          {project.liveUrl && (
            <div className="pt-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] transform-gpu shadow-lg shadow-cyan-400/20"
              >
                <span className="relative z-30">View Live Platform</span>
                <ArrowUpRight className="w-4 h-4 relative z-30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          )}
        </div>

        {/* Large Screenshot Container */}
        <div className="relative group overflow-hidden aspect-[16/9] w-full rounded-2xl border border-slate-800 hover:border-cyan-500/40 shadow-2xl bg-slate-950 hover:-translate-y-1.5 hover:scale-[1.008] transform-gpu transition-all duration-300">
          <CornerBorder />
          <img
            src={project.image}
            alt={`${project.name} Full Preview`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top relative z-10"
          />
        </div>
      </section>

      {/* 02 — THE CHALLENGE */}
      <section className="relative group overflow-hidden glass-card rounded-2xl p-8 sm:p-12 border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-xl">
        <CornerBorder />
        <div className="relative z-30 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>02 — The Challenge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">What needed improvement</h2>
          <p className="text-slate-300 text-base leading-relaxed font-normal">
            {project.challenge}
          </p>
        </div>
      </section>

      {/* 03 — DESIGN DIRECTION */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span>03 — Design Direction</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Visual Language & Hierarchy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Typography */}
          <div className="relative group overflow-hidden glass-card rounded-xl border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-lg h-full">
            <CornerBorder />
            <div className="p-6 relative z-30 flex flex-col gap-3">
              <h3 className="text-xs font-mono uppercase text-slate-400">Typography System</h3>
              <p className="text-lg font-semibold text-white">{project.designDirection.typography}</p>
            </div>
          </div>

          {/* Color Palette */}
          <div className="relative group overflow-hidden glass-card rounded-xl border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-lg h-full">
            <CornerBorder />
            <div className="p-6 relative z-30 flex flex-col gap-3">
              <h3 className="text-xs font-mono uppercase text-slate-400">Color Palette</h3>
              <div className="flex flex-wrap gap-3">
                {project.designDirection.colors.map((color) => (
                  <div key={color.hex} className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                    <span className="w-4 h-4 rounded-full border border-slate-700 shadow-sm" style={{ backgroundColor: color.hex }} />
                    <span className="text-xs font-mono text-slate-300">{color.name} ({color.hex})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Layout & Language */}
        <div className="relative group overflow-hidden glass-card p-8 rounded-xl border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-1.5 hover:scale-[1.008] transform-gpu transition-all duration-300 shadow-lg">
          <CornerBorder />
          <div className="relative z-30 flex flex-col gap-4">
            <h3 className="text-sm font-mono uppercase text-slate-400">Layout & Visual Philosophy</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{project.designDirection.layoutDescription}</p>
            <p className="text-slate-400 text-xs font-mono pt-2 border-t border-slate-900">{project.designDirection.visualLanguage}</p>
          </div>
        </div>
      </section>

      {/* 04 — KEY SECTIONS */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>04 — Key Sections</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Anatomy of the Experience</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.keySections.map((section) => (
            <div key={section.title} className="relative group overflow-hidden glass-card rounded-xl border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-lg h-full">
              <CornerBorder />
              <div className="p-6 flex flex-col justify-between h-full gap-4 relative z-30">
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-bold text-white">{section.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">{section.description}</p>
                </div>
                <ul className="flex flex-col gap-2 pt-2 border-t border-slate-900/80">
                  {section.features.map((feat) => (
                    <li key={feat} className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05 — FINAL RESULT */}
      <section className="relative group overflow-hidden glass-card rounded-2xl p-8 sm:p-12 border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-1.5 hover:scale-[1.008] transform-gpu transition-all duration-300 shadow-xl">
        <CornerBorder />
        <div className="relative z-30 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>05 — Final Result</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Impact & Desktop Visuals</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{project.finalResult.summary}</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-900">
            {project.finalResult.metrics.map((m) => (
              <div key={m.label} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 hover:border-emerald-500/40 transition-colors flex flex-col gap-1">
                <p className="text-2xl font-bold font-mono text-emerald-400">{m.value}</p>
                <p className="text-xs text-slate-400 font-mono mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Visual Mockup Container */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950 mt-2">
            <img
              src={project.finalResult.desktopVisual}
              alt={`${project.name} Final Result`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* 06 — TECHNOLOGY */}
      <section className="relative group overflow-hidden glass-card rounded-2xl p-8 border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-lg">
        <CornerBorder />
        <div className="relative z-30 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>06 — Technology Stack</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="relative group/pill overflow-hidden px-4 py-2 rounded-xl text-xs font-mono text-slate-200 bg-slate-950/90 border border-slate-800 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:-translate-y-0.5 hover:scale-[1.03] transform-gpu transition-all duration-300 cursor-pointer"
              >
                <CornerBorder />
                <span className="relative z-30">{t}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — CTA */}
      <section className="relative group overflow-hidden glass-card rounded-3xl p-10 sm:p-14 border border-slate-800 hover:border-cyan-500/40 text-center hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-xl">
        <CornerBorder />
        <div className="relative z-30 flex flex-col items-center gap-6">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">07 — Next Step</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Have a website that needs the same treatment?
          </h2>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-400/20 hover:-translate-y-1 hover:scale-[1.02] transform-gpu"
            >
              Let's talk →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
};
