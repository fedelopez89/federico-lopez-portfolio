import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import experienceHistory from '../../../data/experience.json';
import type { ExperienceConfig, Experience as ExperienceType } from '@/types';
import { calculateDuration } from '@/utils/dateCalculations';
import { SectionTitle } from '../shared/SectionTitle';
import {
  ExperienceContainer,
  Header,
  DownloadButton,
  Timeline,
  ExperienceCard,
  DateAndLocation,
  Details,
} from './Experience.styles';

const Experience: FC = () => {
  const { t } = useTranslation();
  const { experiences } = experienceHistory as ExperienceConfig;

  const getDateRange = (exp: ExperienceType): string => {
    const { start, end } = exp;
    const startMonth = t(`months.${start.month}`);
    const endDate = end.active
      ? t('time.present')
      : `${t(`months.${end.month}`)} ${end.year}`;
    const duration = calculateDuration(exp);
    return `${startMonth} ${start.year} - ${endDate} (${duration})`;
  };

  const getLocation = (exp: ExperienceType): string => {
    const { place } = exp;
    return place.remote
      ? t('time.remote')
      : `${place.province}, ${place.country}`;
  };

  return (
    <ExperienceContainer>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('sections.experience')}
      </SectionTitle>
      <Header>
        <DownloadButton
          href="./pdf/Resume_LOPEZ_Federico.pdf"
          download="Resume_LOPEZ_Federico.pdf"
          target="_blank"
          rel="noreferrer"
          aria-label="Download Resume PDF"
        >
          <svg
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
          </svg>
          {t('buttons.downloadResume')}
        </DownloadButton>
      </Header>
      <Timeline>
        {experiences.map((experience, index) => {
          const { id, company } = experience;
          return (
            <ExperienceCard
              key={id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <DateAndLocation>
                <h5>{getDateRange(experience)}</h5>
                <h6>{getLocation(experience)}</h6>
              </DateAndLocation>
              <Details>
                <h4>{t(`experience.${id}.role`)}</h4>
                <h5>
                  {company.href ? (
                    <a href={company.href} target="_blank" rel="noreferrer">
                      {t(`experience.${id}.company`)}
                    </a>
                  ) : (
                    t(`experience.${id}.company`)
                  )}
                </h5>
                <p>{t(`experience.${id}.notes`)}</p>
              </Details>
            </ExperienceCard>
          );
        })}
      </Timeline>
    </ExperienceContainer>
  );
};

export default Experience;
