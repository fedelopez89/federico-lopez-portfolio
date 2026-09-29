import styled from 'styled-components';

export type ContainerSize = 'prose' | 'content' | 'wide';

export const Container = styled.div
  .withConfig({ shouldForwardProp: (prop) => prop !== 'size' })<{
  size?: ContainerSize;
}>`
  width: 100%;
  max-width: ${({ theme, size = 'wide' }) => theme.layout.maxWidth[size]};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;
