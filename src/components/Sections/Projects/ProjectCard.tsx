import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { Project } from '../../../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const CardLink = styled(RouterLink)`
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 12px;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }
`;

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  display: flex;
  flex-direction: column;

  ${CardLink}:hover & {
    transform: translateY(-6px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35), 0 12px 40px rgba(0, 0, 0, 0.5);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;

  ${CardLink}:hover & {
    transform: scale(1.04);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}18 0%,
    ${({ theme }) => theme.colors.accent}12 100%
  );

  svg {
    width: 48px;
    height: 48px;
    opacity: 0.2;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FeaturedBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const CardBody = styled.div`
  padding: 1.25rem 1.375rem 1.375rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  flex: 1;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Title = styled.h3`
  font-size: 1.0625rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
  flex: 1;
`;

const ArrowIcon = styled.span`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s ease;
  margin-top: 1px;

  ${CardLink}:hover & {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translate(2px, -2px);
  }

  svg {
    width: 13px;
    height: 13px;
  }
`;

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  align-items: center;
`;

const TechBadge = styled.span`
  padding: 0.1875rem 0.625rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;
`;

const MoreBadge = styled(TechBadge)`
  color: ${({ theme }) => theme.colors.textTertiary};
  border-style: dashed;
`;

const MAX_TECH = 3;

function preloadImage(url: string) {
  const href = url.startsWith('/') ? url : `/${url}`;
  if (document.querySelector(`link[rel="preload"][href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = href;
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { t } = useTranslation();

  const projectTransKey = project.id.replace(/-/g, '');
  const translatedTitle = t(`projects.${projectTransKey}.title`, {
    defaultValue: project.title,
  });
  const featuredLabel = project.featured ? t('projects.nytLabel') : '';

  const visibleTech = project.technologies.slice(0, MAX_TECH);
  const extraCount = project.technologies.length - MAX_TECH;

  const handleClick = () => {
    if (project.imageUrl) preloadImage(project.imageUrl);
  };

  return (
    <CardLink
      to={`/projects/${project.id}`}
      state={{ fromPortfolio: true }}
      aria-label={`View details of ${translatedTitle}`}
      onClick={handleClick}
    >
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
      >
        <ImageContainer>
          {project.imageUrl ? (
            <ProjectImage
              src={project.imageUrl}
              alt={project.title}
              loading={index < 2 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
            />
          ) : (
            <ImagePlaceholder>
              <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </ImagePlaceholder>
          )}
          {project.featured && featuredLabel && (
            <FeaturedBadge>★ NYT</FeaturedBadge>
          )}
        </ImageContainer>

        <CardBody>
          <TitleRow>
            <Title>{translatedTitle}</Title>
            <ArrowIcon aria-hidden="true">
              <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </ArrowIcon>
          </TitleRow>

          <TechRow role="list" aria-label="Technologies used">
            {visibleTech.map((tech) => (
              <TechBadge key={tech} role="listitem">{tech}</TechBadge>
            ))}
            {extraCount > 0 && (
              <MoreBadge role="listitem" aria-label={`${extraCount} more technologies`}>
                +{extraCount}
              </MoreBadge>
            )}
          </TechRow>
        </CardBody>
      </Card>
    </CardLink>
  );
};

export default ProjectCard;
