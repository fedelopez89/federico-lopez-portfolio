import { describe, it, expect, vi, afterEach } from 'vitest';
import i18n from '../i18n/config';
import {
  calculateDuration as calculateDurationWith,
  calculateYearsExperience,
  formatMonthYear,
  toDateTimeValue,
} from './dateCalculations';
import type { Experience } from '@/types';

const en = i18n.getFixedT('en');
const es = i18n.getFixedT('es');
const calculateDuration = (exp: Experience) => calculateDurationWith(exp, en);

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

describe('calculateDuration (Spanish)', () => {
  it('uses Spanish plural units', () => {
    const exp = makeExperience('January', '2020', 'April', '2022');
    expect(calculateDurationWith(exp, es)).toBe('2 años 3 meses');
  });

  it('uses Spanish singular units', () => {
    const exp = makeExperience('January', '2021', 'February', '2022');
    expect(calculateDurationWith(exp, es)).toBe('1 año 1 mes');
  });

  it('returns only months in Spanish when under one year', () => {
    const exp = makeExperience('January', '2023', 'July', '2023');
    expect(calculateDurationWith(exp, es)).toBe('6 meses');
  });
});

describe('formatMonthYear', () => {
  it('formats a short month and year per locale', () => {
    expect(formatMonthYear('February', '2022', 'en')).toBe('Feb 2022');
    expect(formatMonthYear('February', '2022', 'es')).toBe('feb 2022');
  });

  it('falls back to the year for an unknown month', () => {
    expect(formatMonthYear('', '2022', 'en')).toBe('2022');
  });

  it('falls back to English for an invalid locale tag', () => {
    expect(formatMonthYear('February', '2022', 'not_a_locale!')).toBe('Feb 2022');
  });
});

describe('toDateTimeValue', () => {
  it('returns YYYY-MM', () => {
    expect(toDateTimeValue('February', '2022')).toBe('2022-02');
    expect(toDateTimeValue('December', '2015')).toBe('2015-12');
  });

  it('falls back to the year for an unknown month', () => {
    expect(toDateTimeValue('', '2022')).toBe('2022');
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
