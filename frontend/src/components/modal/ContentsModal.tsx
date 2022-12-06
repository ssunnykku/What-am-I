import useModal from '../../hooks/modal/useModal';
import MyModal from './MyModal';
import PuppyCard from '../reviewBoard/PuppyCard';
import ContentsViewer from '../contentsviewer/ContentsViewer';
import { ReviewType } from '../../types/reviewboard/reviewType';

export interface ReviewTypeProps {
  review?: ReviewType;
  mode?: string;
}

const ContentsModal = ({ review }: ReviewTypeProps) => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <ContentsViewer review={review} />
      </MyModal>
      <PuppyCard onCardModalClickEvent={modalHandler}></PuppyCard>
    </>
  );
};

export default ContentsModal;
