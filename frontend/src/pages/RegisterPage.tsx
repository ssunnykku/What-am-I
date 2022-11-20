import useAuthRegister from '../hooks/auth/useAuthRegister';
import CommonWrapper from '../components/common/CommonWrapper';
import AuthHeader from '../components/auth/AuthHeader';
import AuthRegisterForm from '../components/auth/AuthRegisterForm';

const RegisterPage = () => {
  // TODO: error가 존재하면 Modal 활성화
  // 현재는 그냥 validate 통과 안될 경우 button 활성화 안됨
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
