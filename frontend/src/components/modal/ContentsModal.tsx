import useModal from '../../hooks/modal/useModal';
import MyModal from './MyModal';
import PuppyCard from '../reviewBoard/PuppyCard';
import ContentsViewer from '../contentsviewer/ContentsViewer';

const ContentsModal = () => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <ContentsViewer />
      </MyModal>
      <PuppyCard onCardModalClickEvent={modalHandler}></PuppyCard>
    </>
  );
};

export default ContentsModal;
