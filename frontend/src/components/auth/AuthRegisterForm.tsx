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
          placeholder="이메일"
        />
        {errors.email && (
          <CommonErrorText>이메일을 확인해주세요</CommonErrorText>
        )}
      </AuthFormInputContainer>
      <AuthFormInputContainer>
        <CommonMyInput
          {...register('nickname', {
            required: true,
            minLength: 3,
            maxLength: 8,
          })}
          placeholder="닉네임(최소 3글자, 최대 8글자)"
        />
        {errors.nickname && (
          <CommonErrorText>닉네임을 확인해주세요</CommonErrorText>
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
          placeholder="비밀번호"
        />
        {errors.password && (
          <CommonErrorText>숫자,영문자,특수문자 조합 8-15자</CommonErrorText>
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
          placeholder="비밀번호 확인"
        />
        {errors.password !== errors.checkPassword && (
          <CommonErrorText>비밀번호가 일치하지 않습니다</CommonErrorText>
        )}
      </AuthFormInputContainer>
      <AuthFormButtonContainer>
        <CommonMyButton type="submit">REGISTER</CommonMyButton>
      </AuthFormButtonContainer>
    </AuthFormWrapper>
  );
};

export default AuthRegisterForm;
