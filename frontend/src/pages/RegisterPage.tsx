import useAuthRegister from '../hooks/auth/useAuthRegister';
import CommonWrapper from '../components/common/CommonWrapper';
import AuthHeader from '../components/auth/AuthHeader';
import AuthRegisterForm from '../components/auth/AuthRegisterForm';

const RegisterPage = () => {
  const { register, errors, handleSubmit, handleAuthRegisterSubmit } =
    useAuthRegister();

  return (
    <CommonWrapper>
      <AuthHeader />
      <AuthRegisterForm
        register={register}
        errors={errors}
        onAuthRegisterSubmitEvent={handleSubmit(handleAuthRegisterSubmit)}
      />
    </CommonWrapper>
  );
};

export default RegisterPage;
