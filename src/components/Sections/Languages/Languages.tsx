import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  SectionTitle,
  SectionHeader,
  SectionSubtitle,
} from '../shared/SectionTitle';

interface Language {
  name: string;
  proficiency: 'Native' | 'Advanced' | 'Intermediate' | 'Basic';
  level: number;
}

const languages: Language[] = [
  {
    name: 'Spanish',
    proficiency: 'Native',
    level: 100,
  },
  {
    name: 'English',
    proficiency: 'Advanced',
    level: 85,
  },
];

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const LanguagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const LanguageCard = styled(motion.article)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const LanguageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const LanguageName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: '🌐';
    font-size: 1.75rem;
  }
`;

const ProficiencyBadge = styled.span<{ $level: number }>`
  padding: 0.375rem 0.875rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${({ theme, $level }) =>
    $level === 100 ? `${theme.colors.primary}20` : `${theme.colors.accent}20`};
  color: ${({ theme, $level }) =>
    $level === 100 ? theme.colors.primary : theme.colors.accent};
`;

const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)<{ $level: number }>`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.accent} 100%
  );
  border-radius: 4px;
`;

const LevelText = styled.p`
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

const Languages: React.FC = () => {
  return (
    <Section id="languages" aria-label="Languages">
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          languages
        </SectionTitle>
        <SectionSubtitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Professional communication across multiple languages
        </SectionSubtitle>
      </SectionHeader>

      <LanguagesContainer>
        {languages.map((language, index) => (
          <LanguageCard
            key={language.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <LanguageHeader>
              <LanguageName>{language.name}</LanguageName>
              <ProficiencyBadge $level={language.level}>
                {language.proficiency}
              </ProficiencyBadge>
            </LanguageHeader>

            <ProgressBarContainer
              role="progressbar"
              aria-valuenow={language.level}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${language.name} proficiency`}
            >
              <ProgressBar
                $level={language.level}
                initial={{ width: 0 }}
                whileInView={{ width: `${language.level}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: index * 0.1 + 0.3,
                  ease: 'easeOut',
                }}
              />
            </ProgressBarContainer>

            <LevelText>{language.level}% Proficiency</LevelText>
          </LanguageCard>
        ))}
      </LanguagesContainer>
    </Section>
  );
};

export default Languages;
