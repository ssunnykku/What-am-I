import { axiosInstance } from '../utils/axiosInstance';

export const authLoginRequest = async (email: string, password: string) => {
  const res = await axiosInstance.post('login', {
    email,
    password,
  });
  return res.data;
};

export const authRegisterRequest = async (
  email: string,
  nickname: string,
  password: string,
  checkPassword: string,
) => {
  const res = await axiosInstance.post('users', {
    email: email,
    nickname: nickname,
    password: password,
    checkPassword: checkPassword,
  });
  return res.data;
};
