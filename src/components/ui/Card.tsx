import styled from 'styled-components';
import { motion } from 'framer-motion';

interface CardProps {
  padding?: 'sm' | 'md' | 'lg';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const cardPadding = {
  sm: 'md',
  md: 'lg',
  lg: 'xl',
};

const cardElevation = {
  none: 'none',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const Card = styled(motion.div)<CardProps>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme, padding = 'md' }) =>
    theme.spacing[cardPadding[padding] as keyof typeof theme.spacing]};
  box-shadow: ${({ theme, elevation = 'md' }) =>
    theme.shadows[cardElevation[elevation] as keyof typeof theme.shadows]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.base};

  ${({ hover, theme }) =>
    hover &&
    `
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.xl};
    }
  `}
`;

Card.defaultProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};
