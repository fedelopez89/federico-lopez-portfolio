import { FC, lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  type Transition,
} from 'framer-motion';
import i18n, { type TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from '@/hooks';
import { ThemeProvider } from './context';
import { Header, Main, Footer } from '@components';
import { ProjectDetailSkeleton } from './components/ui';
import { projects } from './data/projects';

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

/** Translated home title, e.g. "Federico López — Senior Frontend Engineer". */
const homeTitle = (t: TFunction) => `${t('header.name')} — ${t('header.role')}`;

/** Title of the page a path renders, without waiting for the lazy route. */
const titleForPath = (pathname: string): string => {
  const id = pathname.match(/^\/projects\/([^/]+)/)?.[1];
  const project = projects.find((p) => p.id === id);
  return project ? `${project.title} | Federico López` : homeTitle(i18n.t);
};

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
          <Route path="*" element={<Navigate to="/" replace />} />
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
