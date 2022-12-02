import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { authRegisterRequest } from '../../apis/authService';
import { AuthRegisterType } from '../../types/auth/authType';

const useAuthRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRegisterType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleAuthRegisterSubmit = useCallback(
    async (userData: AuthRegisterType) => {
      console.log(userData);
      //   const { email, username, password } = userData;
      //   const res = await authRegisterRequest(email, username, password);
      //   console.log(res);
    },
    [],
  );

  return {
    register,
    errors,
    handleSubmit,
    handleAuthRegisterSubmit,
  };
};

export default useAuthRegister;
