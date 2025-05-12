import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Initialize dayjs plugins
dayjs.extend(relativeTime);

/**
 * Format a date to a readable format (e.g., "Jan 1, 2023")
 */
export const formatDate = (date: string | Date): string => {
  return dayjs(date).format('MMM D, YYYY');
};

/**
 * Format a date to include time (e.g., "Jan 1, 2023 3:00 PM")
 */
export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format('MMM D, YYYY h:mm A');
};

/**
 * Get relative time (e.g., "2 days ago", "in 3 hours")
 */
export const getRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

/**
 * Check if a date is in the past
 */
export const isPast = (date: string | Date): boolean => {
  return dayjs(date).isBefore(dayjs());
};

/**
 * Check if a date is in the future
 */
export const isFuture = (date: string | Date): boolean => {
  return dayjs(date).isAfter(dayjs());
};

/**
 * Check if a date is today
 */
export const isToday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
}; 