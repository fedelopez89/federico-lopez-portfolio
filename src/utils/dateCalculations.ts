import type { Experience } from '@/types';

/**
 * Calculates the duration between start and end dates in years and months
 * @param start - Start date object with month and year
 * @param end - End date object with month, year, and active flag
 * @returns Formatted duration string (e.g., "2 yrs 3 mos", "6 mos")
 */
export const calculateDuration = (exp: Experience): string => {
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

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);

  return parts.join(' ');
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
