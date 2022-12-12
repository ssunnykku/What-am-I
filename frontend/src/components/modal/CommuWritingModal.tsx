import MyModal from './MyModal';
import useModal from '../../hooks/modal/useModal';
import { CreateBtn } from '../../assets/styles/common/commonComponentStyle';
import CommuWritingEditor from '../writingeditor/CommuWritingEditor';
import { CommunityType } from '../../types/community/communityType';

export interface commuInfoTypeProps {
  commuInfo?: CommunityType;
}

const CommuWritingModal = ({ commuInfo }: commuInfoTypeProps) => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <CommuWritingEditor commuInfo={commuInfo} />
      </MyModal>
      <CreateBtn onClick={modalHandler}> 글쓰기 </CreateBtn>
    </>
  );
};

export default CommuWritingModal;
