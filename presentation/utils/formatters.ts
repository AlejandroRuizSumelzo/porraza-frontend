/**
 * Centralized formatting utilities with i18n support
 *
 * These utilities use the locale from the current context to format
 * dates, times, numbers, and other localized content.
 *
 * Usage:
 * - Import the formatter you need
 * - Call it with the current locale from useLocale() hook
 *
 * @example
 * ```tsx
 * import { useLocale } from 'next-intl';
 * import { formatFullDate } from '@/presentation/utils/formatters';
 *
 * const locale = useLocale();
 * const formatted = formatFullDate(new Date(), locale);
 * ```
 */

/**
 * Date Formatting Options
 */
export type DateFormatVariant =
  | 'full'           // "1 de enero de 2026"
  | 'long'           // "1 ene 2026"
  | 'short'          // "1 ene"
  | 'abbreviated';   // "dom, 1 ene"

/**
 * Formats a date according to the specified variant and locale
 *
 * @param date - Date object or ISO string to format
 * @param locale - Locale code (e.g., 'es', 'en')
 * @param variant - Format variant to use
 * @returns Formatted date string
 *
 * @example
 * formatDate(new Date('2026-01-01'), 'es', 'full')
 * // Returns: "1 de enero de 2026"
 *
 * formatDate(new Date('2026-01-01'), 'es', 'abbreviated')
 * // Returns: "jue, 1 ene"
 */
export function formatDate(
  date: Date | string,
  locale: string,
  variant: DateFormatVariant = 'full'
): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    // Check for invalid date
    if (isNaN(dateObj.getTime())) {
      console.warn('[formatDate] Invalid date:', date);
      return String(date);
    }

    const options: Intl.DateTimeFormatOptions = (() => {
      switch (variant) {
        case 'full':
          return {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };
        case 'long':
          return {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          };
        case 'short':
          return {
            month: 'short',
            day: 'numeric',
          };
        case 'abbreviated':
          return {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          };
      }
    })();

    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  } catch (error) {
    console.error('[formatDate] Error formatting date:', error);
    return String(date);
  }
}

/**
 * Formats a full date with year, month, and day
 * Shorthand for formatDate with 'full' variant
 *
 * @example
 * formatFullDate(new Date('2026-01-01'), 'es')
 * // Returns: "1 de enero de 2026"
 */
export function formatFullDate(date: Date | string, locale: string): string {
  return formatDate(date, locale, 'full');
}

/**
 * Formats a long date with abbreviated month
 * Shorthand for formatDate with 'long' variant
 *
 * @example
 * formatLongDate(new Date('2026-01-01'), 'es')
 * // Returns: "1 ene 2026"
 */
export function formatLongDate(date: Date | string, locale: string): string {
  return formatDate(date, locale, 'long');
}

/**
 * Formats a short date without year
 * Shorthand for formatDate with 'short' variant
 *
 * @example
 * formatShortDate(new Date('2026-01-01'), 'es')
 * // Returns: "1 ene"
 */
export function formatShortDate(date: Date | string, locale: string): string {
  return formatDate(date, locale, 'short');
}

/**
 * Formats a date with weekday abbreviation
 * Shorthand for formatDate with 'abbreviated' variant
 *
 * @example
 * formatAbbreviatedDate(new Date('2026-01-01'), 'es')
 * // Returns: "jue, 1 ene"
 */
export function formatAbbreviatedDate(date: Date | string, locale: string): string {
  return formatDate(date, locale, 'abbreviated');
}

/**
 * Formats a time string from "HH:MM:SS" to "HH:MM"
 * This is locale-independent as time format is universal
 *
 * @param timeString - Time string in format "HH:MM:SS" or "HH:MM"
 * @returns Formatted time string "HH:MM"
 *
 * @example
 * formatTime('20:00:00')
 * // Returns: "20:00"
 *
 * formatTime('14:30')
 * // Returns: "14:30"
 */
export function formatTime(timeString: string): string {
  if (!timeString) {
    console.warn('[formatTime] Empty time string provided');
    return '';
  }

  // If already in HH:MM format, return as-is
  if (timeString.length === 5 && timeString.includes(':')) {
    return timeString;
  }

  // If in HH:MM:SS format, slice to HH:MM
  if (timeString.length >= 5) {
    return timeString.slice(0, 5);
  }

  console.warn('[formatTime] Invalid time string format:', timeString);
  return timeString;
}

/**
 * Formats a date and time together
 *
 * @param date - Date object or ISO string
 * @param time - Time string in format "HH:MM:SS" or "HH:MM"
 * @param locale - Locale code
 * @param dateVariant - Format variant for the date part
 * @returns Formatted date and time string
 *
 * @example
 * formatDateTime(new Date('2026-01-01'), '20:00:00', 'es', 'short')
 * // Returns: "1 ene • 20:00"
 */
export function formatDateTime(
  date: Date | string,
  time: string,
  locale: string,
  dateVariant: DateFormatVariant = 'short'
): string {
  const formattedDate = formatDate(date, locale, dateVariant);
  const formattedTime = formatTime(time);
  return `${formattedDate} • ${formattedTime}`;
}

/**
 * Formats a Date object to include both date and time
 * Uses Intl.DateTimeFormat with both date and time options
 *
 * @param date - Date object to format
 * @param locale - Locale code
 * @param options - Optional custom DateTimeFormat options
 * @returns Formatted date and time string
 *
 * @example
 * formatFullDateTime(new Date('2026-01-01T20:00:00'), 'es')
 * // Returns: "1 de enero de 2026, 20:00"
 */
export function formatFullDateTime(
  date: Date | string,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      console.warn('[formatFullDateTime] Invalid date:', date);
      return String(date);
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
      dateStyle: 'long',
      timeStyle: 'short',
    };

    return new Intl.DateTimeFormat(
      locale,
      options || defaultOptions
    ).format(dateObj);
  } catch (error) {
    console.error('[formatFullDateTime] Error formatting date time:', error);
    return String(date);
  }
}

/**
 * Formats a number with locale-specific thousand separators
 *
 * @param value - Number to format, or null
 * @param locale - Locale code
 * @param fallback - Fallback string if value is null/undefined (default: "N/A")
 * @returns Formatted number string or fallback
 *
 * @example
 * formatNumber(50000, 'es')
 * // Returns: "50.000"
 *
 * formatNumber(null, 'es')
 * // Returns: "N/A"
 *
 * formatNumber(null, 'es', 'No disponible')
 * // Returns: "No disponible"
 */
export function formatNumber(
  value: number | null | undefined,
  locale: string,
  fallback: string = 'N/A'
): string {
  if (value === null || value === undefined) {
    return fallback;
  }

  try {
    return new Intl.NumberFormat(locale).format(value);
  } catch (error) {
    console.error('[formatNumber] Error formatting number:', error);
    return String(value);
  }
}

/**
 * Formats a stadium capacity with locale-specific formatting
 * Alias for formatNumber with better semantic meaning
 *
 * @param capacity - Capacity number or null
 * @param locale - Locale code
 * @param fallback - Fallback string if capacity is null (default: "N/A")
 * @returns Formatted capacity string
 *
 * @example
 * formatCapacity(50000, 'es')
 * // Returns: "50.000"
 */
export function formatCapacity(
  capacity: number | null | undefined,
  locale: string,
  fallback: string = 'N/A'
): string {
  return formatNumber(capacity, locale, fallback);
}

/**
 * Formats a currency value
 *
 * @param amount - Amount to format
 * @param locale - Locale code
 * @param currency - Currency code (default: 'EUR')
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1.99, 'es', 'EUR')
 * // Returns: "1,99 €"
 *
 * formatCurrency(1.99, 'en', 'USD')
 * // Returns: "$1.99"
 */
export function formatCurrency(
  amount: number,
  locale: string,
  currency: string = 'EUR'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (error) {
    console.error('[formatCurrency] Error formatting currency:', error);
    return `${amount} ${currency}`;
  }
}
