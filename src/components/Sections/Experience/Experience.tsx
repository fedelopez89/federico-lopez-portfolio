import { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import experienceHistory from '../../../data/experience.json';
import type { ExperienceConfig, Experience as ExperienceType } from '@/types';
import {
  calculateDuration,
  formatMonthYear,
  toDateTimeValue,
} from '@/utils/dateCalculations';
import { useRevealOnFocus } from '@/hooks';
import { fadeUpVariants, inViewProps } from '../../../styles/motion';
import { SectionHeader } from '../shared/SectionHeader';
import { sectionTitleId } from '../shared/sectionTitleId';
import {
  ExperienceContainer,
  Timeline,
  TimelineItem,
  Meta,
  MetaDates,
  MetaLine,
  Details,
  Role,
  Company,
  CompanyLink,
  CompanyName,
  Notes,
} from './Experience.styles';

const Experience: FC = () => {
  const { t, i18n } = useTranslation();
  const reveal = useRevealOnFocus();
  const locale = i18n.resolvedLanguage ?? i18n.language;
  const { experiences } = experienceHistory as ExperienceConfig;

  const getLocation = (exp: ExperienceType): string => {
    const { place } = exp;
    return place.remote
      ? t('time.remote')
      : `${place.province}, ${place.country}`;
  };

  const renderDates = ({ start, end }: ExperienceType) => (
    <>
      <time dateTime={toDateTimeValue(start.month, start.year)}>
        {formatMonthYear(start.month, start.year, locale)}
      </time>
      {' – '}
      {end.active ? (
        <span>{t('time.present')}</span>
      ) : (
        <time dateTime={toDateTimeValue(end.month, end.year)}>
          {formatMonthYear(end.month, end.year, locale)}
        </time>
      )}
    </>
  );

  return (
    <ExperienceContainer>
      <SectionHeader
        index="03"
        title={t('sections.experience')}
        titleId={sectionTitleId('experience')}
      />
      <Timeline>
        {experiences.map((experience) => {
          const { id, company, end } = experience;
          const companyName = t(`experience.${id}.company`);
          return (
            <TimelineItem
              key={id}
              $current={end.active}
              variants={fadeUpVariants}
              {...inViewProps}
              {...reveal(id)}
            >
              <Meta>
                <MetaDates>{renderDates(experience)}</MetaDates>
                <MetaLine>
                  {calculateDuration(experience, t) || t('time.lessThanMonth')}
                </MetaLine>
                <MetaLine>{getLocation(experience)}</MetaLine>
              </Meta>
              <Details>
                <Role>{t(`experience.${id}.role`)}</Role>
                <Company>
                  {company.href ? (
                    <CompanyLink
                      href={company.href}
                      external
                      externalLabel={t('header.newTab')}
                      arrow
                    >
                      {companyName}
                    </CompanyLink>
                  ) : (
                    <CompanyName>{companyName}</CompanyName>
                  )}
                </Company>
                <Notes>
                  <Trans i18nKey={`experience.${id}.notes`} />
                </Notes>
              </Details>
            </TimelineItem>
          );
        })}
      </Timeline>
    </ExperienceContainer>
  );
};

export default Experience;
