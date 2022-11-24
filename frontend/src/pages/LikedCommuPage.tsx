import React from 'react';
import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import useModal from '../hooks/modal/useModal';
import CreateModal from '../components/modal/CreateModal';

// 커뮤 프로필 사진, 커뮤 이름, 커뮤 소개, 채팅방 버튼
// 유저들이 쓴 글 목록 (사진 형태)

const LikedCommuPage = () => {
  const [isCreateOpen, handleCreateStateChange] = useModal();
  return (
    <>
      <CreateModal
        isOpen={isCreateOpen}
        onModalStateChangeEvent={handleCreateStateChange}
      ></CreateModal>
      <BigBox>
        <CommunityBox>
          <IntroBox>
            <CommuImage></CommuImage>
            <CommuNameBox>
              <CommuName>커뮤니티 이름</CommuName>
              <CommuIntro>
                커뮤니티 소개가 들어가는 칸입니다. 귀여운 내 새끼 나만 볼 수는
                없죠! 마구마구 자랑해주시길 바랍니다. 그래서 만든 커뮤니티예요.
                여러분 마구마구 자랑을 갈겨 주세요!
              </CommuIntro>
              <EditBtn>정보 수정</EditBtn>
            </CommuNameBox>
            <BtnBox>
              <ChatBtn>채팅방 입장</ChatBtn>
              <WriteBtn onClick={handleCreateStateChange}>글쓰기</WriteBtn>
            </BtnBox>
          </IntroBox>
          <SmallBox></SmallBox>
          <ContentsBox></ContentsBox>
        </CommunityBox>
      </BigBox>
    </>
  );
};

export default LikedCommuPage;

const BigBox = styled.div`
  width: 100%;
  height: 84vh;
  display: flex;
  justify-content: center;
`;

const CommunityBox = styled.div`
  border: solid 1px yellow;
  width: 60rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const IntroBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const CommuImage = styled.div`
  border: solid 1px orange;
  border-radius: 50%;
  height: 12rem;
  width: 12rem;
  margin: 1rem 2.5rem;
`;

const CommuNameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30rem;
  height: 100%;
`;

const CommuName = styled.div`
  display: flex;
  align-items: center;
  width: 25rem;
  height: 3rem;
  font-family: ${font.bold};
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
`;

const CommuIntro = styled.div`
  display: flex;
  align-items: center;
  width: 29rem;
  height: 4rem;
  font-family: ${font.normal};
  font-size: 1.02rem;
  letter-spacing: 0.1rem;
`;

const EditBtn = styled.button`
  border: none;
  width: 6rem;
  height: 2rem;
  margin-top: 1rem;
  cursor: pointer;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12.5rem;
`;

const ChatBtn = styled.button`
  width: 7rem;
  height: 4rem;
  margin-top: 3rem;
  border: none;
  cursor: pointer;
`;

const WriteBtn = styled.button`
  width: 7rem;
  height: 2.5rem;
  margin-top: 1.5rem;
  border: none;
  cursor: pointer;
  border-radius: 20px;
`;

const SmallBox = styled.div`
  border: solid 1px pink;
  height: 4rem;
  width: 100%;
`;

const SearchBox = styled.div`
  border: solid 1px black;
`;

const ContentsBox = styled.div`
  border: solid 1px blue;
  width: 60rem;
  height: 100%;
`;
