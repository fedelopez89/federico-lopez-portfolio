import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18n from '../../../i18n/config';
import Projects from './Projects';
import { projects } from '../../../data/projects';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../../test/renderWithProviders';

const renderProjects = () =>
  renderWithProviders(<Projects />, { withRouter: true });

describe('Projects', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  const usage = () => {
    const counts = new Map<string, number>();
    projects.forEach((p) =>
      new Set(p.technologies).forEach((t) =>
        counts.set(t, (counts.get(t) ?? 0) + 1)
      )
    );
    return counts;
  };

  it('renders the filters as buttons inside a labelled group', () => {
    renderProjects();
    const group = screen.getByRole('group', {
      name: 'Filter projects by technology',
    });
    const buttons = within(group).getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(1);
    buttons.forEach((button) => expect(button).toHaveAttribute('aria-pressed'));
  });

  it('shows a translated "All" filter pressed by default', () => {
    renderProjects();
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'React' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('uses the visible text as the accessible name of every filter', () => {
    renderProjects();
    const group = screen.getByRole('group', {
      name: 'Filter projects by technology',
    });
    within(group)
      .getAllByRole('button')
      .forEach((button) => {
        expect(button).toHaveAccessibleName(button.textContent ?? '');
        expect(button).not.toHaveAttribute('aria-label');
      });
  });

  it('announces the total count in a polite live region', () => {
    renderProjects();
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent(`${projects.length} projects`);
  });

  it('filters projects by technology and updates the live count', async () => {
    const user = userEvent.setup();
    renderProjects();
    const tech = 'Chakra UI'; // used by several projects, so it is a filter
    const expected = projects.filter((p) => p.technologies.includes(tech));
    expect(expected.length).toBeGreaterThan(0);
    expect(expected.length).toBeLessThan(projects.length);

    await user.click(screen.getByRole('button', { name: tech }));

    expect(screen.getByRole('button', { name: tech })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
    expect(screen.getByRole('status')).toHaveTextContent(
      expected.length === 1 ? '1 project' : `${expected.length} projects`
    );
    // Non-matching cards fade out (exit animation) and are then removed.
    await waitFor(() =>
      expect(screen.getAllByRole('article')).toHaveLength(expected.length)
    );
    const names = screen
      .getAllByRole('article')
      .map((card) => card.textContent ?? '');
    expected.forEach((p) => {
      expect(names.some((text) => text.includes(p.title))).toBe(true);
    });
  });

  it('derives filters from data and omits technologies used by a single project', () => {
    renderProjects();
    const counts = usage();
    const single = [...counts].filter(([, n]) => n === 1).map(([t]) => t);
    const shared = [...counts].filter(([, n]) => n >= 2).map(([t]) => t);
    expect(single.length).toBeGreaterThan(0);
    single.forEach((t) =>
      expect(screen.queryByRole('button', { name: t })).not.toBeInTheDocument()
    );
    const group = screen.getByRole('group', {
      name: 'Filter projects by technology',
    });
    const labels = within(group)
      .getAllByRole('button')
      .map((b) => b.textContent);
    expect(labels).toEqual(['All', ...labels.slice(1)]);
    expect([...labels.slice(1)].sort()).toEqual([...shared].sort());
    // Most used first.
    const used = labels.slice(1).map((t) => counts.get(t as string) as number);
    expect(used).toEqual([...used].sort((a, b) => b - a));
  });

  it('resets to all projects when clicking "All"', async () => {
    const user = userEvent.setup();
    renderProjects();
    await user.click(screen.getByRole('button', { name: 'Chakra UI' }));
    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('status')).toHaveTextContent(
      `${projects.length} projects`
    );
    await waitFor(() =>
      expect(screen.getAllByRole('article')).toHaveLength(projects.length)
    );
  });

  it('announces the count in Spanish with singular and plural forms', async () => {
    await i18n.changeLanguage('es');
    const user = userEvent.setup();
    renderProjects();
    expect(screen.getByRole('status')).toHaveTextContent(
      `${projects.length} proyectos`
    );
    expect(screen.getByRole('button', { name: 'Todos' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    const counts = usage();
    const shared = [...counts].filter(([, n]) => n >= 2).map(([t]) => t);
    // Single-project filters are hidden, so verify the singular plural key directly.
    expect(i18n.t('projects.resultCount', { count: 1 })).toBe('1 proyecto');
    await user.click(screen.getByRole('button', { name: shared[0] }));
    expect(screen.getByRole('status')).toHaveTextContent(
      `${counts.get(shared[0])} proyectos`
    );
  });
});
