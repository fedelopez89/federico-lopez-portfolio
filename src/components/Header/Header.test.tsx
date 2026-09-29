import { describe, it, expect, beforeAll, vi } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../../i18n/config';
import Header from './Header';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../test/renderWithProviders';

// jsdom has no Web Animations API, which scroll-linked motion values rely on.
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: actual.motionValue(0) }),
  };
});

const openDrawer = async () => {
  const user = userEvent.setup();
  // jsdom ignores the mobile media query, so the hamburger stays display:none
  // and has no computed accessible name; query it by label instead.
  const hamburger = screen.getByLabelText('Toggle mobile menu');
  await user.click(hamburger);
  return { user, hamburger };
};

describe('Header', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  it('renders the skip link as the first focusable element', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    await user.tab();
    const skip = screen.getByRole('link', { name: 'Skip to main content' });
    expect(skip).toHaveFocus();
    expect(skip).toHaveAttribute('href', '#main-content');
  });

  it('exposes translated banner and navigation landmarks', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: 'Main navigation' })
    ).toBeInTheDocument();
  });

  it('links the logo to the top with a translated label', () => {
    renderWithProviders(<Header />);
    const logo = screen.getByRole('link', {
      name: 'Federico López, Back to top',
    });
    expect(logo).toHaveAttribute('href', '#home');
    expect(logo).toHaveTextContent('Federico López');
  });

  it('renders the theme toggle inside the navbar', () => {
    renderWithProviders(<Header />);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(
      within(nav).getByRole('button', { name: /switch to dark mode/i })
    ).toBeInTheDocument();
  });

  it('does not mount the mobile drawer while closed', () => {
    renderWithProviders(<Header />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('navigation', { name: 'Mobile navigation' })
    ).not.toBeInTheDocument();
  });

  it('opens a modal dialog labelled by the name when the hamburger is clicked', async () => {
    renderWithProviders(<Header />);
    const { hamburger } = await openDrawer();
    const dialog = screen.getByRole('dialog', { name: 'Federico López' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    expect(
      within(dialog).getByRole('button', { name: 'Close mobile menu' })
    ).toHaveFocus();
    expect(within(dialog).getAllByRole('link')).toHaveLength(4);
  });

  it('makes the rest of the page inert and locks scroll while open', async () => {
    const { container } = renderWithProviders(<Header />);
    await openDrawer();
    expect(container).toHaveAttribute('inert');
    expect(document.documentElement.style.overflow).toBe('hidden');
  });

  it('closes on Escape, returns focus to the hamburger and unmounts the drawer', async () => {
    renderWithProviders(<Header />);
    const { user, hamburger } = await openDrawer();
    await user.keyboard('{Escape}');
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    expect(hamburger).toHaveFocus();
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(document.documentElement.style.overflow).toBe('');
  });

  it('marks the active section link with aria-current in the drawer', async () => {
    const section = document.createElement('section');
    section.id = 'projects';
    section.getBoundingClientRect = () => ({ top: 0 }) as DOMRect;
    document.body.appendChild(section);

    renderWithProviders(<Header />);
    await openDrawer();
    const dialog = screen.getByRole('dialog');
    expect(
      within(dialog).getByRole('link', { name: 'PROJECTS' })
    ).toHaveAttribute('aria-current', 'location');
    expect(
      within(dialog).getByRole('link', { name: 'CONTACT' })
    ).not.toHaveAttribute('aria-current');

    section.remove();
  });

  it('moves focus to the chosen section heading, not the hamburger, after a link click', async () => {
    const heading = document.createElement('h2');
    heading.id = 'projects-title';
    document.body.appendChild(heading);

    renderWithProviders(<Header />);
    const { user, hamburger } = await openDrawer();
    await user.click(
      within(screen.getByRole('dialog')).getByRole('link', { name: 'PROJECTS' })
    );
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    expect(heading).toHaveFocus();
    expect(hamburger).not.toHaveFocus();

    heading.remove();
  });
});
