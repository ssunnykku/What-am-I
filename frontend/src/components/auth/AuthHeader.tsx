import styled from 'styled-components';
import { font } from '../../assets/styles/common/fonts';

const AuthHeader = () => {
  return (
    <AuthHeaderWrapper>
      <AuthHeaderText>WELCOME</AuthHeaderText>
      <AuthHeaderText2>나는뭐개🐶</AuthHeaderText2>
    </AuthHeaderWrapper>
  );
};

const AuthHeaderWrapper = styled.div`
  font-family: ${font.bold};
  text-align: center;
  width: auto;
`;

const AuthHeaderText = styled.p`
  padding-top: 10rem;
  padding-bottom: 2rem;
  font-size: 3rem;
`;

const AuthHeaderText2 = styled.p`
  font-size: 3rem;
  padding-bottom: 1rem;
`;

export default AuthHeader;
