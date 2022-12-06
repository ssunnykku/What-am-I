import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { authLoginRequest } from '../../apis/authService';
import { AuthCommonType } from '../../types/auth/authType';
import Storage from '../../storage/storage';

const useAuthLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCommonType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleAuthLoginSubmit = useCallback(
    async (userData: AuthCommonType) => {
      const { email, password } = userData;
      const res = await authLoginRequest(email, password);
      if (res) {
        Storage.setTokenItem(res.token);
        Storage.setUserIdItem(res.userId);
        Storage.setNicknameItem(res.nickname);
        window.location.replace('/');
      }
    },
    [],
  );

  return {
    register,
    errors,
    handleSubmit,
    handleAuthLoginSubmit,
  };
};

export default useAuthLogin;
