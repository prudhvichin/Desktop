import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getGames, getGenres } from '../services/rawgApi';
import GameCard from '../components/ui/GameCard';
import SkeletonCard from '../components/ui/SkeletonCard';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingTopRated, setLoadingTopRated] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const today = new Date().toISOString().split('T')[0];
    const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const lastYear = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    getGames({ ordering: '-added', dates: `${lastMonth},${today}`, page_size: 8 }, controller.signal)
      .then((data) => setTrending(data.results || []))
      .catch(() => {})
      .finally(() => setLoadingTrending(false));

    getGames({ ordering: '-added', page_size: 8 }, controller.signal)
      .then((data) => setPopular(data.results || []))
      .catch(() => {})
      .finally(() => setLoadingPopular(false));

    getGames({ ordering: '-metacritic', dates: `${lastYear},${today}`, page_size: 8 }, controller.signal)
      .then((data) => setTopRated(data.results || []))
      .catch(() => {})
      .finally(() => setLoadingTopRated(false));

    return () => controller.abort();
  }, []);

  return (
    <div className="space-y-10">
      {/* Welcome banner */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-gradient-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-pink/10 border border-white/5 p-8 sm:p-10"
      >
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary mb-3">
          Welcome to <span className="gradient-text">GameVault</span>
        </h1>
        <p className="text-text-secondary max-w-xl mb-5">
          Discover, explore, and track the best video games. Use the sidebar to filter by genre and the search bar above to find any game.
        </p>
        <Link
          to="/games"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm text-white bg-gradient-to-r from-neon-cyan to-neon-purple hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300"
        >
          Browse All Games
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </motion.div>

      {/* Trending */}
      <GameSection
        title="🔥 Trending Now"
        subtitle="Hot games from the past 30 days"
        games={trending}
        loading={loadingTrending}
        linkTo="/games?ordering=-added"
      />

      {/* Most Popular */}
      <GameSection
        title="⭐ Most Popular"
        subtitle="All-time fan favorites"
        games={popular}
        loading={loadingPopular}
        linkTo="/games?ordering=-added"
      />

      {/* Top Rated */}
      <GameSection
        title="🏆 Top Rated"
        subtitle="Highest Metacritic scores this year"
        games={topRated}
        loading={loadingTopRated}
        linkTo="/games?ordering=-metacritic"
      />
    </div>
  );
}

function GameSection({ title, subtitle, games, loading, linkTo }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-primary">{title}</h2>
          <p className="text-sm text-text-secondary">{subtitle}</p>
        </div>
        <Link
          to={linkTo}
          className="text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors flex items-center gap-1 shrink-0"
        >
          View all
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : games.map((game, index) => <GameCard key={game.id} game={game} index={index} />)
        }
      </div>
    </motion.section>
  );
}
