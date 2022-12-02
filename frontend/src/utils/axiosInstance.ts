import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

axiosInstance.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    // client error
    throw new Error(error);
  },
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    // server error
    throw new Error(error);
  },
);

export default axiosInstance;
