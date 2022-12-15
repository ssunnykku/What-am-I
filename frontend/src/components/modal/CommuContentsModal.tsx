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
  getPosts?: () => Promise<void>;
  modalHandler?: () => void;
  currentUserInfo?: UserInfoType;
  onCardModalClickEvent?: () => void;
}

const CommuContentsModal = ({
  commuPost,
  currentUserInfo,
  getPosts,
}: CurrentCommuityProps) => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <CommuContentsViewer
          getPosts={getPosts}
          commuPost={commuPost}
          currentUserInfo={currentUserInfo}
        />
      </MyModal>
      <CommuPuppyCard
        commuPost={commuPost}
        onCardModalClickEvent={modalHandler}
      ></CommuPuppyCard>
    </>
  );
};

export default CommuContentsModal;
