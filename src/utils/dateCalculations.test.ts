import { describe, it, expect, vi, afterEach } from 'vitest';
import { calculateDuration, calculateYearsExperience } from './dateCalculations';
import type { Experience } from '@/types';

function makeExperience(
  startMonth: string,
  startYear: string,
  endMonth: string,
  endYear: string,
  active = false
): Experience {
  return {
    id: 'test',
    rol: 'Developer',
    company: { name: 'Test Co', href: '' },
    start: { month: startMonth, year: startYear },
    end: { month: endMonth, year: endYear, active },
    place: { remote: false, province: 'BA', country: 'AR' },
    notes: '',
  };
}

describe('calculateDuration', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns plural years and months for a typical multi-year range', () => {
    const exp = makeExperience('January', '2020', 'April', '2022');
    expect(calculateDuration(exp)).toBe('2 yrs 3 mos');
  });

  it('returns singular yr and mo for exactly 1 year and 1 month', () => {
    const exp = makeExperience('January', '2021', 'February', '2022');
    expect(calculateDuration(exp)).toBe('1 yr 1 mo');
  });

  it('returns only months when duration is under one year', () => {
    const exp = makeExperience('January', '2023', 'July', '2023');
    expect(calculateDuration(exp)).toBe('6 mos');
  });

  it('handles cross-year month borrow correctly', () => {
    const exp = makeExperience('November', '2021', 'February', '2022');
    expect(calculateDuration(exp)).toBe('3 mos');
  });

  it('returns only years when month delta is zero', () => {
    const exp = makeExperience('January', '2021', 'January', '2022');
    expect(calculateDuration(exp)).toBe('1 yr');
  });

  it('returns empty string when start and end are the same month and year', () => {
    const exp = makeExperience('January', '2023', 'January', '2023');
    expect(calculateDuration(exp)).toBe('');
  });

  it('uses current date when end is marked active', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15'));
    const exp = makeExperience('January', '2022', '', '', true);
    expect(calculateDuration(exp)).toBe('2 yrs');
  });
});

describe('calculateYearsExperience', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns years with + suffix relative to a mocked current date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-01'));
    expect(calculateYearsExperience('January', '2010')).toBe('14+');
  });

  it('returns 0+ when start year equals current year', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-01'));
    expect(calculateYearsExperience('January', '2024')).toBe('0+');
  });
});
