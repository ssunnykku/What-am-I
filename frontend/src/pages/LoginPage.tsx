import useAuthLogin from '../hooks/auth/useAuthLogin';
import CommonWrapper from '../components/common/CommonWrapper';
import AuthHeader from '../components/auth/AuthHeader';
import AuthLoginForm from '../components/auth/AuthLoginForm';

const LoginPage = () => {
  // TODO: error가 존재하면 Modal 활성화
  // 현재는 그냥 validate 통과 안될 경우 button 활성화 안됨
  const { register, errors, handleSubmit, handleAuthLoginSubmit } =
    useAuthLogin();

  return (
    <CommonWrapper>
      <AuthHeader />
      <AuthLoginForm
        register={register}
        errors={errors}
        onAuthLoginSubmitEvent={handleSubmit(handleAuthLoginSubmit)}
      />
    </CommonWrapper>
  );
};
export default LoginPage;
