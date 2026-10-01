import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { Card } from '../../ui';
import { alpha, focusRing } from '../../../styles/mixins';

const IMAGE_SCALE = 1.02;
const ARROW_SHIFT = '2px';
const GRID_CELL = '1.5rem';
const SPOT_SIZE = 360;
const SPOT_SIZE_WIDE = 560;

interface WideProps {
  $wide?: boolean;
}

const spotSize = ({ $wide }: WideProps) => ($wide ? SPOT_SIZE_WIDE : SPOT_SIZE);

export const CardLink = styled(RouterLink)`
  display: flex;
  height: 100%;
  text-decoration: none;
  color: inherit;
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  ${focusRing}
`;

export const CardSurface = styled(Card).attrs({
  as: 'article',
})<WideProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  transition: border-color ${({ theme }) => theme.motion.duration.fast}s
    ${({ theme }) => theme.motion.easeCss};

  ${CardLink}:hover &,
  ${CardLink}:focus-visible & {
    border-color: ${({ theme }) => alpha(theme.colors.primary, 50)};
  }

  /* Wide: screenshot window left, copy right. Stacked below md. */
  ${({ $wide, theme }) =>
    $wide &&
    `
    @media (min-width: ${theme.breakpoints.md}) {
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
      align-items: center;
    }
  `}
`;

/**
 * Browser-style frame around the wide screenshot (the hero work stack's
 * window vocabulary). Below md it disappears and the card is a regular one.
 */
export const WideWindow = styled.div`
  display: contents;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: ${({ theme }) => theme.spacing.lg};
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

export const WindowBar = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    gap: 5px;
    height: 26px;
    padding: 0 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surfaceAlt};
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: 10px;
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
    line-height: 1;
    color: ${({ theme }) => theme.colors.textMuted};
    white-space: nowrap;
  }
`;

export const WindowDot = styled.span`
  flex: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  opacity: 0.6;

  @media (forced-colors: active) {
    border-color: CanvasText;
  }
`;

export const WindowLabel = styled.span`
  margin-left: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ImageFrame = styled.div<WideProps>`
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${({ $wide, theme }) =>
    $wide &&
    `
    @media (min-width: ${theme.breakpoints.md}) {
      aspect-ratio: 16 / 11;
      border-bottom: 0;
    }
  `}
`;

export const ProjectImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  transition: transform ${({ theme }) => theme.motion.duration.slow}s
    ${({ theme }) => theme.motion.easeCss};

  ${CardLink}:hover &,
  ${CardLink}:focus-visible & {
    transform: scale(${IMAGE_SCALE});
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${CardLink}:hover &,
    ${CardLink}:focus-visible & {
      transform: none;
    }
  }
`;

/** Quiet stand-in when a project has no screenshot: a faint grid echoing the hero. */
export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  background-image:
    linear-gradient(
      ${({ theme }) => theme.colors.gridLine} 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.gridLine} 1px,
      transparent 1px
    );
  background-size: ${GRID_CELL} ${GRID_CELL};
`;

/**
 * Pointer spotlight: the hero's glow and precision grid, continued into the
 * card. Sits under the content (first in DOM; the image frame and body are
 * positioned) and never carries a view-transition-name. `--spot-x/--spot-y`
 * are offsets from the card centre written by useCardSpotlight; unset (keyboard
 * focus) they centre the effect. Hidden on touch, reduced motion, forced colors.
 */
export const Spotlight = styled.div`
  display: none;

  @media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
    display: block;
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.motion.duration.base}s
      ${({ theme }) => theme.motion.easeCss};

    ${CardLink}:hover &,
    ${CardLink}:focus-visible & {
      opacity: 1;
    }
  }

  @media (forced-colors: active), (prefers-contrast: more) {
    display: none;
  }
`;

/** Faint 1px grid, revealed only inside the glow radius. */
export const SpotGrid = styled.div<WideProps>`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(
      to right,
      ${({ theme }) => theme.colors.gridLine} 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.gridLine} 1px,
      transparent 1px
    );
  background-size: ${GRID_CELL} ${GRID_CELL};
  -webkit-mask-image: radial-gradient(
    circle ${(props) => spotSize(props) / 2 - 40}px at
      calc(50% + var(--spot-x, 0px)) calc(50% + var(--spot-y, 0px)),
    #000 0%,
    transparent 100%
  );
  mask-image: radial-gradient(
    circle ${(props) => spotSize(props) / 2 - 40}px at
      calc(50% + var(--spot-x, 0px)) calc(50% + var(--spot-y, 0px)),
    #000 0%,
    transparent 100%
  );
`;

/** Fixed-size glow moved by transform only, like the hero's Glow. */
export const SpotGlow = styled.div<WideProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${spotSize}px;
  height: ${spotSize}px;
  margin: -${(props) => spotSize(props) / 2}px 0
    0 -${(props) => spotSize(props) / 2}px;
  border-radius: 50%;
  transform: translate3d(var(--spot-x, 0px), var(--spot-y, 0px), 0);
  will-change: transform;
  background: radial-gradient(
    circle,
    ${({ theme }) => alpha(theme.colors.primary, 14)} 0%,
    ${({ theme }) => alpha(theme.colors.secondary, 8)} 40%,
    transparent 70%
  );
`;

export const CardBody = styled.div<WideProps>`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};

  ${({ $wide, theme }) =>
    $wide &&
    `
    @media (min-width: ${theme.breakpoints.md}) {
      flex: none;
      gap: ${theme.spacing.lg};
      padding: ${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.sm};
    }
  `}
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Category = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h4<WideProps>`
  flex: 1;
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
  /* Two lines at most, so a long title cannot push the chip rows around. */
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;

  ${({ $wide, theme }) =>
    $wide &&
    `
    @media (min-width: ${theme.breakpoints.md}) {
      font-size: ${theme.typography.fontSize['2xl']};
    }
  `}
`;

export const Description = styled.p`
  display: none;
  margin: 0;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: -webkit-box;
  }
`;

/** Quiet call to action; visual text inside the card link, not a second link. */
export const Cta = styled.span`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color ${({ theme }) => theme.motion.duration.fast}s
    ${({ theme }) => theme.motion.easeCss};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline-flex;
  }

  ${CardLink}:hover &,
  ${CardLink}:focus-visible & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Arrow = styled.span<WideProps>`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: ${({ theme }) => theme.colors.textMuted};
  transition:
    transform ${({ theme }) => theme.motion.duration.fast}s
      ${({ theme }) => theme.motion.easeCss},
    color ${({ theme }) => theme.motion.duration.fast}s
      ${({ theme }) => theme.motion.easeCss};

  ${CardLink}:hover &,
  ${CardLink}:focus-visible & {
    color: ${({ theme }) => theme.colors.primary};
    transform: translate(${ARROW_SHIFT}, -${ARROW_SHIFT});
  }

  /* The wide card's CTA line takes over from the corner arrow. */
  ${({ $wide, theme }) =>
    $wide &&
    `
    @media (min-width: ${theme.breakpoints.md}) {
      display: none;
    }
  `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${CardLink}:hover &,
    ${CardLink}:focus-visible & {
      transform: none;
    }
  }
`;

export const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: auto;
`;
