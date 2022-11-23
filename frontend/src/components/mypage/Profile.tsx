import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import styled from 'styled-components';
import { CommonMyInput } from '../../assets/styles/common/commonComponentStyle';

function Profile() {
  const [userImg, setUserImg] = useState<string>('/');

  return (
    <Div>
      <Avatar sx={{ width: 80, height: 80 }} src={userImg} />
      <div>
        닉네임
        <CommonMyInput></CommonMyInput>
      </div>
      <div>
        비밀번호
        <CommonMyInput></CommonMyInput>
      </div>
      <ProfileBtn>수정</ProfileBtn>
      <ProfileBtn>삭제</ProfileBtn>
    </Div>
  );
}

const Div = styled.div`
  margin: 0 auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
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
