import React from 'react';
import { ContactForm } from '@/components/ContactForm';
import { Mail, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';
import { CornerBorder } from '@/components/CornerBorder';

export const ContactPage = () => {
  const email = "0501sauravkumar0501@gmail.com";

  return (
    <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-12 py-12 md:py-20 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/40">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Response Guaranteed Within 24 Hours</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Have a project in mind?
        </h1>

        <p className="text-slate-300 text-lg leading-relaxed font-normal">
          Tell me what you're building and what you need help with. I'll review your details and send over a clear scope, estimate, and timeline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-8">
          <ContactForm />
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-4 space-y-8">
          {/* Direct Email Card */}
          <div className="relative group overflow-hidden glass-card rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-xl h-full">
            <CornerBorder />
            <div className="p-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase text-slate-400 font-semibold">Direct Email</h3>
                <a
                  href={`mailto:${email}`}
                  className="text-base font-mono text-white hover:text-cyan-400 transition-colors font-medium break-all"
                >
                  {email}
                </a>
              </div>
              <p className="text-xs text-slate-400">
                Prefer writing directly? Send an email with your pitch deck or project link.
              </p>
            </div>
          </div>

          {/* Social Proof & Networks */}
          <div className="relative group overflow-hidden glass-card rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-xl h-full">
            <CornerBorder />
            <div className="p-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">Social Profiles</h3>
              <div className="space-y-3 text-sm">
                <a
                  href="https://linkedin.com/in/cyberhavik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 hover:-translate-y-1 hover:scale-[1.015] transform-gpu transition-all duration-300"
                >
                  <CornerBorder />
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-xs">linkedin.com/in/cyberhavik</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </a>

                <a
                  href="https://github.com/cyberhavik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 hover:-translate-y-1 hover:scale-[1.015] transform-gpu transition-all duration-300"
                >
                  <CornerBorder />
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono text-xs">github.com/cyberhavik</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </a>
              </div>
            </div>
          </div>

          {/* What Happens Next Card */}
          <div className="relative group overflow-hidden glass-card rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-2 hover:scale-[1.015] transform-gpu transition-all duration-300 shadow-xl h-full">
            <CornerBorder />
            <div className="p-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">What Happens Next?</h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>I analyze your request, current site, and competitive positioning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>You get a tailored scope breakdown with transparent pricing & timeline.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>We kick off directly — design mockups ready within 5 business days.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
