'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Mail, ArrowUpRight } from 'lucide-react';
import { CornerBorder } from '@/components/CornerBorder';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    website: '',
    projectType: 'Website Design',
    budget: '$5,000 - $10,000',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const budgetOptions = [
    '$2,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $20,000',
    '$20,000+'
  ];

  const projectTypes = [
    'Website Design',
    'Frontend Development',
    'Website Redesign',
    'Landing Page'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isFirebaseConfigured && db) {
        await addDoc(collection(db, 'queries'), {
          name: formData.name,
          company: formData.company || '',
          email: formData.email,
          website: formData.website || '',
          service: formData.projectType,
          budget: formData.budget,
          message: formData.message,
          status: 'new',
          createdAt: serverTimestamp(),
        });
      } else {
        console.log('Firebase not configured. Simulated form submission:', formData);
        await new Promise((res) => setTimeout(res, 800));
      }
      setSubmitted(true);
    } catch (err: any) {
      console.error('Error saving contact query to Firestore:', err);
      setError('Failed to send inquiry. Please try again or email directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group overflow-hidden glass-card rounded-3xl p-8 md:p-12 border border-slate-800 hover:border-cyan-500/40 hover:-translate-y-1 hover:scale-[1.005] transform-gpu transition-all duration-300 shadow-xl">
      <CornerBorder />
      {submitted ? (
        <div className="text-center py-16 space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
            <p className="text-slate-300 max-w-md mx-auto text-sm">
              Thank you for reaching out, <span className="text-white font-semibold">{formData.name}</span>. I'll review your project details and get back to you at <span className="text-cyan-400 font-mono">{formData.email}</span> within 24 hours.
            </p>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="relative group overflow-hidden px-6 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider text-slate-300 bg-slate-900 border border-slate-800 hover:text-white hover:bg-slate-800 hover:-translate-y-1 hover:scale-[1.02] transform-gpu transition-all duration-300"
          >
            <CornerBorder />
            Send Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
                Your Name <span className="text-cyan-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="e.g. Alex Rivera"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
                Email Address <span className="text-cyan-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="alex@yourcompany.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label htmlFor="company" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
                Company / Startup Name
              </label>
              <input
                id="company"
                type="text"
                placeholder="e.g. Acme SaaS Labs"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              />
            </div>

            {/* Current Website */}
            <div className="space-y-2">
              <label htmlFor="website" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
                Current Website (if applicable)
              </label>
              <input
                id="website"
                type="url"
                placeholder="https://yourcompany.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              />
            </div>
          </div>

          {/* Project Type */}
          <div className="space-y-3">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
              What are you looking to build?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {projectTypes.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({ ...formData, projectType: type })}
                  className={`relative group overflow-hidden px-3 py-2.5 rounded-xl text-xs font-medium border text-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] transform-gpu ${
                    formData.projectType === type
                      ? 'bg-cyan-950/60 border-cyan-500/80 text-cyan-300 shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <CornerBorder />
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div className="space-y-3">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
              Estimated Budget Range (USD)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {budgetOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setFormData({ ...formData, budget: option })}
                  className={`relative group overflow-hidden px-3 py-2.5 rounded-xl text-xs font-mono font-medium border text-center transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] transform-gpu ${
                    formData.budget === option
                      ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-300 shadow-sm shadow-emerald-500/20'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <CornerBorder />
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
              Project Details & Goals <span className="text-cyan-400">*</span>
            </label>
            <textarea
              id="message"
              required
              rows={4}
              placeholder="Tell me about your product, target timeline, and specific deliverables you need..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="relative group overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-400/20 hover:-translate-y-1 hover:scale-[1.02] transform-gpu active:scale-98 cursor-pointer"
          >
            <CornerBorder />
            {loading ? (
              <span>Sending inquiry...</span>
            ) : (
              <>
                <span>Send Inquiry</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
