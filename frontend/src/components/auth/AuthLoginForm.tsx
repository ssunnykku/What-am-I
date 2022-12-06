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
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  return (
    <AuthFormWrapper onSubmit={onAuthLoginSubmitEvent}>
      <AuthFormInputContainer>
        <CommonMyInput
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
          placeholder="Please enter your email"
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
        />
        {errors.password && (
          <CommonErrorText>Please check your password</CommonErrorText>
        )}
      </AuthFormInputContainer>
      <AuthFormButtonContainer>
        <CommonMyButton type="submit">로그인</CommonMyButton>
        <Link to="/register">
          <CommonMyButton>회원가입</CommonMyButton>
        </Link>
      </AuthFormButtonContainer>
    </AuthFormWrapper>
  );
};

const LoginButton = styled(CommonMyButton)``;

// const AuthFormInputContainer = styled(AuthFormInputContainer)``;

export default AuthLoginForm;
