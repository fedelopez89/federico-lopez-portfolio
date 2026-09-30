import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { act, screen, within } from '@testing-library/react';
import i18n from '../../../i18n/config';
import Projects from './Projects';
import { PROJECT_GROUPS, projects } from '../../../data/projects';
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
    await act(() => i18n.changeLanguage('en'));
  });

  it('assigns every project to a known group', () => {
    projects.forEach((p) => expect(PROJECT_GROUPS).toContain(p.group));
    const byGroup = (g: string) =>
      projects.filter((p) => p.group === g).map((p) => p.id);
    expect(byGroup('real-evals')).toEqual([
      'real-evals-gmail',
      'real-evals-dashdish',
      'real-evals-uber',
      'real-evals-united',
    ]);
    expect(byGroup('rcx-sports')).toEqual([
      'nfl-league-finder',
      'nba-league-finder',
      'nhl-league-finder',
      'mls-league-finder',
    ]);
    expect(byGroup('independent')).toEqual(['magic-hour', 'factupro']);
  });

  it('renders the three groups in order as h3 headings', () => {
    renderProjects();
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.map((h) => h.textContent)).toEqual([
      'REAL Evals',
      'RCX Sports',
      'Independent',
    ]);
  });

  it('omits the lead for the independent group', () => {
    renderProjects();
    const heading = screen.getByRole('heading', {
      level: 3,
      name: 'Independent',
    });
    expect(heading.parentElement?.querySelectorAll('p')).toHaveLength(0);
  });

  it('shows a factual one-line lead under each group title', () => {
    renderProjects();
    expect(
      screen.getByText(
        'High-fidelity app clones built for AI evaluation, featured in The New York Times.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'League finder apps for RCX Sports across four leagues: NFL, NBA, NHL and MLS.'
      )
    ).toBeInTheDocument();
    expect(screen.queryByText(/end to end/i)).not.toBeInTheDocument();
  });

  it('lists Magic Hour as freelance work in the Independent group, before FactuPro', () => {
    const magic = projects.find((p) => p.id === 'magic-hour');
    expect(magic?.category).toBe('freelance');
    expect(magic?.demoUrl).toBe(
      'https://magichour.ai/products/ai-image-generator'
    );
    expect(magic?.demoRequiresLogin).toBeFalsy();
    expect(magic?.repoUrl).toBeUndefined();
    renderProjects();
    const region = screen.getByRole('list', { name: 'Independent' });
    const titles = within(region)
      .getAllByRole('heading', { level: 4 })
      .map((h) => h.textContent);
    expect(titles).toHaveLength(2);
    expect(titles[0]).toMatch(/Magic Hour/);
    expect(titles[1]).toMatch(/FactuPro/);
  });

  it('keeps the outline section h2 > group h3 > card h4', () => {
    renderProjects();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(
      projects.length
    );
  });

  it('puts each project in its own group grid, listed as a list', () => {
    renderProjects();
    PROJECT_GROUPS.forEach((group) => {
      const title = i18n.t(`projects.groups.${group}.title`);
      const region = screen.getByRole('list', { name: title });
      const expected = projects.filter((p) => p.group === group);
      expect(within(region).getAllByRole('article')).toHaveLength(
        expected.length
      );
      expected.forEach((p) =>
        expect(
          within(region)
            .getAllByRole('link')
            .some((a) => a.getAttribute('href') === `/projects/${p.id}`)
        ).toBe(true)
      );
    });
    expect(document.querySelectorAll('ul[role="list"]')).toHaveLength(
      PROJECT_GROUPS.length
    );
  });

  it('no longer offers technology filters or a result count', () => {
    renderProjects();
    expect(screen.queryByRole('group')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('translates group titles and leads to Spanish', async () => {
    await act(() => i18n.changeLanguage('es'));
    renderProjects();
    expect(
      screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    ).toEqual(['REAL Evals', 'RCX Sports', 'Independientes']);
    expect(screen.queryByText(/punta a punta/i)).not.toBeInTheDocument();
  });

  it('does not repeat the NYT sentence in project descriptions', () => {
    projects.forEach((p) =>
      expect(p.description).not.toMatch(/New York Times/)
    );
    ['en', 'es'].forEach((lng) =>
      projects.forEach((p) => {
        const key = `projects.${p.id.replace(/-/g, '')}.description`;
        expect(i18n.t(key, { lng })).not.toMatch(/New York Times/);
      })
    );
  });

  it('lists each technology once per project', () => {
    projects.forEach((p) =>
      expect(new Set(p.technologies).size).toBe(p.technologies.length)
    );
  });

  it('leads the REAL Evals group with one featured card and regular cards below', () => {
    renderProjects();
    const region = screen.getByRole('list', { name: 'REAL Evals' });
    const cta = within(region).getAllByText('View project');
    expect(cta).toHaveLength(1);
    expect(document.querySelectorAll('ul[role="list"] > li')).toHaveLength(
      projects.length
    );

    const items = within(region).getAllByRole('listitem', { hidden: false });
    const first = items.find((el) => el.tagName === 'LI') as HTMLElement;
    const link = within(first).getByRole('link');
    expect(link).toHaveAttribute('href', '/projects/real-evals-gmail');
    expect(within(first).getAllByRole('link')).toHaveLength(1);
    expect(cta[0].closest('a')).toBe(link);
    expect(within(first).getByRole('heading', { level: 4 })).toHaveTextContent(
      'Gmail Clone - REAL Evals'
    );

    // The other groups have no highlighted project.
    expect(screen.getAllByText('View project')).toHaveLength(1);
  });

  it('translates the featured call to action to Spanish', async () => {
    await act(() => i18n.changeLanguage('es'));
    renderProjects();
    expect(screen.getAllByText('Ver el proyecto')).toHaveLength(1);
  });

  it('marks at most one project per group as highlighted', () => {
    PROJECT_GROUPS.forEach((group) =>
      expect(
        projects.filter((p) => p.group === group && p.highlight).length
      ).toBeLessThanOrEqual(1)
    );
  });
});
