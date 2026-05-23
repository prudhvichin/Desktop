import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

/**
 * Axios instance configured for RAWG API
 */
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.error(`API Error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Fetch paginated list of games with optional filters
 */
export const getGames = (params = {}, signal) => {
  return api.get('/games', {
    params: {
      page_size: 20,
      ...params,
    },
    signal,
  });
};

/**
 * Get detailed info about a specific game
 */
export const getGameDetails = (id, signal) => {
  return api.get(`/games/${id}`, { signal });
};

/**
 * Get screenshots for a game
 */
export const getGameScreenshots = (id, signal) => {
  return api.get(`/games/${id}/screenshots`, { signal });
};

/**
 * Get trailers / movies for a game
 */
export const getGameMovies = (id, signal) => {
  return api.get(`/games/${id}/movies`, { signal });
};

/**
 * Get games in the same series
 */
export const getGameSeries = (id, signal) => {
  return api.get(`/games/${id}/game-series`, {
    params: { page_size: 10 },
    signal,
  });
};

/**
 * Fetch all available genres
 */
export const getGenres = (signal) => {
  return api.get('/genres', { signal });
};

/**
 * Search games with optional precision
 */
export const searchGames = (query, params = {}, signal) => {
  return api.get('/games', {
    params: {
      search: query,
      search_precise: true,
      page_size: 20,
      ...params,
    },
    signal,
  });
};

/**
 * Get platforms list
 */
export const getPlatforms = (signal) => {
  return api.get('/platforms', {
    params: { page_size: 50 },
    signal,
  });
};

export default api;
