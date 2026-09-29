import { beforeEach, describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../../test/renderWithProviders';
import { Hairline } from './Hairline';

describe('Hairline', () => {
  beforeEach(() => setupTestEnvironment());

  it('renders the static line as a decorative element', () => {
    renderWithProviders(<Hairline aria-hidden="true" data-testid="rule" />);
    const rule = screen.getByTestId('rule');

    expect(rule).toHaveAttribute('aria-hidden', 'true');
    // Nothing hides the line inline: without scroll-driven animation
    // support it stays fully visible.
    expect(rule.getAttribute('style')).toBeNull();
  });

  it('only animates inside the scroll-driven, motion-safe wrapper', () => {
    const sheet = new ServerStyleSheet();
    renderToString(
      sheet.collectStyles(
        <ThemeProvider theme={lightTheme}>
          <Hairline aria-hidden="true" />
        </ThemeProvider>
      )
    );
    const css = sheet.getStyleTags();
    console.log(css);
    sheet.seal();

    const guard = css.indexOf('@supports (animation-timeline: view())');
    expect(guard).toBeGreaterThan(-1);
    expect(css.indexOf('animation-timeline')).toBeGreaterThan(guard);
    expect(css).toContain('prefers-reduced-motion: no-preference');
    expect(css).toContain('forced-colors: active');
  });
});
