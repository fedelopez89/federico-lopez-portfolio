import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageToggle from './LanguageToggle';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../test/renderWithProviders';

let mockLanguage = 'en';
const mockChangeLanguage = vi.fn();

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => (key === 'language.label' ? 'Language' : key),
    i18n: {
      get language() {
        return mockLanguage;
      },
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

describe('LanguageToggle', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  beforeEach(() => {
    mockLanguage = 'en';
    mockChangeLanguage.mockClear();
    document.documentElement.lang = '';
  });

  it('groups the buttons under a translated label', () => {
    renderWithProviders(<LanguageToggle />);
    expect(screen.getByRole('group', { name: 'Language' })).toContainElement(
      screen.getByRole('button', { name: /^english$/i })
    );
  });

  it('keeps the visible EN/ES text inside each accessible name', () => {
    renderWithProviders(<LanguageToggle />);
    expect(
      screen.getByRole('button', { name: /^english$/i })
    ).toHaveTextContent('EN');
    expect(
      screen.getByRole('button', { name: /^español$/i })
    ).toHaveTextContent('ES');
  });

  it('renders both EN and ES buttons', () => {
    renderWithProviders(<LanguageToggle />);
    expect(
      screen.getByRole('button', { name: /^english$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /^español$/i })
    ).toBeInTheDocument();
  });

  it('EN button has aria-pressed true when current language is en', () => {
    renderWithProviders(<LanguageToggle />);
    expect(screen.getByRole('button', { name: /^english$/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('ES button has aria-pressed false when current language is en', () => {
    renderWithProviders(<LanguageToggle />);
    expect(screen.getByRole('button', { name: /^español$/i })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('ES button has aria-pressed true when current language is es', () => {
    mockLanguage = 'es';
    renderWithProviders(<LanguageToggle />);
    expect(screen.getByRole('button', { name: /^español$/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('clicking ES sets document.documentElement.lang to es', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguageToggle />);
    await user.click(screen.getByRole('button', { name: /^español$/i }));
    expect(document.documentElement.lang).toBe('es');
  });

  it('clicking ES calls i18n.changeLanguage with es', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguageToggle />);
    await user.click(screen.getByRole('button', { name: /^español$/i }));
    expect(mockChangeLanguage).toHaveBeenCalledWith('es');
  });

  it('does not call changeLanguage when clicking the already active language button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguageToggle />);
    await user.click(screen.getByRole('button', { name: /^english$/i }));
    expect(mockChangeLanguage).not.toHaveBeenCalled();
  });

  it('treats a regional variant like en-US as English', () => {
    mockLanguage = 'en-US';
    renderWithProviders(<LanguageToggle />);
    expect(screen.getByRole('button', { name: /^english$/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('marks each button with its own language', () => {
    renderWithProviders(<LanguageToggle />);
    expect(screen.getByRole('button', { name: /^english$/i })).toHaveAttribute(
      'lang',
      'en'
    );
    expect(screen.getByRole('button', { name: /^español$/i })).toHaveAttribute(
      'lang',
      'es'
    );
  });
});
