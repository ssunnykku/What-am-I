import useModal from '../../hooks/modal/useModal';
import MyModal from './MyModal';
import CommuPuppyCard from '../community/CommuPuppyCard';
import CommuContentsViewer from '../contentsviewer/CommuContentsViewer';
import { CurrentCommuPostsType } from '../../types/community/communityType';

export interface CurrentCommuPostsTypeProps {
  commuPost?: CurrentCommuPostsType;
  mode?: string;
  modalHandler?: () => void;
}

const CommuContentsModal = ({ commuPost }: CurrentCommuPostsTypeProps) => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <CommuContentsViewer commuPost={commuPost} />
      </MyModal>
      <CommuPuppyCard onCardModalClickEvent={modalHandler}></CommuPuppyCard>
    </>
  );
};

export default CommuContentsModal;
