import { describe, it, expect, beforeAll, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import '../../../i18n/config';
import Hero from './Hero';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../../test/renderWithProviders';

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

  it('offers the resume PDF as a secondary download action', () => {
    renderWithProviders(<Hero />);
    const resume = screen.getByRole('link', { name: /resume \(pdf\)/i });
    expect(resume).toHaveAttribute('href', '/pdf/Resume_LOPEZ_Federico.pdf');
    expect(resume).toHaveAttribute('download', 'Resume_LOPEZ_Federico.pdf');
  });

  it('keeps "Get in touch" in the quiet link row, not the button row', () => {
    renderWithProviders(<Hero />);
    const contact = screen.getByRole('link', { name: /get in touch/i });
    expect(contact.closest('ul')).toBe(
      screen.getByRole('link', { name: /github/i }).closest('ul')
    );
  });

  it('renders a proof strip from existing facts', () => {
    renderWithProviders(<Hero />);
    const list = screen.getByRole('list', { name: 'Highlights' });
    const items = within(list).getAllByRole('listitem');
    expect(
      items.map((li) => li.textContent?.replace(/\s+/g, ' ').trim())
    ).toEqual([
      '16+ years in IT',
      '7+ years in React / Next.js',
      'Featured in The New York Times (opens in a new tab)',
    ]);
    expect(list.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      '16+ years in IT7+ years in React / Next.jsFeatured in The New York Times (opens in a new tab)'
    );
    const nyt = within(list).getByRole('link', {
      name: /featured in the new york times/i,
    });
    expect(nyt).toHaveAttribute('target', '_blank');
    expect(nyt.getAttribute('href')).toMatch(/linkedin\.com\/posts\//);
  });

  it('renders social links with accessible names and safe rel', () => {
    renderWithProviders(<Hero />);
    const github = screen.getByRole('link', { name: /^github/i });
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
    expect(screen.getByTestId('hero-backdrop')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });
});
