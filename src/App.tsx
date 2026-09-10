import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { HomePage } from '@/pages/HomePage';

const WorkPage = lazy(() => import('@/pages/WorkPage').then(m => ({ default: m.WorkPage })));
const CaseStudyPage = lazy(() => import('@/pages/CaseStudyPage').then(m => ({ default: m.CaseStudyPage })));
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const LoginPage = lazy(() => import('@/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const AdminPage = lazy(() => import('@/pages/AdminPage').then(m => ({ default: m.AdminPage })));
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { SecurityGuard } from '@/components/SecurityGuard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const location = useLocation();
  const isAuthOrAdmin = location.pathname === '/login' || location.pathname === '/admin';

  return (
    <div className="bg-[#07090E] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950 flex flex-col min-h-screen relative overflow-x-hidden w-full max-w-full">
      {/* Global Admin Power Security Protection */}
      <SecurityGuard />

      {/* Anime.js Interactive Studio Background */}
      <AnimatedBackground />
      
      <ScrollToTop />
      {!isAuthOrAdmin && <Navbar />}
      
      {/* Main Content Layered Above Background */}
      <main className={`flex-1 relative z-10 ${isAuthOrAdmin ? 'pt-0' : 'pt-20 sm:pt-24'}`}>
        <Suspense fallback={<div className="min-h-screen bg-[#07090E]" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>

      {!isAuthOrAdmin && <Footer />}
    </div>
  );
}

export default App;
