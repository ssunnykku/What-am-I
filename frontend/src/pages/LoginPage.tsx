import useAuthLogin from '../hooks/auth/useAuthLogin';
import CommonWrapper from '../components/common/CommonWrapper';
import AuthHeader from '../components/auth/AuthHeader';
import AuthLoginForm from '../components/auth/AuthLoginForm';

const LoginPage = () => {
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
