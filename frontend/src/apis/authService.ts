import axiosInstance from '../utils/axiosInstance';

export const authLoginRequest = async (email: string, password: string) => {
  const res = await axiosInstance.post('auth/login', {
    email: email,
    password: password,
  });
  return res.data;
};

export const authRegisterRequest = async (
  email: string,
  username: string,
  password: string,
) => {
  const res = await axiosInstance.post('auth/register', {
    email: email,
    username: username,
    password: password,
  });
  return res.data;
};
