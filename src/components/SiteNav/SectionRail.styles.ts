import styled, { css } from 'styled-components';
import { alpha, focusRing } from '../../styles/mixins';
import { drawY, whenScrollDriven } from '../../styles/scrollDraw';

/**
 * The rail sits in the gutter beside the content container. Below this width
 * the gutter is too narrow for it and it is not rendered. Leaves below
 * `min - hysteresis`. Measured: the widest section content ends about
 * (width - 1370) / 2 px before the rail, so 1408 keeps a 19px clearance.
 */
export const RAIL_BREAKPOINTS = {
  min: 1408,
  hysteresis: 40,
} as const;

const TRACK_OFFSET = '0px';

export const Rail = styled.nav<{ $visible: boolean }>`
  position: fixed;
  top: 50%;
  right: ${({ theme }) => theme.spacing.lg};
  z-index: ${({ theme }) => theme.zIndex.sticky};
  /* Centering uses the individual property so the entrance can own transform. */
  translate: 0 -50%;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateX(${({ $visible }) => ($visible ? '0' : '8px')});
  /* Leaves the tab order and the accessibility tree once faded out. */
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transition:
    opacity ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.base},
    visibility 0s linear ${({ $visible }) => ($visible ? '0s' : '200ms')};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const RailList = styled.ul.attrs({ role: 'list' })`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  list-style: none;

  /* Track and progress fill share one geometry at the right edge. */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: ${TRACK_OFFSET};
    width: 1px;
    pointer-events: none;
  }

  &::before {
    background: ${({ theme }) => theme.colors.border};
  }

  /* Progress: static fallback shows no fill. */
  &::after {
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleY(0);
    transform-origin: top;
  }

  ${whenScrollDriven(css`
    &::after {
      animation: ${drawY} linear both;
      animation-timeline: scroll(root);
    }
  `)}

  @media (forced-colors: active) {
    &::before {
      background: CanvasText;
    }
    &::after {
      display: none;
    }
  }
`;

export const RailLabel = styled.span`
  position: absolute;
  top: 50%;
  right: 100%;
  margin-right: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => alpha(theme.colors.surface, 92)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  opacity: 0;
  pointer-events: none;
  translate: 0 -50%;
  transform: translateX(4px);
  transition:
    opacity ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (forced-colors: active) {
    background: Canvas;
    border-color: CanvasText;
    color: CanvasText;
  }
`;

export const RailTick = styled.span<{ $isActive: boolean }>`
  display: block;
  width: ${({ $isActive }) => ($isActive ? '14px' : '6px')};
  height: 1px;
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.borderStrong};

  @media (forced-colors: active) {
    background: ${({ $isActive }) => ($isActive ? 'Highlight' : 'CanvasText')};
  }
`;

export const RailIndex = styled.span`
  font-variant-numeric: tabular-nums;
`;

export const RailLink = styled.a<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 24px;
  min-height: 24px;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.tracking.eyebrow};
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primaryText : theme.colors.textTertiary};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover ${RailLabel}, &:focus-visible ${RailLabel} {
    opacity: 1;
    transform: translateX(0);
  }

  ${focusRing}

  @media (forced-colors: active) {
    color: ${({ $isActive }) => ($isActive ? 'Highlight' : 'CanvasText')};
  }
`;
