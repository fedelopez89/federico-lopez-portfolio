import { describe, it, expect, beforeAll, vi } from 'vitest';
import { screen } from '@testing-library/react';
import '../../../i18n/config';
import Hero from './Hero';
import { renderWithProviders, setupTestEnvironment } from '../../../test/renderWithProviders';

// jsdom has no Web Animations API, which scroll-linked motion values rely on.
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: actual.motionValue(0) }),
  };
});

describe('Hero', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  it('renders exactly one h1 with the name', () => {
    renderWithProviders(<Hero />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Federico López');
  });

  it('renders the positioning tagline', () => {
    renderWithProviders(<Hero />);
    expect(
      screen.getByText(/I build fast, accessible interfaces/i)
    ).toBeInTheDocument();
  });

  it('links the CTAs to the projects and contact sections', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByRole('link', { name: /view work/i })).toHaveAttribute(
      'href',
      '#projects'
    );
    expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute(
      'href',
      '#contact'
    );
  });

  it('renders social links with accessible names and safe rel', () => {
    renderWithProviders(<Hero />);
    const github = screen.getByRole('link', { name: /github/i });
    const linkedin = screen.getByRole('link', { name: /linkedin/i });
    expect(github).toHaveAttribute('href', 'https://github.com/fedelopez89');
    expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/federicoglopez/'
    );
    [github, linkedin].forEach((link) => {
      expect(link).toHaveAttribute('rel', 'noreferrer');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('hides the decorative backdrop from assistive technology', () => {
    renderWithProviders(<Hero />);
    expect(screen.getByTestId('hero-backdrop')).toHaveAttribute('aria-hidden', 'true');
  });
});
