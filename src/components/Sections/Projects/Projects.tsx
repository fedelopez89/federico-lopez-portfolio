import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, useIsPresent } from 'framer-motion';
import { useRevealOnFocus } from '@/hooks';
import { projects, type Project } from '../../../data/projects';
import {
  EASE,
  fadeUpVariants,
  fadeVariants,
  inViewProps,
} from '../../../styles/motion';
import ProjectCard from './ProjectCard';
import { SectionHeader } from '../shared/SectionHeader';
import { sectionTitleId } from '../shared/sectionTitleId';
import {
  ProjectsContainer,
  Toolbar,
  FilterRow,
  FilterButton,
  ResultCount,
  ProjectsGrid,
  ProjectItem,
  EmptyState,
  EmptyTitle,
  EmptyText,
} from './Projects.styles';

/** Techs used by fewer projects than this are not offered as filters. */
const MIN_PROJECTS_PER_FILTER = 2;
const REFLOW = { duration: 0.3, ease: EASE };

/** Unique technologies, most used first, ties in order of first appearance. */
function deriveFilters(): string[] {
  const counts = new Map<string, number>();
  projects.forEach((project) =>
    new Set(project.technologies).forEach((tech) =>
      counts.set(tech, (counts.get(tech) ?? 0) + 1)
    )
  );
  return [...counts.entries()]
    .filter(([, count]) => count >= MIN_PROJECTS_PER_FILTER)
    .sort((a, b) => b[1] - a[1]) // stable sort keeps first-appearance order on ties
    .map(([tech]) => tech);
}

const TECH_FILTERS = deriveFilters();

/**
 * Grid cell. While AnimatePresence plays its exit it is inert, so a card that
 * is fading out cannot take focus or clicks. Also revealed on focus.
 */
const ProjectGridItem = forwardRef<HTMLLIElement, { project: Project }>(
  ({ project }, ref) => {
    const isPresent = useIsPresent();
    const reveal = useRevealOnFocus();
    return (
      <ProjectItem
        ref={ref}
        layout="position"
        variants={fadeUpVariants}
        exit={{ opacity: 0, transition: REFLOW }}
        transition={{ layout: REFLOW }}
        inert={!isPresent}
        {...inViewProps}
        {...reveal()}
      >
        <ProjectCard project={project} />
      </ProjectItem>
    );
  }
);
ProjectGridItem.displayName = 'ProjectGridItem';

const Projects: React.FC = () => {
  const { t, i18n } = useTranslation();
  const reveal = useRevealOnFocus();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredProjects =
    selectedFilter === null
      ? projects
      : projects.filter((project) =>
          project.technologies.includes(selectedFilter)
        );

  return (
    <ProjectsContainer>
      <SectionHeader
        index="02"
        title={t('sections.projects')}
        titleId={sectionTitleId('projects')}
        lead={t('projects.subtitle')}
      />

      <Toolbar variants={fadeUpVariants} {...inViewProps} {...reveal()}>
        <FilterRow role="group" aria-label={t('projects.filterLabel')}>
          <FilterButton
            type="button"
            $active={selectedFilter === null}
            aria-pressed={selectedFilter === null}
            onClick={() => setSelectedFilter(null)}
          >
            {t('projects.filterAll')}
          </FilterButton>
          {TECH_FILTERS.map((tech) => (
            <FilterButton
              key={tech}
              type="button"
              $active={selectedFilter === tech}
              aria-pressed={selectedFilter === tech}
              onClick={() => setSelectedFilter(tech)}
            >
              {tech}
            </FilterButton>
          ))}
        </FilterRow>
        {/* Keyed by language: switching language remounts the region with its
            text already in place, so only filter changes are announced. */}
        <ResultCount
          key={i18n.resolvedLanguage ?? i18n.language}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {t('projects.resultCount', { count: filteredProjects.length })}
        </ResultCount>
      </Toolbar>

      {filteredProjects.length > 0 ? (
        <ProjectsGrid>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectGridItem key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </ProjectsGrid>
      ) : (
        <EmptyState variants={fadeVariants} {...inViewProps}>
          <EmptyTitle>{t('projects.emptyState.title')}</EmptyTitle>
          <EmptyText>{t('projects.emptyState.description')}</EmptyText>
        </EmptyState>
      )}
    </ProjectsContainer>
  );
};

export default Projects;
