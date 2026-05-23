import { Link } from 'react-router-dom';

/**
 * Footer with RAWG attribution, navigation links, and gradient top border
 */
export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5">
      {/* Gradient border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <span className="text-sm font-bold text-white">G</span>
              </div>
              <span className="font-heading font-bold text-lg gradient-text">GameVault</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Discover, explore, and track the best video games across all platforms and genres.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/games', label: 'Browse Games' },
                { to: '/favorites', label: 'Favorites' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-text-secondary hover:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h4 className="font-heading font-semibold text-text-primary mb-4">Popular Genres</h4>
            <ul className="space-y-2">
              {['Action', 'RPG', 'Adventure', 'Strategy', 'Racing'].map((genre) => (
                <li key={genre}>
                  <Link
                    to={`/games?genre=${genre.toLowerCase()}`}
                    className="text-sm text-text-secondary hover:text-neon-cyan transition-colors"
                  >
                    {genre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* API Attribution */}
          <div>
            <h4 className="font-heading font-semibold text-text-primary mb-4">Powered By</h4>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">
              Game data provided by the RAWG Video Games Database API.
            </p>
            <a
              href="https://rawg.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neon-cyan hover:text-neon-purple transition-colors"
            >
              <span>Visit RAWG.io</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} GameVault. Built with React & RAWG API.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              API Docs
            </a>
            <span className="text-text-muted/30">•</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
