import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip } from '../../ui';
import type { Project } from '../../../data/projects';
import {
  CardSurface,
  WideWindow,
  WindowBar,
  WindowDot,
  WindowLabel,
  ImageFrame,
  ProjectImage,
  ImagePlaceholder,
  CardBody,
  MetaRow,
  Category,
  Title,
  TechRow,
} from './ProjectCard.styles';
import {
  FinderDescription,
  FinderLinksLabel,
  FinderLinks,
  FinderLink,
  FinderArrow,
} from './LeagueFinderCard.styles';

interface LeagueFinderCardProps {
  /** Every project the card stands for; the first one is the representative. */
  projects: Project[];
}

const MAX_TECH = 4;
const IMAGE_WIDTH = 1400;
const IMAGE_HEIGHT = 740;

/**
 * One card for a group of near-identical projects (the RCX league finders).
 * It shows the first project's screenshot and links to each project's own page.
 * The card is not a link itself, so the per-project links stay valid and each
 * keeps its own focus stop.
 */
const LeagueFinderCard: React.FC<LeagueFinderCardProps> = ({ projects }) => {
  const { t } = useTranslation();
  const titleId = useId();
  const linksLabelId = useId();
  const [lead] = projects;
  const title = t('projects.leagueFinders.title');
  const visibleTech = lead.technologies.slice(0, MAX_TECH);
  const extraCount = lead.technologies.length - MAX_TECH;

  return (
    <CardSurface $wide aria-labelledby={titleId}>
      <WideWindow>
        <WindowBar aria-hidden="true">
          <WindowDot />
          <WindowDot />
          <WindowDot />
          {lead.windowLabel && <WindowLabel>{lead.windowLabel}</WindowLabel>}
        </WindowBar>
        <ImageFrame $wide>
          {lead.imageUrl ? (
            <ProjectImage
              src={lead.imageUrl}
              alt={t('projects.imageAlt', { title })}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <ImagePlaceholder aria-hidden="true" />
          )}
        </ImageFrame>
      </WideWindow>

      <CardBody $wide>
        <MetaRow>
          <Category>{t(`projects.categories.${lead.category}`)}</Category>
        </MetaRow>

        <Title id={titleId} $wide>
          {title}
        </Title>

        <FinderDescription>
          {t('projects.leagueFinders.description')}
        </FinderDescription>

        <FinderLinksLabel id={linksLabelId}>
          {t('projects.leagueFinders.linksLabel')}
        </FinderLinksLabel>
        <FinderLinks aria-labelledby={linksLabelId}>
          {projects.map((project) => {
            const league = t(`projects.leagueFinders.leagues.${project.id}`);
            return (
              <li key={project.id}>
                <FinderLink
                  to={`/projects/${project.id}`}
                  state={{ fromPortfolio: true, fromProject: project.id }}
                  aria-label={t('projects.leagueFinders.linkLabel', { league })}
                >
                  {league}
                  <FinderArrow aria-hidden="true">→</FinderArrow>
                </FinderLink>
              </li>
            );
          })}
        </FinderLinks>

        <TechRow role="list" aria-label={t('projects.technologiesUsed')}>
          {visibleTech.map((tech) => (
            <Chip key={tech} role="listitem">
              {tech}
            </Chip>
          ))}
          {extraCount > 0 && (
            <Chip
              role="listitem"
              aria-label={t('projects.moreTechnologies', { count: extraCount })}
            >
              +{extraCount}
            </Chip>
          )}
        </TechRow>
      </CardBody>
    </CardSurface>
  );
};

export default LeagueFinderCard;
