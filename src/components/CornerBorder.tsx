import React from 'react';

export const CornerBorder: React.FC = () => {
  return (
    <div className="absolute -inset-[2px] rounded-[inherit] pointer-events-none z-40">
      {/* Top-Left Quadrant Border Trace — Sharp, crisp solid bright line without blur/glow */}
      <div
        className="absolute inset-0 rounded-[inherit] border-t-2 border-l-2 border-cyan-400 pointer-events-none z-40 [clip-path:polygon(-50%_-50%,-50%_-50%,-50%_-50%,-50%_-50%)] group-hover:[clip-path:polygon(-50%_-50%,55%_-50%,55%_55%,-50%_55%)] group-hover/pill:[clip-path:polygon(-50%_-50%,55%_-50%,55%_55%,-50%_55%)] group-hover/btn:[clip-path:polygon(-50%_-50%,55%_-50%,55%_55%,-50%_55%)] group-hover/badge:[clip-path:polygon(-50%_-50%,55%_-50%,55%_55%,-50%_55%)] transition-[clip-path] duration-500 ease-out"
      />

      {/* Top-Right Quadrant Border Trace */}
      <div
        className="absolute inset-0 rounded-[inherit] border-t-2 border-r-2 border-cyan-400 pointer-events-none z-40 [clip-path:polygon(150%_-50%,150%_-50%,150%_-50%,150%_-50%)] group-hover:[clip-path:polygon(150%_-50%,150%_55%,45%_55%,45%_-50%)] group-hover/pill:[clip-path:polygon(150%_-50%,150%_55%,45%_55%,45%_-50%)] group-hover/btn:[clip-path:polygon(150%_-50%,150%_55%,45%_55%,45%_-50%)] group-hover/badge:[clip-path:polygon(150%_-50%,150%_55%,45%_55%,45%_-50%)] transition-[clip-path] duration-500 ease-out"
      />

      {/* Bottom-Right Quadrant Border Trace */}
      <div
        className="absolute inset-0 rounded-[inherit] border-b-2 border-r-2 border-cyan-400 pointer-events-none z-40 [clip-path:polygon(150%_150%,150%_150%,150%_150%,150%_150%)] group-hover:[clip-path:polygon(150%_150%,45%_150%,45%_45%,150%_45%)] group-hover/pill:[clip-path:polygon(150%_150%,45%_150%,45%_45%,150%_45%)] group-hover/btn:[clip-path:polygon(150%_150%,45%_150%,45%_45%,150%_45%)] group-hover/badge:[clip-path:polygon(150%_150%,45%_150%,45%_45%,150%_45%)] transition-[clip-path] duration-500 ease-out"
      />

      {/* Bottom-Left Quadrant Border Trace */}
      <div
        className="absolute inset-0 rounded-[inherit] border-b-2 border-l-2 border-cyan-400 pointer-events-none z-40 [clip-path:polygon(-50%_150%,-50%_150%,-50%_150%,-50%_150%)] group-hover:[clip-path:polygon(-50%_150%,-50%_45%,55%_45%,55%_150%)] group-hover/pill:[clip-path:polygon(-50%_150%,-50%_45%,55%_45%,55%_150%)] group-hover/btn:[clip-path:polygon(-50%_150%,-50%_45%,55%_45%,55%_150%)] group-hover/badge:[clip-path:polygon(-50%_150%,-50%_45%,55%_45%,55%_150%)] transition-[clip-path] duration-500 ease-out"
      />
    </div>
  );
};
