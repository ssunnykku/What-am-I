import useModal from '../hooks/modal/useModal';
import MyModal from '../components/modal/MyModal';

const ReviewBoardPage = () => {
  const { isOpen, handleStateChange } = useModal();

  return (
    <>
      <div>우리 집 댕댕이의 결과를 공유합니다</div>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={handleStateChange}>
        안녕 디지몬
      </MyModal>
      <button onClick={handleStateChange}>Modal</button>
    </>
  );
};

export default ReviewBoardPage;
