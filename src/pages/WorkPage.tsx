import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CornerBorder } from '@/components/CornerBorder';

export const WorkPage = () => {
  return (
    <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-12 py-12 md:py-20 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/40">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Selected Work
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed font-normal">
          Here is the work I selected to demonstrate how strategic web design and clean frontend engineering elevate startup products and drive conversions.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.slug} project={project} priority={idx < 2} />
        ))}
      </div>

      {/* Case Study Callout Banner */}
      <div className="relative group overflow-hidden glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 hover:border-cyan-500/40 text-center flex flex-col items-center gap-6 max-w-3xl mx-auto hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-xl">
        <CornerBorder />
        <div className="relative z-30 flex flex-col items-center gap-6">
          <h3 className="text-2xl font-bold text-white">Have a website that needs the same treatment?</h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Whether you need a complete redesign or a high-converting launch page, I take projects from concept to deployment.
          </p>
          <Link
            to="/contact"
            className="relative group/btn overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-400/20 hover:-translate-y-1 hover:scale-[1.02] transform-gpu"
          >
            <CornerBorder />
            <span className="relative z-30">Let's talk about your project</span>
            <ArrowRight className="w-4 h-4 relative z-30 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
