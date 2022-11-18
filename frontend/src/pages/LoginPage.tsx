import CommonWrapper from '../components/common/CommonWrapper';
import AuthHeader from '../components/auth/AuthHeader';
import AuthLoginForm from '../components/auth/AuthLoginForm';

const LoginPage = () => {
  return (
    <CommonWrapper>
      <AuthHeader />
      <AuthLoginForm />
    </CommonWrapper>
  );
};
export default LoginPage;
