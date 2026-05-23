/**
 * Maps platform slugs from RAWG to display names and icons
 */
export const platformMap = {
  pc: { name: 'PC', icon: '🖥️' },
  playstation: { name: 'PlayStation', icon: '🎮' },
  xbox: { name: 'Xbox', icon: '🎮' },
  nintendo: { name: 'Nintendo', icon: '🕹️' },
  mac: { name: 'Mac', icon: '💻' },
  linux: { name: 'Linux', icon: '🐧' },
  ios: { name: 'iOS', icon: '📱' },
  android: { name: 'Android', icon: '📱' },
  web: { name: 'Web', icon: '🌐' },
};

/**
 * Extract unique parent platform slugs from a game's platforms array
 */
export function getPlatformSlugs(platforms) {
  if (!platforms) return [];
  const slugs = new Set();
  platforms.forEach((p) => {
    const slug = p.platform?.slug || '';
    // Map specific platforms to parent
    if (slug.startsWith('playstation')) slugs.add('playstation');
    else if (slug.startsWith('xbox')) slugs.add('xbox');
    else if (slug.startsWith('nintendo') || slug === 'wii' || slug === 'wii-u') slugs.add('nintendo');
    else if (slug === 'macos' || slug === 'macintosh') slugs.add('mac');
    else if (slug === 'linux') slugs.add('linux');
    else if (slug === 'ios') slugs.add('ios');
    else if (slug === 'android') slugs.add('android');
    else if (slug === 'web') slugs.add('web');
    else if (slug === 'pc') slugs.add('pc');
  });
  return Array.from(slugs);
}

/**
 * Format a date string to readable format
 */
export function formatDate(dateStr) {
  if (!dateStr) return 'TBA';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Get Metacritic color class based on score
 */
export function getMetacriticColor(score) {
  if (!score) return 'text-text-muted';
  if (score >= 75) return 'text-neon-green';
  if (score >= 50) return 'text-neon-yellow';
  return 'text-neon-orange';
}

/**
 * Get Metacritic border color class
 */
export function getMetacriticBorderColor(score) {
  if (!score) return 'border-text-muted';
  if (score >= 75) return 'border-neon-green';
  if (score >= 50) return 'border-neon-yellow';
  return 'border-neon-orange';
}

/**
 * Truncate text to a given length
 */
export function truncateText(text, maxLength = 150) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Strip HTML tags from a string
 */
export function stripHtml(html) {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

/**
 * Get a readable time-ago string
 */
export function timeAgo(dateStr) {
  if (!dateStr) return '';
  const now = new Date();
  const date = new Date(dateStr);
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} min ago`;
  return 'Just now';
}

/**
 * Genre icon mapping for visual enhancement
 */
export const genreIcons = {
  action: '⚔️',
  indie: '🎨',
  adventure: '🗺️',
  rpg: '🧙',
  strategy: '♟️',
  shooter: '🔫',
  casual: '🎲',
  simulation: '🏗️',
  puzzle: '🧩',
  arcade: '👾',
  platformer: '🏃',
  racing: '🏎️',
  'massively-multiplayer': '🌐',
  sports: '⚽',
  fighting: '🥊',
  'family': '👨‍👩‍👧‍👦',
  'board-games': '🎯',
  educational: '📚',
  card: '🃏',
};
