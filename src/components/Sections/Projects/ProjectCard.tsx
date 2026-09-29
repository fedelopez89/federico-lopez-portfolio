import { useId, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Chip } from '../../ui';
import type { Project } from '../../../data/projects';
import {
  canUseViewTransition,
  isPlainClick,
  navigateWithTransition,
  projectCardShared,
} from '../../../utils/viewTransition';
import {
  CardLink,
  CardSurface,
  ImageFrame,
  Spotlight,
  SpotGrid,
  SpotGlow,
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

/** Route chunk, fetched ahead of the click so the transition rarely waits. */
const loadProjectDetail = () => import('../../../pages/ProjectDetail');
let detailPrefetched = false;
const prefetchProjectDetail = () => {
  if (detailPrefetched) return;
  detailPrefetched = true;
  loadProjectDetail().catch(() => {
    detailPrefetched = false;
  });
};

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
  const navigate = useNavigate();

  const projectTransKey = project.id.replace(/-/g, '');
  const translatedTitle = t(`projects.${projectTransKey}.title`, {
    defaultValue: project.title,
  });

  const visibleTech = project.technologies.slice(0, MAX_TECH);
  const extraCount = project.technologies.length - MAX_TECH;

  const to = `/projects/${project.id}`;
  const state = { fromPortfolio: true, fromProject: project.id };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (project.imageUrl) preloadImage(project.imageUrl);
    if (!canUseViewTransition() || !isPlainClick(e)) return;

    // Morph this card's screenshot and title into the project page. Only the
    // clicked card is named, since names must be unique in the document.
    e.preventDefault();
    navigateWithTransition(() => navigate(to, { state }), {
      shared: projectCardShared(e.currentTarget, project.id),
      // Load the route chunk first so the new snapshot is the real page.
      prepare: loadProjectDetail,
    });
  };

  return (
    <CardLink
      to={to}
      state={state}
      aria-labelledby={titleId}
      onClick={handleClick}
      onPointerEnter={prefetchProjectDetail}
      onFocus={prefetchProjectDetail}
      data-spot-card
    >
      <CardSurface>
        <Spotlight aria-hidden="true">
          <SpotGrid />
          <SpotGlow />
        </Spotlight>
        <ImageFrame data-vt-shot>
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
            <Title id={titleId} data-vt-title>
              {translatedTitle}
            </Title>
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
