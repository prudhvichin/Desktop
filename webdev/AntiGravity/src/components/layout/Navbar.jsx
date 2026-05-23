import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { getGenres } from '../../services/rawgApi';

/**
 * Top navigation bar — simple and clean with Genre dropdown
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [genres, setGenres] = useState([]);
  const location = useLocation();
  const {
    favorites,
    searchQuery,
    setSearch,
    selectedGenres,
    setGenres: setGlobalGenres,
    theme,
    toggleTheme
  } = useGame();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Fetch genres for the dropdown
  useEffect(() => {
    const controller = new AbortController();
    getGenres(controller.signal)
      .then((data) => setGenres(data.results || []))
      .catch((err) => {
        if (err.name !== 'CanceledError') console.error('Failed to fetch genres:', err);
      });
    return () => controller.abort();
  }, []);

  const handleGenreChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setGlobalGenres([]);
    } else {
      setGlobalGenres([parseInt(value)]);
    }
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300
        ${scrolled
          ? 'bg-bg-primary/95 backdrop-blur-xl border-b border-white/5 shadow-lg'
          : 'bg-bg-secondary border-b border-white/5'
        }
      `}
    >
      <nav className="h-full px-4 sm:px-6 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
            <span className="text-sm font-bold text-white">G</span>
          </div>
          <span className="font-heading font-bold text-lg gradient-text hidden sm:block">
            GameVault
          </span>
        </Link>

        {/* Genre Dropdown & Search bar */}
        <div className="flex-1 flex items-center gap-3 max-w-2xl mx-auto">
          {/* Genre Dropdown */}
          <div className="relative shrink-0">
            <select
              value={selectedGenres[0] || ''}
              onChange={handleGenreChange}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-neon-cyan/40 focus:bg-white/8 transition-all duration-200 cursor-pointer appearance-none pr-8"
              aria-label="Select genre"
            >
              <option value="" className="bg-bg-secondary">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id} className="bg-bg-secondary">
                  {genre.name}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-neon-cyan/40 focus:bg-white/8 transition-all duration-200"
              id="search-bar"
              aria-label="Search games"
            />
          </div>
        </div>

        {/* Nav links & Theme Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-neon-cyan bg-neon-cyan/10' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/games"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-neon-cyan bg-neon-cyan/10' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'}`
              }
            >
              Games
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-neon-pink bg-neon-pink/10' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'}`
              }
            >
              Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon-pink text-white text-[10px] flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </NavLink>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-text-secondary hover:text-neon-cyan hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
