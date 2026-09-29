import { describe, it, expect, beforeAll } from 'vitest';
import { screen } from '@testing-library/react';
import '../../i18n/config';
import { ProjectDetailSkeleton } from './ProjectDetailSkeleton';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../test/renderWithProviders';

describe('ProjectDetailSkeleton', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  it('announces loading from a status outside the busy region', () => {
    const { container } = renderWithProviders(<ProjectDetailSkeleton />);
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent('Loading project…');
    expect(status.closest('[aria-busy]')).toBeNull();
    expect(container.querySelector('[aria-busy="true"]')).not.toBeNull();
  });
});
