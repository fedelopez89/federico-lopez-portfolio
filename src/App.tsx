import { FC, lazy, Suspense, useEffect } from 'react';
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
import { useDocumentTitle } from '@/hooks';
import { ThemeProvider } from './context';
import { Header, Main, Footer } from '@components';
import { ProjectDetailSkeleton } from './components/ui';
import NotFound from './pages/NotFound';
import { titleForPath } from './utils/pageTitle';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

function PageTransition({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion();
  const transition: Transition = {
    duration: shouldReduce ? 0 : 0.15,
    ease: 'easeInOut',
  };
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
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

/** Home route content; owns the page title so it follows language changes. */
function HomePage() {
  const { t } = useTranslation();
  useDocumentTitle(homeTitle(t));
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

  return (
    <>
      <PageTracker />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <PageTransition>
                <Suspense fallback={<ProjectDetailSkeleton />}>
                  <ProjectDetail />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
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
