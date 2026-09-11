import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Terminal,
  BookOpen,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Layers,
  ArrowRight,
  CheckCircle2,
  Globe,
  Award,
  Zap,
  Rocket
} from 'lucide-react';
import { CornerBorder } from '@/components/CornerBorder';
import { CREDIBILITY_HIGHLIGHTS, WHY_WORK_WITH_ME, WHO_I_WORK_WITH } from '@/data/services';

export const AboutPage = () => {
  const leadershipHighlights = [
    {
      role: 'OWASP Chapter Lead',
      organization: 'OWASP Delhi Chapter',
      period: 'Active Leadership',
      badge: 'OWASP Leader',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40',
      bullets: [
        'Lead OWASP Delhi Chapter initiatives, coordinating application security events, technical speakers, and developer security workshops.',
        'Manage community outreach, application security reviews, and vulnerability mitigation guidelines for developers.'
      ]
    },
    {
      role: 'Unreal Engine Source Contributor',
      organization: 'Epic Games Developer Community',
      period: 'Open Source',
      badge: 'Epic Games Contributor',
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40',
      bullets: [
        'Contribute code refinements, issue investigations, and technical reviews within the Unreal Engine C++ source community.'
      ]
    },
    {
      role: 'Cybersecurity Community Operations',
      organization: 'DCG Gurugram',
      period: 'Community Operations',
      badge: 'Community Ops Lead',
      color: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/40',
      bullets: [
        'Coordinate cybersecurity workshops, technical meetups, and CTF infrastructure, managing logistics and contributor timelines.'
      ]
    }
  ];

  return (
    <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-12 py-12 md:py-20 space-y-24">
      
      {/* 01 — STUDIO & FOUNDER OVERVIEW */}
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-xs font-mono text-emerald-400 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span>SaaS / Product Web Developer</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Saurav Kumar
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-cyan-400 tracking-tight">
            Design + Frontend Engineering + Cloud Deployment for Software Companies
          </p>
        </div>

        {/* Contact Links Bar */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-mono text-slate-300 pt-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 shrink-0">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>India</span>
          </div>

          <a href="mailto:0501sauravkumar0501@gmail.com" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors max-w-full overflow-hidden">
            <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="truncate">0501sauravkumar0501@gmail.com</span>
          </a>

          <a href="https://github.com/cyberhavik" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors shrink-0">
            <Github className="w-4 h-4 text-slate-300 shrink-0" />
            <span>github.com/cyberhavik</span>
          </a>

          <a href="https://linkedin.com/in/cyberhavik" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors shrink-0">
            <Linkedin className="w-4 h-4 text-sky-400 shrink-0" />
            <span>linkedin.com/in/cyberhavik</span>
          </a>
        </div>

        {/* Studio Philosophy Statement */}
        <div className="relative group overflow-hidden glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
          <CornerBorder />
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed relative z-30 font-normal">
            I help SaaS founders, AI startups, and growing tech companies build high-converting websites and product interfaces. By combining conversion-focused UI design with fast React/Next.js frontend engineering and secure deployment, I eliminate the handoff friction between design and code. Every project is built around clarity, speed, and conversion momentum.
          </p>
        </div>
      </div>

      {/* 02 — IEEE RESEARCH PUBLICATION CARD */}
      <div className="relative group overflow-hidden glass-card rounded-2xl p-8 border border-cyan-500/30 hover:border-cyan-400 hover:-translate-y-1 transform-gpu transition-all duration-300 bg-gradient-to-r from-cyan-950/20 via-slate-900/50 to-indigo-950/20">
        <CornerBorder />
        <div className="relative z-30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800/60 font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>IEEE Xplore Publication</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              "AI-Driven Techniques for Web Search Vulnerability Identification"
            </h3>
            <p className="text-sm text-slate-300 font-mono">
              Co-authors: <span className="text-cyan-300">Alan Jolly John, Sarthak Dubey</span>
            </p>
          </div>

          <a
            href="https://ieeexplore.ieee.org/document/11386307"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-400/20 shrink-0"
          >
            <span>Read on IEEE Xplore</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 03 — CONCISE CREDIBILITY & TECHNICAL AUTHORITY */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold font-mono">Technical Authority</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Credibility & Highlights</h2>
          <p className="text-slate-400 text-sm">
            Proven application security leadership, open-source engineering, and published research.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CREDIBILITY_HIGHLIGHTS.map((cred) => (
            <div
              key={cred.title}
              className="relative group overflow-hidden glass-card rounded-2xl p-6 border border-slate-800 hover:border-amber-500/40 hover:-translate-y-1.5 transform-gpu transition-all duration-300 flex flex-col justify-between"
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
      </div>

      {/* 04 — LEADERSHIP & OPERATIONS */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">Industry Leadership</span>
          <h2 className="text-3xl font-extrabold text-white">Leadership & Community</h2>
        </div>

        <div className="space-y-6">
          {leadershipHighlights.map((exp) => (
            <div
              key={exp.role + exp.organization}
              className="relative group overflow-hidden glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-1 transform-gpu transition-all duration-300"
            >
              <CornerBorder />
              <div className="relative z-30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{exp.role}</span>
                      <span className="text-cyan-400 font-normal">@ {exp.organization}</span>
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded border ${exp.color}`}>
                      {exp.badge}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-slate-300 leading-relaxed font-normal">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 05 — WHY WORK WITH ME (4 PILLARS) */}
      <div className="relative group glass-card rounded-3xl border border-white/15 hover:border-cyan-400 hover:-translate-y-1.5 hover:scale-[1.008] transform-gpu transition-all duration-300 shadow-xl">
        <CornerBorder />
        <div className="p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">Studio Pillar</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Why Work With Me
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Design + development executed by one dedicated engineer, giving you fast communication and end-to-end delivery from idea to production launch.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_WORK_WITH_ME.points.map((pt) => (
              <div
                key={pt.title}
                className="relative group p-6 rounded-2xl bg-slate-950/90 border border-white/15 hover:border-cyan-400 hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.015] transform-gpu transition-all duration-300 flex flex-col gap-2"
              >
                <CornerBorder />
                <h3 className="text-base font-bold text-white relative z-30">{pt.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal relative z-30">{pt.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 06 — CONTACT CTA */}
      <div className="relative group overflow-hidden glass-card rounded-3xl p-10 sm:p-14 border border-slate-800 hover:border-cyan-500/40 text-center max-w-3xl mx-auto hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-xl">
        <CornerBorder />
        <div className="relative z-30 flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to build your next website?</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Let's discuss your product goals, target timeline, and custom website deliverables.
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
      </div>

    </div>
  );
};
