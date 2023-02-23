import react, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../assets/styles/common/palette';
import { font } from '../../assets/styles/common/fonts';
import useModal from '../../hooks/modal/useModal';
import ToggleModal from '../modal/ToggleModal';
import DoneIcon from '@mui/icons-material/Done';
import { CurrentCommuityProps } from '../modal/CommuContentsModal';
import { ContentsProfile } from '../../assets/styles/common/commonComponentStyle';
import { postCommuRequest } from '../../apis/communityFetcher';

const ProfileCard = (props: CurrentCommuityProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [isOpen, modalHandler] = useModal();

  const onClickCheckBtn = async () => {
    // setChecked((prev) => !prev);

    const res = await postCommuRequest(`friends/${props.commuPost?.id}`);

    console.log(res);
  };

  return (
    <>
      <ProfileContainer onClick={modalHandler}>
        <ContentsProfile className="profile">
          <img src={props.commuPost?.profileImg} />
        </ContentsProfile>
      </ProfileContainer>
      <ToggleModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <ProfileBox onClick={(e) => e.stopPropagation()}>
          <ProfileName>
            <div className="img">
              <img src={props.commuPost?.profileImg} />
            </div>
            <div className="nickname">{props.commuPost?.nickname}</div>
          </ProfileName>
          <ProfileBtn onClick={onClickCheckBtn}>
            {checked ? <DoneIcon style={{ color: '#2d98da' }} /> : '친구 추가'}
          </ProfileBtn>
          <ProfileBtn>1:1 메시지 보내기</ProfileBtn>
        </ProfileBox>
      </ToggleModal>
    </>
  );
};

export default ProfileCard;

const ProfileContainer = styled.div``;

const ProfileBox = styled.div`
  top: 5%;
  left: 59%;
  position: absolute;
  width: 12rem;
  height: 11rem;
  background-color: ${theme.backColor};
  border-radius: 10px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px;
`;

const ProfileName = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px 8px 10px;
  /* background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.05) 52%,
    transparent 48%
  ); */
  border-bottom: solid 0.1px ${theme.boldColor};

  .img {
    width: 60px;
    height: 60px;
    border: solid 1px gray;
    border-radius: 50%;
    display: flex;
    position: relative;
    overflow: hidden;

    img {
      position: absolute;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .nickname {
    margin-left: 15px;
    font-size: 16px;
    font-family: ${font.bold};
  }
`;

const ProfileBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  margin-top: 5px;
  border-radius: 5px;
  font-size: 14px;
  /* background-color: rgba(0, 0, 0, 0.05); */
  border: solid 1px ${theme.boldColor};

  :hover {
    border: solid 1px #87c3ff;
    color: ${theme.pointColor};
    cursor: pointer;
  }
`;
