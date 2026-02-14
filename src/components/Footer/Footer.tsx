import { FC } from 'react';
import contactme from '../../data/contactme.json';
import type { ContactItem } from '@/types';
import {
  FooterContainer,
  FooterContent,
  Copyright,
  SocialLinks,
  SocialItem,
  SocialLink,
} from './Footer.styles';

const Footer: FC = () => {
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
          © {currentYear} Federico López. All rights reserved.
        </Copyright>
        <SocialLinks
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {contactme.itemContacts.map((item: ContactItem, index: number) => {
            const { id, href, classname } = item;
            return (
              <SocialItem
                key={id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <SocialLink
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className={classname} aria-hidden="true" />
                </SocialLink>
              </SocialItem>
            );
          })}
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
