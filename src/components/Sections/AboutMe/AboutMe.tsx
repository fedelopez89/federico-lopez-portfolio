import { FC } from 'react';
import { Image } from '../../ui';
import {
  AboutMeContainer,
  Description,
  PhotoContainer,
} from './AboutMe.styles';

const AboutMe: FC = () => {
  return (
    <AboutMeContainer>
      <Description
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1>about me</h1>
        <p>
          Hi! I'm{' '}
          <strong>
            <u>Federico López</u>
          </strong>
          , a Senior Frontend Developer with 10+ years of experience in software
          engineering.
        </p>
        <br />
        <p>
          Specialized in building high-performance, scalable web applications
          using modern technologies like
          <strong> React</strong>, <strong>TypeScript</strong>, and{' '}
          <strong>Next.js</strong>. I've successfully delivered enterprise
          solutions for global companies in fintech, healthcare, and wellness
          industries.
        </p>
        <p>
          Passionate about clean code, performance optimization, and creating
          exceptional user experiences. I thrive in collaborative environments
          and enjoy mentoring teams while staying current with the latest
          frontend technologies and best practices.
        </p>
      </Description>
      <PhotoContainer
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Image
          src="./images/photo__01.jpeg"
          alt="Federico López"
          priority
          width="100%"
          height="auto"
        />
      </PhotoContainer>
    </AboutMeContainer>
  );
};

export default AboutMe;
