import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { Card } from '../../ui';
import { alpha, focusRing } from '../../../styles/mixins';

const IMAGE_SCALE = 1.02;
const ARROW_SHIFT = '2px';
const GRID_CELL = '1.5rem';

export const CardLink = styled(RouterLink)`
  display: flex;
  height: 100%;
  text-decoration: none;
  color: inherit;
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  ${focusRing}
`;

export const CardSurface = styled(Card).attrs({ as: 'article' })`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  transition: border-color ${({ theme }) => theme.motion.duration.fast}s
    ${({ theme }) => theme.motion.easeCss};

  ${CardLink}:hover &,
  ${CardLink}:focus-visible & {
    border-color: ${({ theme }) => alpha(theme.colors.primary, 50)};
  }
`;

export const ImageFrame = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ProjectImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  transition: transform ${({ theme }) => theme.motion.duration.slow}s
    ${({ theme }) => theme.motion.easeCss};

  ${CardLink}:hover &,
  ${CardLink}:focus-visible & {
    transform: scale(${IMAGE_SCALE});
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${CardLink}:hover &,
    ${CardLink}:focus-visible & {
      transform: none;
    }
  }
`;

/** Quiet stand-in when a project has no screenshot: a faint grid echoing the hero. */
export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
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

export const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Category = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.tracking.eyebrow};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h3`
  flex: 1;
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
`;

export const Arrow = styled.span`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  color: ${({ theme }) => theme.colors.textMuted};
  transition:
    transform ${({ theme }) => theme.motion.duration.fast}s
      ${({ theme }) => theme.motion.easeCss},
    color ${({ theme }) => theme.motion.duration.fast}s
      ${({ theme }) => theme.motion.easeCss};

  ${CardLink}:hover &,
  ${CardLink}:focus-visible & {
    color: ${({ theme }) => theme.colors.primary};
    transform: translate(${ARROW_SHIFT}, -${ARROW_SHIFT});
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${CardLink}:hover &,
    ${CardLink}:focus-visible & {
      transform: none;
    }
  }
`;

export const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: auto;
`;
