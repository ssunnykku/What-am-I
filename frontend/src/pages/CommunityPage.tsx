import useModal from '../hooks/modal/useModal';
import CreateModal from '../components/modal/CreateModal';
import ContentsModal from '../components/modal/ContentsModal';

// 커뮤니티 목록 (리스트 형태)
// 커뮤 정보 전부 끌어와서 페이지네이션
// 셀렉된 커뮤는 나가기 버튼으로 바뀜
// 커뮤니티 생성 버튼

const CommunityPage = () => {
  const [isCreateOpen, handleCreateStateChange] = useModal();
  const [isContentsOpen, handleContentsModalStateChange] = useModal();

  return (
    <>
      <div>커뮤니티</div>
      <CreateModal
        isOpen={isCreateOpen}
        onModalStateChangeEvent={handleCreateStateChange}
      >
        <button>이미지 선택</button>
      </CreateModal>
      <ContentsModal
        isOpen={isContentsOpen}
        onModalStateChangeEvent={handleContentsModalStateChange}
      >
        컨텐츠
      </ContentsModal>
      <button onClick={handleCreateStateChange}>글쓰기</button>
      <button onClick={handleContentsModalStateChange}>결과 카드</button>
    </>
  );
};

export default CommunityPage;
