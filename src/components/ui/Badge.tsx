import styled, { css } from 'styled-components';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

const badgeVariants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.secondaryLight};
    color: ${({ theme }) => theme.colors.secondary};
  `,
  success: css`
    background: rgba(16, 185, 129, 0.1);
    color: ${({ theme }) => theme.colors.success};
  `,
  warning: css`
    background: rgba(245, 158, 11, 0.1);
    color: ${({ theme }) => theme.colors.warning};
  `,
  error: css`
    background: rgba(239, 68, 68, 0.1);
    color: ${({ theme }) => theme.colors.error};
  `,
  info: css`
    background: rgba(59, 130, 246, 0.1);
    color: ${({ theme }) => theme.colors.info};
  `,
};

const badgeSizes = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  `,
};

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transitions.fast};

  ${({ variant = 'primary' }) => badgeVariants[variant]}
  ${({ size = 'md' }) => badgeSizes[size]}
`;
