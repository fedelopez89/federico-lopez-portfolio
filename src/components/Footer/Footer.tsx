import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FooterContainer, FooterContent, Copyright } from './Footer.styles';

const Footer: FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <FooterContent>
        <Copyright
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {t('footer.copyright', { year: currentYear })}
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
