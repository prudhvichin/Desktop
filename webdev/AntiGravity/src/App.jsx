import { lazy, Suspense, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GameProvider } from './context/GameContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

const HomePage = lazy(() => import('./pages/HomePage'));
const GamesPage = lazy(() => import('./pages/GamesPage'));
const GameDetailsPage = lazy(() => import('./pages/GameDetailsPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="text-center space-y-3">
        <div className="relative w-12 h-12 mx-auto">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-neon-cyan border-t-transparent animate-spin" />
        </div>
        <p className="text-sm text-text-secondary">Loading...</p>
      </div>
    </div>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/games" element={<PageTransition><GamesPage /></PageTransition>} />
          <Route path="/games/:id" element={<PageTransition><GameDetailsPage /></PageTransition>} />
          <Route path="/favorites" element={<PageTransition><FavoritesPage /></PageTransition>} />
          <Route path="*" element={
            <PageTransition>
              <div className="flex items-center justify-center py-32">
                <div className="text-center">
                  <div className="text-6xl mb-4">🕹️</div>
                  <h1 className="font-heading font-bold text-3xl text-text-primary mb-2">404</h1>
                  <p className="text-text-secondary mb-4">Page not found</p>
                  <a href="/" className="text-neon-cyan hover:underline">Go Home</a>
                </div>
              </div>
            </PageTransition>
          } />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <div className="min-h-screen bg-bg-primary">
          {/* Fixed top navbar */}
          <Navbar />

          {/* Main content — offset by navbar height */}
          <main className="pt-16 min-h-screen">
            <div className="p-4 sm:p-6">
              <AnimatedRoutes />
            </div>
            <Footer />
          </main>
        </div>
      </GameProvider>
    </BrowserRouter>
  );
}
