import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AboutMeContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

export const Description = styled(motion.div)`
  h1 {
    color: ${({ theme }) => theme.colors.text};
    text-transform: uppercase;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    }
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    margin-bottom: ${({ theme }) => theme.spacing.md};

    strong {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};

      u {
        text-decoration-color: ${({ theme }) => theme.colors.primary};
        text-decoration-thickness: 2px;
        text-underline-offset: 4px;
      }
    }
  }
`;

export const PhotoContainer = styled(motion.figure)`
  position: relative;
  margin: 0;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  transition: all ${({ theme }) => theme.transitions.base};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(37, 99, 235, 0.2) 0%,
      rgba(124, 58, 237, 0.2) 100%
    );
    z-index: 1;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows['2xl']};

    &::before {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    order: -1;
  }
`;
