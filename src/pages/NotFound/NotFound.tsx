import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '@/hooks';
import { useNoindex } from '../ProjectDetail/useNoindex';
import { useNotFoundSeo } from '../../seo/useNotFoundSeo';
import { NotFoundView } from './NotFoundView';

/** Catch-all route: served with HTTP 200 by the SPA rewrite, so it opts out of indexing. */
function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useNoindex(true);
  useNotFoundSeo();
  useDocumentTitle(`${t('notFound.title')} | ${t('header.name')}`);

  const goHome = (e: MouseEvent<HTMLAnchorElement>) => {
    const plain = !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);
    if (e.button !== 0 || !plain) return;
    e.preventDefault();
    navigate('/');
  };

  return (
    <NotFoundView
      title={t('notFound.title')}
      text={t('notFound.text')}
      ctaLabel={t('notFound.cta')}
      ctaHref="/"
      onCtaClick={goHome}
    />
  );
}

export default NotFound;
