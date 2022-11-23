import useModal from '../hooks/modal/useModal';
import CreateModal from '../components/modal/CreateModal';
import ContentsModal from '../components/modal/ContentsModal';
import styled from 'styled-components';

const ReviewBoardPage = () => {
  const [isCreateOpen, handleCreateStateChange] = useModal();
  const [isContentsOpen, handleContentsModalStateChange] = useModal();

  return (
    <BoardBox>
      <BoardHeader>AI 분석 결과를 공유해주세요</BoardHeader>
      <CreateModal
        isOpen={isCreateOpen}
        onModalStateChangeEvent={handleCreateStateChange}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(e);
          }}
        >
          이미지 선택
        </button>
      </CreateModal>
      <ContentsModal
        isOpen={isContentsOpen}
        onModalStateChangeEvent={handleContentsModalStateChange}
      >
        컨텐츠
      </ContentsModal>
      <button onClick={handleCreateStateChange}>글쓰기</button>
      <button onClick={handleContentsModalStateChange}>결과 카드</button>
    </BoardBox>
  );
};

export default ReviewBoardPage;

const BoardBox = styled.div`
  width: 100%;
  height: 82vh;
  /* border: solid 1px red; */
  margin-top: 20px;
`;

const BoardHeader = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: center;
`;
