import type { TFunction } from 'i18next';
import type { Experience } from '@/types';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const monthIndex = (month: string): number => MONTH_NAMES.indexOf(month);

/** Whole years and remaining months between an experience's start and end. */
export const calculateDurationParts = (
  exp: Experience
): { years: number; months: number } => {
  const { start, end } = exp;

  const startDate = new Date(`${start.month} 1, ${start.year}`);
  const endDate = end.active
    ? new Date()
    : new Date(`${end.month} 1, ${end.year}`);

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
};

/**
 * Localized duration between start and end (e.g. "2 yrs 3 mos", "2 años 3 meses").
 * Uses the `time.duration.*` plural keys of the given translation function.
 */
export const calculateDuration = (exp: Experience, t: TFunction): string => {
  const { years, months } = calculateDurationParts(exp);

  const parts: string[] = [];
  if (years > 0) parts.push(t('time.duration.years', { count: years }));
  if (months > 0) parts.push(t('time.duration.months', { count: months }));

  return parts.join(' ');
};

/** Machine-readable `YYYY-MM` value for a `<time dateTime>` attribute. */
export const toDateTimeValue = (month: string, year: string): string => {
  const index = monthIndex(month);
  return index < 0 ? year : `${year}-${String(index + 1).padStart(2, '0')}`;
};

/** Localized short month and year (e.g. "Feb 2022", "feb 2022"). */
export const formatMonthYear = (
  month: string,
  year: string,
  locale: string
): string => {
  const index = monthIndex(month);
  if (index < 0) return year;
  const date = new Date(Date.UTC(Number(year), index, 1));
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  };
  let formatted: string;
  try {
    formatted = new Intl.DateTimeFormat(locale, options).format(date);
  } catch {
    // Invalid BCP 47 tag: fall back to English rather than throwing.
    formatted = new Intl.DateTimeFormat('en', options).format(date);
  }
  return formatted.replace(/\./g, '');
};

/**
 * Calculates years of experience from a given start date to present
 * @param startMonth - Start month name
 * @param startYear - Start year
 * @returns Years with "+" suffix (e.g., "7+")
 */
export const calculateYearsExperience = (
  startMonth: string,
  startYear: string
): string => {
  const startDate = new Date(`${startMonth} 1, ${startYear}`);
  const currentDate = new Date();
  const years = currentDate.getFullYear() - startDate.getFullYear();

  return `${years}+`;
};
