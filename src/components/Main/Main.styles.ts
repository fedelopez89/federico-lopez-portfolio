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
 *
 * Warning: content-visibility applies layout and paint containment to the
 * section. Do not put position: fixed/sticky descendants inside a section (they
 * would be positioned relative to it), and note that overflow is clipped to
 * its box. Estimates are measured heights; keep them close to avoid scroll jumps.
 */
export const Section = styled.section<{
  $intrinsicHeight?: number;
  $intrinsicHeightMobile?: number;
}>`
  position: relative;
  content-visibility: auto;
  contain-intrinsic-size: auto
    ${({ $intrinsicHeight = 900 }) => $intrinsicHeight}px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    contain-intrinsic-size: auto
      ${({ $intrinsicHeight = 900, $intrinsicHeightMobile }) =>
        $intrinsicHeightMobile ?? $intrinsicHeight}px;
  }

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
