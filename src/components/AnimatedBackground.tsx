import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#060911] transform-gpu" aria-hidden="true">
      {/* Hero background video — full screen seamless coverage */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero.png"
        className="absolute inset-0 w-full h-full object-cover opacity-100 select-none pointer-events-none brightness-105 contrast-105 will-change-transform transform-gpu"
        style={{ transform: 'translateZ(0)' }}
      >
        <source src="/website/hero_video.mp4" type="video/mp4" />
        <source src="/hero_video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};




