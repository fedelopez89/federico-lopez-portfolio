import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import educationHistory from '../../../data/education.json';
import type { EducationConfig } from '@/types';
import { SectionTitle } from '../shared/SectionTitle';
import {
  EducationContainer,
  Timeline,
  EducationCard,
  DateAndLocation,
  Details,
} from './Education.styles';

const Education: FC = () => {
  const { t } = useTranslation();
  const { educations } = educationHistory as EducationConfig;

  const educationItems = useMemo(
    () =>
      educations.map((education, index) => {
        const { id, start, end, place } = education;
        const startMonth = t(`months.${start.month}`);
        const endMonth = t(`months.${end.month}`);
        const dateRange = `${startMonth} ${start.year} - ${endMonth} ${end.year}`;
        const location = `${place.province}, ${place.country}`;

        return (
          <EducationCard
            key={id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <DateAndLocation>
              <p>{dateRange}</p>
              <p>{location}</p>
            </DateAndLocation>
            <Details>
              <h3>{t(`education.${id}.title`)}</h3>
              <h4>
                <a
                  href={education.institute.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t(`education.${id}.institute`)}
                </a>
              </h4>
            </Details>
          </EducationCard>
        );
      }),
    [educations, t]
  );

  return (
    <EducationContainer>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('sections.education')}
      </SectionTitle>
      <Timeline>{educationItems}</Timeline>
    </EducationContainer>
  );
};

export default Education;
