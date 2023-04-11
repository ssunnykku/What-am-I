import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import UiErrorFallback from './components/common/UiErrorFallback';
import MyRouter from './MyRouter';
import GlobalStyle from './assets/styles/GlobalStyle';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.VITE_PUBLIC_URL;

// export const socket = io('http://localhost:5001/', {
//   transports: ['websoket'],
//   upgrade: false,
//   forceNew: true,
// });

function App() {
  return (
    <ErrorBoundary FallbackComponent={UiErrorFallback}>
      <MyRouter />
      <GlobalStyle />
    </ErrorBoundary>
  );
}

export default App;
