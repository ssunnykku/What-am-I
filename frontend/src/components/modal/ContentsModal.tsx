import useModal from '../../hooks/modal/useModal';
import MyModal from './MyModal';
import PuppyCard from '../reviewBoard/PuppyCard';
import ContentsViewer from '../contentsviewer/ContentsViewer';
import { ReviewsListType } from '../../types/reviewboard/reviewType';

export interface ReviewsListTypeProps {
  value: ReviewsListType;
}

const ContentsModal = ({ value }: ReviewsListTypeProps) => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <ContentsViewer value={value} />
      </MyModal>
      <PuppyCard onCardModalClickEvent={modalHandler}></PuppyCard>
    </>
  );
};

export default ContentsModal;
