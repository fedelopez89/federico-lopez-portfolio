import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import experienceHistory from '../../../data/experience.json';
import type { ExperienceConfig } from '@/types';
import { calculateYearsExperience } from '@/utils/dateCalculations';
import {
  AboutMeContainer,
  Description,
  FeaturedBadge,
  StatsContainer,
  StatBox,
  StatNumber,
  StatLabel,
} from './AboutMe.styles';
import { SectionTitle } from '../shared/SectionTitle';

const AboutMe: FC = () => {
  const { t } = useTranslation();
  const { experiences } = experienceHistory as ExperienceConfig;

  // Calculate years since freelance start (January 2019)
  const freelanceJob = experiences.find(
    (exp) => exp.id === 'fullstackFreelance'
  );
  const yearsExp = freelanceJob
    ? calculateYearsExperience(
        freelanceJob.start.month,
        freelanceJob.start.year
      )
    : '7+';

  const stats = [
    { number: yearsExp, label: t('aboutMe.stats.yearsExperience') },
    { number: '7+', label: t('aboutMe.stats.enterpriseClients') },
    { number: '100%', label: t('aboutMe.stats.remote') },
  ];

  return (
    <AboutMeContainer>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('sections.aboutme')}
      </SectionTitle>
      <Description
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p dangerouslySetInnerHTML={{ __html: t('aboutMe.intro') }} />
        <p
          dangerouslySetInnerHTML={{
            __html: t('aboutMe.experience', { years: yearsExp }),
          }}
        />
        <p>{t('aboutMe.passion')}</p>
      </Description>

      <StatsContainer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <StatBox
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          >
            <StatNumber>{stat.number}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatBox>
        ))}
      </StatsContainer>

      <FeaturedBadge
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="20"
          height="20"
        >
          <path d="M12 2L3.5 20.5L13.5 16L21 20.5L12 2Z" />
        </svg>
        <span>
          {t('aboutMe.featured').split('<link>')[0]}
          <a
            href="https://www.linkedin.com/posts/svanweelden_silicon-valley-builds-amazon-and-gmail-copycats-activity-7404333944894398465-CIyW/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The New York Times
          </a>
          {t('aboutMe.featured').split('</link>')[1]}
        </span>
      </FeaturedBadge>
    </AboutMeContainer>
  );
};

export default AboutMe;
