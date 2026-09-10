import React from 'react';
import { motion } from 'framer-motion';

interface PeekingPersonProps {
  showPassword: boolean;
}

export const PeekingPerson: React.FC<PeekingPersonProps> = ({ showPassword }) => {
  return (
    <div className="hidden lg:flex flex-col items-center absolute left-[calc(100%+2rem)] top-1/2 -translate-y-1/2 z-30 pointer-events-none select-none">
      {/* Cute Mascot SVG with Headphones (Increased Size) */}
      <motion.div
        animate={{
          y: showPassword ? [0, -5, 0] : [0, 4, 0],
          rotate: showPassword ? [-3, 3, -3] : [0, 0, 0],
        }}
        transition={{
          y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
        }}
        className="w-48 h-48 relative"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(6,182,212,0.45)]">
          <defs>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="headphoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>
          </defs>

          {/* HEAD BASE */}
          <circle cx="60" cy="60" r="40" fill="url(#skinGrad)" stroke="#38bdf8" strokeWidth="2" />

          {/* CUTE HAIR BANGS */}
          <path d="M 24 50 Q 60 20 96 50 Q 80 32 60 32 Q 40 32 24 50 Z" fill="url(#hairGrad)" />

          {/* HEADPHONES - HEADBAND & PADS */}
          <g>
            {/* Outer Headband Arch */}
            <path d="M 16 55 Q 60 6 104 55" fill="none" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" />
            <path d="M 22 48 Q 60 14 98 48" fill="none" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

            {/* Left Ear Cup */}
            <rect x="9" y="42" width="14" height="30" rx="7" fill="url(#headphoneGrad)" stroke="#ec4899" strokeWidth="2.5" />
            <rect x="13" y="48" width="6" height="18" rx="3" fill="#22d3ee" className="animate-pulse" />

            {/* Right Ear Cup */}
            <rect x="97" y="42" width="14" height="30" rx="7" fill="url(#headphoneGrad)" stroke="#ec4899" strokeWidth="2.5" />
            <rect x="101" y="48" width="6" height="18" rx="3" fill="#22d3ee" className="animate-pulse" />
          </g>

          {/* MOUTH */}
          {showPassword ? (
            <path d="M 50 72 Q 60 84 70 72" fill="#06b6d4" stroke="#38bdf8" strokeWidth="1.5" />
          ) : (
            <path d="M 54 77 Q 60 74 66 77" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
          )}

          {/* EYES */}
          {showPassword ? (
            /* SHOW PASSWORD = ONE EYE OPEN, ONE EYE CLOSED (WINKING PEEKING PERSON) */
            <g>
              {/* LEFT EYE: CLOSED / WINKING ARC (^) */}
              <path d="M 40 58 Q 47 52 54 58" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />

              {/* RIGHT EYE: BIG WIDE OPEN PEEKING EYE (O) */}
              <circle cx="73" cy="56" r="9" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              {/* Glowing pupil looking left/down at password */}
              <circle cx="74" cy="58" r="4.5" fill="#06b6d4" />
              <circle cx="76" cy="56" r="1.5" fill="#ffffff" />

              {/* Raised Eyebrow on open eye */}
              <path d="M 66 43 Q 73 39 80 43" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ) : (
            /* HIDE PASSWORD = BOTH EYES CLOSED (🙈) */
            <g>
              {/* Left Eye Closed */}
              <path d="M 39 58 Q 46 64 53 58" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
              {/* Right Eye Closed */}
              <path d="M 67 58 Q 74 64 81 58" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />

              {/* Cute Hands covering eyes */}
              <g>
                <path d="M 28 65 C 28 55, 45 55, 52 65 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <path d="M 68 65 C 68 55, 85 55, 92 65 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              </g>
            </g>
          )}
        </svg>
      </motion.div>
    </div>
  );
};
