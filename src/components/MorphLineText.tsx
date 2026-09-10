import React from 'react';
import { motion, Variants } from 'framer-motion';

export const MorphLineText: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.h1
      className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="overflow-hidden">
        <motion.span variants={lineVariants} className="inline-block">
          I design & build
        </motion.span>
      </div>

      <div className="overflow-hidden">
        <motion.span variants={lineVariants} className="inline-block">
          websites that make
        </motion.span>
      </div>

      <div className="overflow-hidden">
        <motion.span variants={lineVariants} className="inline-block">
          startups look
        </motion.span>
      </div>

      <div className="overflow-hidden pt-1 relative inline-block">
        <motion.span
          variants={lineVariants}
          className="inline-block text-blue-500 relative"
        >
          extraordinary.
          
          {/* Animated SVG Morph Line Underneath */}
          <svg
            viewBox="0 0 280 20"
            fill="none"
            className="absolute -bottom-2 left-0 w-full h-5 overflow-visible pointer-events-none"
          >
            <motion.path
              d="M 4 12 Q 140 2 276 10"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.6,
                ease: 'easeInOut',
              }}
            />
          </svg>
        </motion.span>
      </div>
    </motion.h1>
  );
};
