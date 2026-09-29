import styled from 'styled-components';
import { TextLink } from '../ui';

export const FooterRoot = styled.footer`
  background: ${({ theme }) => theme.colors.background};
  /* Lifts content above the fixed scroll-to-top button (44px + offset) at every width. */
  padding-bottom: ${({ theme }) => theme.spacing['4xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-bottom: ${({ theme }) => `calc(${theme.spacing['2xl']} + 60px)`};
  }
`;

export const FooterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  padding-top: ${({ theme }) => theme.spacing.lg};
`;

export const Copyright = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const FooterLinks = styled.ul.attrs({ role: 'list' })`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => `0 ${theme.spacing.lg}`};
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const FooterLink = styled(TextLink)`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
`;
