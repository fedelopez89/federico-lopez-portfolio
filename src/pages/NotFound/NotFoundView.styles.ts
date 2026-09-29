import styled from 'styled-components';

export const NotFoundBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => `${theme.spacing['3xl']} 0`};

  h1 {
    margin: 0;
    font-size: ${({ theme }) => theme.typography.display.section};
    font-weight: ${({ theme }) => theme.typography.display.weight};
    letter-spacing: ${({ theme }) => theme.typography.tracking.display};
  }

  p {
    margin: 0;
    max-width: ${({ theme }) => theme.layout.maxWidth.prose};
  }
`;
