import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PlatformIcons from './PlatformIcons';
import Rating from './Rating';
import { useGame } from '../../context/GameContext';
import { formatDate } from '../../utils/helpers';

/**
 * Game card component with thumbnail, metadata, hover animation, and favorite toggle
 */
const GameCard = memo(function GameCard({ game, index = 0 }) {
  const { toggleFavorite, isFavorite } = useGame();
  const [imageLoaded, setImageLoaded] = useState(false);
  const favorited = isFavorite(game.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
      className="group"
    >
      <Link to={`/games/${game.id}`} className="block">
        <div className="glass-card overflow-hidden neon-border transition-all duration-300 group-hover:translate-y-[-4px] group-hover:shadow-xl">
          {/* Image container */}
          <div className="relative aspect-video overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}
            <img
              src={game.background_image || '/placeholder-game.jpg'}
              alt={game.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`
                w-full h-full object-cover transition-transform duration-500
                group-hover:scale-110
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              `}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Favorite button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(game);
              }}
              className={`
                absolute top-3 right-3 p-2 rounded-full
                backdrop-blur-sm transition-all duration-300 z-10
                ${favorited
                  ? 'bg-neon-pink/20 text-neon-pink scale-100'
                  : 'bg-black/40 text-white/60 opacity-0 group-hover:opacity-100 hover:text-neon-pink hover:bg-neon-pink/20'
                }
              `}
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                className="w-4 h-4"
                fill={favorited ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Metacritic badge */}
            {game.metacritic && (
              <div className="absolute top-3 left-3">
                <Rating score={game.metacritic} size="sm" />
              </div>
            )}
          </div>

          {/* Card content */}
          <div className="p-4 space-y-2.5">
            {/* Platforms */}
            <PlatformIcons platforms={game.parent_platforms} />

            {/* Title */}
            <h3 className="font-heading font-semibold text-text-primary truncate group-hover:text-neon-cyan transition-colors duration-300">
              {game.name}
            </h3>

            {/* Genre tags */}
            <div className="flex flex-wrap gap-1.5">
              {game.genres?.slice(0, 3).map((genre) => (
                <span
                  key={genre.id}
                  className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-text-secondary border border-white/5"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Rating & Release date */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-neon-yellow" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-text-primary">
                  {game.rating ? game.rating.toFixed(1) : 'N/A'}
                </span>
              </div>
              <span className="text-xs text-text-muted">
                {formatDate(game.released)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

export default GameCard;
