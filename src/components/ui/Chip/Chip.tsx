import styled from 'styled-components';
import { alpha } from '../../../styles/mixins';

export type ChipVariant = 'default' | 'accent';

/** Small tag. Render as another element with the `as` prop (e.g. `as="li"`). */
export const Chip = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant?: ChipVariant }>`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border: 1px solid
    ${({ theme, variant }) =>
      variant === 'accent'
        ? alpha(theme.colors.primary, 40)
        : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, variant }) =>
    variant === 'accent' ? alpha(theme.colors.primary, 10) : 'transparent'};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme, variant }) =>
    variant === 'accent'
      ? theme.colors.primaryText
      : theme.colors.textSecondary};

  @media (prefers-contrast: more) {
    border-color: ${({ theme, variant }) =>
      variant === 'accent'
        ? theme.colors.primaryText
        : theme.colors.borderStrong};
  }
`;
