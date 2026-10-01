import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Card, Eyebrow } from '../../components/ui';
import { alpha, focusRing } from '../../styles/mixins';

const GRID_CELL = '1.5rem';
const ARROW_SHIFT = '2px';

export const PageHeader = styled.header`
  position: relative;
`;

export const PageMain = styled.main`
  &:focus {
    outline: none;
  }

  min-height: 60vh;
  padding: ${({ theme }) =>
    `calc(${theme.layout.navHeight} + ${theme.spacing.lg}) 0 ${theme.spacing['4xl']}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-bottom: ${({ theme }) => theme.spacing['3xl']};
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 44px;
  padding: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 0.3em;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    text-decoration-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    text-decoration-color: currentColor;
  }

  ${focusRing}
`;

export const BackArrow = styled.span`
  display: inline-block;
  transition: transform ${({ theme }) => theme.transitions.fast};

  ${BackButton}:hover & {
    transform: translateX(-${ARROW_SHIFT});
  }
`;

export const Stack = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const Intro = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h1`
  max-width: ${({ theme }) => theme.layout.maxWidth.content};
  margin: 0;
  font-size: ${({ theme }) => theme.typography.display.section};
  font-weight: ${({ theme }) => theme.typography.display.weight};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.tracking.display};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
  }
`;

export const Lead = styled.p`
  max-width: ${({ theme }) => theme.layout.maxWidth.prose};
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ScreenshotFrame = styled(motion.create(Card))`
  max-width: ${({ theme }) => theme.layout.maxWidth.content};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceAlt};
`;

export const Screenshot = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

/** Stand-in when a project has no screenshot: a faint grid echoing the hero. */
export const ScreenshotPlaceholder = styled.div`
  aspect-ratio: 1400 / 740;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  background-image:
    linear-gradient(
      ${({ theme }) => theme.colors.gridLine} 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.gridLine} 1px,
      transparent 1px
    );
  background-size: ${GRID_CELL} ${GRID_CELL};
`;

/**
 * Without a case study the body is a single column. With one, wide screens
 * put the narrative on the left and the callout and stack in an aside.
 */
export const Body = styled.div<{ $split?: boolean }>`
  display: flex;
  max-width: ${({ theme }) => theme.layout.maxWidth.content};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};

  ${({ $split, theme }) =>
    $split &&
    `
    @media (min-width: ${theme.breakpoints.lg}) {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 24rem);
      align-items: start;
      gap: ${theme.spacing['3xl']};
    }
  `}
`;

export const BodyAside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
  min-width: 0;
`;

export const Narrative = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
  min-width: 0;
  max-width: ${({ theme }) => theme.layout.maxWidth.prose};
`;

export const NarrativeSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const NarrativeText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-wrap: pretty;
`;

export const BulletList = styled.ul.attrs({ role: 'list' })`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.textSecondary};

  & > li {
    position: relative;
    padding-left: ${({ theme }) => theme.spacing.lg};
    text-wrap: pretty;
  }

  & > li::before {
    content: '';
    position: absolute;
    top: 0.8em;
    left: 0;
    width: ${({ theme }) => theme.spacing.md};
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const FeaturedCallout = styled(Card)`
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

export const TechSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  letter-spacing: ${({ theme }) => theme.typography.tracking.heading};
`;

export const TechList = styled.ul.attrs({ role: 'list' })`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Pager = styled.nav`
  max-width: ${({ theme }) => theme.layout.maxWidth.content};
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const PagerLink = styled(RouterLink)<{ $align: 'start' | 'end' }>`
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: ${({ $align }) => $align};

  &:hover {
    color: inherit;
  }

  ${focusRing}
`;

export const PagerCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  height: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  transition: border-color ${({ theme }) => theme.motion.duration.fast}s
    ${({ theme }) => theme.motion.easeCss};

  ${PagerLink}:hover &,
  ${PagerLink}:focus-visible & {
    border-color: ${({ theme }) => alpha(theme.colors.primary, 50)};
  }
`;

export const PagerLabel = styled(Eyebrow)<{ $align: 'start' | 'end' }>`
  justify-content: ${({ $align }) => `flex-${$align}`};
`;

export const PagerTitle = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
`;
