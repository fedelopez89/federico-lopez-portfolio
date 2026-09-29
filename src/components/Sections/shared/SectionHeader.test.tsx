import { describe, it, expect, beforeAll } from 'vitest';
import { screen } from '@testing-library/react';
import { SectionHeader } from './SectionHeader';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../../test/renderWithProviders';

describe('SectionHeader', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  it('renders the title as an h2 with the given id', () => {
    renderWithProviders(
      <SectionHeader index="01" title="About me" titleId="aboutme-title" />
    );
    const heading = screen.getByRole('heading', { level: 2, name: 'About me' });
    expect(heading).toHaveAttribute('id', 'aboutme-title');
  });

  it('renders the index in the eyebrow, with an optional label', () => {
    const { rerender } = renderWithProviders(
      <SectionHeader index="02" title="Projects" titleId="projects-title" />
    );
    expect(screen.getByText('02')).toBeInTheDocument();

    rerender(
      <SectionHeader
        index="02"
        label="Work"
        title="Projects"
        titleId="projects-title"
      />
    );
    expect(screen.getByText('02 / Work')).toBeInTheDocument();
  });

  it('renders the lead only when provided', () => {
    const { rerender } = renderWithProviders(
      <SectionHeader index="01" title="Projects" titleId="projects-title" />
    );
    expect(screen.queryByText('A selection of work')).not.toBeInTheDocument();

    rerender(
      <SectionHeader
        index="01"
        title="Projects"
        titleId="projects-title"
        lead="A selection of work"
      />
    );
    expect(screen.getByText('A selection of work')).toBeInTheDocument();
  });
});
