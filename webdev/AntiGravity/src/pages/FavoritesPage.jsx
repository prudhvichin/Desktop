import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import GameCard from '../components/ui/GameCard';

export default function FavoritesPage() {
  const { favorites } = useGame();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-text-primary mb-1">
          ❤️ My Favorites
        </h1>
        <p className="text-sm text-text-secondary">
          {favorites.length === 0
            ? "You haven't favorited any games yet."
            : `${favorites.length} game${favorites.length > 1 ? 's' : ''} saved`
          }
        </p>
      </motion.div>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">💔</div>
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
            Your collection is empty
          </h3>
          <p className="text-text-secondary text-sm mb-6 max-w-sm mx-auto">
            Browse games and click the heart icon to save them here.
          </p>
          <Link
            to="/games"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm text-white bg-gradient-to-r from-neon-cyan to-neon-purple hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300"
          >
            Discover Games
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favorites.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
