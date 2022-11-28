import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import styled from 'styled-components';
import { CommonMyInput } from '../../assets/styles/common/commonComponentStyle';

function Profile() {
  const [userImg, setUserImg] = useState<string>('/');

  return (
    <Div>
      <Avatar sx={{ width: 150, height: 150 }} src={userImg} />
      <InputContainer>
        닉네임
        <CommonMyInput></CommonMyInput>
        비밀번호
        <CommonMyInput></CommonMyInput>
      </InputContainer>
      <ButtonContainer>
        <ProfileBtn>수정</ProfileBtn>
        <ProfileBtn>삭제</ProfileBtn>
      </ButtonContainer>
    </Div>
  );
}

const Div = styled.div`
  margin: 0 auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 30px;
`;

const InputContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ProfileBtn = styled.button`
  width: 50%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  cursor: pointer;
  border-radius: 10px;
  background-color: white;
  border: 2px solid black;
`;

export default Profile;
