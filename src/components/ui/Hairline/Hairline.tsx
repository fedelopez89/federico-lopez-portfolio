import styled, { css } from 'styled-components';
import { drawX, fadeIn, whenScrollDriven } from '../../../styles/scrollDraw';

const TICK_SIZE = '7px';
/** Scroll distance over which the line draws, from its entering the bottom edge. */
const DRAW_RANGE = 'cover 0px cover 96px';

/** 1px rule with short ticks at both ends. Decorative: render with aria-hidden. */
export const Hairline = styled.div`
  position: relative;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 1px;
    height: ${TICK_SIZE};
    background: ${({ theme }) => theme.colors.border};
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  /* Draws left to right; the right tick rides the drawing head. The ticks fade
     in with it. A fixed scroll distance (not a % of the 1px box) keeps the
     draw smooth and lets even the footer rule, at the page end, complete. */
  ${whenScrollDriven(css`
    transform-origin: left;
    animation: ${drawX} linear both;
    animation-timeline: view();
    animation-range: ${DRAW_RANGE};

    &::before,
    &::after {
      animation: ${fadeIn} linear both;
      animation-timeline: view();
      animation-range: ${DRAW_RANGE};
    }
  `)}
`;
