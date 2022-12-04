import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import CommonErrorText from '../common/CommonErrorText';
import {
  CommonMyInput,
  CommonMyButton,
  AuthFormWrapper,
  AuthFormInputContainer,
  AuthFormButtonContainer,
} from '../../assets/styles/common/commonComponentStyle';
import { AuthRegisterType } from '../../types/auth/authType';

interface AuthRegisterFormProps {
  register: UseFormRegister<AuthRegisterType>;
  errors: Partial<FieldErrorsImpl<AuthRegisterType>>;
  onAuthRegisterSubmitEvent: () => void;
}

const AuthRegisterForm = ({
  register,
  errors,
  onAuthRegisterSubmitEvent,
}: AuthRegisterFormProps) => {
  return (
    <AuthFormWrapper onSubmit={onAuthRegisterSubmitEvent}>
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
          {...register('nickname', {
            required: true,
            minLength: 3,
            maxLength: 8,
          })}
          placeholder="Please enter your nicnkame"
        />
        {errors.nickname && (
          <CommonErrorText>Please check your nicnkame</CommonErrorText>
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
      <AuthFormInputContainer>
        <CommonMyInput
          {...register('checkPassword', {
            required: true,
            minLength: 8,
            maxLength: 15,
            pattern: /^.(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
          })}
          type="password"
          placeholder="Please enter your password"
        />
        {errors.password !== errors.checkPassword && (
          <CommonErrorText>Please check your password</CommonErrorText>
        )}
      </AuthFormInputContainer>
      <AuthFormButtonContainer>
        <CommonMyButton type="submit">REGISTER</CommonMyButton>
      </AuthFormButtonContainer>
    </AuthFormWrapper>
  );
};

export default AuthRegisterForm;
