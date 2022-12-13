import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, Modal } from '@mui/material';

import {
  CommonMyInput,
  EntryBtn,
  CreateBtn,
  CommonMyButton,
} from '../../assets/styles/common/commonComponentStyle';
import {
  EditUserData,
  EditUserImg,
  getUserData,
} from '../../apis/mypageFetcher';
import Storage from '../../storage/storage';

function Profile() {
  const [open, setOpen] = useState(false);
  const [profileImg, setProfileImg] = useState<string>('/');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getData() {
      const response = await getUserData();
      setProfileImg(response.profileImg);
      setNickname(response.nickname);
    }
    getData();
  }, []);

  // TODO e type지정에 React.ChangeEvent<HTMLInputElement>가 아닌가?
  async function EditImg(e: any) {
    setProfileImg(URL.createObjectURL(e.target.files[0]));
    const response = await EditUserImg(e.target.files[0]);
    console.log(response);
  }

  async function EditData(e: any) {
    e.preventDefault();
    try {
      const response = await EditUserData(nickname, password);
      window.alert('성공적으로 수정되었습니다.');
      Storage.setNicknameItem(response.data.nickname);
      location.reload();
    } catch (e) {
      console.log(e);
      window.alert('비밀번호를 확인해주세요.');
    }
  }

  return (
    <Div>
      <ProfileImgContainer>
        <label htmlFor="ex_file">
          <Avatar
            className="btnStart"
            sx={{ width: 150, height: 150 }}
            src={profileImg}
          />
          <div className="wrapper">수정</div>
        </label>
        <input
          hidden
          type="file"
          id="ex_file"
          accept="image/jpg, image/png, image/jpeg"
          onChange={EditImg}
        />
      </ProfileImgContainer>

      <InputContainer>
        닉네임
        <CommonMyInput
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        ></CommonMyInput>
      </InputContainer>
      <ButtonContainer>
        <EditButton onClick={handleOpen}>수정</EditButton>
        {/* <EditButton onClick={EditData}>수정</EditButton> */}
        <DeleteButton>회원 탈퇴</DeleteButton>
      </ButtonContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* 닉네임 수정버튼 클릭 시 모달창 */}
        <ModalContainer>
          <FormWrapper onSubmit={EditData}>
            비밀번호를 입력해주세요{' '}
            <CommonMyInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></CommonMyInput>
            <EditButton style={{ width: '100px' }} type="submit">
              수정
            </EditButton>
          </FormWrapper>
        </ModalContainer>
      </Modal>
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
    position: relative;
    display: inline-block;
    border-radius: 100%;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  .wrapper {
    display: none;
    color: white;
  }

  :hover {
    .wrapper {
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 100%;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 150px;
  padding: 20px 100px;
  border: 1px solid #000;
  background-color: white;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export default Profile;
