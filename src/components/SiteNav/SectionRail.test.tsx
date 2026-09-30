import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest';
import { act, screen, within } from '@testing-library/react';
import '../../i18n/config';
import SectionRail from './SectionRail';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../test/renderWithProviders';

const mediaMock = vi.hoisted(() => ({ wide: false }));

// useMediaQuery caches lists per query at module level, so the hook is mocked
// to switch the viewport per test.
vi.mock('@/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/hooks')>();
  return {
    ...actual,
    useMediaQueryHysteresis: (enter: string) =>
      enter.includes('min-width') ? mediaMock.wide : false,
  };
});

const mockWide = (wide: boolean) => {
  mediaMock.wide = wide;
};

const items = [
  { id: 'aboutme', href: '#aboutme', labelKey: 'header.about' },
  { id: 'projects', href: '#projects', labelKey: 'header.projects' },
  { id: 'experience', href: '#experience', labelKey: 'header.experience' },
  { id: 'contact', href: '#contact', labelKey: 'header.contact' },
];

describe('SectionRail', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    mediaMock.wide = false;
  });

  it('is not rendered below the desktop breakpoint', () => {
    mockWide(false);
    renderWithProviders(<SectionRail items={items} activeSection="projects" />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('renders a labelled nav with four anchor links and marks the active one', () => {
    mockWide(true);
    renderWithProviders(<SectionRail items={items} activeSection="projects" />);
    const nav = screen.getByRole('navigation', { name: 'Section index' });
    const links = within(nav).getAllByRole('link');
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      '#aboutme',
      '#projects',
      '#experience',
      '#contact',
    ]);
    // The visible index is part of the accessible name (label-in-name).
    expect(links[0]).toHaveAccessibleName(/^01, about me$/i);
    expect(links[1]).toHaveAccessibleName(/^02, projects$/i);
    expect(links[1]).toHaveAttribute('aria-current', 'location');
    expect(links.filter((a) => a.hasAttribute('aria-current'))).toHaveLength(1);
    expect(nav).toHaveAttribute('data-visible', 'true');
  });

  it('stays hidden while the hero is the active section', () => {
    mockWide(true);
    renderWithProviders(<SectionRail items={items} activeSection="home" />);
    expect(screen.getByTestId('section-rail')).toHaveAttribute(
      'data-visible',
      'false'
    );
    const nav = screen.getByTestId('section-rail');
    expect(nav).toHaveAttribute('aria-hidden', 'true');
    expect(nav).toHaveAttribute('inert');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders at the end of <body>, after the page content in tab order', () => {
    mockWide(true);
    const { container } = renderWithProviders(
      <SectionRail items={items} activeSection="projects" />
    );
    expect(container).not.toContainElement(screen.getByTestId('section-rail'));
    expect(document.body.lastElementChild).toBe(
      screen.getByTestId('section-rail')
    );
  });

  it('stays visible while a rail link has focus', () => {
    mockWide(true);
    const { rerender } = renderWithProviders(
      <SectionRail items={items} activeSection="projects" />
    );
    const link = screen.getAllByRole('link')[1];
    act(() => link.focus());
    rerender(<SectionRail items={items} activeSection="home" />);
    expect(screen.getByTestId('section-rail')).toHaveAttribute(
      'data-visible',
      'true'
    );
    act(() => link.blur());
    expect(screen.getByTestId('section-rail')).toHaveAttribute(
      'data-visible',
      'false'
    );
  });

  it('hides while suppressed (mobile drawer open)', () => {
    mockWide(true);
    renderWithProviders(
      <SectionRail items={items} activeSection="projects" suppressed />
    );
    expect(screen.getByTestId('section-rail')).toHaveAttribute(
      'data-visible',
      'false'
    );
  });
});
