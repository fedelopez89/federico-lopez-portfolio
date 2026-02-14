import { FC } from 'react';
import { ThemeProvider } from './context';
import { Header, Main, Footer, ThemeToggle } from '@components';

const App: FC = () => {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
      <ThemeToggle />
    </ThemeProvider>
  );
};

export default App;
