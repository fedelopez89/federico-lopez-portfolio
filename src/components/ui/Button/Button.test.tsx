import { describe, it, expect, beforeAll } from 'vitest';
import { screen } from '@testing-library/react';
import { Button } from './Button';
import { renderWithProviders, setupTestEnvironment } from '../../../test/renderWithProviders';

describe('Button', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  it('renders an anchor when href is given', () => {
    renderWithProviders(<Button href="#projects">Work</Button>);
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#projects');
  });

  it('renders a type="button" button otherwise', () => {
    renderWithProviders(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'button');
  });

  it('adds target, rel and a hidden label when external', () => {
    renderWithProviders(
      <Button href="https://example.com" external externalLabel="(opens in a new tab)">
        Docs
      </Button>
    );
    const link = screen.getByRole('link', { name: /docs/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
    expect(link.textContent?.replace(/\u00A0/g, ' ')).toBe('Docs (opens in a new tab)');
    // dom-accessibility-api trims the nbsp, so only assert the label is part of the name.
    expect(link).toHaveAccessibleName(/docs\s*\(opens in a new tab\)/i);
  });

  it('merges caller rel with noreferrer', () => {
    renderWithProviders(
      <Button href="https://example.com" rel="author" external externalLabel="(new tab)">
        Docs
      </Button>
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'author noreferrer');
  });

  it('respects the disabled attribute', () => {
    renderWithProviders(<Button disabled>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it.each(['primary', 'secondary', 'ghost'] as const)(
    'keeps the accessible name for the %s variant',
    (variant) => {
      renderWithProviders(
        <Button variant={variant} icon="→">
          Go
        </Button>
      );
      expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
    }
  );
});
