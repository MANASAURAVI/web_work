import React from 'react';

export const CornerBorder: React.FC = () => {
  return (
    <div className="absolute inset-0 rounded-[inherit] pointer-events-none z-20">
      {/* Top-Left Quadrant Border Trace */}
      <div
        className="absolute inset-0 rounded-[inherit] border-t-2 border-l-2 border-cyan-400 shadow-[0_0_12px_#38bdf8] pointer-events-none z-20 [clip-path:polygon(0%_0%,0%_0%,0%_0%,0%_0%)] group-hover:[clip-path:polygon(0%_0%,50%_0%,50%_50%,0%_50%)] group-hover/pill:[clip-path:polygon(0%_0%,50%_0%,50%_50%,0%_50%)] group-hover/btn:[clip-path:polygon(0%_0%,50%_0%,50%_50%,0%_50%)] group-hover/badge:[clip-path:polygon(0%_0%,50%_0%,50%_50%,0%_50%)] transition-[clip-path] duration-500 ease-out"
      />

      {/* Top-Right Quadrant Border Trace */}
      <div
        className="absolute inset-0 rounded-[inherit] border-t-2 border-r-2 border-cyan-400 shadow-[0_0_12px_#38bdf8] pointer-events-none z-20 [clip-path:polygon(100%_0%,100%_0%,100%_0%,100%_0%)] group-hover:[clip-path:polygon(100%_0%,100%_50%,50%_50%,50%_0%)] group-hover/pill:[clip-path:polygon(100%_0%,100%_50%,50%_50%,50%_0%)] group-hover/btn:[clip-path:polygon(100%_0%,100%_50%,50%_50%,50%_0%)] group-hover/badge:[clip-path:polygon(100%_0%,100%_50%,50%_50%,50%_0%)] transition-[clip-path] duration-500 ease-out"
      />

      {/* Bottom-Right Quadrant Border Trace */}
      <div
        className="absolute inset-0 rounded-[inherit] border-b-2 border-r-2 border-cyan-400 shadow-[0_0_12px_#38bdf8] pointer-events-none z-20 [clip-path:polygon(100%_100%,100%_100%,100%_100%,100%_100%)] group-hover:[clip-path:polygon(100%_100%,50%_100%,50%_50%,100%_50%)] group-hover/pill:[clip-path:polygon(100%_100%,50%_100%,50%_50%,100%_50%)] group-hover/badge:[clip-path:polygon(100%_100%,50%_100%,50%_50%,100%_50%)] transition-[clip-path] duration-500 ease-out"
      />

      {/* Bottom-Left Quadrant Border Trace */}
      <div
        className="absolute inset-0 rounded-[inherit] border-b-2 border-l-2 border-cyan-400 shadow-[0_0_12px_#38bdf8] pointer-events-none z-20 [clip-path:polygon(0%_100%,0%_100%,0%_100%,0%_100%)] group-hover:[clip-path:polygon(0%_100%,0%_50%,50%_50%,50%_100%)] group-hover/pill:[clip-path:polygon(0%_100%,0%_50%,50%_50%,50%_100%)] group-hover/btn:[clip-path:polygon(0%_100%,0%_50%,50%_50%,50%_100%)] group-hover/badge:[clip-path:polygon(0%_100%,0%_50%,50%_50%,50%_100%)] transition-[clip-path] duration-500 ease-out"
      />
    </div>
  );
};

