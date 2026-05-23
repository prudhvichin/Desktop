import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getGames } from '../services/rawgApi';
import { useGame } from '../context/GameContext';
import { useDebounce } from '../hooks/useDebounce';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import GameCard from '../components/ui/GameCard';
import SkeletonCard from '../components/ui/SkeletonCard';

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, selectedGenres, sortOrder, setSearch, setGenres, setSort } = useGame();

  // Sync URL params on mount
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlGenre = searchParams.get('genre');
    const urlOrdering = searchParams.get('ordering');
    if (urlSearch) setSearch(urlSearch);
    if (urlGenre) {
      const ids = urlGenre.split(',').map(Number).filter(Boolean);
      if (ids.length > 0) setGenres(ids);
    }
    if (urlOrdering) setSort(urlOrdering);
  }, []);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const apiParams = useMemo(() => {
    const params = { page_size: 20 };
    if (debouncedSearch) { params.search = debouncedSearch; params.search_precise = true; }
    if (selectedGenres.length > 0) params.genres = selectedGenres.join(',');
    if (sortOrder && sortOrder !== '-relevance') params.ordering = sortOrder;
    return params;
  }, [debouncedSearch, selectedGenres, sortOrder]);

  // Fetch on filter change
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setPage(1);

    getGames({ ...apiParams, page: 1 }, controller.signal)
      .then((data) => {
        setGames(data.results || []);
        setHasNext(!!data.next);
        setTotalCount(data.count || 0);
      })
      .catch((err) => { if (err.name !== 'CanceledError') console.error(err); })
      .finally(() => setLoading(false));

    // Sync URL
    const p = new URLSearchParams();
    if (debouncedSearch) p.set('search', debouncedSearch);
    if (selectedGenres.length > 0) p.set('genre', selectedGenres.join(','));
    if (sortOrder && sortOrder !== '-relevance') p.set('ordering', sortOrder);
    setSearchParams(p, { replace: true });

    return () => controller.abort();
  }, [apiParams]);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasNext) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    getGames({ ...apiParams, page: nextPage })
      .then((data) => {
        setGames((prev) => [...prev, ...(data.results || [])]);
        setHasNext(!!data.next);
        setPage(nextPage);
      })
      .catch(console.error)
      .finally(() => setLoadingMore(false));
  }, [loadingMore, hasNext, page, apiParams]);

  const sentinelRef = useInfiniteScroll(loadMore);

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-text-primary mb-1">
          {debouncedSearch
            ? <>Results for "<span className="text-neon-cyan">{debouncedSearch}</span>"</>
            : 'Browse Games'
          }
        </h1>
        {!loading && (
          <p className="text-sm text-text-secondary">{totalCount.toLocaleString()} games found</p>
        )}
      </motion.div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : games.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <div className="text-5xl mb-3">🎮</div>
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">No games found</h3>
          <p className="text-text-secondary text-sm mb-5">Try adjusting your search or filters in the sidebar.</p>
          <button
            onClick={() => { setSearch(''); setGenres([]); setSort('-relevance'); }}
            className="px-4 py-2 rounded-lg text-sm font-medium text-neon-cyan bg-neon-cyan/10 hover:bg-neon-cyan/20 transition-colors cursor-pointer"
          >
            Clear all filters
          </button>
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {games.map((game, index) => <GameCard key={game.id} game={game} index={index} />)}
          </div>

          {hasNext && (
            <div ref={sentinelRef} className="py-8">
              {loadingMore && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`m-${i}`} />)}
                </div>
              )}
            </div>
          )}

          {!hasNext && games.length > 0 && (
            <p className="text-center text-sm text-text-muted py-6">
              End of results • {games.length} of {totalCount.toLocaleString()} shown
            </p>
          )}
        </>
      )}
    </div>
  );
}
