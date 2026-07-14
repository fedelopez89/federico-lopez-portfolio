import { describe, it, expect, vi, beforeAll } from 'vitest';
import { screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';
import { renderWithProviders, setupTestEnvironment } from '../../../test/renderWithProviders';
import type { Project } from '../../../data/projects';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { defaultValue?: string }) => opts?.defaultValue ?? key,
  }),
}));

const baseProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project description.',
  technologies: ['React', 'TypeScript', 'Next.js'],
  category: 'personal',
};

describe('ProjectCard', () => {
  beforeAll(() => {
    setupTestEnvironment();
  });

  it('renders the project title', () => {
    renderWithProviders(<ProjectCard project={baseProject} index={0} />, {
      withRouter: true,
    });
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('link href points to /projects/{id}', () => {
    renderWithProviders(<ProjectCard project={baseProject} index={0} />, {
      withRouter: true,
    });
    expect(screen.getByRole('link')).toHaveAttribute('href', '/projects/test-project');
  });

  it('CardLink aria-label contains the project title', () => {
    renderWithProviders(<ProjectCard project={baseProject} index={0} />, {
      withRouter: true,
    });
    expect(screen.getByRole('link')).toHaveAccessibleName(/test project/i);
  });

  it('renders all three tech badges when technologies count equals MAX_TECH', () => {
    renderWithProviders(<ProjectCard project={baseProject} index={0} />, {
      withRouter: true,
    });
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('does not render a MoreBadge when technologies count equals MAX_TECH', () => {
    renderWithProviders(<ProjectCard project={baseProject} index={0} />, {
      withRouter: true,
    });
    expect(screen.queryByText(/^\+\d/)).not.toBeInTheDocument();
  });

  it('renders MoreBadge with correct +N count when technologies exceed MAX_TECH', () => {
    const project: Project = {
      ...baseProject,
      technologies: ['React', 'TypeScript', 'Next.js', 'Redux', 'Material UI'],
    };
    renderWithProviders(<ProjectCard project={project} index={0} />, {
      withRouter: true,
    });
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('MoreBadge has role="listitem"', () => {
    const project: Project = {
      ...baseProject,
      technologies: ['React', 'TypeScript', 'Next.js', 'Redux'],
    };
    renderWithProviders(<ProjectCard project={project} index={0} />, {
      withRouter: true,
    });
    expect(screen.getByText('+1')).toHaveAttribute('role', 'listitem');
  });

  it('renders an image with the project title as alt text when imageUrl is provided', () => {
    const project: Project = {
      ...baseProject,
      imageUrl: '/images/test-project.webp',
    };
    renderWithProviders(<ProjectCard project={project} index={0} />, {
      withRouter: true,
    });
    expect(screen.getByRole('img', { name: 'Test Project' })).toBeInTheDocument();
  });

  it('renders a placeholder (no img element) when no imageUrl is provided', () => {
    renderWithProviders(<ProjectCard project={baseProject} index={0} />, {
      withRouter: true,
    });
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
