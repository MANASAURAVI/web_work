import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Terminal,
  Award,
  BookOpen,
  Briefcase,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Lock,
  Server,
  BrainCircuit,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { CornerBorder } from '@/components/CornerBorder';

export const AboutPage = () => {
  const experiences = [
    {
      role: 'Chapter Lead',
      organization: 'OWASP Delhi Chapter',
      period: 'Sep 2026 - Present',
      badge: 'Active Leadership',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40',
      bullets: [
        'Lead OWASP Delhi Chapter activities, coordinating with cybersecurity professionals, speakers, volunteers, and community members to plan and deliver application security initiatives.',
        'Manage communication, scheduling, outreach, and follow-ups with technical contributors and stakeholders across chapter activities.'
      ]
    },
    {
      role: 'Unreal Engine Source Contributor',
      organization: 'Epic Games',
      period: 'Jan 2026 - Present',
      badge: 'Open Source Engine',
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40',
      bullets: [
        'Participate in issue discussions, code reviews, and community-driven development within the Unreal Engine source developer community and Epic Games GitHub organization.'
      ]
    },
    {
      role: 'Partner, Cybersecurity Community Operations',
      organization: 'DCG Gurugram',
      period: 'Aug 2025 - Present',
      badge: 'Community Ops',
      color: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/40',
      bullets: [
        'Own end-to-end planning and execution of cybersecurity events, workshops, and technical meetups, coordinating speakers, contributors, timelines, logistics, and deliverables.',
        'Manage structured outreach and follow-ups with professionals, speakers, and community members across cybersecurity initiatives.'
      ]
    },
    {
      role: 'Subject Matter Expert',
      organization: 'DG Sentinels',
      period: 'Aug 2024 - Aug 2026',
      badge: 'CTF & Infra',
      color: 'border-amber-500/40 text-amber-400 bg-amber-950/40',
      bullets: [
        'Contributed to cybersecurity events and CTF competitions, including challenge design, testing, and deployment, while supporting secure infrastructure and competition integrity.'
      ]
    },
    {
      role: 'IoT Security Head',
      organization: 'MRISA (Manav Rachna InfoSec Army)',
      period: 'Aug 2024 - Aug 2026',
      badge: '700+ Participant CTFs',
      color: 'border-rose-500/40 text-rose-400 bg-rose-950/40',
      bullets: [
        'Led IoT security initiatives and coordinated a team of student security researchers across vulnerability research activities.',
        'Planned and executed CTF competitions for 700+ participants, coordinating challenge development, testing, deployment, logistics, and competition operations.'
      ]
    }
  ];

  const projects = [
    {
      title: 'Defendrix',
      subtitle: 'Advanced Web Application Vulnerability Scanner',
      stack: 'Python · Flask · Selenium · REST APIs · MySQL',
      description: 'Automated OWASP Top 10 vulnerability scanner utilizing Selenium-driven DAST, with reusable modules for endpoint discovery, attack surface mapping, and structured reporting.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'SMEH News Platform',
      subtitle: 'Secure Full-Stack News CMS',
      stack: 'Next.js 15 · React 19 · Express.js · Prisma · SQLite · Docker · PM2 · VPS',
      description: 'Secure, full-stack news publishing platform with automated deployment and self-recovering server scripts on a Linux VPS. Hardened with JWT auth, RBAC, secure file validation, and zero-downtime Prisma migrations.',
      icon: <Server className="w-5 h-5 text-cyan-400" />
    },
    {
      title: 'AssistAI',
      subtitle: 'AI Accessibility Companion',
      stack: 'Next.js · TypeScript · Firebase Genkit · Google Gemini · Tailwind CSS',
      description: 'AI-powered accessibility platform featuring conversational AI, real-time vision assistance, sign language recognition, and multimodal object/scene understanding.',
      icon: <BrainCircuit className="w-5 h-5 text-indigo-400" />
    },
    {
      title: 'KnoxGuard',
      subtitle: 'URL Threat Detection System',
      stack: 'Python · Flask · Selenium · MySQL',
      description: 'Desktop-based URL threat detection system that flags phishing sites via rule-based validation with real-time security alerts.',
      icon: <Lock className="w-5 h-5 text-amber-400" />
    }
  ];

  const skillGroups = [
    {
      category: 'Cybersecurity & AppSec',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      skills: ['Application Security', 'Web Security', 'VAPT', 'Threat Modeling', 'OWASP Top 10', 'DAST', 'Secure SDLC', 'IoT Security', 'CTF Competitions']
    },
    {
      category: 'Programming Languages',
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash']
    },
    {
      category: 'Full-Stack Development',
      icon: <Code2 className="w-4 h-4 text-indigo-400" />,
      skills: ['Full-Stack Development', 'REST APIs', 'Next.js 15', 'React 19', 'Express.js', 'Prisma ORM', 'Tailwind CSS']
    },
    {
      category: 'Cloud & DevOps',
      icon: <Layers className="w-4 h-4 text-amber-400" />,
      skills: ['Microsoft Azure', 'Docker', 'CI/CD', 'Git & GitHub', 'Linux', 'VPS Management', 'Nginx & PM2']
    },
    {
      category: 'AI & Machine Learning',
      icon: <BrainCircuit className="w-4 h-4 text-rose-400" />,
      skills: ['Large Language Models (LLMs)', 'Computer Vision', 'Prompt Engineering', 'Firebase Genkit', 'Google Gemini']
    }
  ];

  const awards = [
    { title: 'Winner', detail: 'INTRUSIONX (2025) & Hacksplash 1.0 (2023)', tag: 'First Place' },
    { title: 'Finalist', detail: 'Avinya Tech Fest, IIT Guwahati (2024)', tag: 'National Finalist' },
    { title: '3rd Place', detail: 'Tech Trover Debugging (2023)', tag: 'Podium Finish' },
    { title: '8th Rank', detail: 'CyCog CTF (2024)', tag: 'Top 10' },
    { title: 'Top 170 / 1500+', detail: 'CyberHavoc CTF (2023)', tag: 'Global Rank' }
  ];

  return (
    <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-12 py-12 md:py-20 space-y-20">
      
      {/* HEADER / BIO SECTION */}
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-800/40 backdrop-blur-md">
          <ShieldCheck className="w-4 h-4" />
          <span>Cybersecurity Engineer & Security Researcher</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none font-mono">
            Saurav Kumar
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-cyan-300 tracking-tight">
            VAPT & AppSec · Security R&D · Security Project Coordination
          </p>
        </div>

        {/* Contact Links Bar */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-mono text-slate-300 pt-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 shrink-0">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Faridabad, Haryana, India</span>
          </div>

          <a href="tel:+919572855213" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors shrink-0">
            <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>+91-9572855213</span>
          </a>

          <a href="mailto:0501sauravkumar0501@gmail.com" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors max-w-full overflow-hidden">
            <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="truncate">0501sauravkumar0501@gmail.com</span>
          </a>

          <a href="https://astro-saurav.xyz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors shrink-0">
            <Globe className="w-4 h-4 text-amber-400 shrink-0" />
            <span>astro-saurav.xyz</span>
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

        {/* Executive Summary */}
        <div className="relative group overflow-hidden glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
          <CornerBorder />
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed relative z-30 font-normal">
            Cybersecurity engineer and security researcher with hands-on experience in VAPT, application security, IoT security, and security R&D. Experienced in coordinating cybersecurity initiatives, technical teams, events, CTF competitions, and research programs from planning through execution, including scheduling, stakeholder communication, follow-ups, documentation, and technical delivery. Strong understanding of web security, OWASP Top 10, and security testing workflows, with experience building security tooling and leading security-focused programs.
          </p>
        </div>
      </div>

      {/* IEEE RESEARCH PUBLICATION CARD */}
      <div className="relative group overflow-hidden glass-card rounded-2xl p-8 border border-cyan-500/30 hover:border-cyan-400 hover:-translate-y-1 transform-gpu transition-all duration-300 bg-gradient-to-r from-cyan-950/20 via-slate-900/50 to-indigo-950/20">
        <CornerBorder />
        <div className="relative z-30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800/60 font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>IEEE Xplore Publication (2026)</span>
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

      {/* PROFESSIONAL EXPERIENCE */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">Leadership & Operations</span>
          <h2 className="text-3xl font-extrabold text-white">Professional Experience</h2>
        </div>

        <div className="space-y-6">
          {experiences.map((exp) => (
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
                    <span className="text-xs font-mono text-slate-400 shrink-0">{exp.period}</span>
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

      {/* SECURITY & ENGINEERING PROJECTS */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">Technical Deliverables</span>
          <h2 className="text-3xl font-extrabold text-white">Featured Security Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.title}
              className="relative group overflow-hidden glass-card rounded-2xl p-8 border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-2 transform-gpu transition-all duration-300 flex flex-col justify-between"
            >
              <CornerBorder />
              <div className="relative z-30 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {proj.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                    <p className="text-xs font-mono text-cyan-300">{proj.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{proj.description}</p>
              </div>

              <div className="relative z-30 pt-6 mt-4 border-t border-slate-800/80">
                <span className="text-xs font-mono text-slate-400 block">{proj.stack}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TECHNICAL SKILLS GRID */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">Core Competencies</span>
          <h2 className="text-3xl font-extrabold text-white">Technical Skills & Expertise</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((grp) => (
            <div
              key={grp.category}
              className="relative group overflow-hidden glass-card rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-1 transform-gpu transition-all duration-300"
            >
              <CornerBorder />
              <div className="relative z-30 space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-3">
                  {grp.icon}
                  <h3 className="text-base font-bold text-white font-mono">{grp.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {grp.skills.map((sk) => (
                    <span
                      key={sk}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AWARDS & ACHIEVEMENTS */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">Honors & Competitions</span>
          <h2 className="text-3xl font-extrabold text-white">Awards & Achievements</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {awards.map((awd) => (
            <div
              key={awd.title + awd.detail}
              className="relative group overflow-hidden glass-card rounded-xl p-5 border border-slate-800 hover:border-amber-500/40 hover:-translate-y-1 transform-gpu transition-all duration-300"
            >
              <CornerBorder />
              <div className="relative z-30 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-white">{awd.title}</span>
                  </div>
                  <p className="text-xs text-slate-300">{awd.detail}</p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 shrink-0">
                  {awd.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT CTA */}
      <div className="relative group overflow-hidden glass-card rounded-3xl p-10 sm:p-14 border border-slate-800 hover:border-cyan-500/40 text-center max-w-3xl mx-auto hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-xl">
        <CornerBorder />
        <div className="relative z-30 flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold text-white">Let's Connect & Collaborate</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Available for security consulting, VAPT assessments, application security reviews, and technical project coordination.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="relative group/btn overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-400/20 hover:-translate-y-1 hover:scale-[1.02] transform-gpu"
            >
              <CornerBorder />
              <span className="relative z-30">Get In Touch →</span>
            </Link>

            <a
              href="mailto:0501sauravkumar0501@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white bg-slate-900 border border-slate-700 hover:border-cyan-400 transition-all duration-300"
            >
              <span>Email Directly</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
