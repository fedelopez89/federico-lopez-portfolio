import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  vi,
} from 'vitest';
import { screen, within } from '@testing-library/react';
import i18n from '../../../i18n/config';
import AboutMe from './AboutMe';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../../test/renderWithProviders';

describe('AboutMe', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-09-29'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the facts as a description list with 3 term/value pairs', () => {
    const { container } = renderWithProviders(<AboutMe />);
    const list = container.querySelector('dl');
    expect(list).not.toBeNull();
    expect(list!.querySelectorAll('dt')).toHaveLength(3);
    expect(list!.querySelectorAll('dd')).toHaveLength(3);
    // Label (dt) precedes value (dd) so assistive tech reads label first.
    const first = list!.firstElementChild!;
    expect(first.firstElementChild!.tagName).toBe('DT');
    expect(first.lastElementChild!.tagName).toBe('DD');
  });

  it('computes years of experience from the fixed clock', () => {
    const { container } = renderWithProviders(<AboutMe />);
    const values = [...container.querySelectorAll('dd')].map(
      (el) => el.textContent
    );
    expect(values).toEqual(['7+', '9+', '100%']);
  });

  it('shows translated fact values and labels', () => {
    renderWithProviders(<AboutMe />);
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText('Companies & products')).toBeInTheDocument();
  });

  it('mentions the New York Times only in the featured callout', () => {
    renderWithProviders(<AboutMe />);
    expect(screen.getAllByText(/New York Times/)).toHaveLength(2);
    const callout = screen.getByText('The New York Times').closest('div');
    expect(callout).toHaveTextContent(/featured by The New York Times/);
    ['en', 'es'].forEach((lng) =>
      expect(i18n.t('aboutMe.passion', { lng })).not.toMatch(/New York Times/)
    );
  });

  it('links the New York Times feature externally with a safe rel', () => {
    renderWithProviders(<AboutMe />);
    const link = screen.getByRole('link', { name: /see the linkedin post/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toMatch(/noreferrer/);
    expect(link).toHaveAccessibleName(
      /^See the LinkedIn post\s+\(opens in a new tab\)$/
    );
    expect(link.getAttribute('href')).toContain('linkedin.com/posts/');
  });

  it('names the publication in the callout', () => {
    renderWithProviders(<AboutMe />);
    expect(screen.getByText('Featured in')).toBeInTheDocument();
    expect(screen.getByText('The New York Times')).toBeInTheDocument();
  });

  it('keeps the callout link out of the facts list', () => {
    const { container } = renderWithProviders(<AboutMe />);
    expect(
      within(container.querySelector('dl')!).queryByRole('link')
    ).toBeNull();
  });
});
