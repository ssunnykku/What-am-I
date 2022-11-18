import './App.css';
import { Suspense } from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import UiErrorFallback from './components/common/UiErrorFallback';

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={UiErrorFallback}>
        <Suspense>
          <Routes>
            <Route></Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
