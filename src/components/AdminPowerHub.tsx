import React, { useState, useEffect } from 'react';
import {
  SecurityConfig,
  getLocalSecurityConfig,
  saveSecurityConfig,
  subscribeSecurityConfig,
  DEFAULT_SECURITY_CONFIG,
} from '@/lib/securityService';
import { CornerBorder } from '@/components/CornerBorder';
import {
  ShieldAlert,
  ShieldCheck,
  Shield,
  Zap,
  Lock,
  Unlock,
  Key,
  Copy,
  MousePointer,
  EyeOff,
  Printer,
  FileCode2,
  Terminal,
  MonitorOff,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Sliders,
  Layers,
  Save,
} from 'lucide-react';

export const AdminPowerHub: React.FC = () => {
  const [config, setConfig] = useState<SecurityConfig>(getLocalSecurityConfig());
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeSecurityConfig((newConfig) => {
      setConfig(newConfig);
    });
    return () => unsubscribe();
  }, []);

  // Helper to instantly save and apply changes live
  const updateAndSaveConfig = (newConfig: SecurityConfig) => {
    setConfig(newConfig);
    saveSecurityConfig(newConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleToggle = (key: keyof SecurityConfig) => {
    const updated = {
      ...config,
      [key]: !config[key],
    };
    updateAndSaveConfig(updated);
  };

  const handleActionChange = (action: SecurityConfig['devToolsAction']) => {
    const updated = {
      ...config,
      devToolsAction: action,
    };
    updateAndSaveConfig(updated);
  };

  const handleMessageChange = (msg: string) => {
    const updated = {
      ...config,
      customWarningMessage: msg,
    };
    updateAndSaveConfig(updated);
  };

  // Presets with instant save
  const applyPreset = (preset: 'max' | 'balanced' | 'unlocked') => {
    let newConfig: SecurityConfig;
    if (preset === 'max') {
      newConfig = {
        ...config,
        disableDevTools: true,
        disableRightClick: true,
        disableCopyPaste: true,
        disableTextSelection: true,
        disableViewSource: true,
        disablePrintSave: true,
        disableDragDrop: true,
        disableFrameEmbedding: true,
        devToolsAction: 'alert',
        clearConsolePeriodically: true,
        suppressConsoleLogs: true,
      };
    } else if (preset === 'balanced') {
      newConfig = {
        ...config,
        disableDevTools: true,
        disableRightClick: true,
        disableCopyPaste: false,
        disableTextSelection: false,
        disableViewSource: true,
        disablePrintSave: true,
        disableDragDrop: false,
        disableFrameEmbedding: true,
        devToolsAction: 'alert',
        clearConsolePeriodically: false,
        suppressConsoleLogs: false,
      };
    } else {
      newConfig = {
        ...config,
        disableDevTools: false,
        disableRightClick: false,
        disableCopyPaste: false,
        disableTextSelection: false,
        disableViewSource: false,
        disablePrintSave: false,
        disableDragDrop: false,
        disableFrameEmbedding: false,
        devToolsAction: 'alert',
        clearConsolePeriodically: false,
        suppressConsoleLogs: false,
      };
    }
    updateAndSaveConfig(newConfig);
  };

  // Active count calculation
  const activeProtectionsCount = [
    config.disableDevTools,
    config.disableRightClick,
    config.disableCopyPaste,
    config.disableTextSelection,
    config.disableViewSource,
    config.disablePrintSave,
    config.disableDragDrop,
    config.disableFrameEmbedding,
  ].filter(Boolean).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Status Header */}
      <div className="relative overflow-hidden glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900">
        <CornerBorder />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Admin Power • Website Security Command Center</span>
            </div>
            <h2 className="text-xl sm:text-4xl font-extrabold font-mono text-white tracking-tight flex flex-wrap items-center gap-2 sm:gap-3">
              <span>admin_power</span>
              {activeProtectionsCount > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Protection Active ({activeProtectionsCount}/8)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-mono">
                  <Unlock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  Protection Unlocked
                </span>
              )}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl font-mono leading-relaxed">
              Every toggle auto-saves and applies instantly across your live site. Disable developer tools, right-click, copy-paste, view source, and hacking shortcuts in real-time.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => applyPreset('max')}
              className="px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-[10px] sm:text-xs font-bold bg-rose-500/15 border border-rose-500/40 text-rose-300 hover:bg-rose-500/25 hover:border-rose-500 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-rose-500/10 cursor-pointer text-center"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0 hidden sm:block" />
              <span>MAX LOCK</span>
            </button>
            <button
              onClick={() => applyPreset('balanced')}
              className="px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-[10px] sm:text-xs font-bold bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 hover:border-cyan-500 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/10 cursor-pointer text-center"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0 hidden sm:block" />
              <span>BALANCED</span>
            </button>
            <button
              onClick={() => applyPreset('unlocked')}
              className="px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-[10px] sm:text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
            >
              <Unlock className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block" />
              <span>UNLOCKED</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Security Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Column 1: DevTools & Inspection Lockdown */}
        <div className="relative glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <CornerBorder />
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <MonitorOff className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono text-white">DevTools Lockdown</h3>
              <p className="text-xs text-slate-400 font-mono">F12, Inspect, Shortcuts & Reaction</p>
            </div>
          </div>

          {/* Master Switch for DevTools */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <label className="text-sm font-bold font-mono text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Disable Developer Tools</span>
                </label>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Blocks F12, Ctrl+Shift+I/J/C, Cmd+Option+I and DevTools opening.
                </p>
              </div>
              <button
                onClick={() => handleToggle('disableDevTools')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  config.disableDevTools ? 'bg-rose-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    config.disableDevTools ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {config.disableDevTools && (
              <div className="pt-3 border-t border-slate-800 space-y-2.5 animate-in fade-in duration-200">
                <p className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
                  DevTools Detection Action:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'alert', label: 'Fullscreen Warning Overlay', icon: AlertTriangle, desc: 'Displays security warning banner when inspect is detected' },
                    { id: 'debugger_trap', label: 'Infinite Debugger Trap', icon: Zap, desc: 'Freezes browser inspect tab in endless loop' },
                    { id: 'blur_overlay', label: 'Blur Page Content', icon: EyeOff, desc: 'Instantly blurs entire page content when DevTools open' },
                    { id: 'redirect', label: 'Redirect to Homepage', icon: RefreshCw, desc: 'Kicks inspect users back to homepage immediately' },
                  ].map((act) => (
                    <label
                      key={act.id}
                      onClick={() => handleActionChange(act.id as any)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl border text-xs font-mono cursor-pointer transition-all ${
                        config.devToolsAction === act.id
                          ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <act.icon className={`w-4 h-4 shrink-0 mt-0.5 ${config.devToolsAction === act.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <div>
                        <p className="font-bold text-white">{act.label}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{act.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* View Source Lockdown */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div>
              <label className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span>Disable View Source (Ctrl+U)</span>
              </label>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Blocks Ctrl+U and Cmd+Option+U view source shortcuts.
              </p>
            </div>
            <button
              onClick={() => handleToggle('disableViewSource')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                config.disableViewSource ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  config.disableViewSource ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Column 2: Content & Clipboard Security */}
        <div className="relative glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <CornerBorder />
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Copy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono text-white">Content & Clipboard</h3>
              <p className="text-xs text-slate-400 font-mono">Copy, Right-Click & Selection</p>
            </div>
          </div>

          {/* Copy Paste Lock */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div>
              <label className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Copy className="w-4 h-4 text-emerald-400" />
                <span>Disable Copy, Cut & Paste</span>
              </label>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Prevents copying website text, code, or snippets.
              </p>
            </div>
            <button
              onClick={() => handleToggle('disableCopyPaste')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                config.disableCopyPaste ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  config.disableCopyPaste ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Right Click Lock */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div>
              <label className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <MousePointer className="w-4 h-4 text-amber-400" />
                <span>Disable Right-Click</span>
              </label>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Blocks browser context menu on right click everywhere.
              </p>
            </div>
            <button
              onClick={() => handleToggle('disableRightClick')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                config.disableRightClick ? 'bg-amber-500' : 'bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  config.disableRightClick ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Text Selection Lock */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div>
              <label className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-purple-400" />
                <span>Disable Text Selection</span>
              </label>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Applies CSS user-select: none across document.
              </p>
            </div>
            <button
              onClick={() => handleToggle('disableTextSelection')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                config.disableTextSelection ? 'bg-purple-500' : 'bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  config.disableTextSelection ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Image & Drag Lock */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div>
              <label className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Disable Asset Drag & Drop</span>
              </label>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Prevents dragging images or elements out of site.
              </p>
            </div>
            <button
              onClick={() => handleToggle('disableDragDrop')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                config.disableDragDrop ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  config.disableDragDrop ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Column 3: Advanced Hacking & Admin Controls */}
        <div className="relative glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <CornerBorder />
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-mono text-white">System & Admin Protection</h3>
              <p className="text-xs text-slate-400 font-mono">Console, Print & Admin Bypass</p>
            </div>
          </div>

          {/* Print & Save Lock */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div>
              <label className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Disable Print & Save (Ctrl+P/S)</span>
              </label>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Restricts printing or downloading webpage HTML.
              </p>
            </div>
            <button
              onClick={() => handleToggle('disablePrintSave')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                config.disablePrintSave ? 'bg-amber-500' : 'bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  config.disablePrintSave ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Console Log Suppressor */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div>
              <label className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Suppress Console Logs</span>
              </label>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Silences console.log, warn, error outputs.
              </p>
            </div>
            <button
              onClick={() => handleToggle('suppressConsoleLogs')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                config.suppressConsoleLogs ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  config.suppressConsoleLogs ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Anti-Iframe Embedding */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div>
              <label className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Anti-Iframe Framebusting</span>
              </label>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Prevents embedding site in external malicious frames.
              </p>
            </div>
            <button
              onClick={() => handleToggle('disableFrameEmbedding')}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                config.disableFrameEmbedding ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  config.disableFrameEmbedding ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Allow Admin Bypass Toggle */}
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <label className="text-sm font-bold font-mono text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-rose-400" />
                  <span>Allow Logged-In Admin Bypass</span>
                </label>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  When enabled, Admin can use DevTools. When OFF, protections apply to EVERYONE (including Admin on this page!).
                </p>
              </div>
              <button
                onClick={() => handleToggle('allowAdminBypass')}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  config.allowAdminBypass ? 'bg-rose-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    config.allowAdminBypass ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Warning Message Customizer */}
      <div className="relative glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <CornerBorder />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold font-mono text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Custom Security Warning Banner Text</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              This message will be shown to users who try to open DevTools or perform blocked actions.
            </p>
          </div>
          {saveSuccess && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Auto-Saved & Applied Instantly!
            </span>
          )}
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={config.customWarningMessage}
            onChange={(e) => handleMessageChange(e.target.value)}
            placeholder="e.g. Developer tools and content copying have been disabled for security."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          />

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {config.lastUpdated
                  ? `Last updated: ${new Date(config.lastUpdated).toLocaleTimeString()}`
                  : 'Live reactive auto-save active'}
              </span>
            </div>
            <span className="text-emerald-400 font-medium">
              ✓ All changes auto-saved to localStorage & Firestore
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
