const SESSION_UPDATES_KEY = 'aroti-session-updates';

export interface SessionUpdate {
  sessionId: string;
  date: string;
  time: string;
  updatedAt: number;
}

/**
 * Get all session updates from localStorage
 */
export const getSessionUpdates = (): SessionUpdate[] => {
  try {
    const stored = localStorage.getItem(SESSION_UPDATES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading session updates from localStorage:', error);
    return [];
  }
};

/**
 * Get update for a specific session
 */
export const getSessionUpdate = (sessionId: string): SessionUpdate | null => {
  const updates = getSessionUpdates();
  return updates.find(u => u.sessionId === sessionId) || null;
};

/**
 * Save/update session reschedule
 */
export const updateSession = (sessionId: string, date: string, time: string): void => {
  try {
    const updates = getSessionUpdates();
    const existingIndex = updates.findIndex(u => u.sessionId === sessionId);
    
    const newUpdate: SessionUpdate = {
      sessionId,
      date,
      time,
      updatedAt: Date.now(),
    };
    
    if (existingIndex >= 0) {
      // Update existing
      updates[existingIndex] = newUpdate;
    } else {
      // Add new
      updates.push(newUpdate);
    }
    
    localStorage.setItem(SESSION_UPDATES_KEY, JSON.stringify(updates));
  } catch (error) {
    console.error('Error saving session update to localStorage:', error);
  }
};

/**
 * Remove session update
 */
export const removeSessionUpdate = (sessionId: string): void => {
  try {
    const updates = getSessionUpdates();
    const filtered = updates.filter(u => u.sessionId !== sessionId);
    localStorage.setItem(SESSION_UPDATES_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing session update from localStorage:', error);
  }
};

// Canceled Sessions Management
const CANCELED_SESSIONS_KEY = 'aroti-canceled-sessions';

/**
 * Get all canceled session IDs from localStorage
 */
export const getCanceledSessions = (): string[] => {
  try {
    const stored = localStorage.getItem(CANCELED_SESSIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading canceled sessions from localStorage:', error);
    return [];
  }
};

/**
 * Mark a session as canceled
 */
export const cancelSession = (sessionId: string): void => {
  try {
    const canceled = getCanceledSessions();
    if (!canceled.includes(sessionId)) {
      canceled.push(sessionId);
      localStorage.setItem(CANCELED_SESSIONS_KEY, JSON.stringify(canceled));
    }
  } catch (error) {
    console.error('Error saving canceled session to localStorage:', error);
  }
};

// Booked Sessions Management
const BOOKED_SESSIONS_KEY = 'aroti-booked-sessions';

export interface BookedSession {
  id: string;
  specialistId: string;
  specialistName: string;
  specialistPhoto: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: "upcoming" | "completed" | "pending";
  meetingLink?: string;
  preparationNotes?: string;
}

/**
 * Get all user-booked sessions from localStorage
 */
export const getBookedSessions = (): BookedSession[] => {
  try {
    const stored = localStorage.getItem(BOOKED_SESSIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading booked sessions from localStorage:', error);
    return [];
  }
};

/**
 * Add a newly booked session to localStorage
 */
export const addBookedSession = (session: Omit<BookedSession, 'id'>): string => {
  try {
    const bookedSessions = getBookedSessions();
    const newSession: BookedSession = {
      ...session,
      id: `booked-${Date.now()}`, // Generate unique ID using timestamp
    };
    bookedSessions.push(newSession);
    localStorage.setItem(BOOKED_SESSIONS_KEY, JSON.stringify(bookedSessions));
    return newSession.id;
  } catch (error) {
    console.error('Error saving booked session to localStorage:', error);
    return '';
  }
};

