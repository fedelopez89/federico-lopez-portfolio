import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button } from '../../ui';

export const ExperienceContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const Title = styled(motion.h1)`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const DownloadButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  i {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

export const Timeline = styled.div`
  position: relative;
  padding-left: ${({ theme }) => theme.spacing['2xl']};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.colors.border};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-left: ${({ theme }) => theme.spacing.lg};
  }
`;

export const ExperienceCard = styled(motion.div)`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  padding-left: ${({ theme }) => theme.spacing.xl};

  &::before {
    content: '';
    position: absolute;
    left: -${({ theme }) => theme.spacing['2xl']};
    top: ${({ theme }) => theme.spacing.sm};
    width: 16px;
    height: 16px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.primary};
    border: 3px solid ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.border};
    z-index: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-left: ${({ theme }) => theme.spacing.md};

    &::before {
      left: -${({ theme }) => theme.spacing.lg};
    }
  }
`;

export const DateAndLocation = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  h5 {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  }

  h6 {
    color: ${({ theme }) => theme.colors.textTertiary};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    margin: 0;
  }
`;

export const Details = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateX(4px);
  }

  h4 {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
    text-transform: capitalize;
  }

  h5 {
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;

    a {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
      text-transform: capitalize;
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
      transition: color ${({ theme }) => theme.transitions.fast};

      &:hover {
        color: ${({ theme }) => theme.colors.primaryHover};
      }
    }
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    margin: 0;
  }
`;
