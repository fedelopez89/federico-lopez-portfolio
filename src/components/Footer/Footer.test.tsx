import { describe, it, expect, beforeAll } from 'vitest';
import { screen, within } from '@testing-library/react';
import '../../i18n/config';
import Footer from './Footer';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../test/renderWithProviders';

describe('Footer', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  it('shows the copyright with the current year', () => {
    renderWithProviders(<Footer />);
    expect(
      screen.getByText(
        new RegExp(`© ${new Date().getFullYear()} Federico López`)
      )
    ).toBeInTheDocument();
  });

  it('links GitHub and LinkedIn externally with a safe rel', () => {
    renderWithProviders(<Footer />);
    const github = screen.getByRole('link', { name: /github/i });
    const linkedin = screen.getByRole('link', { name: /linkedin/i });
    expect(github).toHaveAttribute('href', 'https://github.com/fedelopez89');
    expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/federicoglopez/'
    );
    for (const link of [github, linkedin]) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toMatch(/noreferrer/);
      expect(link).toHaveAccessibleName(/\(opens in a new tab\)/);
    }
  });

  it('keeps list semantics on the link list', () => {
    renderWithProviders(<Footer />);
    const list = document.querySelector('ul[role="list"]');
    expect(list).not.toBeNull();
    expect(list).toBe(screen.getByRole('list', { name: 'Social links' }));
    expect(within(list as HTMLElement).getAllByRole('link')).toHaveLength(4);
  });

  it('drops the redundant rights-reserved sentence', () => {
    renderWithProviders(<Footer />);
    expect(screen.queryByText(/all rights reserved/i)).not.toBeInTheDocument();
  });

  it('links the resume PDF as a download from any route', () => {
    renderWithProviders(<Footer />);
    const resume = screen.getByRole('link', { name: 'Resume (PDF)' });
    expect(resume).toHaveAttribute('href', '/pdf/Resume_LOPEZ_Federico.pdf');
    expect(resume).toHaveAttribute('download', 'Resume_LOPEZ_Federico.pdf');
  });

  it('links the email with a mailto href and no new tab', () => {
    renderWithProviders(<Footer />);
    const email = screen.getByRole('link', { name: 'Email' });
    expect(email.getAttribute('href')).toMatch(/^mailto:/);
    expect(email).not.toHaveAttribute('target');
  });
});
