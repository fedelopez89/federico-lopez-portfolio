import { FC, useMemo } from 'react';
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
  const { educations } = educationHistory as EducationConfig;

  const educationItems = useMemo(
    () =>
      educations.map((education, index) => {
        const { id, title, institute, start, end, place } = education;
        const dateRange = `${start.month} ${start.year} - ${end.month} ${end.year}`;
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
              <h5>{dateRange}</h5>
              <h6>{location}</h6>
            </DateAndLocation>
            <Details>
              <h4>{title}</h4>
              <h5>
                <a href={institute.href} target="_blank" rel="noreferrer">
                  {institute.name}
                </a>
              </h5>
            </Details>
          </EducationCard>
        );
      }),
    [educations]
  );

  return (
    <EducationContainer>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        education
      </SectionTitle>
      <Timeline>{educationItems}</Timeline>
    </EducationContainer>
  );
};

export default Education;
