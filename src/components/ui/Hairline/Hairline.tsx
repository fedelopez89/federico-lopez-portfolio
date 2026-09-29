import styled, { css } from 'styled-components';
import { drawX, fadeIn, whenScrollDriven } from '../../../styles/scrollDraw';

const TICK_SIZE = '7px';
/** Scroll distance over which the line draws, from its entering the bottom edge. */
const DRAW_RANGE = 'cover 0px cover 96px';

const tick = (color: string, side: 'left' | 'right') =>
  `linear-gradient(${color}, ${color}) ${side} top / 1px 100% no-repeat`;

/**
 * 1px rule with short ticks at both ends. Decorative: render with aria-hidden.
 * The line (::before) and the ticks (::after) are separate layers so the line
 * can draw in without distorting the ticks.
 */
export const Hairline = styled.div`
  position: relative;
  height: 1px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  &::before {
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  &::after {
    height: ${TICK_SIZE};
    background:
      ${({ theme }) => tick(theme.colors.border, 'left')},
      ${({ theme }) => tick(theme.colors.border, 'right')};
  }

  /* The line draws left to right (transform only) and the ticks fade in. Both
     follow the hairline's own timeline, which is never transformed. A fixed
     scroll distance (not a % of the 1px box) keeps the draw smooth and lets
     even the footer rule, at the page end, complete. */
  ${whenScrollDriven(css`
    view-timeline: --hairline block;

    &::before {
      transform-origin: left;
      animation: ${drawX} linear both;
      animation-timeline: --hairline;
      animation-range: ${DRAW_RANGE};
    }

    &::after {
      animation: ${fadeIn} linear both;
      animation-timeline: --hairline;
      animation-range: ${DRAW_RANGE};
    }
  `)}
`;
