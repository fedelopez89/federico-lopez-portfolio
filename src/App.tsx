import { FC, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context';
import { Header, Main, Footer, ThemeToggle } from '@components';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

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

const App: FC = () => {
  return (
    <BrowserRouter>
      <PageTracker />
      <Routes>
        <Route
          path="/"
          element={
            <ThemeProvider>
              <Header />
              <Main />
              <Footer />
              <ThemeToggle />
            </ThemeProvider>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <ThemeProvider>
              <Suspense fallback={<div />}>
                <ProjectDetail />
              </Suspense>
            </ThemeProvider>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
