import { FC, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, type Transition } from 'framer-motion';
import { ThemeProvider } from './context';
import { Header, Main, Footer, ThemeToggle } from '@components';
import { ProjectDetailSkeleton } from './components/ui';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
} as const;

function PageTransition({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion();
  const transition: Transition = { duration: shouldReduce ? 0 : 0.15, ease: 'easeInOut' };
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

function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: location.pathname,
      page_location: window.location.href,
      page_title: document.title,
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
                <ThemeProvider>
                  <Header />
                  <Main />
                  <Footer />
                  <ThemeToggle />
                </ThemeProvider>
              </PageTransition>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <PageTransition>
                <ThemeProvider>
                  <Suspense fallback={<ProjectDetailSkeleton />}>
                    <ProjectDetail />
                  </Suspense>
                </ThemeProvider>
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
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
