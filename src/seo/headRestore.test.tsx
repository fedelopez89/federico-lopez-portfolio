import { describe, it, expect, afterEach, beforeAll, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18n from '../i18n/config';
import App from '../App';
import { projects } from '../data/projects';
import { setupTestEnvironment } from '../test/renderWithProviders';
import { rewriteProjectHead } from '../../scripts/head-rewrite.mjs';
import indexHtml from '../../index.html?raw';
import { buildProjectMeta, type Translate } from './projectMeta';
import { HOME_META } from './homeMeta';

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: actual.motionValue(0) }),
  };
});

const attr = (selector: string, name: string) =>
  document.querySelector(selector)?.getAttribute(name);

/** Replaces the live head with the prerendered head of a project. */
function loadPrerenderedHead(projectIndex: number) {
  const project = projects[projectIndex];
  const t: Translate = (_key, options) => options.defaultValue;
  const html = rewriteProjectHead(
    indexHtml,
    buildProjectMeta(project, t),
    '<noscript></noscript>'
  );
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  document.title = parsed.title;
  document.head.innerHTML = parsed.head.innerHTML;
}

describe('head after a prerendered deep link', () => {
  beforeAll(async () => {
    setupTestEnvironment();
    await import('../pages/ProjectDetail');
  }, 60_000);

  afterEach(async () => {
    await act(() => i18n.changeLanguage('en'));
    sessionStorage.clear();
    window.history.pushState({}, '', '/');
  });

  it('shows home values, not the project ones, after navigating to Home', async () => {
    const user = userEvent.setup();
    const project = projects[0];
    loadPrerenderedHead(0);
    expect(attr('link[rel="canonical"]', 'href')).toContain(project.id);

    window.history.pushState({}, '', `/projects/${project.id}`);
    render(<App />);
    await screen.findByRole('navigation', { name: 'Project navigation' });
    expect(attr('link[rel="canonical"]', 'href')).toContain(project.id);

    await user.click(
      screen.getByRole('button', { name: /back to portfolio/i })
    );
    await screen.findByRole('heading', { level: 2, name: /projects/i });

    expect(attr('link[rel="canonical"]', 'href')).toBe(HOME_META.canonical);
    expect(attr('meta[name="description"]', 'content')).toBe(
      HOME_META.description
    );
    expect(attr('meta[property="og:url"]', 'content')).toBe(
      HOME_META.canonical
    );
    expect(attr('meta[property="og:image"]', 'content')).toBe(HOME_META.image);
    expect(attr('meta[property="og:title"]', 'content')).toBe(
      HOME_META.socialTitle
    );
    expect(attr('meta[name="twitter:image"]', 'content')).toBe(HOME_META.image);
    expect(attr('meta[name="twitter:url"]', 'content')).toBe(
      HOME_META.canonical
    );
    expect(document.title).toBe(
      'Federico López — Senior Frontend Engineer (React)'
    );
    expect(document.getElementById('project-jsonld')).toBeNull();
  });

  it('points the canonical at the requested URL on a 404', async () => {
    loadPrerenderedHead(1);
    window.history.pushState({}, '', '/nope');
    render(<App />);
    await screen.findByRole('heading', { level: 1, name: 'Page not found' });
    expect(attr('link[rel="canonical"]', 'href')).toBe(
      `${window.location.origin}/nope`
    );
    expect(attr('meta[property="og:image"]', 'content')).toBe(HOME_META.image);
  });
});
