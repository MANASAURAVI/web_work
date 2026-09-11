import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '@/data/projects';
import { CornerBorder } from '@/components/CornerBorder';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Show top 3 key technologies for a clean, compact look
  const visibleTech = project.technologies.slice(0, 3);
  const remainingCount = project.technologies.length - visibleTech.length;

  return (
    <div className="group relative glass-card rounded-xl border border-white/15 hover:border-cyan-400 transition-all duration-300 ease-out shadow-lg hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8),0_0_25px_rgba(56,189,248,0.2)] transform-gpu z-10 hover:z-30 flex flex-col justify-between h-full max-w-full">
      {/* 4-Corner Hover Lines */}
      <CornerBorder />

      <div className="flex flex-col h-full relative z-30 justify-between">
        {/* Compact Image Container */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={project.image}
            alt={`${project.name} Screenshot`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-30">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-950/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-md shadow-sm">
              {project.badge}
            </span>
            {project.timeline && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-300 bg-slate-950/90 border border-slate-800 backdrop-blur-md shadow-sm">
                {project.timeline}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight leading-snug line-clamp-1">
                {project.name}
              </h3>
              <span className="text-[9px] font-mono text-slate-300 bg-white/[0.06] backdrop-blur-md px-2 py-0.5 rounded border border-white/10 shrink-0 mt-0.5">
                {project.category}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2">
              {project.shortDescription}
            </p>
          </div>

          {/* Tech Pills & Actions */}
          <div className="pt-2.5 border-t border-white/10 space-y-3 mt-auto">
            {/* Top 3 Tech Tags */}
            <div className="flex flex-wrap gap-1.5 items-center">
              {visibleTech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-white/[0.04] border border-white/10"
                >
                  {tech}
                </span>
              ))}
              {remainingCount > 0 && (
                <span className="text-[10px] font-mono text-slate-400 pl-0.5">
                  +{remainingCount}
                </span>
              )}
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-2 pt-0.5">
              <Link
                to={`/work/${project.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 hover:-translate-y-0.5 transform-gpu shadow-sm shadow-cyan-400/20"
              >
                <span>Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 hover:bg-emerald-500 hover:text-slate-950 transition-all duration-300 hover:-translate-y-0.5 transform-gpu"
                  title="View Live Demo"
                >
                  <span>Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
