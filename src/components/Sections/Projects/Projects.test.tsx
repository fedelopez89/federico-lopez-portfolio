import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { act, screen, within } from '@testing-library/react';
import i18n from '../../../i18n/config';
import Projects from './Projects';
import {
  COMBINED_GROUPS,
  PROJECT_GROUPS,
  projects,
} from '../../../data/projects';
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
      screen.getByText('High-fidelity app clones built for AI evaluation.')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Youth league finders for NFL FLAG, Jr. NBA/WNBA, NHL Street and MLS GO.'
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
    // The RCX league finders share one combined card.
    const combined = projects.filter((p) =>
      COMBINED_GROUPS.includes(p.group)
    ).length;
    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(
      projects.length - combined + COMBINED_GROUPS.length
    );
  });

  it('puts each project in its own group grid, listed as a list', () => {
    renderProjects();
    PROJECT_GROUPS.forEach((group) => {
      const title = i18n.t(`projects.groups.${group}.title`);
      const region = screen.getByRole('list', { name: title });
      const expected = projects.filter((p) => p.group === group);
      expect(within(region).getAllByRole('article')).toHaveLength(
        COMBINED_GROUPS.includes(group) ? 1 : expected.length
      );
      expected.forEach((p) =>
        expect(
          within(region)
            .getAllByRole('link')
            .some((a) => a.getAttribute('href') === `/projects/${p.id}`)
        ).toBe(true)
      );
    });
    // The group grids plus the combined card's own link list.
    expect(document.querySelectorAll('ul[role="list"]')).toHaveLength(
      PROJECT_GROUPS.length + COMBINED_GROUPS.length
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

  it('keeps the NYT claim out of the section subtitle and group leads', () => {
    ['en', 'es'].forEach((lng) => {
      expect(i18n.t('projects.subtitle', { lng })).not.toMatch(
        /New York Times/
      );
      expect(i18n.t('projects.groups.real-evals.lead', { lng })).not.toMatch(
        /New York Times/
      );
    });
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
    // One grid cell per card; the combined card adds its own link list.
    expect(document.querySelectorAll('ul[role="list"] > li')).toHaveLength(
      projects.length - 3 + 4
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

  it('renders the RCX league finders as one combined card with a link to each', () => {
    renderProjects();
    const region = screen.getByRole('list', { name: 'RCX Sports' });
    const card = within(region).getByRole('article', {
      name: 'RCX Sports League Finders',
    });
    expect(
      within(card).getByRole('heading', {
        level: 4,
        name: 'RCX Sports League Finders',
      })
    ).toBeInTheDocument();
    const links = within(
      within(card).getByRole('list', { name: 'Open a league finder' })
    ).getAllByRole('link');
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      '/projects/nfl-league-finder',
      '/projects/nba-league-finder',
      '/projects/nhl-league-finder',
      '/projects/mls-league-finder',
    ]);
    expect(links[0]).toHaveAccessibleName('NFL FLAG league finder');
    expect(within(card).getAllByRole('img')).toHaveLength(1);
  });

  it('gives the combined card the hover treatment without making it a link', () => {
    renderProjects();
    const card = screen.getByRole('article', {
      name: 'RCX Sports League Finders',
    });
    // Opts into the spotlight and hover styles, but is not itself a link.
    expect(card).toHaveAttribute('data-spot-card');
    expect(card).toHaveAttribute('data-card-hover');
    expect(card.closest('a')).toBeNull();
    // Decorative spotlight, hidden from assistive tech.
    const spotlight = card.querySelector('[aria-hidden="true"]:has(div)');
    expect(spotlight).not.toBeNull();
    expect(within(card).getAllByRole('link')).toHaveLength(4);
  });

  it('translates the combined card to Spanish', async () => {
    await act(() => i18n.changeLanguage('es'));
    renderProjects();
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'Buscadores de Ligas de RCX Sports',
      })
    ).toBeInTheDocument();
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
