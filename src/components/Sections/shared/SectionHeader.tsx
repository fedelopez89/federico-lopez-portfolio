import { FC } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Eyebrow } from '../../ui';
import {
  stackVariants,
  fadeUpVariants,
  inViewProps,
} from '../../../styles/motion';

const Header = styled(motion.header)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  }
`;

const Title = styled(motion.h2)`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.display.section};
  font-weight: 650;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.tracking.heading};
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
`;

const Lead = styled(motion.p)`
  margin: 0;
  max-width: ${({ theme }) => theme.layout.maxWidth.prose};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export interface SectionHeaderProps {
  /** Section number shown in the eyebrow, e.g. '01'. */
  index: string;
  title: string;
  titleId: string;
  /** Optional short label rendered after the index in the eyebrow. */
  label?: string;
  lead?: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  index,
  title,
  titleId,
  label,
  lead,
}) => (
  <Header variants={stackVariants} {...inViewProps}>
    <motion.div variants={fadeUpVariants}>
      <Eyebrow rule>{label ? `${index} / ${label}` : index}</Eyebrow>
    </motion.div>
    <Title id={titleId} variants={fadeUpVariants}>
      {title}
    </Title>
    {lead && <Lead variants={fadeUpVariants}>{lead}</Lead>}
  </Header>
);
