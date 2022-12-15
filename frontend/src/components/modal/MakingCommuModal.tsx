import MyModal from './MyModal';
import useModal from '../../hooks/modal/useModal';
import { CreateBtn } from '../../assets/styles/common/commonComponentStyle';
import CommunityMaker from '../community/CommunityMaker';

const MakingCommuModal = () => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <CommunityMaker />
      </MyModal>
      <CreateBtn style={{ width: '200px' }} onClick={modalHandler}>
        커뮤니티 만들기
      </CreateBtn>
    </>
  );
};

export default MakingCommuModal;
