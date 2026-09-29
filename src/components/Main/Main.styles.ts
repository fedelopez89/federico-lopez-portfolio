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

/**
 * Below-the-fold sections skip rendering until they approach the viewport
 * (content-visibility). `auto <n>px` reserves an estimate and then remembers
 * the real height once rendered. Anchors, focus and find-in-page still force
 * rendering; print renders everything.
 */
export const Section = styled.section<{ $intrinsicHeight?: number }>`
  position: relative;
  content-visibility: auto;
  contain-intrinsic-size: auto
    ${({ $intrinsicHeight = 900 }) => $intrinsicHeight}px;

  @media print {
    content-visibility: visible;
  }
`;

export const SectionBody = styled.div`
  padding: ${({ theme }) => `${theme.spacing['4xl']} 0`};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing['3xl']} 0`};
  }
`;
