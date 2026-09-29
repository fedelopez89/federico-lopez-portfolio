import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  beforeEach,
  afterEach,
} from 'vitest';
import { screen, render, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import i18n from '../../i18n/config';
import { ThemeProvider } from '../../context';
import { projects } from '../../data/projects';
import ProjectDetail from './ProjectDetail';
import { setupTestEnvironment } from '../../test/renderWithProviders';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return { ...actual, useNavigate: () => mockNavigate };
});

interface RenderDetailOptions {
  state?: Record<string, unknown>;
}

function renderDetail(id: string, { state }: RenderDetailOptions = {}) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[{ pathname: `/projects/${id}`, state }]}>
        <Routes>
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

const first = projects[0];
const last = projects[projects.length - 1];

describe('ProjectDetail', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  beforeEach(async () => {
    mockNavigate.mockClear();
    document.title = 'Portfolio';
    await act(() => i18n.changeLanguage('en'));
  });

  afterEach(async () => {
    await act(() => i18n.changeLanguage('en'));
  });

  it('renders the project title as the page heading', () => {
    renderDetail('real-evals-gmail');
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Gmail Clone - REAL Evals',
      })
    ).toBeInTheDocument();
  });

  it('renders the not-found state with a heading and a link to the projects section', () => {
    renderDetail('non-existent-project');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Project not found' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Back to projects' })
    ).toHaveAttribute('href', '/#projects');
    expect(document.getElementById('main-content')).toBeInTheDocument();
  });

  it('calls navigate(-1) when back button is clicked and fromPortfolio is true', async () => {
    const user = userEvent.setup();
    renderDetail('real-evals-gmail', { state: { fromPortfolio: true } });
    await user.click(
      screen.getByRole('button', { name: /back to portfolio/i })
    );
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('calls navigate("/#projects") when back button is clicked and fromPortfolio is false', async () => {
    const user = userEvent.setup();
    renderDetail('real-evals-gmail');
    await user.click(
      screen.getByRole('button', { name: /back to portfolio/i })
    );
    expect(mockNavigate).toHaveBeenCalledWith('/#projects');
  });

  it('updates document.title to include project title and author on mount', () => {
    renderDetail('real-evals-gmail');
    expect(document.title).toContain('Gmail Clone - REAL Evals');
    expect(document.title).toContain('Federico López');
  });

  it('restores the original document.title on unmount', () => {
    const { unmount } = renderDetail('real-evals-gmail');
    unmount();
    expect(document.title).toBe('Portfolio');
  });

  it('sets a translated not-found document title', async () => {
    const { unmount } = renderDetail('non-existent-project');
    expect(document.title).toBe('Project not found | Federico López');
    unmount();
    await act(() => i18n.changeLanguage('es'));
    renderDetail('non-existent-project');
    expect(document.title).toBe('Proyecto no encontrado | Federico López');
  });

  it('injects CreativeWork and BreadcrumbList JSON-LD and removes them on unmount', () => {
    const { unmount } = renderDetail('real-evals-gmail');
    const read = (id: string) =>
      JSON.parse(document.getElementById(id)?.textContent ?? 'null');
    const work = read('project-jsonld');
    const url = 'https://federicoglopez.dev/projects/real-evals-gmail';
    expect(work['@type']).toBe('CreativeWork');
    expect(work['@id']).toBe(`${url}#work`);
    expect(work.mainEntityOfPage).toBe(url);
    expect(work.url).toBe(first.demoUrl);
    expect(work.sameAs).toBeUndefined();
    expect(work.author).toEqual({
      '@id': 'https://federicoglopez.dev/#person',
    });
    expect(work.keywords).toBe(first.technologies.join(', '));
    const crumbs = read('project-breadcrumb-jsonld');
    expect(crumbs['@type']).toBe('BreadcrumbList');
    expect(crumbs.itemListElement.map((i: { item: string }) => i.item)).toEqual(
      [
        'https://federicoglopez.dev/',
        'https://federicoglopez.dev/#projects',
        url,
      ]
    );
    unmount();
    expect(document.getElementById('project-jsonld')).toBeNull();
    expect(document.getElementById('project-breadcrumb-jsonld')).toBeNull();
  });

  it('marks the not-found state noindex and restores robots on unmount', () => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'index, follow';
    document.head.appendChild(meta);
    const { unmount } = renderDetail('non-existent-project');
    expect(meta.getAttribute('content')).toBe('noindex');
    unmount();
    expect(meta.getAttribute('content')).toBe('index, follow');
    meta.remove();
  });

  it('adds and removes a robots meta when none exists', () => {
    const { unmount } = renderDetail('non-existent-project');
    expect(
      document.querySelector('meta[name="robots"]')?.getAttribute('content')
    ).toBe('noindex');
    unmount();
    expect(document.querySelector('meta[name="robots"]')).toBeNull();
  });

  it('does not set noindex for a valid project', () => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'index, follow';
    document.head.appendChild(meta);
    renderDetail('real-evals-gmail');
    expect(meta.getAttribute('content')).toBe('index, follow');
    meta.remove();
  });

  it('labels the navbar logo as Home on the page variant', () => {
    renderDetail('real-evals-gmail');
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(
      within(nav).getByRole('link', { name: 'Federico López, Home' })
    ).toHaveAttribute('href', '/#home');
  });

  it('remembers the originating card so home can restore focus', () => {
    sessionStorage.removeItem('portfolio:return-project');
    renderDetail('real-evals-gmail', {
      state: { fromPortfolio: true, fromProject: 'real-evals-gmail' },
    });
    expect(
      JSON.parse(sessionStorage.getItem('portfolio:return-project') ?? '{}').id
    ).toBe('real-evals-gmail');
    sessionStorage.removeItem('portfolio:return-project');
  });

  it('does not remember a project when opened directly', () => {
    sessionStorage.removeItem('portfolio:return-project');
    renderDetail('real-evals-gmail');
    expect(sessionStorage.getItem('portfolio:return-project')).toBeNull();
  });

  it('renders the shared navbar with theme and language toggles', () => {
    renderDetail('real-evals-gmail');
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(
      within(nav).getByRole('button', { name: /switch to dark mode/i })
    ).toBeInTheDocument();
    expect(
      within(nav).getByRole('button', { name: 'English' })
    ).toBeInTheDocument();
  });

  it('links navbar entries back to the home sections', () => {
    renderDetail('real-evals-gmail');
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(within(nav).getByRole('link', { name: 'PROJECTS' })).toHaveAttribute(
      'href',
      '/#projects'
    );
    expect(
      within(nav).getByRole('link', { name: /Federico López/ })
    ).toHaveAttribute('href', '/#home');
    expect(
      within(nav).queryByRole('link', { current: 'location' })
    ).not.toBeInTheDocument();
  });

  it('provides the skip link target', () => {
    renderDetail('real-evals-gmail');
    expect(
      screen.getByRole('link', { name: 'Skip to main content' })
    ).toHaveAttribute('href', '#main-content');
    expect(document.getElementById('main-content')?.tagName).toBe('MAIN');
  });

  it('names the live demo link with its visible text plus the new-tab hint', () => {
    renderDetail('real-evals-gmail');
    const demo = screen.getByRole('link', {
      name: /^Open live demo\s*\(opens in a new tab\)$/,
    });
    expect(demo).toHaveAttribute('href', first.demoUrl);
    expect(demo).toHaveAttribute('target', '_blank');
    expect(demo.getAttribute('rel')).toContain('noreferrer');
    expect(demo).not.toHaveAttribute('aria-label');
  });

  it('says login is required for projects flagged demoRequiresLogin', async () => {
    renderDetail('factupro');
    expect(
      screen.getByRole('link', {
        name: /^Open app \(login required\)\s*\(opens in a new tab\)$/,
      })
    ).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /open live demo/i })).toBeNull();
    await act(() => i18n.changeLanguage('es'));
    expect(
      screen.getByRole('link', { name: /^Abrir app \(requiere login\)/ })
    ).toBeInTheDocument();
  });

  it('hides the code link when the project has no repository', () => {
    renderDetail('real-evals-gmail');
    expect(
      screen.queryByRole('link', { name: /^Code/ })
    ).not.toBeInTheDocument();
  });

  it('links to the neighbouring projects, wrapping around the list', () => {
    renderDetail(first.id);
    const pager = screen.getByRole('navigation', {
      name: 'Project navigation',
    });
    expect(
      within(pager).getByRole('link', { name: /Previous/ })
    ).toHaveAttribute('href', `/projects/${last.id}`);
    expect(within(pager).getByRole('link', { name: /Next/ })).toHaveAttribute(
      'href',
      `/projects/${projects[1].id}`
    );
  });

  it('loads the screenshot eagerly with high priority and reserved dimensions', () => {
    renderDetail('real-evals-gmail');
    const img = screen.getByRole('img', {
      name: 'Screenshot of Gmail Clone - REAL Evals',
    });
    expect(img).toHaveAttribute('fetchpriority', 'high');
    expect(img).toHaveAttribute('width');
    expect(img).toHaveAttribute('height');
    expect(img).not.toHaveAttribute('loading', 'lazy');
  });

  it('shows the featured chip, callout and technologies as a list', () => {
    renderDetail('real-evals-gmail');
    expect(screen.getAllByText('NYT feature').length).toBeGreaterThan(0);
    expect(
      screen.getByRole('link', { name: /See the LinkedIn post/ })
    ).toBeInTheDocument();
    const list = within(
      screen.getByRole('region', { name: 'Technologies' })
    ).getByRole('list');
    expect(list).toHaveProperty('tagName', 'UL');
    expect(list.matches('ul[role="list"]')).toBe(true);
    expect(within(list).getAllByRole('listitem')).toHaveLength(
      first.technologies.length
    );
  });

  it('omits the featured callout for non-featured projects', () => {
    renderDetail('nfl-league-finder');
    expect(
      screen.queryByRole('link', { name: /See the LinkedIn post/ })
    ).not.toBeInTheDocument();
  });

  it('renders translated category and technologies heading in Spanish', async () => {
    await act(() => i18n.changeLanguage('es'));
    renderDetail('real-evals-gmail');
    expect(
      screen.getByRole('heading', { level: 2, name: 'Tecnologías' })
    ).toBeInTheDocument();
    expect(screen.getByText('Freelance')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /volver al portfolio/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Navegación de proyectos' })
    ).toBeInTheDocument();
  });
});
