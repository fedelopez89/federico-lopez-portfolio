import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { rememberProject } from '@/hooks';
import { projects } from '../../data/projects';
import Main from './Main';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../test/renderWithProviders';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
  Trans: ({ i18nKey }: { i18nKey: string }) => <>{i18nKey}</>,
}));

vi.mock('@emailjs/browser', () => ({
  default: { sendForm: vi.fn().mockResolvedValue({ text: 'OK' }) },
}));

const RETURN_KEY = 'portfolio:return-project';
const SECTION_IDS = ['aboutme', 'projects', 'experience', 'contact'];

describe('Main', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    sessionStorage.removeItem(RETURN_KEY);
    window.location.hash = '';
  });

  it('returns focus to the project card the user came back from', async () => {
    const target = projects[1];
    rememberProject(target.id);
    renderWithProviders(<Main />, { withRouter: true });
    const link = document.querySelector<HTMLAnchorElement>(
      `a[href="/projects/${target.id}"]`
    );
    expect(link).not.toBeNull();
    await waitFor(() => expect(link).toHaveFocus());
    expect(sessionStorage.getItem(RETURN_KEY)).toBeNull();
  });

  it('falls back to the main landmark when the card no longer exists', async () => {
    rememberProject('gone');
    renderWithProviders(<Main />, { withRouter: true });
    await waitFor(() =>
      expect(document.getElementById('main-content')).toHaveFocus()
    );
  });

  it('leaves focus alone on a fresh visit', async () => {
    renderWithProviders(<Main />, { withRouter: true });
    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(document.body).toHaveFocus();
  });

  it('restores the card, not the heading, when the spy left #projects in the URL', async () => {
    const target = projects[1];
    window.location.hash = '#projects';
    rememberProject(target.id);
    renderWithProviders(<Main />, { withRouter: true });
    const link = document.querySelector(`a[href="/projects/${target.id}"]`);
    await waitFor(() => expect(link).toHaveFocus());
    // Let useHashScroll's frame run too: it must not have stolen focus.
    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(link).toHaveFocus();
    expect(document.getElementById('projects-title')).not.toHaveFocus();
  });

  it('defers to the hash scroll for an unrelated section and forgets the card', async () => {
    window.location.hash = '#experience';
    rememberProject(projects[1].id);
    renderWithProviders(<Main />, { withRouter: true });
    await waitFor(() =>
      expect(document.getElementById('experience-title')).toHaveFocus()
    );
    const link = document.querySelector(
      `a[href="/projects/${projects[1].id}"]`
    );
    expect(link).not.toHaveFocus();
    expect(sessionStorage.getItem(RETURN_KEY)).toBeNull();
  });

  it('ignores a stale marker from an earlier visit', async () => {
    sessionStorage.setItem(
      RETURN_KEY,
      JSON.stringify({ id: projects[1].id, ts: Date.now() - 60_000 })
    );
    renderWithProviders(<Main />, { withRouter: true });
    await new Promise((resolve) => requestAnimationFrame(resolve));
    expect(document.body).toHaveFocus();
    expect(sessionStorage.getItem(RETURN_KEY)).toBeNull();
  });

  it('renders each section id exactly once', () => {
    const { container } = renderWithProviders(<Main />, { withRouter: true });
    for (const id of SECTION_IDS) {
      expect(container.querySelectorAll(`[id="${id}"]`)).toHaveLength(1);
    }
  });

  it('labels every section landmark with its h2', () => {
    renderWithProviders(<Main />, { withRouter: true });
    const regions = screen.getAllByRole('region');
    expect(regions).toHaveLength(SECTION_IDS.length);

    const expectedNames = [
      'sections.aboutme',
      'sections.projects',
      'sections.experience',
      'contact.title',
    ];
    regions.forEach((region, i) => {
      expect(region).toHaveAttribute('id', SECTION_IDS[i]);
      expect(region).toHaveAccessibleName(expectedNames[i]);
    });
  });
});
