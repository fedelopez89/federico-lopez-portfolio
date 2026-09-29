import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import i18n from '../../i18n/config';
import { ThemeProvider } from '../../context';
import NotFound from './NotFound';
import { setupTestEnvironment } from '../../test/renderWithProviders';

function Where() {
  return <p data-testid="where">{useLocation().pathname}</p>;
}

function renderNotFound() {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={['/nope/at/all']}>
        <Routes>
          <Route path="/" element={<Where />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

describe('NotFound', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  beforeEach(async () => {
    document.title = 'Portfolio';
    await act(() => i18n.changeLanguage('en'));
  });

  afterEach(async () => {
    await act(() => i18n.changeLanguage('en'));
  });

  it('renders one h1, the main landmark, nav and footer', () => {
    renderNotFound();
    expect(
      screen.getAllByRole('heading', { level: 1, name: 'Page not found' })
    ).toHaveLength(1);
    expect(document.getElementById('main-content')?.tagName).toBe('MAIN');
    expect(
      screen.getByRole('navigation', { name: 'Main navigation' })
    ).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('sets a translated title', async () => {
    const { unmount } = renderNotFound();
    expect(document.title).toBe('Page not found | Federico López');
    unmount();
    await act(() => i18n.changeLanguage('es'));
    renderNotFound();
    expect(document.title).toBe('Página no encontrada | Federico López');
  });

  it('marks the page noindex and restores robots on unmount', () => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'index, follow';
    document.head.appendChild(meta);
    const { unmount } = renderNotFound();
    expect(meta.content).toBe('noindex');
    unmount();
    expect(meta.content).toBe('index, follow');
    meta.remove();
  });

  it('goes back home without a full reload', async () => {
    const user = userEvent.setup();
    renderNotFound();
    const cta = screen.getByRole('link', { name: 'Back to home' });
    expect(cta).toHaveAttribute('href', '/');
    await user.click(cta);
    expect(screen.getByTestId('where')).toHaveTextContent('/');
  });
});
