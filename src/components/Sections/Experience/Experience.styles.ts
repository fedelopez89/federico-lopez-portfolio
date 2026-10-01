import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Container, TextLink } from '../../ui';
import { drawY, popIn, whenScrollDriven } from '../../../styles/scrollDraw';

const MARKER = '7px';
const RAIL_GUTTER = '2rem';
/** Meta and role first lines share this height so the marker centers on both. */
const FIRST_LINE = '1.5rem';
const markerTop = (pad: string) =>
  `calc(${pad} + (${FIRST_LINE} - ${MARKER}) / 2)`;

export const ExperienceContainer = styled(Container)``;

export const Timeline = styled.ol.attrs({ role: 'list' })`
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const TimelineItem = styled(motion.li)<{ $current?: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: 13rem minmax(0, 1fr);
  column-gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl} 0
    ${({ theme }) => theme.spacing.xl} ${RAIL_GUTTER};

  &:last-child {
    padding-bottom: 0;
  }

  /* Rail segment from this marker down to the next item; none after the last. */
  &::after {
    content: '';
    position: absolute;
    left: calc((${MARKER} - 1px) / 2);
    top: ${({ theme }) => markerTop(theme.spacing.xl)};
    bottom: 0;
    width: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  &:last-child::after {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    left: 0;
    top: ${({ theme }) => markerTop(theme.spacing.xl)};
    width: ${MARKER};
    height: ${MARKER};
    background: ${({ theme, $current }) =>
      $current ? theme.colors.primary : theme.colors.background};
    border: 1px solid
      ${({ theme, $current }) =>
        $current ? theme.colors.primary : theme.colors.textTertiary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1fr);
    row-gap: ${({ theme }) => theme.spacing.sm};
  }

  /* The rail draws top to bottom as each item scrolls in; its marker pops as
     the item's top arrives. Both follow the item's own (untransformed) view
     timeline, so items already in view on load are fully drawn. */
  ${whenScrollDriven(css`
    view-timeline: --exp-item block;
    view-timeline-inset: 0px 8%;

    &::after {
      transform-origin: top;
      animation: ${drawY} linear both;
      animation-timeline: --exp-item;
      animation-range: entry 0% entry 100%;
    }

    &::before {
      animation: ${popIn} linear both;
      animation-timeline: --exp-item;
      animation-range: entry 0% entry 25%;
    }
  `)}
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  line-height: ${FIRST_LINE};
  color: ${({ theme }) => theme.colors.textTertiary};
`;

export const MetaDates = styled.p`
  margin: 0;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MetaLine = styled.p`
  margin: 0;
`;

export const Details = styled.div`
  min-width: 0;
`;

export const Role = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: ${FIRST_LINE};
  color: ${({ theme }) => theme.colors.text};
`;

export const CompanyLink = styled(TextLink)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CompanyName = styled.span`
  display: inline-block;
  padding: 0.5rem 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Company = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

export const Notes = styled.p`
  max-width: ${({ theme }) => theme.layout.maxWidth.prose};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.textSecondary};

  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text};
  }
`;
