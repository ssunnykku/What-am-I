import useModal from '../../hooks/modal/useModal';
import MyModal from './MyModal';
import PuppyCard from '../reviewBoard/PuppyCard';
import CommuContentsViewer from '../contentsviewer/CommuContentsViewer';

const CommuContentsModal = () => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <CommuContentsViewer />
      </MyModal>
      <PuppyCard onCardModalClickEvent={modalHandler}></PuppyCard>
    </>
  );
};

export default CommuContentsModal;
