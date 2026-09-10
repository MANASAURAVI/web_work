import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from '@/lib/firebase';
import {
  SecurityConfig,
  getLocalSecurityConfig,
  subscribeSecurityConfig,
} from '@/lib/securityService';
import { ShieldAlert, Lock, AlertTriangle } from 'lucide-react';

export const SecurityGuard: React.FC = () => {
  const [config, setConfig] = useState<SecurityConfig>(getLocalSecurityConfig());
  const [securityToast, setSecurityToast] = useState<{ message: string; icon?: string } | null>(null);
  const [isDevToolsDetected, setIsDevToolsDetected] = useState(false);
  const location = useLocation();

  // Subscribe to config updates
  useEffect(() => {
    const unsubscribe = subscribeSecurityConfig((newConfig) => {
      setConfig(newConfig);
    });
    return () => unsubscribe();
  }, []);

  // Helper to check if current user is bypassed (e.g. logged in Admin)
  const isAdmin = !!auth?.currentUser || location.pathname.startsWith('/admin');
  const isBypassed = config.allowAdminBypass && isAdmin;

  // Show temporary toast on blocked action
  const triggerToast = (msg: string) => {
    setSecurityToast({ message: msg });
    setTimeout(() => {
      setSecurityToast(null);
    }, 3000);
  };

  // 1. Text Selection CSS Injection
  useEffect(() => {
    if (isBypassed) {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      return;
    }

    if (config.disableTextSelection) {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    } else {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    }

    return () => {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, [config.disableTextSelection, isBypassed]);

  // 2. Keyboard Shortcuts Interceptor (DevTools, View Source, Print, Save)
  useEffect(() => {
    if (isBypassed) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const isAlt = e.altKey;
      const key = e.key.toLowerCase();
      const code = e.code;

      // DevTools Shortcuts: F12, Ctrl+Shift+I/J/C/K, Cmd+Opt+I/J/C/K
      const isDevToolsKey =
        code === 'F12' ||
        key === 'f12' ||
        (isCtrlOrCmd && isShift && (key === 'i' || key === 'j' || key === 'c' || key === 'k')) ||
        (isCtrlOrCmd && isAlt && (key === 'i' || key === 'j' || key === 'c' || key === 'k'));

      if (config.disableDevTools && isDevToolsKey) {
        e.preventDefault();
        e.stopPropagation();
        triggerToast(config.customWarningMessage || 'Developer Tools shortcut disabled by Admin Power!');
        return false;
      }

      // View Source: Ctrl+U / Cmd+Opt+U / Cmd+U
      if ((config.disableViewSource || config.disableDevTools) && isCtrlOrCmd && (key === 'u' || (isAlt && key === 'u'))) {
        e.preventDefault();
        e.stopPropagation();
        triggerToast('View Source (Ctrl+U) disabled by Admin Power!');
        return false;
      }

      // Print & Save: Ctrl+P, Ctrl+S
      if (config.disablePrintSave && isCtrlOrCmd && (key === 'p' || key === 's')) {
        e.preventDefault();
        e.stopPropagation();
        triggerToast(`Page ${key === 'p' ? 'Printing' : 'Saving'} is restricted!`);
        return false;
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [config, isBypassed]);

  // 3. Right Click (Context Menu) Interceptor
  useEffect(() => {
    if (isBypassed) return;

    const handleContextMenu = (e: MouseEvent) => {
      if (config.disableRightClick || config.disableDevTools) {
        e.preventDefault();
        e.stopPropagation();
        triggerToast('Right-click context menu is disabled by Admin Power!');
        return false;
      }
    };

    window.addEventListener('contextmenu', handleContextMenu, true);
    return () => window.removeEventListener('contextmenu', handleContextMenu, true);
  }, [config.disableRightClick, config.disableDevTools, isBypassed]);

  // 4. Copy, Cut, Paste Interceptor
  useEffect(() => {
    if (isBypassed) return;

    const handleCopyCutPaste = (e: ClipboardEvent) => {
      if (config.disableCopyPaste) {
        e.preventDefault();
        e.stopPropagation();
        const action = e.type.toUpperCase();
        triggerToast(`${action} action is disabled on this website!`);
        return false;
      }
    };

    window.addEventListener('copy', handleCopyCutPaste, true);
    window.addEventListener('cut', handleCopyCutPaste, true);
    window.addEventListener('paste', handleCopyCutPaste, true);

    return () => {
      window.removeEventListener('copy', handleCopyCutPaste, true);
      window.removeEventListener('cut', handleCopyCutPaste, true);
      window.removeEventListener('paste', handleCopyCutPaste, true);
    };
  }, [config.disableCopyPaste, isBypassed]);

  // 5. Drag & Drop Interceptor
  useEffect(() => {
    if (isBypassed || !config.disableDragDrop) return;

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      triggerToast('Drag and drop is disabled for asset protection!');
      return false;
    };

    window.addEventListener('dragstart', handleDragStart, true);
    return () => window.removeEventListener('dragstart', handleDragStart, true);
  }, [config.disableDragDrop, isBypassed]);

  // 6. Anti-Iframe Framebusting
  useEffect(() => {
    if (config.disableFrameEmbedding && window.self !== window.top) {
      try {
        if (window.top) {
          window.top.location.href = window.self.location.href;
        }
      } catch (e) {
        console.warn('Framebusting prevented by browser cross-origin restriction');
      }
    }
  }, [config.disableFrameEmbedding]);

  // 7. Console Protection (Suppress logs / Clear console)
  useEffect(() => {
    if (isBypassed) return;

    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalInfo = console.info;

    if (config.suppressConsoleLogs) {
      console.log = () => {};
      console.warn = () => {};
      console.error = () => {};
      console.info = () => {};
    }

    let intervalId: any = null;
    if (config.clearConsolePeriodically) {
      intervalId = setInterval(() => {
        console.clear();
      }, 2000);
    }

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
      console.info = originalInfo;
      if (intervalId) clearInterval(intervalId);
    };
  }, [config.suppressConsoleLogs, config.clearConsolePeriodically, isBypassed]);

  // 8. DevTools Open Detection Loop & Reaction (Threshold & Debugger checks)
  useEffect(() => {
    if (isBypassed || !config.disableDevTools) {
      setIsDevToolsDetected(false);
      return;
    }

    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;

      let debuggerDetected = false;
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const end = performance.now();
      if (end - start > 100) {
        debuggerDetected = true;
      }

      if (widthThreshold || heightThreshold || debuggerDetected) {
        setIsDevToolsDetected(true);
      } else {
        setIsDevToolsDetected(false);
      }
    };

    const interval = setInterval(checkDevTools, 1000);
    return () => clearInterval(interval);
  }, [config.disableDevTools, config.devToolsAction, isBypassed]);

  // Handle DevTools Reaction overlays/effects
  useEffect(() => {
    if (isDevToolsDetected && config.devToolsAction === 'blur_overlay' && !isBypassed) {
      document.body.style.filter = 'blur(16px)';
    } else {
      document.body.style.filter = '';
    }

    if (isDevToolsDetected && config.devToolsAction === 'redirect' && !isBypassed) {
      window.location.href = '/';
    }
  }, [isDevToolsDetected, config.devToolsAction, isBypassed]);

  return (
    <>
      {/* DevTools Detected Warning Overlay (when action is alert or debugger_trap) */}
      {isDevToolsDetected && !isBypassed && (config.devToolsAction === 'alert' || config.devToolsAction === 'debugger_trap') && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-6 shadow-2xl shadow-rose-500/20">
            <ShieldAlert className="w-10 h-10 text-rose-500 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight mb-2">
            Developer Tools Disabled
          </h2>
          <p className="text-slate-400 font-mono text-sm max-w-md mb-6 leading-relaxed">
            {config.customWarningMessage || 'Accessing inspection tools and console is restricted by website security power settings.'}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Lock className="w-4 h-4" />
            <span>Admin Power Security Active</span>
          </div>
        </div>
      )}

      {/* Floating Security Notification Toast */}
      {securityToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99990] bg-slate-900/95 text-white border border-rose-500/40 px-5 py-3 rounded-2xl shadow-2xl shadow-rose-500/20 backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <span className="text-xs sm:text-sm font-mono font-medium text-slate-200">
            {securityToast.message}
          </span>
        </div>
      )}
    </>
  );
};
