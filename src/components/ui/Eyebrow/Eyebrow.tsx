import styled, { css } from 'styled-components';

export const Eyebrow = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== 'rule',
})<{ rule?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.tracking.eyebrow};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};

  ${({ rule }) =>
    rule &&
    css`
      &::before {
        content: '';
        width: 2rem;
        height: 1px;
        background: ${({ theme }) => theme.colors.primary};
      }
    `}
`;
