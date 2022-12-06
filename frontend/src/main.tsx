import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

axios.defaults.headers.common[
  'Authorization'
] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkMDEyMGRiOC04M2ZmLTQ0MTMtYjE0NS0xMmUyZTQxOGY3ZDMiLCJpYXQiOjE2Njk3MjkxNTcsImV4cCI6MTY3MDMzMzk1N30.u-o4yy_3oV7iQLWv93ICnnWtywcUeCE5Vyb9kjNqobI`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
