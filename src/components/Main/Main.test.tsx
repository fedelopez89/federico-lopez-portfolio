import { describe, it, expect, vi, beforeAll } from 'vitest';
import { screen } from '@testing-library/react';
import Main from './Main';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../test/renderWithProviders';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  Trans: ({ i18nKey }: { i18nKey: string }) => <>{i18nKey}</>,
}));

vi.mock('@emailjs/browser', () => ({
  default: { sendForm: vi.fn().mockResolvedValue({ text: 'OK' }) },
}));

const SECTION_IDS = ['aboutme', 'projects', 'experience', 'contact'];

describe('Main', () => {
  beforeAll(() => {
    setupTestEnvironment();
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
