import MyModal from './MyModal';
import useModal from '../../hooks/modal/useModal';
import ReviewWritingEditor from '../reviewBoard/ReviewWritingEditor';
import TestResultCard, { receiveProps } from '../reviewBoard/TestResultCard';

const ReviewWritingModal = ({ id, setReviews }: receiveProps) => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <ReviewWritingEditor id={id} />
      </MyModal>
      <TestResultCard
        setReviews={setReviews}
        id={id}
        onCardModalClickEvent={modalHandler}
      ></TestResultCard>
    </>
  );
};

export default ReviewWritingModal;
