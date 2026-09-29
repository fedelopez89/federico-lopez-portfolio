import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip } from '../../ui';
import type { Project } from '../../../data/projects';
import {
  CardLink,
  CardSurface,
  ImageFrame,
  ProjectImage,
  ImagePlaceholder,
  CardBody,
  MetaRow,
  Category,
  TitleRow,
  Title,
  Arrow,
  TechRow,
} from './ProjectCard.styles';

interface ProjectCardProps {
  project: Project;
}

const MAX_TECH = 3;
/** Intrinsic size of the screenshots; reserves space and matches the 16/10 crop. */
const IMAGE_WIDTH = 1400;
const IMAGE_HEIGHT = 740;

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

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation();
  const titleId = useId();

  const projectTransKey = project.id.replace(/-/g, '');
  const translatedTitle = t(`projects.${projectTransKey}.title`, {
    defaultValue: project.title,
  });

  const visibleTech = project.technologies.slice(0, MAX_TECH);
  const extraCount = project.technologies.length - MAX_TECH;

  const handleClick = () => {
    if (project.imageUrl) preloadImage(project.imageUrl);
  };

  return (
    <CardLink
      to={`/projects/${project.id}`}
      state={{ fromPortfolio: true }}
      aria-labelledby={titleId}
      onClick={handleClick}
    >
      <CardSurface>
        <ImageFrame>
          {project.imageUrl ? (
            <ProjectImage
              src={project.imageUrl}
              alt={t('projects.imageAlt', { title: translatedTitle })}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <ImagePlaceholder aria-hidden="true" />
          )}
        </ImageFrame>

        <CardBody>
          <MetaRow>
            <Category>{t(`projects.categories.${project.category}`)}</Category>
            {project.featured && (
              <Chip variant="accent">{t('projects.nytBadge')}</Chip>
            )}
          </MetaRow>

          <TitleRow>
            <Title id={titleId}>{translatedTitle}</Title>
            <Arrow aria-hidden="true">↗</Arrow>
          </TitleRow>

          <TechRow role="list" aria-label={t('projects.technologiesUsed')}>
            {visibleTech.map((tech) => (
              <Chip key={tech} role="listitem">
                {tech}
              </Chip>
            ))}
            {extraCount > 0 && (
              <Chip
                role="listitem"
                aria-label={t('projects.moreTechnologies', {
                  count: extraCount,
                })}
              >
                +{extraCount}
              </Chip>
            )}
          </TechRow>
        </CardBody>
      </CardSurface>
    </CardLink>
  );
};

export default ProjectCard;
