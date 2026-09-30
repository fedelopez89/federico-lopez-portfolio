import { describe, it, expect, beforeAll, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import '../../../i18n/config';
import Projects from './Projects';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../../test/renderWithProviders';

// Highlight the LAST real-evals project instead of the first.
vi.mock('../../../data/projects', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../../data/projects')>();
  return {
    ...actual,
    projects: actual.projects.map((p) => ({
      ...p,
      highlight: p.id === 'real-evals-united',
    })),
  };
});

describe('Projects ordering', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  it('renders a highlighted item that is not first in the data first and wide', () => {
    renderWithProviders(<Projects />, { withRouter: true });
    const region = screen.getByRole('list', { name: 'REAL Evals' });
    const links = within(region).getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/projects/real-evals-united');
    expect(links[1]).toHaveAttribute('href', '/projects/real-evals-gmail');
    const wide = within(region).getAllByText('View project');
    expect(wide).toHaveLength(1);
    expect(wide[0].closest('a')).toBe(links[0]);
  });
});
