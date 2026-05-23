import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '../../hooks/useDebounce';
import { searchGames } from '../../services/rawgApi';
import { useGame } from '../../context/GameContext';

/**
 * SearchBar with debounced input, live suggestions dropdown, and keyboard shortcuts
 */
export default function SearchBar({ variant = 'default', onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const { setSearch } = useGame();

  // Fetch suggestions on debounced query change
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    searchGames(debouncedQuery, { page_size: 5 }, controller.signal)
      .then((data) => {
        setSuggestions(data.results || []);
        setShowSuggestions(true);
      })
      .catch((err) => {
        if (err.name !== 'CanceledError') {
          console.error('Search suggestion error:', err);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [debouncedQuery]);

  // Ctrl+K keyboard shortcut to focus
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearch(query.trim());
      setShowSuggestions(false);
      if (onSearch) {
        onSearch(query.trim());
      } else {
        navigate(`/games?search=${encodeURIComponent(query.trim())}`);
      }
    }
  }, [query, setSearch, navigate, onSearch]);

  const handleSuggestionClick = useCallback((game) => {
    setShowSuggestions(false);
    setQuery('');
    navigate(`/games/${game.id}`);
  }, [navigate]);

  const isHero = variant === 'hero';

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        {/* Search icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className={`${isHero ? 'w-5 h-5' : 'w-4 h-4'} text-text-secondary`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder="Search games..."
          className={`
            w-full bg-white/5 border border-white/10 rounded-xl
            text-text-primary placeholder-text-muted
            focus:outline-none focus:border-neon-cyan/40 focus:bg-white/8
            focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]
            transition-all duration-300
            ${isHero
              ? 'pl-12 pr-24 py-4 text-lg'
              : 'pl-10 pr-16 py-2.5 text-sm'
            }
          `}
          id="search-bar"
          aria-label="Search games"
          autoComplete="off"
        />

        {/* Keyboard shortcut hint & clear button */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setShowSuggestions(false);
              }}
              className="text-text-muted hover:text-text-primary transition-colors p-1"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {!isFocused && !query && (
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-text-muted border border-white/10 rounded-md bg-white/5">
              Ctrl+K
            </kbd>
          )}
          {loading && (
            <div className="w-4 h-4 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
          )}
        </div>
      </form>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-bg-secondary border border-white/10 rounded-xl overflow-hidden shadow-2xl"
          >
            {suggestions.map((game, index) => (
              <button
                key={game.id}
                onClick={() => handleSuggestionClick(game)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left cursor-pointer"
              >
                {game.background_image ? (
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-12 h-8 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-8 bg-white/5 rounded flex items-center justify-center text-xs text-text-muted">
                    🎮
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary truncate">{game.name}</p>
                  <p className="text-xs text-text-muted">
                    {game.genres?.slice(0, 2).map((g) => g.name).join(', ')}
                  </p>
                </div>
                {game.metacritic && (
                  <span className="text-xs font-bold text-neon-green">{game.metacritic}</span>
                )}
              </button>
            ))}
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2.5 text-sm text-neon-cyan hover:bg-white/5 transition-colors border-t border-white/10 cursor-pointer"
            >
              View all results for "{query}"
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
