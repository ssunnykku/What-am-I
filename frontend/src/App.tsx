import { ErrorBoundary } from 'react-error-boundary';
import UiErrorFallback from './components/common/UiErrorFallback';
import MyRouter from './MyRouter';
import GlobalStyle from './assets/styles/GlobalStyle';

function App() {
  return (
    <ErrorBoundary FallbackComponent={UiErrorFallback}>
      <MyRouter />
      <GlobalStyle />
    </ErrorBoundary>
  );
}

export default App;
