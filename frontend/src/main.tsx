import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

axios.defaults.headers.common[
  'Authorization'
] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjZGQzZTI5Mi1mMDhhLTQ3ZmUtODQ5ZC1jOGJkZWZjNjgxODQiLCJpYXQiOjE2Njk5ODUxNTksImV4cCI6MTY3MDU4OTk1OX0.ZagxCqCPmCVd3FGVym2HbYz03F3_jtpA4OWvdmYI_MQ`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
