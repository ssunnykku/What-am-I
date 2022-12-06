import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import {
  CommonMyInput,
  EntryBtn,
  CreateBtn,
} from '../../assets/styles/common/commonComponentStyle';
import { EditUserImg, getUserData } from '../../apis/mypageFetcher';

function Profile() {
  const [profileImg, setProfileImg] = useState<string>('/');
  const [imgPreview, setImgPreview] = useState<string>(profileImg);
  const [nickname, setNickname] = useState<string>('');

  // TODO 현재 아래 코드를 사용하면 모든 사용자의 데이터가 불러와지는데 특정 사용자의 데이터는 어떻게 불러와야되는거지?
  useEffect(() => {
    async function getData() {
      const response = await getUserData();
      console.log(response);
      // setProfileImg(response.profileImg);
      // setNickname(response.nickname);
    }
    getData();
  }, []);

  // TODO e type지정에 React.ChangeEvent<HTMLInputElement>가 아닌가?
  async function EditImg(e: any) {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setProfileImg(e.target.files[0]);
    // const response = await EditUserImg(profileImg);
    // console.log(response);
  }

  return (
    <Div>
      <ProfileImgContainer>
        <label htmlFor="ex_file">
          <Avatar
            className="btnStart"
            sx={{ width: 150, height: 150 }}
            src={imgPreview}
          />
        </label>
        <input
          type="file"
          id="ex_file"
          accept="image/jpg, image/png, image/jpeg"
          onChange={EditImg}
        />
      </ProfileImgContainer>
      <EditButton>이미지 수정</EditButton>

      <InputContainer>
        닉네임
        <CommonMyInput
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        ></CommonMyInput>
      </InputContainer>
      <ButtonContainer>
        <EditButton>수정</EditButton>
        <DeleteButton>회원 탈퇴</DeleteButton>
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

const EditButton = styled(EntryBtn)`
  width: 290px;
  margin-left: 0px;
`;

const DeleteButton = styled(CreateBtn)`
  width: 290px;
  margin-left: 0px;
`;

const ProfileImgContainer = styled.div`
  label {
    display: inline-block;
    border-radius: 100%;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }

  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default Profile;
