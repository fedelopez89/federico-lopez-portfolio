import styled from 'styled-components';
import { motion } from 'framer-motion';

const TICK_SIZE = '7px';

export const MainContainer = styled(motion.main)`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
`;

export const Section = styled.section`
  position: relative;
  scroll-margin-top: ${({ theme }) => theme.layout.navHeight};
`;

/** Hairline top border at container width, with 1px ticks at both edges. */
export const Hairline = styled.div`
  position: relative;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 1px;
    height: ${TICK_SIZE};
    background: ${({ theme }) => theme.colors.border};
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

export const SectionBody = styled.div`
  padding: ${({ theme }) => `${theme.spacing['4xl']} 0`};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing['3xl']} 0`};
  }
`;
