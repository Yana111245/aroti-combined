const FAVORITES_KEY = 'aroti-favorite-specialists';

/**
 * Get all favorited specialist IDs from localStorage
 */
export const getFavorites = (): string[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

/**
 * Check if a specialist is favorited
 */
export const isFavorited = (specialistId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(specialistId);
};

/**
 * Add a specialist to favorites
 */
export const addFavorite = (specialistId: string): void => {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(specialistId)) {
      favorites.push(specialistId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding favorite to localStorage:', error);
  }
};

/**
 * Remove a specialist from favorites
 */
export const removeFavorite = (specialistId: string): void => {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(id => id !== specialistId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing favorite from localStorage:', error);
  }
};

/**
 * Toggle favorite status for a specialist
 */
export const toggleFavorite = (specialistId: string): boolean => {
  const isCurrentlyFavorited = isFavorited(specialistId);
  if (isCurrentlyFavorited) {
    removeFavorite(specialistId);
  } else {
    addFavorite(specialistId);
  }
  return !isCurrentlyFavorited; // Return new state
};

