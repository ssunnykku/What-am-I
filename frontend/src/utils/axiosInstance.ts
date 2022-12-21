import axios from 'axios';
import Storage from '../storage/storage';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Storage.getTokenItem()}`,
  },
  timeout: 3000,
});

axiosInstance.interceptors.request.use(
  (req) => {
    // req.headers = {
    //   'Autorization' : `Bearer ${sessionStorage.getItem('userToken')}`
    // }
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
    throw error;
  },
);

export default axiosInstance;
