import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MainContainer = styled(motion.main)`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
`;

export const Section = styled(motion.section)`
  padding: ${({ theme }) => `${theme.spacing['4xl']} 0`};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing['3xl']} 0`};
  }

  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;
