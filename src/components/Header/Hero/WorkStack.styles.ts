import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { alpha } from '../../../styles/mixins';

/** Matches the 72px precision grid in Hero.styles. */
const CELL = 72;
const BAR_HEIGHT = 24;
const STEP = CELL;
const LAYERS = 3;

export const STACK_BREAKPOINTS = {
  /** Below this the stack would collide with the display heading. */
  min: 1180,
  /** The stack unmounts only below `min - hysteresis`. */
  hysteresis: 40,
} as const;

const enter = keyframes`
  from {
    opacity: 0;
    transform: translate3d(28px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

/**
 * Anchors the stack to the hero's lower-right, below the display heading and
 * right of the text column. Positions it on the grid. The layer offsets and card widths are whole
 * cells, and the anchor snaps to a cell, so card edges sit on grid lines at
 * rest. Plain calc() is the base for browsers without CSS round(); the
 * snapped values apply under @supports. Scroll-linked opacity/y are applied here by framer-motion.
 */
export const StackFrame = styled(motion.div)`
  --cw: ${CELL * 4}px;
  --stack-w: calc(var(--cw) + ${STEP * (LAYERS - 1)}px);

  position: absolute;
  z-index: 1;
  width: var(--stack-w);
  top: 50%;
  left: calc(100% - var(--stack-w));
  pointer-events: none;
  user-select: none;

  /* round() is wrapped in @supports: a declaration with var() parses fine
     everywhere, so a plain fallback line would not survive at computed time. */
  @supports (top: round(down, 50%, ${CELL}px)) {
    top: round(down, 50%, ${CELL}px);
    left: calc(round(down, 100%, ${CELL}px) - var(--stack-w));
  }

  @media (min-width: 1440px) {
    left: calc(100% - var(--stack-w) - ${CELL}px);

    @supports (top: round(down, 50%, ${CELL}px)) {
      left: calc(round(down, 100%, ${CELL}px) - var(--stack-w) - ${CELL}px);
    }
  }

  @media (min-width: 1600px) {
    --cw: ${CELL * 5}px;
  }

  /* Short viewports: scale down so the stack stays inside the hero. */
  @media (max-height: 760px) {
    --cw: ${CELL * 3}px;
  }
`;

export const Scene = styled.div`
  perspective: 1600px;

  animation: ${enter} 0.5s ${({ theme }) => theme.motion.easeCss} 0.15s both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Stack = styled.div`
  --px: 0;
  --py: 0;
  --m: 0;

  position: relative;
  width: 100%;
  /* In-flow room for the diagonal offsets; the front layer defines the height. */
  padding-top: ${STEP * (LAYERS - 1)}px;
  transform-style: preserve-3d;
  transform: rotateX(calc(6deg - var(--py) * 2.5deg))
    rotateY(calc(-16deg + var(--px) * 4deg));
  will-change: transform;
`;

/** depth: -1 (back) .. 1 (front). */
export const Layer = styled.div<{ $index: number; $depth: number }>`
  --depth: ${({ $depth }) => $depth};

  position: ${({ $index }) => ($index === 0 ? 'relative' : 'absolute')};
  ${({ $index }) =>
    $index === 0 ? '' : `top: ${(LAYERS - 1 - $index) * STEP}px;`}
  left: ${({ $index }) => `${$index * STEP}px`};
  width: var(--cw);
  overflow: hidden;
  border: 1px solid ${({ theme }) => alpha(theme.colors.text, 16)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.surface};
  /* Soft depth only: a wide, faint lift rather than a drop shadow. */
  box-shadow: 0 28px 44px -32px ${({ theme }) => alpha(theme.colors.text, 28)};
  transform: translate3d(
      calc(var(--px) * var(--depth) * 14px),
      calc(var(--py) * var(--depth) * 10px),
      calc(var(--depth) * (22px + var(--m) * 30px))
    )
    rotateZ(calc(var(--px) * var(--depth) * 0.7deg));

  @media (forced-colors: active) {
    border-color: CanvasText;
    box-shadow: none;
  }
`;

export const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: ${BAR_HEIGHT}px;
  padding: 0 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: 10px;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  line-height: 1;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;

  @media (forced-colors: active) {
    border-bottom-color: CanvasText;
    background: Canvas;
    color: CanvasText;
  }
`;

export const Dot = styled.span`
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

export const BarLabel = styled.span`
  margin-left: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Shot = styled.img`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1400 / 740;
  object-fit: cover;
  object-position: top left;
`;
