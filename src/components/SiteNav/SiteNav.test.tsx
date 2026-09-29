import { describe, it, expect, beforeAll } from 'vitest';
import { screen, within } from '@testing-library/react';
import '../../i18n/config';
import SiteNav from './SiteNav';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../test/renderWithProviders';

describe('SiteNav', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  it('renders plain fragment links on the home variant', () => {
    renderWithProviders(<SiteNav />);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(within(nav).getByRole('link', { name: 'CONTACT' })).toHaveAttribute(
      'href',
      '#contact'
    );
  });

  it('routes to the home sections on the page variant', () => {
    renderWithProviders(<SiteNav variant="page" />, { withRouter: true });
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(within(nav).getByRole('link', { name: 'CONTACT' })).toHaveAttribute(
      'href',
      '/#contact'
    );
    expect(
      within(nav).queryByRole('link', { current: 'location' })
    ).not.toBeInTheDocument();
  });
});
