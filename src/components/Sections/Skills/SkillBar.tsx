import { FC, memo } from 'react';
import {
  SkillBarContainer,
  SkillHeader,
  SkillName,
  SkillLevel,
  ProgressBarContainer,
  ProgressBarFill,
} from './SkillBar.styles';

interface SkillBarProps {
  name: string;
  level: number;
  className?: string;
}

const SkillBar: FC<SkillBarProps> = ({ name, level }) => {
  return (
    <SkillBarContainer
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <SkillHeader>
        <SkillName>{name}</SkillName>
        <SkillLevel>{level}%</SkillLevel>
      </SkillHeader>
      <ProgressBarContainer>
        <ProgressBarFill
          $level={level}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </ProgressBarContainer>
    </SkillBarContainer>
  );
};

export default memo(SkillBar);
