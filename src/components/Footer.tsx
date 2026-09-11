import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';
import { CornerBorder } from '@/components/CornerBorder';

export const Footer = () => {
  const [copied, setCopied] = useState(false);
  const email = "0501sauravkumar0501@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-cyan-500/5 blur-2xl pointer-events-none" />

      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left: Branding & Short Title */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-white group">
            <img
              src="https://avatars.githubusercontent.com/u/172996345?v=4&size=64"
              alt="Saurav Avatar"
              className="w-7 h-7 rounded-full object-cover border border-cyan-400/40 shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform"
            />
            <span className="font-mono">SAURAV<span className="text-cyan-400">.</span></span>
          </Link>
          <span className="hidden sm:inline text-slate-800">|</span>
          <p className="text-xs text-slate-400 font-normal">
            Freelance Web Developer & UI Engineer
          </p>
        </div>

        {/* Center: Streamlined Inline Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium font-mono uppercase tracking-wider text-slate-400">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <Link to="/work" className="hover:text-cyan-400 transition-colors">Work</Link>
          <Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link>
          <Link to="/about" className="hover:text-cyan-400 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
        </nav>

        {/* Right: Direct Email & Social Icons */}
        <div className="flex items-center gap-3">
          {/* Email Copy Pill */}
          <div className="relative group overflow-hidden inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5 hover:border-cyan-500/50 hover:-translate-y-0.5 hover:scale-[1.02] transform-gpu transition-all duration-300">
            <CornerBorder />
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <a href={`mailto:${email}`} className="text-xs font-mono text-slate-200 hover:text-white font-medium">
              {email}
            </a>
            <button
              onClick={handleCopyEmail}
              title="Copy email to clipboard"
              className="p-1 text-slate-400 hover:text-cyan-400 rounded transition-colors relative z-10"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* GitHub Icon */}
          <a
            href="https://github.com/cyberhavik"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="relative group overflow-hidden p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/50 hover:-translate-y-0.5 hover:scale-[1.05] transform-gpu transition-all duration-300 flex items-center justify-center"
          >
            <CornerBorder />
            <GithubIcon className="w-4 h-4 relative z-10" />
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://linkedin.com/in/cyberhavik"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="relative group overflow-hidden p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/50 hover:-translate-y-0.5 hover:scale-[1.05] transform-gpu transition-all duration-300 flex items-center justify-center"
          >
            <CornerBorder />
            <LinkedinIcon className="w-4 h-4 text-cyan-400 relative z-10" />
          </a>
        </div>
      </div>

      {/* Bottom Copyright & Tech Stack bar */}
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-12 mt-6 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
        <p>© {new Date().getFullYear()} SAURAV. All rights reserved.</p>
        <p className="text-slate-600">Built with Vite, React & Tailwind CSS</p>
      </div>
    </footer>
  );
};
