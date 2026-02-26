import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { projects, technologies } from '../../../data/projects';
import ProjectCard from './ProjectCard';
import {
  SectionTitle,
  SectionHeader,
  SectionSubtitle,
} from '../shared/SectionTitle';

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $isActive }) => ($isActive ? 'white' : theme.colors.text)};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primaryHover : theme.colors.primary}15;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
    opacity: 0.3;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    font-size: 0.9375rem;
  }
`;

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filteredProjects =
    selectedFilter === 'All'
      ? projects
      : projects.filter((project) =>
          project.technologies.includes(selectedFilter)
        );

  return (
    <Section id="projects" aria-label="Projects showcase">
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('sections.projects')}
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t('projects.subtitle')}
        </SectionSubtitle>
      </SectionHeader>

      <FilterContainer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        role="group"
        aria-label={t('projects.filterLabel')}
      >
        {technologies.map((tech) => (
          <FilterButton
            key={tech}
            $isActive={selectedFilter === tech}
            onClick={() => setSelectedFilter(tech)}
            aria-pressed={selectedFilter === tech}
            aria-label={`Filter by ${tech}`}
          >
            {tech}
          </FilterButton>
        ))}
      </FilterContainer>

      {filteredProjects.length > 0 ? (
        <ProjectsGrid>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </ProjectsGrid>
      ) : (
        <EmptyState
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3>{t('projects.emptyState.title')}</h3>
          <p>{t('projects.emptyState.description')}</p>
        </EmptyState>
      )}
    </Section>
  );
};

export default Projects;
