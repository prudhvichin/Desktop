import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getGenres } from '../../services/rawgApi';
import { useGame } from '../../context/GameContext';
import { genreIcons } from '../../utils/helpers';

const sortOptions = [
  { value: '-relevance', label: 'Relevance' },
  { value: '-rating', label: 'Highest Rated' },
  { value: '-released', label: 'Newest First' },
  { value: 'released', label: 'Oldest First' },
  { value: '-added', label: 'Most Popular' },
  { value: '-metacritic', label: 'Metacritic Score' },
  { value: 'name', label: 'Name A-Z' },
];

/**
 * Left sidebar — persistent on desktop, overlay on mobile
 */
export default function Sidebar({ isOpen, onClose }) {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedGenres, toggleGenre, sortOrder, setSort, clearFilters } = useGame();

  useEffect(() => {
    const controller = new AbortController();
    getGenres(controller.signal)
      .then((data) => setGenres(data.results || []))
      .catch((err) => {
        if (err.name !== 'CanceledError') console.error('Failed to fetch genres:', err);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-sm text-text-primary uppercase tracking-wider">
            Filters
          </h2>
          {selectedGenres.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs text-neon-pink hover:text-neon-pink/80 transition-colors cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Sort */}
      <div className="p-4 border-b border-white/5">
        <label className="block text-xs text-text-muted mb-2 uppercase tracking-wider">Sort By</label>
        <select
          value={sortOrder}
          onChange={(e) => setSort(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-neon-cyan/40 transition-colors cursor-pointer"
          id="sort-select"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-bg-secondary">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Genres */}
      <div className="flex-1 overflow-y-auto p-4">
        <label className="block text-xs text-text-muted mb-3 uppercase tracking-wider">Genres</label>
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="skeleton h-9 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="space-y-0.5">
            {genres.map((genre) => {
              const isActive = selectedGenres.includes(genre.id);
              const icon = genreIcons[genre.slug] || '🎮';
              return (
                <button
                  key={genre.id}
                  onClick={() => toggleGenre(genre.id)}
                  className={`
                    w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm
                    transition-all duration-200 cursor-pointer text-left
                    ${isActive
                      ? 'bg-neon-cyan/10 text-neon-cyan font-medium'
                      : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                    }
                  `}
                  id={`genre-${genre.slug}`}
                >
                  <span className="text-sm w-5 text-center shrink-0">{icon}</span>
                  <span className="flex-1 truncate">{genre.name}</span>
                  <span className="text-xs text-text-muted shrink-0">
                    {genre.games_count ? (genre.games_count / 1000).toFixed(0) + 'k' : ''}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Active filters chips */}
      {selectedGenres.length > 0 && (
        <div className="p-4 border-t border-white/5">
          <p className="text-xs text-text-muted mb-2">
            {selectedGenres.length} selected
          </p>
          <div className="flex flex-wrap gap-1.5">
            {selectedGenres.map((id) => {
              const genre = genres.find((g) => g.id === id);
              if (!genre) return null;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-neon-cyan/10 text-neon-cyan"
                >
                  {genre.name}
                  <button onClick={() => toggleGenre(id)} className="hover:text-white cursor-pointer">×</button>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation links at bottom */}
      <div className="p-4 border-t border-white/5 space-y-1">
        <NavLink
          to="/"
          onClick={onClose}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'text-neon-cyan bg-neon-cyan/10' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'}`
          }
        >
          🏠 Home
        </NavLink>
        <NavLink
          to="/games"
          onClick={onClose}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'text-neon-cyan bg-neon-cyan/10' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'}`
          }
        >
          🎮 Browse Games
        </NavLink>
        <NavLink
          to="/favorites"
          onClick={onClose}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'text-neon-pink bg-neon-pink/10' : 'text-text-secondary hover:text-text-primary hover:bg-white/5'}`
          }
        >
          ❤️ Favorites
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-16 bottom-0 w-60 bg-bg-secondary border-r border-white/5 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar — overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed left-0 top-16 bottom-0 w-64 bg-bg-secondary border-r border-white/5 z-50 lg:hidden overflow-hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
