import MyModal from './MyModal';
import useModal from '../../hooks/modal/useModal';
import { CreateBtn } from '../../assets/styles/common/commonComponentStyle';
import ReviewWritingEditor from '../writingeditor/ReviewWritingEditor';

const ReviewWritingModal = () => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <ReviewWritingEditor />
      </MyModal>
      <CreateBtn onClick={modalHandler}> 글쓰기 </CreateBtn>
    </>
  );
};

export default ReviewWritingModal;
