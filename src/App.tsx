import { FC, lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  type Transition,
} from 'framer-motion';
import { type TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useHomeSeo } from './seo/useHomeSeo';
import { ThemeProvider } from './context';
import { Header, Main, Footer } from '@components';
import { ProjectDetailSkeleton } from './components/ui';
import NotFound from './pages/NotFound';
import { titleForPath } from './utils/pageTitle';
import { isViewTransitionActive } from './utils/viewTransition';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

function PageTransition({
  children,
  skip = false,
}: {
  children: React.ReactNode;
  /** A view transition owns this navigation: no fade, render in place. */
  skip?: boolean;
}) {
  const shouldReduce = useReducedMotion();
  const transition: Transition = {
    duration: shouldReduce ? 0 : 0.15,
    ease: 'easeInOut',
  };
  return (
    <motion.div
      variants={pageVariants}
      initial={skip ? false : 'initial'}
      animate="animate"
      exit="exit"
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

/**
 * Translated home title. In English it must match the <title> in index.html
 * so the pre-hydration and runtime titles are identical.
 */
const homeTitle = (t: TFunction) => t('meta.homeTitle');

/** Home route content; owns the page head so it follows language changes. */
function HomePage() {
  const { t } = useTranslation();
  useHomeSeo(homeTitle(t));
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: location.pathname,
      page_location: window.location.href,
      page_title: titleForPath(location.pathname),
    });
  }, [location.pathname]);

  return null;
}

function AppRoutes() {
  const location = useLocation();

  // When a view transition drives the navigation, the framer route fade is
  // skipped: the outgoing page must unmount at once so the snapshots are clean.
  // The latched read of isViewTransitionActive() happens only when the pathname
  // changes, i.e. during the navigation itself; the flag would already be
  // false at any later render.
  // Decided once per pathname change, so later re-renders (hash updates) do not
  // swap the wrapper and remount the page. Unsupported browsers never set it.
  const [route, setRoute] = useState({ path: location.pathname, skip: false });
  let current = route;
  if (route.path !== location.pathname) {
    current = { path: location.pathname, skip: isViewTransitionActive() };
    setRoute(current);
  }
  // The first paint must not sit under the route fade's opacity: 0. Chrome
  // ignores content painted under a fully transparent ancestor for LCP, so on
  // the initial load the page renders in place; later navigations still fade.
  const isInitialLoad = useRef(true);
  useEffect(() => {
    isInitialLoad.current = false;
  }, []);
  const { skip } = current;
  const noEnterFade = skip || isInitialLoad.current;

  const routes = (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <PageTransition skip={noEnterFade}>
            <HomePage />
          </PageTransition>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <PageTransition skip={noEnterFade}>
            <Suspense fallback={<ProjectDetailSkeleton />}>
              <ProjectDetail />
            </Suspense>
          </PageTransition>
        }
      />
      <Route
        path="*"
        element={
          <PageTransition skip={noEnterFade}>
            <NotFound />
          </PageTransition>
        }
      />
    </Routes>
  );

  return (
    <>
      <PageTracker />
      {skip ? routes : <AnimatePresence mode="wait">{routes}</AnimatePresence>}
    </>
  );
}

const App: FC = () => (
  <MotionConfig reducedMotion="user">
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  </MotionConfig>
);

export default App;
