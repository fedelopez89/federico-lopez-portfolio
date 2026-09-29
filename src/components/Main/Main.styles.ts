import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MainContainer = styled(motion.main)`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  position: relative;

  &:focus {
    outline: none;
  }
`;

export const Section = styled.section`
  position: relative;
`;

export const SectionBody = styled.div`
  padding: ${({ theme }) => `${theme.spacing['4xl']} 0`};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing['3xl']} 0`};
  }
`;
