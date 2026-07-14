import { describe, it, expect, beforeAll } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';
import { renderWithProviders, setupTestEnvironment } from '../../test/renderWithProviders';

describe('ThemeToggle', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  it('renders with aria-label to switch to dark mode when theme is light', () => {
    renderWithProviders(<ThemeToggle />);
    expect(
      screen.getByRole('button', { name: /switch to dark mode/i })
    ).toBeInTheDocument();
  });

  it('button is accessible by default (no tabIndex -1)', () => {
    renderWithProviders(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('tabindex', '-1');
  });

  it('clicking the button changes aria-label to switch to light mode', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(button).toHaveAccessibleName(/switch to light mode/i);
  });
});
