import useModal from '../../hooks/modal/useModal';
import MyModal from './MyModal';
import ReviewPuppyCard from '../reviewBoard/ReviewPuppyCard';
import ReviewContentsViewer from '../contentsviewer/ReviewContentsViewer';
import { ReviewType } from '../../types/reviewboard/reviewType';

export interface ReviewTypeProps {
  userId?: string;
  review?: ReviewType;
  mode?: string;
  getReviews?: () => Promise<void>;
  modalHandler?: () => void;
  currentUser?: string;
}

const ReviewContentsModal = ({
  review,
  getReviews,
  currentUser,
}: ReviewTypeProps) => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <ReviewContentsViewer
          review={review}
          getReviews={getReviews}
          currentUser={currentUser}
        />
      </MyModal>
      <ReviewPuppyCard onCardModalClickEvent={modalHandler}></ReviewPuppyCard>
    </>
  );
};

export default ReviewContentsModal;
