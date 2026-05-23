import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const GameContext = createContext(null);

// Action types
const ACTIONS = {
  SET_SEARCH: 'SET_SEARCH',
  SET_GENRES: 'SET_GENRES',
  TOGGLE_GENRE: 'TOGGLE_GENRE',
  SET_SORT: 'SET_SORT',
  SET_PLATFORM: 'SET_PLATFORM',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
};

function filterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SEARCH:
      return { ...state, searchQuery: action.payload };
    case ACTIONS.SET_GENRES:
      return { ...state, selectedGenres: action.payload };
    case ACTIONS.TOGGLE_GENRE: {
      const id = action.payload;
      const current = state.selectedGenres;
      const updated = current.includes(id)
        ? current.filter((g) => g !== id)
        : [...current, id];
      return { ...state, selectedGenres: updated };
    }
    case ACTIONS.SET_SORT:
      return { ...state, sortOrder: action.payload };
    case ACTIONS.SET_PLATFORM:
      return { ...state, selectedPlatform: action.payload };
    case ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        searchQuery: '',
        selectedGenres: [],
        sortOrder: '-relevance',
        selectedPlatform: null,
      };
    default:
      return state;
  }
}

const initialFilterState = {
  searchQuery: '',
  selectedGenres: [],
  sortOrder: '-relevance',
  selectedPlatform: null,
};

export function GameProvider({ children }) {
  const [filters, dispatch] = useReducer(filterReducer, initialFilterState);
  const [favorites, setFavorites] = useLocalStorage('gamevault_favorites', []);
  const [theme, setTheme] = useLocalStorage('gamevault_theme', 'dark');

  // Apply theme class to document
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  // Actions
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  const setSearch = useCallback((query) => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: query });
  }, []);

  const toggleGenre = useCallback((genreId) => {
    dispatch({ type: ACTIONS.TOGGLE_GENRE, payload: genreId });
  }, []);

  const setGenres = useCallback((genres) => {
    dispatch({ type: ACTIONS.SET_GENRES, payload: genres });
  }, []);

  const setSort = useCallback((order) => {
    dispatch({ type: ACTIONS.SET_SORT, payload: order });
  }, []);

  const setPlatform = useCallback((platform) => {
    dispatch({ type: ACTIONS.SET_PLATFORM, payload: platform });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_FILTERS });
  }, []);

  // Favorites management
  const toggleFavorite = useCallback((game) => {
    setFavorites((prev) => {
      const exists = prev.find((g) => g.id === game.id);
      if (exists) {
        return prev.filter((g) => g.id !== game.id);
      }
      return [...prev, {
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        metacritic: game.metacritic,
        released: game.released,
        genres: game.genres,
        parent_platforms: game.parent_platforms,
      }];
    });
  }, [setFavorites]);

  const isFavorite = useCallback((gameId) => {
    return favorites.some((g) => g.id === gameId);
  }, [favorites]);

  const value = {
    // Filter state
    ...filters,
    // Filter actions
    setSearch,
    toggleGenre,
    setGenres,
    setSort,
    setPlatform,
    clearFilters,
    // Favorites
    favorites,
    toggleFavorite,
    isFavorite,
    // Theme
    theme,
    toggleTheme,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export default GameContext;
