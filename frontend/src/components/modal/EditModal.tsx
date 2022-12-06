import MyModal from './MyModal';
import useModal from '../../hooks/modal/useModal';
import WritingEditor from '../writingeditor/WritingEditor';
import { EditDelBtn } from '../../assets/styles/common/commonComponentStyle';
import { ReviewTypeProps } from './ContentsModal';

const EditModal = (props: ReviewTypeProps) => {
  const [isOpen, modalHandler] = useModal();
  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <WritingEditor review={props.review} mode="edit" />
      </MyModal>
      <EditDelBtn
        onClick={(e) => {
          e.preventDefault();
          modalHandler();
        }}
      >
        수정
      </EditDelBtn>
    </>
  );
};

export default EditModal;
