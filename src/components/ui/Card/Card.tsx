import styled, { css } from 'styled-components';
import { alpha } from '../../../styles/mixins';

/**
 * Flat surface. `interactive` adds a border tint and 2px lift on hover and
 * keyboard focus. A clickable card must contain a real link (stretched-link
 * pattern); the card itself is not focusable.
 */
export const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'interactive',
})<{ interactive?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  @media (prefers-contrast: more) {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  ${({ interactive }) =>
    interactive &&
    css`
      transition:
        transform ${({ theme }) => theme.motion.duration.fast}s
          ${({ theme }) => theme.motion.easeCss},
        border-color ${({ theme }) => theme.motion.duration.fast}s
          ${({ theme }) => theme.motion.easeCss};

      &:hover,
      &:has(:focus-visible) {
        border-color: ${({ theme }) => alpha(theme.colors.primary, 50)};
        transform: translateY(-2px);
      }
    `}
`;
