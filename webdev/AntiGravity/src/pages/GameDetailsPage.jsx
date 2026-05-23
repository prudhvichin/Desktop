import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getGameDetails, getGameScreenshots, getGameMovies, getGameSeries } from '../services/rawgApi';
import { useGame } from '../context/GameContext';
import Rating from '../components/ui/Rating';
import PlatformIcons from '../components/ui/PlatformIcons';
import GameCard from '../components/ui/GameCard';
import { formatDate, stripHtml } from '../utils/helpers';

export default function GameDetailsPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const { toggleFavorite, isFavorite } = useGame();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    window.scrollTo(0, 0);

    Promise.all([
      getGameDetails(id, controller.signal),
      getGameScreenshots(id, controller.signal).catch(() => ({ results: [] })),
      getGameMovies(id, controller.signal).catch(() => ({ results: [] })),
      getGameSeries(id, controller.signal).catch(() => ({ results: [] })),
    ])
      .then(([gameData, screenshotData, movieData, seriesData]) => {
        setGame(gameData);
        setScreenshots(screenshotData.results || []);
        setTrailers(movieData.results || []);
        setSimilar(seriesData.results || []);
      })
      .catch((err) => {
        if (err.name !== 'CanceledError') console.error(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="page-container pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="skeleton h-[50vh] rounded-2xl mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="skeleton h-8 w-3/4 rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-2/3 rounded" />
            </div>
            <div className="space-y-4">
              <div className="skeleton h-40 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="page-container pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😵</div>
          <h2 className="font-heading font-bold text-2xl text-text-primary mb-2">Game Not Found</h2>
          <Link to="/games" className="text-neon-cyan hover:underline">Browse games →</Link>
        </div>
      </div>
    );
  }

  const description = game.description_raw || stripHtml(game.description) || 'No description available.';

  return (
    <div className="page-container">
      {/* Banner */}
      <section className="relative h-[55vh] sm:h-[60vh] overflow-hidden">
        {game.background_image && (
          <img src={game.background_image} alt={game.name} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/games" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to games
            </Link>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white mb-4">{game.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {game.metacritic && <Rating score={game.metacritic} size="lg" showLabel />}
              <PlatformIcons platforms={game.parent_platforms} className="text-base" />
              <span className="text-sm text-text-secondary">{formatDate(game.released)}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {game.genres?.map((g) => (
                <Link key={g.id} to={`/games?genre=${g.id}`} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-text-primary border border-white/10 hover:bg-neon-cyan/10 hover:text-neon-cyan hover:border-neon-cyan/20 transition-colors">
                  {g.name}
                </Link>
              ))}
            </div>
            <button onClick={() => toggleFavorite(game)} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 cursor-pointer ${isFavorite(game.id) ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30' : 'bg-white/10 text-text-primary border border-white/10 hover:bg-neon-pink/10 hover:text-neon-pink'}`}>
              <svg className="w-5 h-5" fill={isFavorite(game.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {isFavorite(game.id) ? 'Favorited' : 'Add to Favorites'}
            </button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="font-heading font-bold text-xl text-text-primary mb-4">About</h2>
              <div className="text-text-secondary leading-relaxed whitespace-pre-line text-sm">
                {description.length > 800 ? (
                  <ExpandableText text={description} />
                ) : description}
              </div>
            </motion.section>

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="font-heading font-bold text-xl text-text-primary mb-4">Screenshots</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {screenshots.map((ss) => (
                    <button key={ss.id} onClick={() => setSelectedScreenshot(ss.image)} className="rounded-lg overflow-hidden group cursor-pointer">
                      <img src={ss.image} alt="Screenshot" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 aspect-video" />
                    </button>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Trailers */}
            {trailers.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="font-heading font-bold text-xl text-text-primary mb-4">Trailers</h2>
                <div className="space-y-4">
                  {trailers.slice(0, 3).map((trailer) => (
                    <div key={trailer.id} className="rounded-xl overflow-hidden">
                      <video controls poster={trailer.preview} className="w-full rounded-xl" preload="none">
                        <source src={trailer.data?.max || trailer.data?.['480']} type="video/mp4" />
                      </video>
                      <p className="text-sm text-text-secondary mt-2">{trailer.name}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar info */}
          <aside className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6 space-y-4">
              <InfoRow label="Rating" value={game.rating ? `${game.rating} / 5 ⭐` : 'N/A'} />
              <InfoRow label="Released" value={formatDate(game.released)} />
              <InfoRow label="Playtime" value={game.playtime ? `${game.playtime} hours` : 'N/A'} />
              <InfoRow label="ESRB" value={game.esrb_rating?.name || 'Not rated'} />
              {game.developers?.length > 0 && <InfoRow label="Developer" value={game.developers.map((d) => d.name).join(', ')} />}
              {game.publishers?.length > 0 && <InfoRow label="Publisher" value={game.publishers.map((p) => p.name).join(', ')} />}
              {game.website && (
                <div>
                  <p className="text-xs text-text-muted mb-1">Website</p>
                  <a href={game.website} target="_blank" rel="noopener noreferrer" className="text-sm text-neon-cyan hover:underline break-all">{game.website}</a>
                </div>
              )}
            </motion.div>

            {/* Platforms detail */}
            {game.platforms?.length > 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-6">
                <h3 className="font-heading font-semibold text-sm text-text-primary mb-3">Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map((p) => (
                    <span key={p.platform.id} className="px-2.5 py-1 rounded-lg text-xs bg-white/5 text-text-secondary border border-white/5">{p.platform.name}</span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Stores */}
            {game.stores?.length > 0 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-xl p-6">
                <h3 className="font-heading font-semibold text-sm text-text-primary mb-3">Available At</h3>
                <div className="space-y-2">
                  {game.stores.map((s) => (
                    <a key={s.id} href={`https://${s.store.domain}`} target="_blank" rel="noopener noreferrer" className="block text-sm text-text-secondary hover:text-neon-cyan transition-colors">{s.store.name} →</a>
                  ))}
                </div>
              </motion.div>
            )}
          </aside>
        </div>

        {/* Similar games */}
        {similar.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16">
            <h2 className="font-heading font-bold text-2xl text-text-primary mb-6">Games in the Same Series</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.slice(0, 4).map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
            </div>
          </motion.section>
        )}
      </div>

      {/* Lightbox */}
      {selectedScreenshot && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedScreenshot(null)}>
          <button className="absolute top-6 right-6 text-white text-2xl hover:text-neon-cyan transition-colors cursor-pointer" onClick={() => setSelectedScreenshot(null)}>✕</button>
          <img src={selectedScreenshot} alt="Screenshot" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-xs text-text-muted mb-0.5">{label}</p>
      <p className="text-sm text-text-primary">{value}</p>
    </div>
  );
}

function ExpandableText({ text }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      {expanded ? text : text.substring(0, 600) + '...'}
      <button onClick={() => setExpanded(!expanded)} className="block mt-2 text-neon-cyan text-sm hover:underline cursor-pointer">
        {expanded ? 'Show less' : 'Read more'}
      </button>
    </>
  );
}
