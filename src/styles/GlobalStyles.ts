import { createGlobalStyle } from 'styled-components';
import { focusRing } from './mixins';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-latin-wght-normal.woff2') format('woff2');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  /* Metric-adjusted fallback to reduce layout shift while Inter loads */
  @font-face {
    font-family: 'Inter Fallback';
    src: local('Arial');
    size-adjust: 107%;
    ascent-override: 90%;
    descent-override: 22.43%;
    line-gap-override: 0%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    /* Keeps anchor jumps and focused elements clear of the fixed navbar and
       the scroll-to-top button (WCAG 2.4.11). One source for every target.
       The 2rem gap leaves room for a section eyebrow under the navbar. */
    scroll-padding-top: calc(${({ theme }) => theme.layout.navHeight} + 2rem);
    scroll-padding-bottom: 4.5rem;
    scrollbar-gutter: stable;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    transition: background-color ${({ theme }) => theme.transitions.base},
                color ${({ theme }) => theme.transitions.base};
  }

  /* Card to project page morph (see utils/viewTransition). Shared elements are
     named only while a transition runs; the root just cross-fades. */
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.2s;
    animation-timing-function: ${({ theme }) => theme.motion.easeCss};
  }

  ::view-transition-group(*.project-shared) {
    animation-duration: 0.4s;
    animation-timing-function: ${({ theme }) => theme.motion.easeCss};
  }

  /* Screenshots only: fill the morphing box instead of keeping each snapshot's
     own aspect ratio, cropped from the top-left like the images themselves.
     Titles keep the default group animation (no crop). */
  ::view-transition-old(*.project-shot),
  ::view-transition-new(*.project-shot) {
    height: 100%;
    object-fit: cover;
    object-position: top left;
  }

  @media (prefers-reduced-motion: reduce) {
    ::view-transition-group(*),
    ::view-transition-old(*),
    ::view-transition-new(*) {
      animation: none;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.secondary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.text};
  }

  h1, h2, h3 {
    font-weight: 650;
    letter-spacing: ${({ theme }) => theme.typography.tracking.heading};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  h5 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  h6 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  /* Zero specificity: component rules (skip link, buttons, summary links)
     always win over these defaults, including on hover. */
  :where(a) {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};
  }

  :where(a:hover) {
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  button {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    cursor: pointer;
    border: none;
    background: none;
    transition: color, background-color, opacity ${({ theme }) => theme.transitions.fast};

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }

  input, textarea, select {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Scrollbar customization */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.base};

    &:hover {
      background: ${({ theme }) => theme.colors.textTertiary};
    }
  }

  /* Selection */
  ::selection {
    /* Body text on a mid primary tint: at least 8.8:1 in both themes. */
    background-color: ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.primary} 30%, ${theme.colors.background})`};
    color: ${({ theme }) => theme.colors.text};
  }

  .skip-link {
    position: absolute;
    top: -9999px;
    left: -9999px;
    padding: 0.75rem 1.5rem;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    font-weight: 600;
    border-radius: 0 0 8px 8px;
    z-index: 9999;
    text-decoration: none;
    ${focusRing}
  }

  .skip-link:focus {
    top: 1rem;
    left: 1rem;
  }

  /* Short or heavily zoomed viewports: the navbar scrolls away instead of
     covering the page (see SiteNav), so nothing needs to be cleared. */
  @media (max-height: 500px) {
    html {
      scroll-padding-top: 0.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
