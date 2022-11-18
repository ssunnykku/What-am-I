import axiosInstance from '../utils/axiosInstance';

export const authLoginRequest = async (
  endpoint: string,
  email: string,
  password: string,
) => {
  await axiosInstance.post(endpoint, {
    email: email,
    password: password,
  });
};
