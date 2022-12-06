import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

axios.defaults.headers.common[
  'Authorization'
] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNDMzNTU0MS0zYTg1LTQyOTgtYjdhZC1hZGRmZWY4MTVmY2UiLCJpYXQiOjE2NzAyOTg5MzQsImV4cCI6MTY3MDkwMzczNH0.gq6AMfIx0oIMd1L7I3uxTTUSPGUER8z4Inw9AQRTF28`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
