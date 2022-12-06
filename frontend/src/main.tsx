import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

axios.defaults.headers.common[
  'Authorization'
] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZmFmMTNiNi1jODZiLTRjNGUtYTVlMS00NzIzMDQ2NGQxNGYiLCJpYXQiOjE2NzAzMDMwODcsImV4cCI6MTY3MDkwNzg4N30.3aPs27CKFw6yb44LB3PDnpWKd-zVtZU5dG9rZntdJ-4`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
