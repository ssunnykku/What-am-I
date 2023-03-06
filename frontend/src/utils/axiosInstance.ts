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
    return req;
  },
  (error) => {
    // client error
    throw new Error(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // server error
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    if (status !== 201) {
      const accessToken = Storage.getTokenItem();
      const refreshToken = Storage.getRefreshTokenItem();

      try {
        const { data } = await axios({
          method: 'post',
          url: `${BASE_URL}refreshtoken`,
          data: { accessToken, refreshToken },
        });
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;
        originalRequest.headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newAccessToken}`,
        };
        Storage.setTokenItem(newAccessToken);
        Storage.setRefreshTokenItem(newRefreshToken);

        return await axios(originalRequest);
      } catch (error: any) {
        new Error(error);
        // console.log(err);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
