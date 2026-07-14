import { render, RenderOptions } from '@testing-library/react';
import { vi } from 'vitest';
import { ThemeProvider } from '../context';
import { MemoryRouter } from 'react-router-dom';

interface Options extends RenderOptions {
  withRouter?: boolean;
  initialRoute?: string;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { withRouter = false, initialRoute = '/', ...options }: Options = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>
      {withRouter ? (
        <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
      ) : (
        children
      )}
    </ThemeProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}

export function setupTestEnvironment(): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  if (typeof window.IntersectionObserver === 'undefined') {
    class MockIntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin: string = '0px';
      readonly thresholds: ReadonlyArray<number> = [0];
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn((): IntersectionObserverEntry[] => []);
    }
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });
  }
}
