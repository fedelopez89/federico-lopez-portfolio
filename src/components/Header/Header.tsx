import { FC } from 'react';
import { SiteNav } from '@/components/SiteNav';
import Hero from './Hero';
import { HeaderContainer } from './Header.styles';

/** Home route banner: shared navigation followed by the hero. */
const Header: FC = () => (
  <HeaderContainer id="home">
    <SiteNav variant="home" />
    <Hero />
  </HeaderContainer>
);

export default Header;
