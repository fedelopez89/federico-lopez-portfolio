import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container } from '../../ui';

export const ProjectsContainer = styled(Container)``;

export const Group = styled.div`
  & + & {
    margin-top: ${({ theme }) => theme.spacing['3xl']};
  }
`;

export const GroupHeader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const GroupTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.tracking.heading};
  color: ${({ theme }) => theme.colors.text};
`;

export const GroupLead = styled.p`
  margin: 0;
  max-width: ${({ theme }) => theme.layout.maxWidth.prose};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ProjectsGrid = styled.ul.attrs({ role: 'list' })`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const ProjectItem = styled(motion.li)<{ $wide?: boolean }>`
  min-width: 0;

  ${({ $wide }) => $wide && 'grid-column: 1 / -1;'}
`;
