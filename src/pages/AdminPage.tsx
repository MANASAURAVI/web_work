import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  QuerySnapshot,
  QueryDocumentSnapshot,
  FirestoreError,
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured, ContactQuery } from '@/lib/firebase';
import { sendEmailReply } from '@/lib/emailService';
import {
  LogOut,
  Mail,
  Search,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Inbox,
  Home,
  Send,
  MessageSquare,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  CheckSquare,
  Square,
  Target,
  HardDrive,
  Menu,
} from 'lucide-react';
import { CornerBorder } from '@/components/CornerBorder';
import { ColdOutreachHub } from '@/components/ColdOutreachHub';
import { CustomEmailComposer } from '@/components/CustomEmailComposer';
import { StorageManager } from '@/components/StorageManager';
import { AdminPowerHub } from '@/components/AdminPowerHub';
import { Zap } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'in-review' | 'replied' | 'archived'>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Main Navigation & View Mode State with LocalStorage Persistence across page refresh
  const [mainTabState, setMainTabState] = useState<'inquiries' | 'outreach' | 'composer' | 'storage' | 'admin_power'>(() => {
    try {
      const savedTab = localStorage.getItem('admin_active_main_tab');
      if (savedTab && ['inquiries', 'outreach', 'composer', 'storage', 'admin_power'].includes(savedTab)) {
        return savedTab as 'inquiries' | 'outreach' | 'composer' | 'storage' | 'admin_power';
      }
    } catch (e) {
      console.warn('Failed to load saved admin tab:', e);
    }
    return 'inquiries';
  });

  const mainTab = mainTabState;

  const setMainTab = (tab: 'inquiries' | 'outreach' | 'composer' | 'storage' | 'admin_power') => {
    setMainTabState(tab);
    try {
      localStorage.setItem('admin_active_main_tab', tab);
    } catch (e) {
      console.warn('Failed to save admin tab:', e);
    }
  };
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // 1-Hour Security Session Inactivity & Auto Logout State
  const [showSecurityPrompt, setShowSecurityPrompt] = useState(false);
  const [promptCountdown, setPromptCountdown] = useState(60); // 60 seconds stay-in window

  // Session activity listener & 1-hour inactivity timeout logic
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout | undefined;

    const resetInactivityTimer = () => {
      if (showSecurityPrompt) return; // Keep modal visible if already triggered
      clearTimeout(inactivityTimer);
      // Trigger prompt after 55 minutes of inactivity (giving 5 mins window before 1 hr), or 1 hour
      // 55 minutes = 3300000 ms, total 1 hr session limit = 3600000 ms
      inactivityTimer = setTimeout(() => {
        setPromptCountdown(60);
        setShowSecurityPrompt(true);
      }, 55 * 60 * 1000); 
    };

    // Global activity listeners
    const activityEvents = ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'];
    activityEvents.forEach((evt) => window.addEventListener(evt, resetInactivityTimer));

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      if (countdownInterval) clearInterval(countdownInterval);
      activityEvents.forEach((evt) => window.removeEventListener(evt, resetInactivityTimer));
    };
  }, [showSecurityPrompt]);

  // Countdown timer when security prompt modal is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showSecurityPrompt) {
      interval = setInterval(() => {
        setPromptCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showSecurityPrompt]);

  // Reply state management
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replySubjects, setReplySubjects] = useState<Record<string, string>>({});
  const [replyMessages, setReplyMessages] = useState<Record<string, string>>({});
  const [sendingMap, setSendingMap] = useState<Record<string, boolean>>({});
  const [toastMap, setToastMap] = useState<Record<string, { type: 'success' | 'error'; msg: string } | null>>({});
  const [webmailMap, setWebmailMap] = useState<Record<string, string | null>>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setLoading(false);
      // Demo mock data if Firebase not configured
      setQueries([
        {
          id: 'demo-1',
          name: 'Alex Rivera',
          email: 'alex@designflow.io',
          website: 'https://designflow.io',
          service: 'SaaS Product Redesign & Frontend',
          budget: '$5k - $10k',
          message: 'Looking for a high-performance web developer to redesign our SaaS landing page and app UI with glassmorphism and fast load times.',
          status: 'new',
          createdAt: { toDate: () => new Date() },
        },
        {
          id: 'demo-2',
          name: 'Sarah Chen',
          email: 'sarah@fintechlabs.com',
          website: 'https://fintechlabs.com',
          service: 'Custom Web Application',
          budget: '$10k+',
          message: 'Need a fullstack developer for an AI dashboard project. Direct founder collaboration required.',
          status: 'in-review',
          createdAt: { toDate: () => new Date(Date.now() - 86400000) },
        },
      ]);
      return;
    }

    const q = query(collection(db, 'queries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot) => {
        const queryList: ContactQuery[] = snapshot.docs.map((docSnap: QueryDocumentSnapshot) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as ContactQuery[];
        setQueries(queryList);
        setLoading(false);
      },
      (err: FirestoreError) => {
        console.error('Firestore listener error:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      if (auth) await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ContactQuery['status']) => {
    if (!isFirebaseConfigured || !db || id.startsWith('demo-')) {
      setQueries((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
      );
      return;
    }

    try {
      const docRef = doc(db, 'queries', id);
      await updateDoc(docRef, { status: newStatus });
    } catch (err) {
      console.error('Error updating query status:', err);
    }
  };

  const handleDeleteQuery = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this query entry?')) return;

    if (!isFirebaseConfigured || !db || id.startsWith('demo-')) {
      setQueries((prev) => prev.filter((q) => q.id !== id));
      return;
    }

    try {
      await deleteDoc(doc(db, 'queries', id));
    } catch (err) {
      console.error('Error deleting query:', err);
    }
  };

  // Bulk selection toggles
  const toggleSelectAll = () => {
    if (selectedIds.size === filteredQueries.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredQueries.map((q) => q.id || '')));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkStatusChange = async (newStatus: ContactQuery['status']) => {
    if (selectedIds.size === 0) return;
    const targets = Array.from(selectedIds);

    for (const id of targets) {
      await handleStatusChange(id, newStatus);
    }
    setSelectedIds(new Set());
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.size} selected leads?`)) return;

    const targets = Array.from(selectedIds);
    for (const id of targets) {
      if (!isFirebaseConfigured || !db || id.startsWith('demo-')) {
        setQueries((prev) => prev.filter((q) => q.id !== id));
      } else {
        try {
          await deleteDoc(doc(db, 'queries', id));
        } catch (e) {
          console.error(e);
        }
      }
    }
    setSelectedIds(new Set());
  };

  // Toggle reply box for an inquiry
  const toggleReplyBox = (q: ContactQuery) => {
    const qId = q.id || '';
    if (activeReplyId === qId) {
      setActiveReplyId(null);
      return;
    }
    setActiveReplyId(qId);

    if (!replySubjects[qId]) {
      setReplySubjects((prev) => ({
        ...prev,
        [qId]: `Re: ${q.service} Project Inquiry`,
      }));
    }

    if (!replyMessages[qId]) {
      setReplyMessages((prev) => ({
        ...prev,
        [qId]: `Hi ${q.name},

Thank you for reaching out regarding your ${q.service} project!

I've reviewed your project details and budget (${q.budget}). I would love to collaborate with you to craft a high-performance, modern application tailored to your goals.

Are you available for a brief call or chat this week to discuss the next steps?

Best regards,
Saurav Studio Admin`,
      }));
    }
  };

  const handleSendEmailReply = async (q: ContactQuery) => {
    const qId = q.id || '';
    const subject = replySubjects[qId] || `Re: ${q.service} Project Inquiry`;
    const message = replyMessages[qId] || '';

    if (!message.trim()) {
      setToastMap((prev) => ({
        ...prev,
        [qId]: { type: 'error', msg: 'Please type a reply message before sending.' },
      }));
      return;
    }

    setSendingMap((prev) => ({ ...prev, [qId]: true }));
    setToastMap((prev) => ({ ...prev, [qId]: null }));

    try {
      const res = await sendEmailReply({
        to_email: q.email,
        to_name: q.name,
        subject: subject,
        message: message,
        service_requested: q.service,
      });

      const now = new Date();

      if (res.webmailUrl) {
        setWebmailMap((prev) => ({ ...prev, [qId]: res.webmailUrl || null }));
      }

      if (isFirebaseConfigured && db && q.id && !q.id.startsWith('demo-')) {
        const docRef = doc(db, 'queries', q.id);
        await updateDoc(docRef, {
          status: 'replied',
          replyMessage: message,
          repliedAt: now,
        });
      }

      setQueries((prev) =>
        prev.map((item) =>
          item.id === q.id
            ? {
                ...item,
                status: 'replied',
                replyMessage: message,
                repliedAt: { toDate: () => now },
              }
            : item
        )
      );

      setToastMap((prev) => ({
        ...prev,
        [qId]: {
          type: 'success',
          msg: res.message || `Reply saved and lead updated to Replied!`,
        },
      }));
    } catch (err: any) {
      console.error('Failed to send email reply:', err);
      setToastMap((prev) => ({
        ...prev,
        [qId]: {
          type: 'error',
          msg: err.message || 'Failed to send email reply. Please try again.',
        },
      }));
    } finally {
      setSendingMap((prev) => ({ ...prev, [qId]: false }));
    }
  };

  // Stats calculation
  const totalCount = queries.length;
  const newCount = queries.filter((q) => q.status === 'new').length;
  const inReviewCount = queries.filter((q) => q.status === 'in-review').length;
  const repliedCount = queries.filter((q) => q.status === 'replied').length;
  const archivedCount = queries.filter((q) => q.status === 'archived').length;

  // Filtered queries
  const filteredQueries = queries.filter((q) => {
    const matchesTab = activeTab === 'all' || q.status === activeTab;
    const matchesSearch =
      q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.company && q.company.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: ContactQuery['status']) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            New Lead
          </span>
        );
      case 'in-review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium">
            <Clock className="w-3 h-3 text-amber-400" />
            In Review
          </span>
        );
      case 'replied':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium">
            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
            Replied
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono font-medium">
            <Archive className="w-3 h-3" />
            Archived
          </span>
        );
    }
  };

  return (
    <div className="max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8 pt-20 sm:pt-8 pb-8 space-y-6 sm:space-y-8">
      {/* Mobile Floating Glass Pill Navbar (Fixed to top of phone screens: sm:hidden) */}
      <header className="sm:hidden fixed top-3 left-3 right-3 z-50 transition-all duration-300">
        <div className="relative rounded-full bg-[#070b15]/95 border border-white/20 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] px-4 py-2.5 flex items-center justify-between">
          {/* Brand Logo (Matching Home Page) */}
          <div className="flex items-center gap-2 font-bold tracking-tight text-white shrink-0">
            <img
              src="https://avatars.githubusercontent.com/u/172996345?v=4&size=64"
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover border border-cyan-400/40 shadow-md shadow-blue-500/30"
            />
            <span className="font-mono text-sm font-bold tracking-tight">
              ADMIN<span className="text-blue-500">.</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold ml-0.5">
              Shield
            </span>
          </div>

          {/* Active Tab Badge & Toggle Button */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
              {mainTab === 'inquiries'
                ? `Inquiries (${queries.length})`
                : mainTab === 'outreach'
                ? 'Outreach'
                : mainTab === 'composer'
                ? 'Custom Mail'
                : mainTab === 'storage'
                ? 'Storage'
                : 'admin_power'}
            </span>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="p-2 rounded-full text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5 text-cyan-400" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Drawer Overlay (Exact Home Page AnimatePresence Animation) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <div className="sm:hidden">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              />

              {/* Floating Translucent Glass Card Drawer */}
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 240 }}
                className="fixed top-20 right-3 left-3 sm:right-8 sm:left-auto sm:w-[320px] h-auto rounded-3xl bg-[#070b15]/95 border border-white/20 backdrop-blur-2xl shadow-2xl p-5 flex flex-col gap-4 z-50"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/15">
                  <div className="flex items-center gap-2 font-bold tracking-tight text-white">
                    <img
                      src="https://avatars.githubusercontent.com/u/172996345?v=4&size=64"
                      alt="Avatar"
                      className="w-7 h-7 rounded-full object-cover border border-cyan-400/40"
                    />
                    <span className="font-mono text-sm font-bold tracking-tight">
                      ADMIN PANEL<span className="text-blue-500">.</span>
                    </span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close mobile navigation menu"
                    className="p-1.5 rounded-full text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 text-rose-400" />
                  </motion.button>
                </div>

                {/* Staggered Navigation Buttons */}
                <div className="flex flex-col space-y-1.5">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-2">
                    Admin Modules
                  </p>

                  {/* 1. Inquiries */}
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <button
                      onClick={() => {
                        setMainTab('inquiries');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between text-xs font-mono font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer ${
                        mainTab === 'inquiries'
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Inbox className="w-4 h-4 shrink-0" />
                        <span>Inquiries ({queries.length})</span>
                      </div>
                      {mainTab === 'inquiries' && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                    </button>
                  </motion.div>

                  {/* 2. Cold Outreach */}
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.09 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <button
                      onClick={() => {
                        setMainTab('outreach');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between text-xs font-mono font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer ${
                        mainTab === 'outreach'
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Target className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Cold Outreach</span>
                      </div>
                      {mainTab === 'outreach' && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                    </button>
                  </motion.div>

                  {/* 3. Custom Mail */}
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.13 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <button
                      onClick={() => {
                        setMainTab('composer');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between text-xs font-mono font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer ${
                        mainTab === 'composer'
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>Custom Mail</span>
                      </div>
                      {mainTab === 'composer' && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                    </button>
                  </motion.div>

                  {/* 4. Storage */}
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.17 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <button
                      onClick={() => {
                        setMainTab('storage');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between text-xs font-mono font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer ${
                        mainTab === 'storage'
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <HardDrive className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>Storage</span>
                      </div>
                      {mainTab === 'storage' && <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                    </button>
                  </motion.div>

                  {/* 5. admin_power */}
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.21 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <button
                      onClick={() => {
                        setMainTab('admin_power');
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between text-xs font-mono font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer ${
                        mainTab === 'admin_power'
                          ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                          : 'text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 border border-rose-500/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Zap className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>admin_power</span>
                      </div>
                      {mainTab === 'admin_power' ? (
                        <span className="w-2 h-2 rounded-full bg-rose-400" />
                      ) : (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          LOCKDOWN
                        </span>
                      )}
                    </button>
                  </motion.div>
                </div>

                {/* Quick System Actions (6. View Site & 7. Sign Out) */}
                <div className="pt-3 space-y-2 border-t border-white/15">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold px-2">
                    System Actions
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {/* 6. View Site */}
                    <motion.div whileTap={{ scale: 0.97 }}>
                      <Link
                        to="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-mono font-bold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-white/15 rounded-xl transition-colors"
                      >
                        <Home className="w-3.5 h-3.5 text-cyan-400" />
                        <span>View Site</span>
                      </Link>
                    </motion.div>

                    {/* 7. Sign Out */}
                    <motion.div whileTap={{ scale: 0.97 }}>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-mono font-bold text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 rounded-xl transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-400" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* Header Bar for Desktop Only (sm:flex) */}
      <div className="hidden sm:flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure Admin Control Center</span>
          </div>
          <h1 className="text-3xl font-extrabold font-mono text-white tracking-tight">
            Saurav Studio Admin
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="relative group overflow-hidden px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300 flex items-center gap-2 shadow-lg hover:-translate-y-0.5"
          >
            <CornerBorder />
            <Home className="w-4 h-4 text-cyan-400" />
            <span>View Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="relative group overflow-hidden px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:border-rose-500/40 hover:text-rose-300 transition-all duration-300 flex items-center gap-2 shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <CornerBorder />
            <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-400 transition-colors" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Primary Module Switcher Tabs for Desktop Only (sm:flex) */}
      <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 border-b border-slate-800 pb-4 overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          onClick={() => setMainTab('inquiries')}
          className={`shrink-0 relative group overflow-hidden px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 sm:gap-2.5 cursor-pointer whitespace-nowrap ${
            mainTab === 'inquiries'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
          }`}
        >
          <CornerBorder />
          <Inbox className="w-4 h-4 shrink-0" />
          <span>Inquiries ({queries.length})</span>
        </button>

        <button
          onClick={() => setMainTab('outreach')}
          className={`shrink-0 relative group overflow-hidden px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 sm:gap-2.5 cursor-pointer whitespace-nowrap ${
            mainTab === 'outreach'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
          }`}
        >
          <CornerBorder />
          <Target className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Cold Outreach</span>
        </button>

        <button
          onClick={() => setMainTab('composer')}
          className={`shrink-0 relative group overflow-hidden px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 sm:gap-2.5 cursor-pointer whitespace-nowrap ${
            mainTab === 'composer'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
          }`}
        >
          <CornerBorder />
          <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Custom Mail</span>
        </button>

        <button
          onClick={() => setMainTab('storage')}
          className={`shrink-0 relative group overflow-hidden px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 sm:gap-2.5 cursor-pointer whitespace-nowrap ${
            mainTab === 'storage'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
          }`}
        >
          <CornerBorder />
          <HardDrive className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Storage</span>
        </button>

        <button
          onClick={() => setMainTab('admin_power')}
          className={`shrink-0 relative group overflow-hidden px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 sm:gap-2.5 cursor-pointer whitespace-nowrap ${
            mainTab === 'admin_power'
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
          }`}
        >
          <CornerBorder />
          <Zap className="w-4 h-4 text-rose-400 shrink-0" />
          <span>admin_power</span>
        </button>
      </div>

      {mainTab === 'outreach' ? (
        <ColdOutreachHub />
      ) : mainTab === 'composer' ? (
        <CustomEmailComposer />
      ) : mainTab === 'storage' ? (
        <StorageManager />
      ) : mainTab === 'admin_power' ? (
        <AdminPowerHub />
      ) : (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Demo Warning if Firebase key not added */}
          {!isFirebaseConfigured && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-start gap-3">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Dashboard Demo Mode Active</p>
                <p className="text-slate-300 mt-1 leading-relaxed font-normal">
                  Showing preview data. Direct email replies are sent automatically and recorded to lead history. Connect Firebase keys in <code>.env</code> for live sync!
                </p>
              </div>
            </div>
          )}

          {/* Stats Overview Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="relative group overflow-hidden glass-card rounded-2xl p-4 border border-slate-800">
              <CornerBorder />
              <p className="text-xs font-mono text-slate-400 font-medium">TOTAL INQUIRIES</p>
              <p className="text-2xl font-bold font-mono text-white mt-1">{totalCount}</p>
            </div>
            <div className="relative group overflow-hidden glass-card rounded-2xl p-4 border border-emerald-500/30 bg-emerald-950/10">
              <CornerBorder />
              <p className="text-xs font-mono text-emerald-400 font-medium">NEW LEADS</p>
              <p className="text-2xl font-bold font-mono text-emerald-300 mt-1">{newCount}</p>
            </div>
            <div className="relative group overflow-hidden glass-card rounded-2xl p-4 border border-amber-500/30 bg-amber-950/10">
              <CornerBorder />
              <p className="text-xs font-mono text-amber-400 font-medium">IN REVIEW</p>
              <p className="text-2xl font-bold font-mono text-amber-300 mt-1">{inReviewCount}</p>
            </div>
            <div className="relative group overflow-hidden glass-card rounded-2xl p-4 border border-cyan-500/30 bg-cyan-950/10">
              <CornerBorder />
              <p className="text-xs font-mono text-cyan-400 font-medium">REPLIED</p>
              <p className="text-2xl font-bold font-mono text-cyan-300 mt-1">{repliedCount}</p>
            </div>
            <div className="relative group overflow-hidden glass-card rounded-2xl p-4 border border-slate-800 col-span-2 sm:col-span-1">
              <CornerBorder />
              <p className="text-xs font-mono text-slate-400 font-medium">ARCHIVED</p>
              <p className="text-2xl font-bold font-mono text-slate-300 mt-1">{archivedCount}</p>
            </div>
          </div>

          {/* High-Volume Controls Bar: Search, Status Filter, View Mode, Bulk Action */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, company, service..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {(['all', 'new', 'in-review', 'replied', 'archived'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium capitalize transition-colors shrink-0 cursor-pointer ${
                    activeTab === tab
                      ? 'bg-white text-slate-950 font-bold shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab === 'in-review' ? 'In Review' : tab}
                </button>
              ))}
            </div>

            {/* View Mode Toggle: Cards vs Table */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'cards' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Cards Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Compact Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bulk Selection Action Toolbar */}
          {selectedIds.size > 0 && (
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-500/50 text-xs font-mono text-cyan-300 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <span className="font-bold">{selectedIds.size} Selected</span>
                <button
                  onClick={toggleSelectAll}
                  className="text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Deselect All
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBulkStatusChange('replied')}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all"
                >
                  Mark Replied
                </button>
                <button
                  onClick={() => handleBulkStatusChange('archived')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
                >
                  Archive Selected
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* Queries View Container */}
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
              <p className="font-mono text-xs text-slate-400">Loading queries from Firestore...</p>
            </div>
          ) : filteredQueries.length === 0 ? (
            <div className="py-16 text-center space-y-3 rounded-2xl bg-slate-950/50 border border-slate-800 p-8">
              <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="font-mono text-sm text-slate-300 font-semibold">No queries found</p>
              <p className="text-xs text-slate-500 font-mono">
                {searchQuery ? 'Try clearing your search term.' : 'Submitted contact form inquiries will appear here.'}
              </p>
            </div>
          ) : viewMode === 'table' ? (
            /* Compact Table View for Bulk Mails */
            <div className="overflow-x-auto rounded-2xl border border-slate-800 glass-card">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <th className="p-3.5 w-10 text-center">
                      <button onClick={toggleSelectAll} className="cursor-pointer">
                        {selectedIds.size === filteredQueries.length ? (
                          <CheckSquare className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600" />
                        )}
                      </button>
                    </th>
                    <th className="p-3.5">Client / Email</th>
                    <th className="p-3.5">Service & Budget</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredQueries.map((q) => {
                    const qId = q.id || '';
                    const isSelected = selectedIds.has(qId);
                    return (
                      <tr key={qId} className={`hover:bg-slate-900/60 transition-colors ${isSelected ? 'bg-cyan-950/20' : ''}`}>
                        <td className="p-3.5 text-center">
                          <button onClick={() => toggleSelectOne(qId)} className="cursor-pointer">
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-cyan-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-600" />
                            )}
                          </button>
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-white">{q.name}</div>
                          <div className="text-slate-400">{q.email}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="text-slate-200">{q.service}</div>
                          <div className="text-emerald-400 font-bold">{q.budget}</div>
                        </td>
                        <td className="p-3.5">{getStatusBadge(q.status)}</td>
                        <td className="p-3.5 text-slate-400">
                          {q.createdAt?.toDate ? q.createdAt.toDate().toLocaleDateString() : 'Recent'}
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => toggleReplyBox(q)}
                              className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30"
                            >
                              Reply
                            </button>
                            <button
                              onClick={() => handleDeleteQuery(qId)}
                              className="text-slate-500 hover:text-rose-400 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Cards View */
            <div className="space-y-6">
              {filteredQueries.map((q) => {
                const qId = q.id || '';
                const isReplyOpen = activeReplyId === qId;
                const isSending = sendingMap[qId] || false;
                const toast = toastMap[qId];
                const webmailUrl = webmailMap[qId];
                const isSelected = selectedIds.has(qId);

                return (
                  <div
                    key={qId}
                    className={`relative group overflow-hidden glass-card rounded-2xl p-6 border transition-all duration-300 shadow-xl space-y-4 ${
                      isSelected ? 'border-cyan-500/60 bg-cyan-950/10' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <CornerBorder />

                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <button onClick={() => toggleSelectOne(qId)} className="cursor-pointer">
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-cyan-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-600" />
                            )}
                          </button>

                          <h3 className="text-xl font-bold text-white tracking-tight">{q.name}</h3>
                          {getStatusBadge(q.status)}

                          {q.createdAt?.toDate && (
                            <span className="text-xs text-slate-500 font-mono ml-auto lg:ml-0">
                              {q.createdAt.toDate().toLocaleString()}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-cyan-400" />
                            <a href={`mailto:${q.email}`} className="hover:text-cyan-300 transition-colors">
                              {q.email}
                            </a>
                          </div>

                          {q.website && (
                            <div className="flex items-center gap-1.5">
                              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                              <a
                                href={q.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-cyan-300 transition-colors underline"
                              >
                                {q.website}
                              </a>
                            </div>
                          )}

                          <div className="text-slate-300 font-semibold bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                            Service: <span className="text-cyan-300">{q.service}</span>
                          </div>

                          <div className="text-emerald-400 font-semibold bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-800/40">
                            Budget: {q.budget}
                          </div>
                        </div>

                        {/* Inquiry Message Box */}
                        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                          <p className="text-xs font-mono uppercase text-slate-500 mb-1 font-semibold">Client Inquiry Message:</p>
                          {q.message}
                        </div>

                        {/* Reply History Badge (if replied previously) */}
                        {q.replyMessage && (
                          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 space-y-1 font-mono">
                            <div className="flex items-center justify-between text-[11px] text-cyan-400 font-bold">
                              <span>Sent Email Reply:</span>
                              {q.repliedAt?.toDate && <span>{q.repliedAt.toDate().toLocaleString()}</span>}
                            </div>
                            <p className="leading-relaxed font-sans text-slate-300 text-xs whitespace-pre-wrap">
                              {q.replyMessage}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Status Action Buttons & Reply Toggle */}
                      <div className="flex flex-wrap lg:flex-col items-end gap-2 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-800 pt-4 lg:pt-0 lg:pl-6">
                        <button
                          onClick={() => toggleReplyBox(q)}
                          className={`w-full relative group overflow-hidden px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                            isReplyOpen
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20'
                          }`}
                        >
                          <CornerBorder />
                          {isReplyOpen ? (
                            <>
                              <X className="w-3.5 h-3.5" />
                              <span>Close Reply</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5 text-slate-950" />
                              <span>Send Direct Email</span>
                            </>
                          )}
                        </button>

                        <div className="w-full pt-2 flex flex-col gap-1.5 text-[11px] font-mono">
                          <p className="text-slate-500 font-semibold mb-0.5">Update Status</p>
                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              onClick={() => handleStatusChange(qId, 'new')}
                              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-300 text-slate-400 text-center transition-colors"
                            >
                              Mark New
                            </button>
                            <button
                              onClick={() => handleStatusChange(qId, 'in-review')}
                              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:text-amber-300 text-slate-400 text-center transition-colors"
                            >
                              In Review
                            </button>
                            <button
                              onClick={() => handleStatusChange(qId, 'replied')}
                              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 text-slate-400 text-center transition-colors"
                            >
                              Replied
                            </button>
                            <button
                              onClick={() => handleStatusChange(qId, 'archived')}
                              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-600 hover:text-slate-200 text-slate-400 text-center transition-colors"
                            >
                              Archive
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteQuery(qId)}
                          className="mt-2 text-xs font-mono text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1 self-end"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Expandable Inline Direct Email Composer */}
                    {isReplyOpen && (
                      <div className="mt-4 pt-6 border-t border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                            <Send className="w-4 h-4 text-cyan-400" />
                            <span>Direct Email Composer (Automatic Send)</span>
                          </h4>
                          <span className="text-[11px] font-mono text-slate-400">
                            Recipient: <strong className="text-white">{q.email}</strong>
                          </span>
                        </div>

                        {toast && (
                          <div
                            className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
                              toast.type === 'success'
                                ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
                                : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
                            }`}
                          >
                            {toast.type === 'success' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                            <span>{toast.msg}</span>
                          </div>
                        )}

                        {webmailMap[qId] && (
                          <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs font-mono flex items-center justify-between text-cyan-300">
                            <span>Alternative: Click to open Gmail Web with your pre-filled reply</span>
                            <a
                              href={webmailMap[qId]!}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-1"
                            >
                              <span>Open Gmail Web</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}

                        <div className="space-y-3">
                          <div>
                            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1 font-semibold">
                              Email Subject
                            </label>
                            <input
                              type="text"
                              value={replySubjects[qId] || ''}
                              onChange={(e) =>
                                setReplySubjects((prev) => ({ ...prev, [qId]: e.target.value }))
                              }
                              className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-[11px] font-mono uppercase text-slate-400 font-semibold">
                                Reply Message Body
                              </label>
                              <span className="text-[10px] font-mono text-slate-500">
                                {(replyMessages[qId] || '').length} chars
                              </span>
                            </div>
                            <textarea
                              rows={6}
                              value={replyMessages[qId] || ''}
                              onChange={(e) =>
                                setReplyMessages((prev) => ({ ...prev, [qId]: e.target.value }))
                              }
                              className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <p className="text-[11px] text-slate-500 font-mono">
                            ⚡ Automatically sends email to client & updates status to 'Replied'
                          </p>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setActiveReplyId(null)}
                              className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              disabled={isSending}
                              onClick={() => handleSendEmailReply(q)}
                              className="relative group overflow-hidden px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 transition-all shadow-lg shadow-cyan-400/20 flex items-center gap-2 cursor-pointer"
                            >
                              <CornerBorder />
                              {isSending ? (
                                <>
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-950" />
                                  <span>Sending Email...</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-3.5 h-3.5 text-slate-950" />
                                  <span>Send Email Now</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 1-Hour Security Session Inactivity Modal */}
      <AnimatePresence>
        {showSecurityPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative group overflow-hidden glass-card rounded-2xl p-6 sm:p-8 max-w-md w-full border border-cyan-500/40 shadow-2xl space-y-6"
            >
              <CornerBorder />

              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
                  <ShieldCheck className="w-6 h-6 animate-pulse text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Admin Session Security Timeout
                  </h3>
                  <p className="text-xs font-mono text-cyan-400">Inactivity Protection Active</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                <p>
                  You have been inactive for <strong className="text-white">1 hour</strong>. Would you like to stay logged in to your admin session?
                </p>

                {/* Countdown display */}
                <div className="flex items-center justify-center py-4 bg-slate-950/90 rounded-xl border border-slate-800/80 space-x-3">
                  <Clock className="w-5 h-5 text-cyan-400 animate-spin" />
                  <span className="text-2xl font-extrabold font-mono text-cyan-400 tracking-wider">
                    {promptCountdown}s
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-500 text-center">
                  If no response is received in {promptCountdown}s, you will be automatically logged out.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSecurityPrompt(false);
                    setPromptCountdown(60);
                  }}
                  className="w-full sm:flex-1 px-4 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-400/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Stay Logged In</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Log Out Now</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
