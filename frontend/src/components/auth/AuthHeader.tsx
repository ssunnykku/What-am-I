import styled from 'styled-components';

const AuthHeader = () => {
  return (
    <AuthHeaderWrapper>
      <AuthHeaderText>여기는 제목</AuthHeaderText>
    </AuthHeaderWrapper>
  );
};

const AuthHeaderWrapper = styled.div`
  width: auto;
`;

const AuthHeaderText = styled.p`
  font-size: 1rem;
`;

export default AuthHeader;
