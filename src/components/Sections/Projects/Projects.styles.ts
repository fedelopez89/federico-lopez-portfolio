import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../../ui';
import { alpha, focusRing } from '../../../styles/mixins';

/** Extra room so the focus ring and the enlarged hit area are not clipped by the scroll row. */
const ROW_BLEED = '0.25rem';
/** Fade zone at the right edge of the scrolling filter row. */
const FADE_WIDTH = '2rem';

export const ProjectsContainer = styled(Container)``;

export const Toolbar = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: ${ROW_BLEED} ${FADE_WIDTH} ${ROW_BLEED} ${ROW_BLEED};
    margin: -${ROW_BLEED} 0 -${ROW_BLEED} -${ROW_BLEED};
    scroll-snap-type: x proximity;
    scroll-padding-inline: ${ROW_BLEED};
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    /* Mask uses alpha only; the color value is irrelevant. */
    mask-image: linear-gradient(
      to right,
      #000 calc(100% - ${FADE_WIDTH}),
      transparent
    );

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  position: relative;
  flex-shrink: 0;
  min-height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.onPrimary : theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  scroll-snap-align: start;
  transition:
    border-color ${({ theme }) => theme.motion.duration.fast}s
      ${({ theme }) => theme.motion.easeCss},
    color ${({ theme }) => theme.motion.duration.fast}s
      ${({ theme }) => theme.motion.easeCss};

  /* Grows the hit area to 44px without changing the visual size. */
  &::after {
    content: '';
    position: absolute;
    inset: -2px 0;
  }

  &:hover {
    border-color: ${({ theme, $active }) =>
      $active ? theme.colors.primary : alpha(theme.colors.primary, 50)};
    color: ${({ theme, $active }) =>
      $active ? theme.colors.onPrimary : theme.colors.text};
  }

  ${focusRing}

  &:focus-visible {
    outline-offset: 2px;
  }
`;

export const ResultCount = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ProjectsGrid = styled.ul`
  position: relative; /* containing block for items pinned by AnimatePresence popLayout */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const ProjectItem = styled(motion.li)`
  min-width: 0;
`;

export const EmptyState = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: left;
`;

export const EmptyTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
`;

export const EmptyText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;
