import type { MouseEventHandler } from 'react';
import { SiteNav } from '../../components/SiteNav';
import Footer from '../../components/Footer/Footer';
import { Button, Container } from '../../components/ui';
import { PageHeader, PageMain } from '../ProjectDetail/ProjectDetail.styles';
import { NotFoundBody } from './NotFoundView.styles';

interface NotFoundViewProps {
  title: string;
  text: string;
  ctaLabel: string;
  /** Real href, kept for middle-click and copy. */
  ctaHref: string;
  /** Lets the caller keep plain clicks inside the SPA. */
  onCtaClick?: MouseEventHandler<HTMLAnchorElement>;
}

/** Page shell shared by every "nothing here" state: nav, message, way out, footer. */
export function NotFoundView({
  title,
  text,
  ctaLabel,
  ctaHref,
  onCtaClick,
}: NotFoundViewProps) {
  return (
    <>
      <PageHeader>
        <SiteNav variant="page" />
      </PageHeader>
      <PageMain id="main-content" tabIndex={-1}>
        <Container>
          <NotFoundBody>
            <h1>{title}</h1>
            <p>{text}</p>
            <Button href={ctaHref} onClick={onCtaClick}>
              {ctaLabel}
            </Button>
          </NotFoundBody>
        </Container>
      </PageMain>
      <Footer />
    </>
  );
}
