import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import CommonErrorText from '../common/CommonErrorText';
import {
  CommonMyInput,
  CommonMyButton,
  AuthFormWrapper,
  AuthFormInputContainer,
  AuthFormButtonContainer,
} from '../../assets/styles/common/commonComponentStyle';
import { AuthCommonType } from '../../types/auth/authType';
import { authLoginRequest } from '../../apis/authService';
import { useState } from 'react';
import Storage from '../../storage/storage';

interface AuthLoginFormProps {
  register: UseFormRegister<AuthCommonType>;
  errors: Partial<FieldErrorsImpl<AuthCommonType>>;
  onAuthLoginSubmitEvent: () => void;
}

const AuthLoginForm = ({
  register,
  errors,
  onAuthLoginSubmitEvent,
}: AuthLoginFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function onLogin(e: any) {
    e.preventDefault();
    const response = await authLoginRequest(email, password);
    Storage.setTokenItem(response.token);
    Storage.setUserIdItem(response.userId);
  }
  return (
    <AuthFormWrapper onSubmit={onLogin}>
      <AuthFormInputContainer>
        <CommonMyInput
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          placeholder="Please enter your email"
          onChange={(e) => (
            setEmail(e.target.value), console.log(e.target.value)
          )}
        />
        {errors.email && (
          <CommonErrorText>Please check your email</CommonErrorText>
        )}
      </AuthFormInputContainer>
      <AuthFormInputContainer>
        <CommonMyInput
          {...register('password', {
            required: true,
            minLength: 8,
            maxLength: 15,
            pattern: /^.(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
          })}
          type="password"
          placeholder="Please enter your password"
          onChange={(e) => (
            setPassword(e.target.value), console.log(e.target.value)
          )}
        />
        {errors.password && (
          <CommonErrorText>Please check your password</CommonErrorText>
        )}
      </AuthFormInputContainer>
      <AuthFormButtonContainer>
        <CommonMyButton type="submit">LOGIN</CommonMyButton>
      </AuthFormButtonContainer>
    </AuthFormWrapper>
  );
};

export default AuthLoginForm;
