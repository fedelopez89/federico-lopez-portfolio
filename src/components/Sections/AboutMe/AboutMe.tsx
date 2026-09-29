import { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import experienceHistory from '../../../data/experience.json';
import type { ExperienceConfig } from '@/types';
import { NYT_HREF, NYT_NAME } from '@/data/featured';
import { useRevealOnFocus } from '@/hooks';
import { calculateYearsExperience } from '@/utils/dateCalculations';
import { Eyebrow, TextLink } from '../../ui';
import {
  stackVariants,
  fadeUpVariants,
  inViewProps,
} from '../../../styles/motion';
import {
  AboutMeContainer,
  AboutMeBody,
  Description,
  FeaturedCallout,
  PublicationName,
  CalloutContext,
  FactsList,
  Fact,
  FactLabel,
  FactValue,
} from './AboutMe.styles';
import { SectionHeader } from '../shared/SectionHeader';
import { sectionTitleId } from '../shared/sectionTitleId';

const AboutMe: FC = () => {
  const { t } = useTranslation();
  const reveal = useRevealOnFocus();
  const { experiences } = experienceHistory as ExperienceConfig;

  const freelanceJob = experiences.find(
    (exp) => exp.id === 'fullstackFreelance'
  );
  const yearsExp = freelanceJob
    ? calculateYearsExperience(
        freelanceJob.start.month,
        freelanceJob.start.year
      )
    : t('aboutMe.stats.yearsFallback');

  const facts = [
    { value: yearsExp, label: t('aboutMe.stats.yearsExperience') },
    {
      value: t('aboutMe.stats.enterpriseClientsValue'),
      label: t('aboutMe.stats.enterpriseClients'),
    },
    {
      value: t('aboutMe.stats.remoteValue'),
      label: t('aboutMe.stats.remote'),
    },
  ];

  return (
    <AboutMeContainer>
      <SectionHeader
        index="01"
        title={t('sections.aboutme')}
        titleId={sectionTitleId('aboutme')}
      />
      <AboutMeBody variants={stackVariants} {...inViewProps} {...reveal()}>
        <Description variants={fadeUpVariants}>
          <p>
            <Trans i18nKey="aboutMe.intro" />
          </p>
          <p>
            <Trans i18nKey="aboutMe.experience" values={{ years: yearsExp }} />
          </p>
          <p>{t('aboutMe.passion')}</p>
        </Description>

        <FeaturedCallout variants={fadeUpVariants}>
          <Eyebrow>{t('aboutMe.featuredLabel')}</Eyebrow>
          <PublicationName>{NYT_NAME}</PublicationName>
          <CalloutContext>{t('aboutMe.featuredContext')}</CalloutContext>
          <TextLink
            href={NYT_HREF}
            external
            externalLabel={t('header.newTab')}
            arrow
          >
            {t('aboutMe.featuredCta')}
          </TextLink>
        </FeaturedCallout>

        <FactsList variants={fadeUpVariants}>
          {facts.map((fact) => (
            <Fact key={fact.label}>
              <FactLabel>{fact.label}</FactLabel>
              <FactValue>{fact.value}</FactValue>
            </Fact>
          ))}
        </FactsList>
      </AboutMeBody>
    </AboutMeContainer>
  );
};

export default AboutMe;
