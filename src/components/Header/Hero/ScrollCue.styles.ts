import styled, { keyframes } from 'styled-components';
import { focusRing } from '../../../styles/mixins';
import { lightTheme } from '../../../styles/theme';

const LINE_HEIGHT = 48;
const SEGMENT_HEIGHT = 16;

/** The segment enters from above the clipped line and leaves below it. */
const travel = keyframes`
  from {
    transform: translateY(-${SEGMENT_HEIGHT}px);
  }
  to {
    transform: translateY(${LINE_HEIGHT}px);
  }
`;

/**
 * Viewports where the cue is not shown (phones, short windows). One string
 * drives both the CSS and the JS gate so they cannot drift apart.
 */
export const CUE_HIDDEN_QUERY = `(max-width: ${lightTheme.breakpoints.md}), (max-height: 700px)`;

/** Loops the travel runs before it stops for good. */
export const CUE_LOOPS = 3;

export const Cue = styled.a<{ $hidden: boolean }>`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.md};
  left: 0;
  right: 0;
  z-index: 1;
  width: fit-content;
  min-width: 24px;
  min-height: 24px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.tracking.eyebrow};
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  pointer-events: ${({ $hidden }) => ($hidden ? 'none' : 'auto')};
  /* Opacity only; visibility flips after the fade so the link leaves the tab
     order once it is gone. */
  transition:
    opacity ${({ theme }) => theme.transitions.base},
    visibility 0s linear ${({ $hidden }) => ($hidden ? '200ms' : '0s')};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  ${focusRing}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  /* Phones and short windows: the hero content already fills the viewport
     (measured 28px of slack at 390x844, none on shorter screens), so the cue
     would crowd the proof strip. Touch users know to scroll. */
  @media ${CUE_HIDDEN_QUERY} {
    display: none;
  }
`;

export const CueLine = styled.span`
  position: relative;
  display: block;
  width: 1px;
  height: ${LINE_HEIGHT}px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.borderStrong};

  @media (forced-colors: active) {
    background: CanvasText;
  }
`;

/** Parked above the clip (invisible) until the idle travel starts. */
export const CueSegment = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${SEGMENT_HEIGHT}px;
  background: ${({ theme }) => theme.colors.primary};
  transform: translateY(-${SEGMENT_HEIGHT}px);

  &[data-playing='true'] {
    animation: ${travel} 2.4s ${({ theme }) => theme.motion.easeCss}
      ${CUE_LOOPS};
  }

  @media (prefers-reduced-motion: reduce) {
    &[data-playing='true'] {
      animation: none;
    }
  }

  @media (forced-colors: active) {
    background: Highlight;
  }
`;
