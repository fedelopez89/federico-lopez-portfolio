import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../../context';
import ProjectDetail from './ProjectDetail';
import { setupTestEnvironment } from '../../test/renderWithProviders';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { defaultValue?: string }) => opts?.defaultValue ?? key,
  }),
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
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

describe('ProjectDetail', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  beforeEach(() => {
    mockNavigate.mockClear();
    document.title = 'Portfolio';
  });

  it('renders the project title for a known project id', () => {
    renderDetail('real-evals-gmail');
    expect(screen.getByText('Gmail Clone - REAL Evals')).toBeInTheDocument();
  });

  it('renders the not-found heading for an unknown project id', () => {
    renderDetail('non-existent-project');
    expect(screen.getByText('Project not found')).toBeInTheDocument();
  });

  it('calls navigate(-1) when back button is clicked and fromPortfolio is true', async () => {
    const user = userEvent.setup();
    renderDetail('real-evals-gmail', { state: { fromPortfolio: true } });
    await user.click(
      screen.getByRole('button', { name: /back to portfolio/i })
    );
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('calls navigate("/") when back button is clicked and fromPortfolio is false', async () => {
    const user = userEvent.setup();
    renderDetail('real-evals-gmail');
    await user.click(
      screen.getByRole('button', { name: /back to portfolio/i })
    );
    expect(mockNavigate).toHaveBeenCalledWith('/');
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
});
