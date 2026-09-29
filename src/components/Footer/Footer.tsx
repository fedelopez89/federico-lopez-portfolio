import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Hairline } from '../ui';
import {
  FooterRoot,
  FooterBar,
  Copyright,
  FooterLinks,
  FooterLink,
} from './Footer.styles';

const GITHUB_HREF = 'https://github.com/fedelopez89';
const LINKEDIN_HREF = 'https://www.linkedin.com/in/federicoglopez/';
const EMAIL_HREF = 'mailto:fede.lopez89@gmail.com';

const Footer: FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const newTab = t('header.newTab');

  return (
    <FooterRoot>
      <Container>
        <Hairline aria-hidden="true" />
        <FooterBar>
          <Copyright>{t('footer.copyright', { year: currentYear })}</Copyright>
          <FooterLinks aria-label={t('footer.links')}>
            <li>
              <FooterLink href={GITHUB_HREF} external externalLabel={newTab} arrow>
                GitHub
              </FooterLink>
            </li>
            <li>
              <FooterLink href={LINKEDIN_HREF} external externalLabel={newTab} arrow>
                LinkedIn
              </FooterLink>
            </li>
            <li>
              <FooterLink href={EMAIL_HREF}>{t('footer.email')}</FooterLink>
            </li>
          </FooterLinks>
        </FooterBar>
      </Container>
    </FooterRoot>
  );
};

export default Footer;
