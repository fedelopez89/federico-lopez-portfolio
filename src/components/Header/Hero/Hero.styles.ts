import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { alpha } from '../../../styles/mixins';
import { TextLink } from '../../ui';
import { lightTheme } from '../../../styles/theme';

const GRID_SIZE = '72px';
const GLOW_SIZE = '500px';

// Non-color constant needed in calc() outside styled interpolations; reading
// lightTheme is safe here because it is identical in both modes.
const TITLE_SIZE = lightTheme.typography.display.hero;
const HIGHLIGHT_SIZE = 520;
const HIGHLIGHT_HALF = HIGHLIGHT_SIZE / 2;

export const HeroSection = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  isolation: isolate;
  background: ${({ theme }) => theme.colors.heroBackground};
`;

/**
 * Owns the glow CSS variables so their per-frame updates only invalidate the
 * decorative subtree, not the hero content.
 */
export const BackdropScroll = styled(motion.div)`
  --glow-x: 65vw;
  --glow-y: 40svh;

  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    --glow-x: 60vw;
    --glow-y: 34svh;
  }

  /* Purely decorative; forced colors would render it as noise. */
  @media (forced-colors: active) {
    display: none;
  }
`;

export const BackdropFade = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const gridImage = (color: string) => css`
  background-image:
    linear-gradient(to right, ${color} 1px, transparent 1px),
    linear-gradient(to bottom, ${color} 1px, transparent 1px);
  background-size: ${GRID_SIZE} ${GRID_SIZE};
`;

export const GridBase = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  ${({ theme }) => gridImage(theme.colors.gridLine)}
  -webkit-mask-image: radial-gradient(ellipse 85% 75% at 50% 45%, #000 25%, transparent 100%);
  mask-image: radial-gradient(
    ellipse 85% 75% at 50% 45%,
    #000 25%,
    transparent 100%
  );
`;

const sweep = keyframes`
  from {
    transform: translateX(-70vw);
  }
  to {
    transform: translateX(0);
  }
`;

/**
 * Shared transform source for the glow blob and the highlight window. On touch
 * devices the glow sweeps in once (transform only, no delay).
 */
export const GlowSweep = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  @media (hover: none), (pointer: coarse) {
    animation: ${sweep} 0.8s ${({ theme }) => theme.motion.easeCss} both;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

export const Glow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${GLOW_SIZE};
  height: ${GLOW_SIZE};
  margin: calc(${GLOW_SIZE} / -2) 0 0 calc(${GLOW_SIZE} / -2);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.5;
  transform: translate3d(var(--glow-x), var(--glow-y), 0);
  will-change: transform;
  background: radial-gradient(
    circle,
    ${({ theme }) => alpha(theme.colors.primary, 18)} 0%,
    ${({ theme }) => alpha(theme.colors.secondary, 10)} 40%,
    transparent 70%
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 360px;
    height: 360px;
    margin: -180px 0 0 -180px;
  }
`;

/**
 * Fixed-size window with a static radial mask that follows the glow via
 * transform only. The tinted grid inside is snapped to the 72px cell so its
 * lines stay aligned with the base grid.
 */
export const GridWindow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${HIGHLIGHT_SIZE}px;
  height: ${HIGHLIGHT_SIZE}px;
  overflow: hidden;
  pointer-events: none;
  transform: translate3d(
    calc(var(--glow-x) - ${HIGHLIGHT_HALF}px),
    calc(var(--glow-y) - ${HIGHLIGHT_HALF}px),
    0
  );
  will-change: transform;
  -webkit-mask-image: radial-gradient(
    circle closest-side,
    #000 0%,
    transparent 100%
  );
  mask-image: radial-gradient(circle closest-side, #000 0%, transparent 100%);
`;

export const GridWindowInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${HIGHLIGHT_SIZE + 72}px;
  height: ${HIGHLIGHT_SIZE + 72}px;
  transform: translate3d(
    calc(-1 * mod(var(--glow-x) - ${HIGHLIGHT_HALF}px, ${GRID_SIZE})),
    calc(-1 * mod(var(--glow-y) - ${HIGHLIGHT_HALF}px, ${GRID_SIZE})),
    0
  );
  ${({ theme }) => gridImage(alpha(theme.colors.primary, 55))}
`;

export const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 8rem 0 ${({ theme }) => theme.spacing['4xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 7rem 0 ${({ theme }) => theme.spacing['3xl']};
  }
`;

export const HeroStack = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

/**
 * Spacing wrapper. The padding and negative margin give text room for accents,
 * descenders and focus rings without affecting layout. It must not clip: the
 * h1 inside is the LCP element.
 */
export const Mask = styled.div<{ $mt?: string; $mb?: string }>`
  padding: 8px;
  margin: calc(${({ $mt }) => $mt ?? '0px'} - 8px) -8px
    calc(${({ $mb }) => $mb ?? '0px'} - 8px);
  max-width: 100%;
`;

/** Block that fades and slides in. */
export const FadeBlock = styled(motion.div)<{ $mt?: string }>`
  margin-top: ${({ $mt }) => $mt ?? '0px'};
  max-width: 100%;
`;

export const TITLE_MASK_MARGIN = {
  top: `calc(1.5rem - 0.08 * ${TITLE_SIZE})`,
  bottom: `calc(-0.2 * ${TITLE_SIZE})`,
};

const settle = keyframes`
  from {
    transform: translateY(10px);
  }
  to {
    transform: translateY(0);
  }
`;

/** Eyebrow wrapper: settles by transform only, never fades (LCP candidate). */
export const Rise = styled.div`
  animation: ${settle} 0.5s ${({ theme }) => theme.motion.easeCss} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const sheen = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(260%);
  }
`;

/**
 * Hosts the one-time sheen over the name. The band is a pseudo-element moved by
 * transform only, and the h1 stays fully painted underneath (LCP). It clips the
 * band, never the text: the h1 fits entirely inside.
 */
export const TitleWrap = styled.div`
  position: relative;
  overflow: clip;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 40%;
    pointer-events: none;
    background: linear-gradient(
      100deg,
      transparent 0%,
      ${({ theme }) => alpha(theme.colors.primary, 38)} 50%,
      transparent 100%
    );
    transform: translateX(-100%);
    animation: ${sheen} 0.85s ${({ theme }) => theme.motion.easeCss} 0.2s both;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      display: none;
    }
  }
`;

export const Title = styled.h1`
  margin: 0;
  animation: ${settle} 0.5s ${({ theme }) => theme.motion.easeCss} both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  /* Room for accents and descenders */
  padding: 0.08em 0 0.2em;
  font-size: ${({ theme }) => theme.typography.display.hero};
  font-weight: ${({ theme }) => theme.typography.display.weight};
  letter-spacing: ${({ theme }) => theme.typography.tracking.display};
  line-height: 0.95;
  color: ${({ theme }) => theme.colors.text};
  /* A long word must wrap rather than overflow at large default font sizes
     (WCAG 1.4.4). */
  overflow-wrap: anywhere;
`;

export const Tagline = styled.p`
  margin: 0;
  max-width: 36ch;
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.textMuted};
  /* Large text block, so an LCP candidate: transform only, never fades. */
  animation: ${settle} 0.5s ${({ theme }) => theme.motion.easeCss} 0.1s both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};

  @media (max-width: 480px) {
    & > * {
      flex: 1 1 100%;
    }
  }
`;

export const SocialLinks = styled.ul.attrs({ role: 'list' })`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  list-style: none;
  margin: 0;
  padding: 0;
`;

/**
 * Proof points. Stacked below the lg breakpoint so a wrapped row can never
 * start with an orphaned divider; from lg they sit in one row split by
 * hairlines.
 */
export const ProofList = styled.ul.attrs({ role: 'list' })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const ProofItem = styled.li`
  display: flex;
  align-items: center;
  min-height: 2rem;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    & + & {
      margin-left: ${({ theme }) => theme.spacing.lg};
      padding-left: ${({ theme }) => theme.spacing.lg};
      border-left: 1px solid ${({ theme }) => theme.colors.border};
    }
  }
`;

export const ProofLink = styled(TextLink)`
  font-family: inherit;
  font-size: inherit;
  letter-spacing: inherit;
  text-decoration-color: currentColor;
`;
