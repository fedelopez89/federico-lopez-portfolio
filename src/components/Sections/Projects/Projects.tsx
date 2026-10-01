import { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCardSpotlight, useRevealOnFocus } from '@/hooks';
import {
  COMBINED_GROUPS,
  PROJECT_GROUPS,
  projects,
  type Project,
  type ProjectGroup,
} from '../../../data/projects';
import { fadeUpVariants, inViewProps } from '../../../styles/motion';
import { isViewTransitionActive } from '../../../utils/viewTransition';
import ProjectCard from './ProjectCard';
import LeagueFinderCard from './LeagueFinderCard';
import { orderGroupItems } from './orderGroupItems';
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
const ProjectGridItem: React.FC<{ project: Project; wide?: boolean }> = ({
  project,
  wide = false,
}) => {
  const reveal = useRevealOnFocus();
  // Returning through a view transition: the card must already be visible.
  const [skipReveal] = useState(isViewTransitionActive);
  return (
    <ProjectItem
      $wide={wide}
      variants={fadeUpVariants}
      {...inViewProps}
      {...(skipReveal && { initial: false })}
      {...reveal()}
    >
      <ProjectCard project={project} variant={wide ? 'wide' : 'default'} />
    </ProjectItem>
  );
};

/** Grid cell for a group rendered as one combined card. */
const CombinedGridItem: React.FC<{ items: Project[] }> = ({ items }) => {
  const reveal = useRevealOnFocus();
  return (
    <ProjectItem $wide variants={fadeUpVariants} {...inViewProps} {...reveal()}>
      <LeagueFinderCard projects={items} />
    </ProjectItem>
  );
};

const ProjectGroupSection: React.FC<{
  group: ProjectGroup;
  items: Project[];
}> = ({ group, items }) => {
  const { t } = useTranslation();
  const titleId = useId();
  const { ordered, highlighted } = orderGroupItems(items);
  const lead = t(`projects.groups.${group}.lead`, { defaultValue: '' });
  return (
    <Group>
      <GroupHeader variants={fadeUpVariants} {...inViewProps}>
        <GroupTitle id={titleId}>
          {t(`projects.groups.${group}.title`)}
        </GroupTitle>
        {lead && <GroupLead>{lead}</GroupLead>}
      </GroupHeader>
      <ProjectsGrid aria-labelledby={titleId}>
        {COMBINED_GROUPS.includes(group) ? (
          <CombinedGridItem items={ordered} />
        ) : (
          ordered.map((project) => (
            <ProjectGridItem
              key={project.id}
              project={project}
              wide={project === highlighted}
            />
          ))
        )}
      </ProjectsGrid>
    </Group>
  );
};

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  useCardSpotlight(containerRef);

  return (
    <ProjectsContainer ref={containerRef}>
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
