export interface Affirmation {
  id: string;
  text: string;
  meaning: string;
}

// Sample affirmations pool - in production, this would come from an API
const AFFIRMATIONS_POOL: Affirmation[] = [
  {
    id: '1',
    text: 'Every phase of your journey is an opportunity for growth and transformation.',
    meaning: 'Change is not something to fear, but a natural part of your evolution.'
  },
  {
    id: '2',
    text: 'I trust the process of life and embrace each moment with grace.',
    meaning: 'Surrendering to the flow of life brings peace and clarity.'
  },
  {
    id: '3',
    text: 'I am worthy of love, abundance, and all the good things life has to offer.',
    meaning: 'Your inherent worth is not dependent on external validation.'
  },
  {
    id: '4',
    text: 'I release what no longer serves me and make space for new possibilities.',
    meaning: 'Letting go creates room for growth and fresh opportunities.'
  },
  {
    id: '5',
    text: 'I am aligned with my highest purpose and walk my path with confidence.',
    meaning: 'Your inner wisdom guides you toward your true calling.'
  },
  {
    id: '6',
    text: 'I choose to see challenges as opportunities for growth and learning.',
    meaning: 'Every obstacle is a teacher in disguise.'
  },
  {
    id: '7',
    text: 'I am surrounded by love and support, even when I cannot see it.',
    meaning: 'You are never alone on your journey.'
  },
  {
    id: '8',
    text: 'I honor my needs and create boundaries that protect my energy.',
    meaning: 'Self-care is not selfish; it is essential for your well-being.'
  },
  {
    id: '9',
    text: 'I am open to receiving abundance in all forms it may take.',
    meaning: 'Abundance flows when you are open and receptive.'
  },
  {
    id: '10',
    text: 'I trust my intuition and follow the guidance of my inner voice.',
    meaning: 'Your intuition is your most reliable compass.'
  }
];

const AFFIRMATION_STORAGE_KEY = 'aroti-daily-affirmation';
const SHUFFLE_COUNT_KEY = 'aroti-affirmation-shuffles';

interface StoredAffirmation {
  date: string;
  affirmation: Affirmation;
  shuffleCount: number;
}

/**
 * Get today's date as a string (YYYY-MM-DD)
 */
const getTodayString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Get affirmation of the day based on date
 */
const getAffirmationOfTheDay = (): Affirmation => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return AFFIRMATIONS_POOL[dayOfYear % AFFIRMATIONS_POOL.length];
};

/**
 * Get today's affirmation (with daily rotation and shuffle tracking)
 */
export const getTodaysAffirmation = (): { affirmation: Affirmation; shuffleCount: number; canShuffle: boolean } => {
  const today = getTodayString();
  const stored = localStorage.getItem(AFFIRMATION_STORAGE_KEY);
  
  if (stored) {
    try {
      const parsed: StoredAffirmation = JSON.parse(stored);
      
      // Check if it's still today
      if (parsed.date === today) {
        const canShuffle = parsed.shuffleCount < 2; // Max 2 shuffles per day
        return {
          affirmation: parsed.affirmation,
          shuffleCount: parsed.shuffleCount,
          canShuffle
        };
      }
    } catch (error) {
      console.error('Error parsing stored affirmation:', error);
    }
  }
  
  // New day or no stored data - get fresh affirmation
  const affirmation = getAffirmationOfTheDay();
  const newState: StoredAffirmation = {
    date: today,
    affirmation,
    shuffleCount: 0
  };
  localStorage.setItem(AFFIRMATION_STORAGE_KEY, JSON.stringify(newState));
  
  return {
    affirmation,
    shuffleCount: 0,
    canShuffle: true
  };
};

/**
 * Shuffle to a new affirmation (if allowed)
 */
export const shuffleAffirmation = (): Affirmation | null => {
  const today = getTodayString();
  const stored = localStorage.getItem(AFFIRMATION_STORAGE_KEY);
  
  let currentState: StoredAffirmation;
  
  if (stored) {
    try {
      const parsed: StoredAffirmation = JSON.parse(stored);
      
      // Check if it's still today
      if (parsed.date === today) {
        // Check shuffle limit
        if (parsed.shuffleCount >= 2) {
          return null; // No more shuffles allowed today
        }
        
        currentState = parsed;
      } else {
        // New day - reset
        currentState = {
          date: today,
          affirmation: getAffirmationOfTheDay(),
          shuffleCount: 0
        };
      }
    } catch (error) {
      console.error('Error parsing stored affirmation:', error);
      currentState = {
        date: today,
        affirmation: getAffirmationOfTheDay(),
        shuffleCount: 0
      };
    }
  } else {
    currentState = {
      date: today,
      affirmation: getAffirmationOfTheDay(),
      shuffleCount: 0
    };
  }
  
  // Get a different affirmation (not the same as current)
  let newAffirmation: Affirmation;
  do {
    const randomIndex = Math.floor(Math.random() * AFFIRMATIONS_POOL.length);
    newAffirmation = AFFIRMATIONS_POOL[randomIndex];
  } while (newAffirmation.id === currentState.affirmation.id && AFFIRMATIONS_POOL.length > 1);
  
  // Update state
  const updatedState: StoredAffirmation = {
    date: today,
    affirmation: newAffirmation,
    shuffleCount: currentState.shuffleCount + 1
  };
  localStorage.setItem(AFFIRMATION_STORAGE_KEY, JSON.stringify(updatedState));
  
  return newAffirmation;
};


