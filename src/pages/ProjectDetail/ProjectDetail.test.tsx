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

  it('renders the shared navbar with theme and language toggles', () => {
    renderDetail('real-evals-gmail');
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(
      within(nav).getByRole('button', { name: /switch to dark mode/i })
    ).toBeInTheDocument();
    expect(
      within(nav).getByRole('button', { name: 'Switch to English' })
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
      name: /^Live Demo\s*\(opens in a new tab\)$/,
    });
    expect(demo).toHaveAttribute('href', first.demoUrl);
    expect(demo).toHaveAttribute('target', '_blank');
    expect(demo.getAttribute('rel')).toContain('noreferrer');
    expect(demo).not.toHaveAttribute('aria-label');
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
