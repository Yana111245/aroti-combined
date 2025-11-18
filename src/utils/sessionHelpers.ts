import { Session } from "@/data/specialists";
import { getSessionUpdates, getCanceledSessions, getBookedSessions } from "./sessionUpdates";

/**
 * Merge sessions with any localStorage updates
 * Returns sessions with updated date/time if they've been rescheduled
 * Filters out canceled sessions
 * Includes user-booked sessions from localStorage
 */
export const getSessionsWithUpdates = (sessions: Session[]): Session[] => {
  const updates = getSessionUpdates();
  const updatesMap = new Map(updates.map(u => [u.sessionId, u]));
  const canceledIds = getCanceledSessions();
  const bookedSessions = getBookedSessions();
  
  // Combine mock sessions with user-booked sessions
  const allSessions = [...sessions, ...bookedSessions];
  
  return allSessions
    .filter(session => !canceledIds.includes(session.id))
    .map(session => {
      const update = updatesMap.get(session.id);
      if (update) {
        return {
          ...session,
          date: update.date,
          time: update.time,
        };
      }
      return session;
    });
};

