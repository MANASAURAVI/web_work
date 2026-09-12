import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { Lock, Mail, ShieldAlert, ArrowRight, Loader2, ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react';
import { CornerBorder } from '@/components/CornerBorder';
import { motion, AnimatePresence } from 'framer-motion';
import { PeekingPerson } from '@/components/PeekingPerson';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const navigate = useNavigate();

  // Countdown timer for lockout
  React.useEffect(() => {
    if (!lockoutUntil) return;
    const interval = setInterval(() => {
      const remaining = Math.ceil((lockoutUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockoutUntil(null);
        setLockoutSeconds(0);
        setFailedAttempts(0);
      } else {
        setLockoutSeconds(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Rate limiting: lock after 5 failed attempts for 30 seconds
    if (lockoutUntil && Date.now() < lockoutUntil) {
      setError(`Too many failed attempts. Try again in ${lockoutSeconds}s.`);
      return;
    }

    if (!isFirebaseConfigured || !auth) {
      setError('Firebase is not yet configured. Please add your Firebase API keys to .env');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setFailedAttempts(0);
      navigate('/admin');
    } catch (err: any) {
      console.error('Login error:', err);
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        const until = Date.now() + 30000;
        setLockoutUntil(until);
        setLockoutSeconds(30);
        setError('Too many failed attempts. Locked for 30 seconds.');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError(`Invalid admin email or password. (${newAttempts}/5 attempts)`);
      } else {
        setError(err.message || 'Failed to sign in. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    if (!isFirebaseConfigured || !auth) {
      setError('Firebase is not yet configured. Please add your Firebase API keys to .env');
      return;
    }

    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email?.toLowerCase();

      // Fetch authorized admin emails from Firestore (not hardcoded in client JS)
      const db = getFirestore();
      const adminConfigDoc = await getDoc(doc(db, 'config', 'adminConfig'));
      const authorizedAdminEmails: string[] = adminConfigDoc.exists()
        ? (adminConfigDoc.data()?.authorizedEmails as string[]) ?? []
        : [];

      if (userEmail && authorizedAdminEmails.map((e) => e.toLowerCase()).includes(userEmail)) {
        navigate('/admin');
      } else {
        await signOut(auth);
        setError(`Access Denied. Account (${userEmail || 'unknown'}) is not an authorized admin.`);
      }
    } catch (err: any) {
      console.error('Google Sign-in error:', err);
      if (err.code === 'auth/unauthorized-domain') {
        const domain = window.location.hostname;
        setError(
          `Unauthorized Domain ("${domain}"): Please add "${domain}" in Firebase Console -> Authentication -> Settings -> Authorized Domains.`
        );
      } else if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Failed to sign in with Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      <div className="w-full max-w-md relative group glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl shadow-black/80">
        {/* Desktop Peeking Person Mascot on Right Side */}
        <PeekingPerson showPassword={showPassword} />

        <CornerBorder />
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-3xl pointer-events-none" />

        {/* Back to Home Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-all duration-300 group shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-white">
            Admin Access
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Sign in to manage project inquiries & client leads
          </p>
        </div>

        {/* Strict Admin Disclaimer Banner */}
        <div className="mb-6 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-start gap-3 shadow-md">
          <ShieldAlert className="w-4 h-4 shrink-0 text-cyan-400 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">Notice: Admin Only Area</p>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              This login section is strictly for authorized studio administrators. Public visitors do not need to sign in.
            </p>
          </div>
        </div>

        {/* Warning if Firebase config missing */}
        {!isFirebaseConfigured && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <div>
              <p className="font-semibold">Firebase Config Pending</p>
              <p className="text-[11px] text-amber-400/80 mt-0.5">
                Paste your Firebase keys into your <code>.env</code> file to enable live sign in.
              </p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Google One-Click Admin Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full relative group overflow-hidden py-3 px-4 rounded-xl font-mono text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 mb-6 shadow-md"
        >
          <CornerBorder />
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-[#0b101b] px-3 font-mono text-[10px] text-slate-500 uppercase tracking-widest absolute">
            or use email
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-medium">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.15, rotate: showPassword ? 10 : -10 }}
                whileTap={{ scale: 0.85, rotate: showPassword ? -15 : 15 }}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {showPassword ? (
                    <motion.div
                      key="eye-open"
                      initial={{ scale: 0.4, rotate: -45, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0.4, rotate: 45, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="relative flex items-center justify-center text-cyan-400"
                    >
                      <Eye className="w-4 h-4" />
                      <motion.span
                        initial={{ opacity: 0, scale: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0], y: [-2, -8, -12] }}
                        transition={{ duration: 0.45 }}
                        className="absolute -top-1 -right-1 text-cyan-300 pointer-events-none"
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                      </motion.span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="eye-closed"
                      initial={{ scale: 0.4, rotate: 45, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0.4, rotate: -45, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="flex items-center justify-center text-slate-500"
                    >
                      <EyeOff className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !!lockoutUntil}
            className="w-full relative group overflow-hidden py-3.5 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-slate-950 bg-white hover:bg-cyan-400 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-white/10"
          >
            <CornerBorder />
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Authenticating...</span>
              </>
            ) : lockoutUntil ? (
              <>
                <Lock className="w-4 h-4" />
                <span>Locked — wait {lockoutSeconds}s</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
