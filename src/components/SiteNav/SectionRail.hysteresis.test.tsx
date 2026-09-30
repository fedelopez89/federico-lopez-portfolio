import { describe, it, expect, beforeAll, vi } from 'vitest';
import { act, screen } from '@testing-library/react';
import '../../i18n/config';
import SectionRail from './SectionRail';
import { renderWithProviders } from '../../test/renderWithProviders';

const items = [
  { id: 'aboutme', href: '#aboutme', labelKey: 'header.about' },
  { id: 'projects', href: '#projects', labelKey: 'header.projects' },
];

// A viewport whose width can change; queries are evaluated live against it.
let width = 1500;
const listeners = new Set<() => void>();

const setWidth = (next: number) => {
  width = next;
  act(() => listeners.forEach((notify) => notify()));
};

describe('SectionRail breakpoint hysteresis', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        get matches() {
          const min = /min-width: (\d+)px/.exec(query);
          const max = /max-width: (\d+)px/.exec(query);
          if (min) return width >= Number(min[1]);
          if (max) return width <= Number(max[1]);
          return false;
        },
        media: query,
        addEventListener: (_: string, cb: () => void) => listeners.add(cb),
        removeEventListener: (_: string, cb: () => void) =>
          listeners.delete(cb),
      })),
    });
  });

  it('mounts at 1408, survives the dead band and unmounts at 1367', () => {
    renderWithProviders(<SectionRail items={items} activeSection="projects" />);
    expect(screen.getByTestId('section-rail')).toBeInTheDocument();

    setWidth(1380);
    expect(screen.getByTestId('section-rail')).toBeInTheDocument();

    setWidth(1367);
    expect(screen.queryByTestId('section-rail')).not.toBeInTheDocument();

    setWidth(1400);
    expect(screen.queryByTestId('section-rail')).not.toBeInTheDocument();

    setWidth(1408);
    expect(screen.getByTestId('section-rail')).toBeInTheDocument();
  });
});
