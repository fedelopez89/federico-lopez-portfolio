import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { alpha, focusRing } from '../../../styles/mixins';
import { Description } from './ProjectCard.styles';

/** The combined card shows its copy at every width, unlike the wide card. */
export const FinderDescription = styled(Description)`
  display: block;
  -webkit-line-clamp: unset;
  line-clamp: unset;
`;

export const FinderLinksLabel = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const FinderLinks = styled.ul.attrs({ role: 'list' })`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const FinderLink = styled(RouterLink)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-height: 36px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color ${({ theme }) => theme.motion.duration.fast}s
      ${({ theme }) => theme.motion.easeCss},
    color ${({ theme }) => theme.motion.duration.fast}s
      ${({ theme }) => theme.motion.easeCss};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
    border-color: ${({ theme }) => alpha(theme.colors.primary, 50)};
  }

  @media (prefers-contrast: more) {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  ${focusRing}
`;

export const FinderArrow = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;
