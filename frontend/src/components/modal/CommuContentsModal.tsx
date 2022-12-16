import useModal from '../../hooks/modal/useModal';
import MyModal from './MyModal';
import CommuPuppyCard from '../community/CommuPuppyCard';
import CommuContentsViewer from '../community/CommuContentsViewer';
import {
  CommunityType,
  CurrentCommuPostsType,
} from '../../types/community/communityType';
import { UserInfoType } from '../../types/auth/authType';
import { useEffect } from 'react';

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
  commuInfo,
  commuPost,
  currentUserInfo,
  getPosts,
}: CurrentCommuityProps) => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <CommuContentsViewer
          commuInfo={commuInfo}
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
