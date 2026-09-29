import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card, Container } from '../../ui';

export const AboutMeContainer = styled(Container)``;

/** Stacks copy, credential and facts with even rhythm on the container edge. */
export const AboutMeBody = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
`;

export const Description = styled(motion.div)`
  max-width: ${({ theme }) => theme.layout.maxWidth.prose};

  p {
    margin: 0 0 ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  p:last-child {
    margin-bottom: 0;
  }

  strong {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const FeaturedCallout = styled(motion.create(Card))`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: ${({ theme }) => theme.layout.maxWidth.prose};
  padding: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const PublicationName = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.display.weight};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.tracking.heading};
  color: ${({ theme }) => theme.colors.text};
`;

export const CalloutContext = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FactsList = styled(motion.dl)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Fact = styled.div`
  /* dt (label) precedes dd (value) in the DOM; the value shows first. */
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.xl};

  &:first-child {
    padding-left: 0;
  }

  & + & {
    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.lg} 0`};

    & + & {
      border-left: 0;
      border-top: 1px solid ${({ theme }) => theme.colors.border};
    }
  }
`;

export const FactLabel = styled.dt`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.tracking.eyebrow};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  overflow-wrap: anywhere;
`;

export const FactValue = styled.dd`
  margin: 0;
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: ${({ theme }) => theme.typography.display.weight};
  line-height: 1;
  letter-spacing: ${({ theme }) => theme.typography.tracking.display};
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.text};
`;
