import { useTranslation } from 'react-i18next';
import { useRevealOnFocus } from '@/hooks';
import {
  PROJECT_GROUPS,
  projects,
  type Project,
  type ProjectGroup,
} from '../../../data/projects';
import { fadeUpVariants, inViewProps } from '../../../styles/motion';
import ProjectCard from './ProjectCard';
import { SectionHeader } from '../shared/SectionHeader';
import { sectionTitleId } from '../shared/sectionTitleId';
import {
  ProjectsContainer,
  Group,
  GroupHeader,
  GroupTitle,
  GroupLead,
  ProjectsGrid,
  ProjectItem,
} from './Projects.styles';

/** Grid cell revealed on scroll and, as a keyboard safety net, on focus. */
const ProjectGridItem: React.FC<{ project: Project }> = ({ project }) => {
  const reveal = useRevealOnFocus();
  return (
    <ProjectItem variants={fadeUpVariants} {...inViewProps} {...reveal()}>
      <ProjectCard project={project} />
    </ProjectItem>
  );
};

const ProjectGroupSection: React.FC<{
  group: ProjectGroup;
  items: Project[];
}> = ({ group, items }) => {
  const { t } = useTranslation();
  const lead = t(`projects.groups.${group}.lead`, { defaultValue: '' });
  return (
    <Group>
      <GroupHeader variants={fadeUpVariants} {...inViewProps}>
        <GroupTitle>{t(`projects.groups.${group}.title`)}</GroupTitle>
        {lead && <GroupLead>{lead}</GroupLead>}
      </GroupHeader>
      <ProjectsGrid>
        {items.map((project) => (
          <ProjectGridItem key={project.id} project={project} />
        ))}
      </ProjectsGrid>
    </Group>
  );
};

const Projects: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ProjectsContainer>
      <SectionHeader
        index="02"
        title={t('sections.projects')}
        titleId={sectionTitleId('projects')}
        lead={t('projects.subtitle')}
      />

      {PROJECT_GROUPS.map((group) => {
        const items = projects.filter((project) => project.group === group);
        return items.length > 0 ? (
          <ProjectGroupSection key={group} group={group} items={items} />
        ) : null;
      })}
    </ProjectsContainer>
  );
};

export default Projects;
