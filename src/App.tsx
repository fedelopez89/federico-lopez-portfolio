import { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context';
import { Header, Main, Footer, ThemeToggle } from '@components';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const App: FC = () => {
  return (
    <BrowserRouter>
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
