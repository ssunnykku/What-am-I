import styled from 'styled-components';
import { CommonMyInput } from '../../assets/styles/common/commonComponentStyle';

const AuthLoginForm = () => {
  return (
    <AuthLoginFormWrapper>
      <AuthLoginFormInputContainer>
        <CommonMyInput type="email" placeholder="Please enter your email" />
      </AuthLoginFormInputContainer>
      <AuthLoginFormInputContainer>
        <CommonMyInput
          type="password"
          placeholder="Please enter your password"
        />
      </AuthLoginFormInputContainer>
    </AuthLoginFormWrapper>
  );
};

const AuthLoginFormWrapper = styled.form`
  width: auto;
  padding: 1rem;
`;

const AuthLoginFormInputContainer = styled.div`
  width: 100%;
`;

export default AuthLoginForm;
