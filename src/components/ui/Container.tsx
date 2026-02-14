import styled, { css } from 'styled-components';

interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

const containerMaxWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  full: '100%',
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${({ maxWidth = 'xl' }) => containerMaxWidth[maxWidth]};
  margin: 0 auto;

  ${({ padding = true, theme }) =>
    padding &&
    css`
      padding-left: ${theme.spacing.lg};
      padding-right: ${theme.spacing.lg};

      @media (max-width: ${theme.breakpoints.md}) {
        padding-left: ${theme.spacing.md};
        padding-right: ${theme.spacing.md};
      }
    `}
`;
