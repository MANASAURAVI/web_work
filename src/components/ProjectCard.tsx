import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/data/projects';
import { CornerBorder } from '@/components/CornerBorder';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500 ease-out shadow-xl hover:-translate-y-2.5 hover:scale-[1.018] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(56,189,248,0.25)] transform-gpu z-10 hover:z-30 h-full">
      {/* 4-Corner Connecting Hover Border Lines */}
      <CornerBorder />

      <div className="flex flex-col h-full relative z-30">
        {/* Large Project Image Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
          <img
            src={project.image}
            alt={`${project.name} Screenshot`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-30">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
              {project.badge}
            </span>
            {project.timeline && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-slate-300 bg-slate-950/80 border border-slate-800 backdrop-blur-md">
                {project.timeline}
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                {project.name}
              </h3>
              <span className="text-[11px] font-mono text-slate-300 bg-white/[0.06] backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 shrink-0">
                {project.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {project.shortDescription}
            </p>
          </div>

          {/* Tech Badges & CTA Link */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="relative group/pill overflow-hidden px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-300 bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(56,189,248,0.2)] hover:-translate-y-0.5 hover:scale-[1.03] transform-gpu transition-all duration-300 cursor-pointer"
                >
                  <CornerBorder />
                  <span className="relative z-30">{tech}</span>
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-2 gap-2.5 sm:gap-3">
              <Link
                to={`/work/${project.slug}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] transform-gpu shadow-md shadow-cyan-400/20"
              >
                <span>View Case Study</span>
                <ArrowUpRight className="w-4 h-4 text-slate-950 transition-transform hover:translate-x-0.5 hover:-translate-y-0.5" />
              </Link>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] transform-gpu shadow-md shadow-emerald-400/20"
                >
                  <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
                  <span>Live Demo</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-950 transition-transform hover:translate-x-0.5 hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
