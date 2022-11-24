import styled, { keyframes } from 'styled-components';
import useModal from '../hooks/modal/useModal';
import { CommonComponentType } from '../types/common/commonComponentType';
import ResultCard from '../components/reviewBoard/ResultCard';
import { font } from '../assets/styles/common/fonts';
import MyModal from '../components/modal/MyModal';
import WritingEditor from '../components/reviewBoard/WritingEditor';
import ContentsViewer from '../components/reviewBoard/ContentsViewer';

const ReviewBoardPage = ({ children }: CommonComponentType) => {
  const [isCreateOpen, handleCreateStateChange] = useModal();
  const [isContentsOpen, handleContentsModalStateChange] = useModal();

  return (
    <>
      <MyModal
        isOpen={isCreateOpen}
        onModalStateChangeEvent={handleCreateStateChange}
      >
        <WritingEditor>{children}</WritingEditor>
      </MyModal>
      <MyModal
        isOpen={isContentsOpen}
        onModalStateChangeEvent={handleContentsModalStateChange}
      >
        <ContentsViewer>{children}</ContentsViewer>
      </MyModal>
      <BoardBox>
        <BoardHeader>
          사람들과 AI 분석 결과를 공유해보세요.
          <CreateBtn onClick={handleCreateStateChange}>글쓰기</CreateBtn>
        </BoardHeader>
        <BoardContent>
          <SlideLeftBtn></SlideLeftBtn>
          <CardBox>
            <button onClick={handleContentsModalStateChange}>결과 카드</button>
            <ResultCard></ResultCard>
          </CardBox>
          <SlideRightBtn></SlideRightBtn>
          <SearchBox>검색창</SearchBox>
        </BoardContent>
      </BoardBox>
    </>
  );
};

export default ReviewBoardPage;

const animation = keyframes`
  50% {
    transform: scale(1.05);
  }
`;

const BoardBox = styled.div`
  width: 100%;
  height: 80vh;
  font-family: ${font.normal};
`;

const BoardHeader = styled.div`
  font-size: 1.15rem;
  display: flexbox;
  justify-content: center;
  margin-top: 1.8rem;
  letter-spacing: 1px;
`;

const CreateBtn = styled.button`
  margin-left: 2rem;
  height: 2.5rem;
  width: 7rem;
  border: none;
  outline: non1e;
  border-radius: 50px;
  cursor: pointer;
  font-family: ${font.bold};
  font-size: 1rem;
  :hover {
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-name: ${animation};
  }
`;

const BoardContent = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  align-items: center;
`;

const CardBox = styled.div`
  display: flexbox;
  justify-content: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 73rem;
  height: 100%;
  margin-top: 1.25rem;
`;

const SearchBox = styled.div`
  width: 25rem;
  height: 2rem;
  position: absolute;
  border: solid 1px black;
  bottom: 5%;
`;

const SlideRightBtn = styled.div`
  width: 0;
  height: 0;
  border-bottom: 1.5rem solid transparent;
  border-top: 1.5rem solid transparent;
  border-left: 1.5rem solid lightgray;
  border-right: 1.5rem solid transparent;
`;

const SlideLeftBtn = styled.div`
  width: 0;
  height: 0;
  border-bottom: 1.5rem solid transparent;
  border-top: 1.5rem solid transparent;
  border-left: 1.5rem solid transparent;
  border-right: 1.5rem solid lightgray;
`;
