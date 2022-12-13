import useModal from '../../hooks/modal/useModal';
import MyModal from './MyModal';
import CommuPuppyCard from '../community/CommuPuppyCard';
import CommuContentsViewer from '../contentsviewer/CommuContentsViewer';
import {
  CommunityType,
  CurrentCommuPostsType,
} from '../../types/community/communityType';
import { UserInfoType } from '../../types/auth/authType';

export interface CurrentCommuityProps {
  commuInfo?: CommunityType;
  commuPost?: CurrentCommuPostsType;
  mode?: string;
  modalHandler?: () => void;
  currentUserInfo?: UserInfoType;
}

const CommuContentsModal = ({
  commuPost,
  currentUserInfo,
}: CurrentCommuityProps) => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <CommuContentsViewer
          commuPost={commuPost}
          currentUserInfo={currentUserInfo}
        />
      </MyModal>
      <CommuPuppyCard onCardModalClickEvent={modalHandler}></CommuPuppyCard>
    </>
  );
};

export default CommuContentsModal;
