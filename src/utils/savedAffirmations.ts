const SAVED_AFFIRMATIONS_KEY = 'aroti-saved-affirmations';

export interface SavedAffirmation {
  id: string;
  text: string;
  meaning: string;
  date: string;
}

/**
 * Get all saved affirmations from localStorage
 */
export const getSavedAffirmations = (): SavedAffirmation[] => {
  try {
    const stored = localStorage.getItem(SAVED_AFFIRMATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading saved affirmations from localStorage:', error);
    return [];
  }
};

/**
 * Check if an affirmation is saved
 */
export const isAffirmationSaved = (affirmationId: string): boolean => {
  const saved = getSavedAffirmations();
  return saved.some(a => a.id === affirmationId);
};

/**
 * Save an affirmation
 */
export const saveAffirmation = (affirmation: SavedAffirmation): void => {
  try {
    const saved = getSavedAffirmations();
    if (!saved.some(a => a.id === affirmation.id)) {
      saved.push(affirmation);
      localStorage.setItem(SAVED_AFFIRMATIONS_KEY, JSON.stringify(saved));
    }
  } catch (error) {
    console.error('Error saving affirmation to localStorage:', error);
  }
};

/**
 * Remove a saved affirmation
 */
export const removeSavedAffirmation = (affirmationId: string): void => {
  try {
    const saved = getSavedAffirmations();
    const filtered = saved.filter(a => a.id !== affirmationId);
    localStorage.setItem(SAVED_AFFIRMATIONS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing saved affirmation from localStorage:', error);
  }
};

/**
 * Toggle save status for an affirmation
 */
export const toggleSavedAffirmation = (affirmation: SavedAffirmation): boolean => {
  const isCurrentlySaved = isAffirmationSaved(affirmation.id);
  if (isCurrentlySaved) {
    removeSavedAffirmation(affirmation.id);
  } else {
    saveAffirmation(affirmation);
  }
  return !isCurrentlySaved; // Return new state
};


