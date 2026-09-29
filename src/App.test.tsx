import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18n from './i18n/config';
import App from './App';
import { projects } from './data/projects';
import { setupTestEnvironment } from './test/renderWithProviders';

// jsdom has no Web Animations API, which scroll-linked motion values rely on.
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: actual.motionValue(0) }),
  };
});

const THEME_KEY = 'portfolio-theme-mode';

describe('App shell', () => {
  beforeAll(async () => {
    setupTestEnvironment();
    // Warm the lazy route chunk so cold-start transforms don't land inside a
    // test body and blow its timeout.
    await import('./pages/ProjectDetail');
  }, 60_000);

  afterEach(async () => {
    await act(() => i18n.changeLanguage('en'));
    sessionStorage.clear();
    vi.restoreAllMocks();
    window.history.pushState({}, '', '/');
  });

  it('keeps one ThemeProvider across home, detail and back', async () => {
    const user = userEvent.setup();
    window.history.pushState({}, '', '/');
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    const themeWrites = () =>
      setItem.mock.calls.filter(([key]) => key === THEME_KEY).length;

    render(<App />);
    const mountWrites = themeWrites();
    expect(mountWrites).toBeGreaterThan(0);

    await user.click(
      screen.getByRole('button', { name: /switch to (dark|light) mode/i })
    );
    const toggledWrites = themeWrites();
    const mode = localStorage.getItem(THEME_KEY);

    const cardLink = document.querySelector<HTMLAnchorElement>(
      'a[href^="/projects/"]'
    );
    expect(cardLink).not.toBeNull();
    await user.click(cardLink as HTMLAnchorElement);

    const detailNav = await screen.findByRole('navigation', {
      name: 'Project navigation',
    });
    expect(detailNav).toBeInTheDocument();
    expect(window.location.pathname).toMatch(/^\/projects\//);
    expect(themeWrites()).toBe(toggledWrites);

    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    await user.click(within(nav).getByRole('link', { name: 'PROJECTS' }));
    await screen.findByRole('heading', { level: 2, name: /projects/i });
    expect(window.location.pathname).toBe('/');
    expect(window.location.hash).toBe('#projects');
    expect(themeWrites()).toBe(toggledWrites);
    expect(localStorage.getItem(THEME_KEY)).toBe(mode);
  });

  it('sets a translated home title that follows the language', async () => {
    const user = userEvent.setup();
    window.history.pushState({}, '', '/');
    render(<App />);
    await waitFor(() =>
      expect(document.title).toBe(
        'Federico López — Senior Frontend Engineer (React)'
      )
    );
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    await user.click(within(nav).getByRole('button', { name: 'Español' }));
    await waitFor(() =>
      expect(document.title).toBe(
        'Federico López — Ingeniero Frontend Senior (React)'
      )
    );
  });

  it('returns focus to the opened project card via the Back button', async () => {
    const user = userEvent.setup();
    window.history.pushState({}, '', '/');
    render(<App />);

    const target = projects[2];
    const cardLink = document.querySelector<HTMLAnchorElement>(
      `a[href="/projects/${target.id}"]`
    );
    expect(cardLink).not.toBeNull();
    await user.click(cardLink as HTMLAnchorElement);
    await screen.findByRole('navigation', { name: 'Project navigation' });

    await user.click(
      screen.getByRole('button', { name: /back to portfolio/i })
    );
    await waitFor(() =>
      expect(
        document.querySelector(`a[href="/projects/${target.id}"]`)
      ).toHaveFocus()
    );
  });

  it('keeps exactly one project and one breadcrumb JSON-LD block and the right title across prev/next and back', async () => {
    const user = userEvent.setup();
    window.history.pushState({}, '', `/projects/${projects[0].id}`);
    render(<App />);

    const title = (i: number) => `${projects[i].title} | Federico López`;
    const jsonLd = () =>
      document.querySelectorAll('#project-jsonld, #project-breadcrumb-jsonld');

    await screen.findByRole('navigation', { name: 'Project navigation' });
    await waitFor(() => expect(document.title).toBe(title(0)));
    expect(jsonLd()).toHaveLength(2);

    await user.click(screen.getByRole('link', { name: /Next/ }));
    await waitFor(() => expect(document.title).toBe(title(1)));
    expect(jsonLd()).toHaveLength(2);

    await user.click(screen.getByRole('link', { name: /Previous/ }));
    await waitFor(() => expect(document.title).toBe(title(0)));
    expect(jsonLd()).toHaveLength(2);
  });

  it.each(['/projects/', '/projects/x/y'])(
    'renders the site 404 for %s',
    async (path) => {
      window.history.pushState({}, '', path);
      render(<App />);
      expect(
        await screen.findByRole('heading', {
          level: 1,
          name: 'Page not found',
        })
      ).toBeInTheDocument();
    }
  );

  it('renders a real 404 for unknown paths instead of redirecting', async () => {
    window.history.pushState({}, '', '/definitely-not-a-page');
    render(<App />);
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Page not found' })
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe('/definitely-not-a-page');
    expect(
      document.querySelector('meta[name="robots"]')?.getAttribute('content')
    ).toBe('noindex');
  });
});
