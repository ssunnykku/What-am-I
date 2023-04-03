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

  // TODO 네트워크탭에 500에러 응답은 오는데 이걸 프론트에서 어떻게 꺼내쓰지?
  const handleAuthLoginSubmit = useCallback(
    async (userData: AuthCommonType) => {
      const { email, password } = userData;
      try {
        const res = await authLoginRequest(email, password);
        Storage.setTokenItem(res.data.token);
        Storage.setUserIdItem(res.data.userId);
        Storage.setNicknameItem(res.data.nickname);
        Storage.setRefreshTokenItem(res.data.refreshToken);
        window.location.replace('/');
      } catch (e: any) {
        console.log(e);
        window.alert(e.response.data.message);
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
