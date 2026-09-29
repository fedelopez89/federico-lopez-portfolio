import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest';
import { act, screen, within } from '@testing-library/react';
import i18n from '../../../i18n/config';
import Experience from './Experience';
import experienceHistory from '../../../data/experience.json';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../../test/renderWithProviders';

const { experiences } = experienceHistory;

describe('Experience', () => {
  beforeAll(async () => {
    setupTestEnvironment();
    await i18n.changeLanguage('en');
  });

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-09-29'));
  });

  afterEach(async () => {
    vi.useRealTimers();
    await act(() => i18n.changeLanguage('en'));
  });

  it('renders an ordered list with one item per experience', () => {
    renderWithProviders(<Experience />);
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('OL');
    expect(within(list).getAllByRole('listitem')).toHaveLength(
      experiences.length
    );
  });

  it('renders start dates as time elements with YYYY-MM dateTime', () => {
    const { container } = renderWithProviders(<Experience />);
    const times = container.querySelectorAll('time');
    expect(times.length).toBeGreaterThanOrEqual(experiences.length);
    expect(times[0]).toHaveAttribute('datetime', '2022-02');
    times.forEach((el) =>
      expect(el.getAttribute('datetime')).toMatch(/^\d{4}-\d{2}$/)
    );
  });

  it('shows English durations by default', () => {
    renderWithProviders(<Experience />);
    // Nisum: Aug 2021 - Apr 2022
    expect(screen.getByText('8 mos')).toBeInTheDocument();
  });

  it('shows Spanish durations and dates when the language is es', async () => {
    await act(() => i18n.changeLanguage('es'));
    const { container } = renderWithProviders(<Experience />);
    expect(screen.getByText('8 meses')).toBeInTheDocument();
    expect(screen.getAllByText('Presente').length).toBeGreaterThan(0);
    expect(container.textContent).not.toMatch(/\b\d+ (yrs?|mos?)\b/);
  });

  it('shows a translated fallback when the duration is under a month', async () => {
    const original = experiences[0].end;
    const first = experiences[0];
    const snapshot = { ...first.start };
    first.start = { month: 'September', year: '2026' };
    try {
      renderWithProviders(<Experience />);
      expect(screen.getByText('< 1 mo')).toBeInTheDocument();
    } finally {
      first.start = snapshot;
      first.end = original;
    }
  });

  it('opens company links in a new tab with a translated hint', () => {
    renderWithProviders(<Experience />);
    const link = screen.getByRole('link', { name: /^Bonzzu/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAccessibleName(/\(opens in a new tab\)/);
  });

  it('exposes the download link with a name equal to its visible text', () => {
    renderWithProviders(<Experience />);
    const link = screen.getByRole('link', { name: /^Download resume\s*PDF$/ });
    expect(link).toHaveTextContent(/^Download resume\s*PDF$/);
    expect(link).toHaveAttribute('download');
    expect(link).not.toHaveAttribute('aria-label');
  });
});
