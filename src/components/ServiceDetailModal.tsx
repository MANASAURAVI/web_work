import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Layout, Rocket, Target, Code2, Zap, Sparkles } from 'lucide-react';
import { Service } from '@/data/services';
import { CornerBorder } from '@/components/CornerBorder';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [service, onClose]);

  if (!service) return null;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout className="w-6 h-6 text-cyan-400" />;
      case 'Rocket': return <Rocket className="w-6 h-6 text-emerald-400" />;
      case 'Target': return <Target className="w-6 h-6 text-amber-400" />;
      case 'Code2': return <Code2 className="w-6 h-6 text-indigo-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-cyan-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-emerald-400" />;
      default: return <Layout className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative group w-full max-w-2xl max-h-[85vh] rounded-3xl bg-[#070b15]/95 border border-white/20 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col z-50"
        >
          <CornerBorder />

          {/* Modal Header */}
          <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between gap-4 shrink-0 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-mono font-black text-cyan-400">{service.number}</span>
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                {getServiceIcon(service.iconName)}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 inline-block font-semibold mb-1">
                  {service.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                  {service.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left">
            {/* Tagline & Positioning */}
            <div className="space-y-2">
              <p className="text-cyan-300 font-semibold text-sm sm:text-base">
                {service.tagline}
              </p>
              <p className="text-slate-200 text-sm leading-relaxed font-normal bg-white/[0.03] p-4 rounded-xl border border-white/10">
                "{service.positioning}"
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Overview & Value
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Deliverables List */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                Key Deliverables Included:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-white/10">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 font-normal leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suitable For */}
            <div className="space-y-2.5 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Suitable For:
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.suitableFor.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Example Structure (if available) */}
            {service.exampleStructure && service.exampleStructure.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                  Example Page Blueprint:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.exampleStructure.map((item, idx) => (
                    <span
                      key={item}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-300"
                    >
                      {idx + 1}. {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Bar */}
          <div className="p-4 sm:p-6 border-t border-white/10 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <span className="text-xs font-mono text-slate-400 text-center sm:text-left">
              Ready to execute this scope for your platform?
            </span>

            <Link
              to="/contact"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 hover:-translate-y-0.5 transform-gpu shadow-lg shadow-cyan-400/20"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
