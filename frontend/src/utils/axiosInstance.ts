import axios from 'axios';

// TODO: env

const axiosInstance = axios.create({
  baseURL: '여기는 기본 URL자리',
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
