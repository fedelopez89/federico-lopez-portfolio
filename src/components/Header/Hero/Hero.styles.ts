import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const GRID_SIZE = '72px';
const GLOW_SIZE = '500px';
const MONO_STACK = "ui-monospace, SFMono-Regular, Menlo, monospace";

const TITLE_SIZE = 'clamp(3rem, 9vw, 8rem)';
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
  mask-image: radial-gradient(ellipse 85% 75% at 50% 45%, #000 25%, transparent 100%);
`;

const sweep = keyframes`
  from {
    transform: translateX(-70vw);
  }
  to {
    transform: translateX(0);
  }
`;

/** Shared transform source for the glow blob and the highlight window. */
export const GlowSweep = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  @media (hover: none), (pointer: coarse) {
    animation: ${sweep} 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both;
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
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 18%, transparent) 0%,
    color-mix(in srgb, ${({ theme }) => theme.colors.secondary} 10%, transparent) 40%,
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
  -webkit-mask-image: radial-gradient(circle closest-side, #000 0%, transparent 100%);
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
  ${({ theme }) =>
    gridImage(`color-mix(in srgb, ${theme.colors.primary} 55%, transparent)`)}
`;

export const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 8rem ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['4xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 7rem ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing['3xl']};
  }
`;

export const HeroStack = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

/**
 * Clips its child so it can rise into view from behind an edge. The padding
 * and negative margin keep focus rings from being clipped without affecting
 * layout.
 */
export const Mask = styled.div<{ $mt?: string; $mb?: string }>`
  overflow: hidden;
  padding: 8px;
  margin: calc(${({ $mt }) => $mt ?? '0px'} - 8px) -8px
    calc(${({ $mb }) => $mb ?? '0px'} - 8px);
  max-width: 100%;
`;

export const Rise = styled(motion.div)``;

/** Un-clipped block that fades and slides in (used where shadows must not be cut). */
export const FadeBlock = styled(motion.div)<{ $mt?: string }>`
  margin-top: ${({ $mt }) => $mt ?? '0px'};
  max-width: 100%;
`;

export const Eyebrow = styled.p`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-family: ${MONO_STACK};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.heroTextSecondary};

  &::before {
    content: '';
    width: 2rem;
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const TITLE_MASK_MARGIN = {
  top: `calc(1.5rem - 0.08 * ${TITLE_SIZE})`,
  bottom: `calc(-0.2 * ${TITLE_SIZE})`,
};

export const Title = styled.h1`
  margin: 0;
  /* Room for accents and descenders inside the clipping mask */
  padding: 0.08em 0 0.2em;
  font-size: ${TITLE_SIZE};
  font-weight: 680;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: ${({ theme }) => theme.colors.text};
`;

export const Tagline = styled.p`
  margin: 0;
  max-width: 36ch;
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.heroTextSecondary};
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-decoration: none;
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;

export const PrimaryCta = styled.a`
  ${buttonBase}
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};

  &:hover {
    color: ${({ theme }) => theme.colors.onPrimary};
    box-shadow: 0 8px 24px
      color-mix(in srgb, ${({ theme }) => theme.colors.primary} 35%, transparent);
  }
`;

export const SecondaryCta = styled.a`
  ${buttonBase}
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const SocialLinks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.heroTextSecondary};
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 0.3em;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    text-decoration-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    text-decoration-color: currentColor;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
    border-radius: ${({ theme }) => theme.borderRadius.base};
  }
`;

export const Arrow = styled.span`
  display: inline-block;
  transition: transform ${({ theme }) => theme.transitions.fast};

  ${SocialLink}:hover & {
    transform: translate(2px, -2px);
  }
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
