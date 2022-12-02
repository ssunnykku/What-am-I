import styled from 'styled-components';
import { font } from '../../assets/styles/common/fonts';

const AuthHeader = () => {
  return (
    <AuthHeaderWrapper>
      <AuthHeaderText>여기는 제목</AuthHeaderText>
    </AuthHeaderWrapper>
  );
};

const AuthHeaderWrapper = styled.div`
  font-family: ${font.bold};
  text-align: center;
  width: auto;
`;

const AuthHeaderText = styled.p`
  font-size: 1rem;
`;

export default AuthHeader;
