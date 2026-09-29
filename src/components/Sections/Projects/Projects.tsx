import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { projects } from '../../../data/projects';
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

const Projects: React.FC = () => {
  const { t } = useTranslation();
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

      <Toolbar variants={fadeUpVariants} {...inViewProps}>
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
        <ResultCount role="status" aria-live="polite" aria-atomic="true">
          {t('projects.resultCount', { count: filteredProjects.length })}
        </ResultCount>
      </Toolbar>

      {filteredProjects.length > 0 ? (
        <ProjectsGrid>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectItem
                key={project.id}
                layout="position"
                variants={fadeUpVariants}
                exit={{ opacity: 0, transition: REFLOW }}
                transition={{ layout: REFLOW }}
                {...inViewProps}
              >
                <ProjectCard project={project} />
              </ProjectItem>
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
