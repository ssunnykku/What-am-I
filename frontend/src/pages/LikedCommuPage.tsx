import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import useModal from '../hooks/modal/useModal';
import ResultCard from '../components/reviewBoard/ResultCard';
import MyModal from '../components/modal/MyModal';
import WritingEditor from '../components/reviewBoard/WritingEditor';
import { CommonComponentType } from '../types/common/commonComponentType';

const LikedCommuPage = ({ children }: CommonComponentType) => {
  const [isCreateOpen, handleCreateStateChange] = useModal();
  // const [isContentsOpen, handelContentsStateChange] = useModal();
  return (
    <>
      <MyModal
        isOpen={isCreateOpen}
        onModalStateChangeEvent={handleCreateStateChange}
      >
        <WritingEditor>{children}</WritingEditor>
      </MyModal>
      {/* <Mymodal
        isOpen={isContentsOpen}
        onModalStateChangeEvent={handelContentsStateChange}
      ><ContentsViewer></ContentsViewer></Mymodal> */}
      <BigBox>
        <CommunityBox>
          <IntroBox>
            <ImageBox></ImageBox>
            <NameBox>
              <CommuName>커뮤니티 이름</CommuName>
              <CommuIntro>
                커뮤니티 소개가 들어가는 칸입니다. 귀여운 내 새끼 나만 볼 수는
                없죠! 마구마구 자랑해주시길 바랍니다. 그래서 만든 커뮤니티예요.
                여러분 마구마구 자랑을 갈겨 주세요!
              </CommuIntro>
              <EditBtn>정보 수정</EditBtn>
            </NameBox>
            <BtnBox>
              <ChatBtn>채팅방 입장</ChatBtn>
              <WriteBtn onClick={handleCreateStateChange}>글쓰기</WriteBtn>
            </BtnBox>
          </IntroBox>
          <SmallBox>
            <SearchBox>검색창</SearchBox>
            <InfoBox>
              <div>좋아요 수</div>
              <div>게시물 수</div>
            </InfoBox>
          </SmallBox>
          <ContentsBox>
            <ResultCard></ResultCard>
          </ContentsBox>
          <PaginationBox>페이지네이션 자리</PaginationBox>
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
  font-family: ${font.normal};
`;

const IntroBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CommunityBox = styled.div`
  background-color: #f2f2f2;
  width: 60rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageBox = styled.div`
  border: solid 1px black;
  border-radius: 50%;
  height: 8rem;
  width: 8rem;
  margin: 0rem 2.5rem;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30rem;
  height: 75%;
`;

const CommuName = styled.div`
  display: flex;
  align-items: center;
  width: 25rem;
  height: 3rem;
  font-family: ${font.bold};
  font-size: 1.3rem;
  letter-spacing: 0.1rem;
`;

const CommuIntro = styled.div`
  display: flex;
  align-items: center;
  width: 30rem;
  height: 4rem;
  font-family: ${font.normal};
  font-size: 0.85rem;
  line-height: 1.3rem;
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
  margin-left: 1rem;
`;

const ChatBtn = styled.button`
  position: relative;
  width: 8rem;
  height: 3rem;
  border-radius: 10px;
  border: none;
  background-color: lightgray;

  :after {
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid lightgray;
    content: '';
    position: absolute;
    top: -10px;
    left: 5.5rem;
  }
`;

const WriteBtn = styled.button`
  width: 7rem;
  height: 2rem;
  margin-top: 1.2rem;
  border: none;
  cursor: pointer;
  border-radius: 20px;
`;

const SmallBox = styled.div`
  height: 2rem;
  width: 55rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const SearchBox = styled.div`
  border: solid 1px black;
  height: 1.5rem;
  width: 25rem;
`;

const InfoBox = styled.div`
  height: 2rem;
  width: 14rem;
  display: flex;
  flex-direction: row;
  div {
    margin-left: 1rem;
  }
`;

const ContentsBox = styled.div`
  width: 60rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

const PaginationBox = styled.div`
  border: solid 1px black;
  height: 2rem;
  width: 35rem;
  margin-top: 0.7rem;
  position: absolute;
  bottom: 3%;
`;
