import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Lock } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/SocialIcons';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-300">
      {/* Floating Glass Pill Navbar Container */}
      <div className="relative rounded-full bg-[#070b15]/80 border border-white/15 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] px-5 sm:px-6 py-2.5 flex items-center justify-between transition-all">
        
        {/* Left: Brand Logo */}
        <Link 
          to="/" 
          className="group flex items-center gap-2.5 font-bold tracking-tight text-white hover:opacity-90 transition-opacity shrink-0"
        >
          <img
            src="https://avatars.githubusercontent.com/u/172996345?v=4&size=64"
            alt="Saurav Avatar"
            className="w-8 h-8 rounded-full object-cover border border-cyan-400/40 shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform"
          />
          <span className="font-mono text-base font-bold tracking-tight">
            SAURAV<span className="text-blue-500">.</span>
          </span>
        </Link>

        {/* Center: Desktop Nav Links */}
        <nav 
          className="hidden md:flex items-center gap-1"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const isHovered = hoveredNav === link.name;

            return (
              <Link
                key={link.name}
                to={link.href}
                onMouseEnter={() => setHoveredNav(link.name)}
                className={`relative px-4 py-2 text-xs font-semibold font-mono tracking-wide transition-colors rounded-full ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {/* Active Route Pill Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-blue-600/90 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover Background Highlight */}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="hoverPill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Desktop CTA, Admin Login & Mobile Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/login"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all border ${
              pathname === '/login'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-cyan-300 hover:bg-white/10 border-white/15'
            }`}
            title="Admin Login Portal"
          >
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Login</span>
          </Link>

          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-4.5 py-2 rounded-full text-xs font-bold font-mono text-slate-950 bg-white hover:bg-cyan-400 transition-all shadow-md active:scale-95 group"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
            className="md:hidden p-2 rounded-full text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Menu (Phone Only — Staggered Entrance & Micro-Tap Feedback) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden">
            {/* Subtle Light Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/15 backdrop-blur-[2px] z-40"
            />

            {/* Compact Translucent Glass Floating Card */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 240 }}
              className="fixed top-20 right-4 sm:right-8 w-[85%] max-w-[320px] h-auto rounded-3xl bg-[#070b15]/40 border border-white/20 backdrop-blur-2xl shadow-xl p-5 flex flex-col gap-4 z-50"
            >
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 font-bold tracking-tight text-white"
                >
                  <img
                    src="https://avatars.githubusercontent.com/u/172996345?v=4&size=64"
                    alt="Saurav Avatar"
                    className="w-7 h-7 rounded-full object-cover border border-cyan-400/40"
                  />
                  <span className="font-mono text-sm font-bold tracking-tight">
                    SAURAV<span className="text-blue-500">.</span>
                  </span>
                </Link>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close mobile navigation menu"
                  className="p-1.5 rounded-full text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Drawer Nav Links with Staggered Entrance */}
              <div className="flex flex-col space-y-1">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.04, duration: 0.2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between text-sm font-mono font-bold py-2.5 px-4 rounded-xl transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-200 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer Bottom CTA & Details */}
              <div className="pt-3 space-y-2.5 border-t border-white/15">
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-bold text-cyan-300 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 rounded-xl transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Admin Login</span>
                  </Link>
                </motion.div>

                <motion.div whileTap={{ scale: 0.97 }}>
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <span>Let's talk</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-950" />
                  </Link>
                </motion.div>

                <div className="text-center font-mono text-[9px] text-slate-300 space-y-1 pt-1">
                  <p>Freelance Web Developer & UI Engineer</p>
                  <a href="mailto:0501sauravkumar0501@gmail.com" className="text-cyan-400 block hover:underline">
                    0501sauravkumar0501@gmail.com
                  </a>
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <a
                      href="https://github.com/cyberhavik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      title="GitHub Profile"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/cyberhavik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
