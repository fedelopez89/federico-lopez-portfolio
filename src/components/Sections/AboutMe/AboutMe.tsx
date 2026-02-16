import { FC } from 'react';
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
    { number: yearsExp, label: 'Years Experience' },
    { number: '7+', label: 'Enterprise Clients' },
    { number: '100%', label: 'Remote' },
  ];

  return (
    <AboutMeContainer>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        about me
      </SectionTitle>
      <Description
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p>
          Hi! I'm <strong>Federico López</strong>, a Senior Frontend Engineer
          specializing in building <strong>high-performance</strong>,{' '}
          <strong>scalable</strong>, and <strong>user-centric</strong> web
          applications with <strong>React</strong>, <strong>TypeScript</strong>,
          and <strong>Next.js</strong>.
        </p>
        <p>
          With <strong>{yearsExp} years of IT experience</strong> and{' '}
          <strong>7+ years focused on modern frontend development</strong>, I've
          delivered impactful solutions for global companies in wellness,
          sports, fintech, and healthcare—reaching millions of users worldwide.
        </p>
        <p>
          Passionate about clean architecture, reusable components, and solving
          complex UX challenges. I thrive in remote Agile environments,
          collaborating with cross-functional teams to drive product excellence.
        </p>
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
          Featured in{' '}
          <a
            href="https://www.linkedin.com/posts/svanweelden_silicon-valley-builds-amazon-and-gmail-copycats-activity-7404333944894398465-CIyW/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The New York Times
          </a>
        </span>
      </FeaturedBadge>
    </AboutMeContainer>
  );
};

export default AboutMe;
