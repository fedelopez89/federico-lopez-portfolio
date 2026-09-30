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
import { RESUME_FILENAME, RESUME_HREF } from '../../../data/resume';
import { Button } from '../../ui';
import { fadeUpVariants, inViewProps } from '../../../styles/motion';
import { SectionHeader } from '../shared/SectionHeader';
import { sectionTitleId } from '../shared/sectionTitleId';
import {
  ExperienceContainer,
  Actions,
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
  FileType,
} from './Experience.styles';

const DownloadIcon = () => (
  <svg
    width="18"
    height="18"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  </svg>
);

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
      <Actions
        variants={fadeUpVariants}
        {...inViewProps}
        {...reveal('actions')}
      >
        <Button
          variant="secondary"
          size="md"
          href={RESUME_HREF}
          download={RESUME_FILENAME}
          icon={<DownloadIcon />}
        >
          {t('buttons.downloadResume')}
          <FileType>{t('buttons.resumeFileType')}</FileType>
        </Button>
      </Actions>
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
