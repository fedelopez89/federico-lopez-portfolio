import { describe, it, expect, beforeAll } from 'vitest';
import { screen } from '@testing-library/react';
import '../../../i18n/config';
import ProjectCard from './ProjectCard';
import {
  renderWithProviders,
  setupTestEnvironment,
} from '../../../test/renderWithProviders';
import type { Project } from '../../../data/projects';

const baseProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project description.',
  technologies: ['React', 'TypeScript', 'Next.js'],
  category: 'personal',
  group: 'independent',
};

describe('ProjectCard', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  it('renders the project title', () => {
    renderWithProviders(<ProjectCard project={baseProject} />, {
      withRouter: true,
    });
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders the title as an h4 so it nests under the group h3', () => {
    renderWithProviders(<ProjectCard project={baseProject} />, {
      withRouter: true,
    });
    expect(
      screen.getByRole('heading', { level: 4, name: 'Test Project' })
    ).toBeInTheDocument();
  });

  it('link href points to /projects/{id}', () => {
    renderWithProviders(<ProjectCard project={baseProject} />, {
      withRouter: true,
    });
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/projects/test-project'
    );
  });

  it('link accessible name comes from the project title', () => {
    renderWithProviders(<ProjectCard project={baseProject} />, {
      withRouter: true,
    });
    expect(screen.getByRole('link')).toHaveAccessibleName('Test Project');
  });

  it('renders all three tech badges when technologies count equals MAX_TECH', () => {
    renderWithProviders(<ProjectCard project={baseProject} />, {
      withRouter: true,
    });
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('does not render a MoreBadge when technologies count equals MAX_TECH', () => {
    renderWithProviders(<ProjectCard project={baseProject} />, {
      withRouter: true,
    });
    expect(screen.queryByText(/^\+\d/)).not.toBeInTheDocument();
  });

  it('renders MoreBadge with correct +N count when technologies exceed MAX_TECH', () => {
    const project: Project = {
      ...baseProject,
      technologies: ['React', 'TypeScript', 'Next.js', 'Redux', 'Material UI'],
    };
    renderWithProviders(<ProjectCard project={project} />, {
      withRouter: true,
    });
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('MoreBadge has role="listitem"', () => {
    const project: Project = {
      ...baseProject,
      technologies: ['React', 'TypeScript', 'Next.js', 'Redux'],
    };
    renderWithProviders(<ProjectCard project={project} />, {
      withRouter: true,
    });
    expect(screen.getByText('+1')).toHaveAttribute('role', 'listitem');
  });

  it('renders an image with a translated alt containing the title when imageUrl is provided', () => {
    const project: Project = {
      ...baseProject,
      imageUrl: '/images/test-project.webp',
    };
    renderWithProviders(<ProjectCard project={project} />, {
      withRouter: true,
    });
    expect(
      screen.getByRole('img', { name: 'Screenshot of Test Project' })
    ).toBeInTheDocument();
  });

  it('renders a placeholder (no img element) when no imageUrl is provided', () => {
    renderWithProviders(<ProjectCard project={baseProject} />, {
      withRouter: true,
    });
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('gives the +N item a label that starts with the visible text', () => {
    const project: Project = {
      ...baseProject,
      technologies: ['React', 'TypeScript', 'Next.js', 'Redux', 'Material UI'],
    };
    renderWithProviders(<ProjectCard project={project} />, {
      withRouter: true,
    });
    expect(screen.getByText('+2')).toHaveAccessibleName('+2 more technologies');
  });

  it('shows a translated NYT badge only for featured projects', () => {
    const { rerender } = renderWithProviders(
      <ProjectCard project={baseProject} />,
      {
        withRouter: true,
      }
    );
    expect(screen.queryByText('NYT feature')).not.toBeInTheDocument();
    rerender(<ProjectCard project={{ ...baseProject, featured: true }} />);
    expect(screen.getByText('NYT feature')).toBeInTheDocument();
  });
});
