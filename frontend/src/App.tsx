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
  const [response, setResponse] = useState<string>('');

  const socket = io('http://localhost:3500', {
    cors: {
      origin: '*',
    },
  });

  socket.on('test', (socket) => {
    console.log(socket);
  });

  const handleRequestSocket = () => {
    const res = socket.emit('test', {
      data: 'test socket on client',
    });
    console.log(res);
  };

  function handleChange() {
    console.log('change handle');
  }

  // useEffect(() => {
  //   const socket = io();
  //   socket.on('chat message', (data) => {
  //     console.log('message', data);
  //     // setResponse(data);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <ErrorBoundary FallbackComponent={UiErrorFallback}>
      <MyRouter />
      <GlobalStyle />
      <div>
        test socket connection
        <button onClick={handleRequestSocket}>Request</button>
        <input type="text" onChange={handleChange} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
