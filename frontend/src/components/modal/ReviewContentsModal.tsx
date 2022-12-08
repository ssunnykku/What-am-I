import useModal from '../../hooks/modal/useModal';
import MyModal from './MyModal';
import PuppyCard from '../reviewBoard/PuppyCard';
import ReviewContentsViewer from '../contentsviewer/ReviewContentsViewer';
import {
  ReviewCommentType,
  ReviewType,
} from '../../types/reviewboard/reviewType';

export interface ReviewTypeProps {
  userId?: string;
  review?: ReviewType;
  value?: ReviewCommentType;
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
      <PuppyCard onCardModalClickEvent={modalHandler}></PuppyCard>
    </>
  );
};

export default ReviewContentsModal;
