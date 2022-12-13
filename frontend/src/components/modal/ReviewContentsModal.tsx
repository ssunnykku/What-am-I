import useModal from '../../hooks/modal/useModal';
import MyModal from './MyModal';
import ReviewPuppyCard from '../reviewBoard/ReviewPuppyCard';
import ReviewContentsViewer from '../contentsviewer/ReviewContentsViewer';
import { ReviewType } from '../../types/reviewboard/reviewType';
import { UserInfoType } from '../../types/auth/authType';

export interface ReviewTypeProps {
  userId?: string;
  review: ReviewType;
  mode?: string;
  getReviews?: () => Promise<void>;
  modalHandler?: () => void;
  currentUser?: string;
  userInfo?: UserInfoType;
}

const ReviewContentsModal = ({
  review,
  getReviews,
  currentUser,
  userInfo,
}: ReviewTypeProps) => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <ReviewContentsViewer
          review={review}
          getReviews={getReviews}
          currentUser={currentUser}
          userInfo={userInfo}
        />
      </MyModal>
      <ReviewPuppyCard onCardModalClickEvent={modalHandler}></ReviewPuppyCard>
    </>
  );
};

export default ReviewContentsModal;
