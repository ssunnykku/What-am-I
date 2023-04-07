import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import UiErrorFallback from './components/common/UiErrorFallback';
import MyRouter from './MyRouter';
import GlobalStyle from './assets/styles/GlobalStyle';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// export const socket = io('http://localhost:5001/', {
//   transports: ['websoket'],
//   upgrade: false,
//   forceNew: true,
// });

function App() {
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    const socket = io(BASE_URL);
    socket.on('FromAPI', (data) => {
      console.log(data);
      // setResponse(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ErrorBoundary FallbackComponent={UiErrorFallback}>
      <MyRouter />
      <GlobalStyle />
    </ErrorBoundary>
  );
}

export default App;
