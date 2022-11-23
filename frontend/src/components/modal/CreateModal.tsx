import styled from 'styled-components';
import { CommonComponentType } from '../../types/common/commonComponentType';

interface CreateModalProps extends CommonComponentType {
  isOpen: boolean;
  onModalStateChangeEvent: () => void;
}

const CreateModal = ({
  isOpen,
  onModalStateChangeEvent,
  children,
}: CreateModalProps) => {
  return (
    <CreateModalBackdrop isOpen={isOpen}>
      <CreateModalWrapper>
        <ModalHeader>
          새 게시물 작성하기
          <ModalHeaderBtn>생성하기</ModalHeaderBtn>
        </ModalHeader>
        <ModalContents>
          <AddImage>{children}</AddImage>
          <AddWriting>
            <div className="user-name">유저 프로필 사진 + 닉네임</div>
            <form className="writing">글쓰는 인풋창 + 이모티콘 삽입</form>
          </AddWriting>
        </ModalContents>
      </CreateModalWrapper>
      <CloseButton onClick={onModalStateChangeEvent}>X</CloseButton>
    </CreateModalBackdrop>
  );
};

const CreateModalBackdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
`;

const CreateModalWrapper = styled.div`
  width: 60%;
  height: 80%;
  max-width: 850px;
  min-width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: grid;
  grid-template-rows: 60px 1fr;
  border-radius: 3%;
  font-family: 'ONE-Mobile-Title';
`;

const ModalHeader = styled.div`
  border-bottom: solid 1px lightgray;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 0 5%;
`;

const ModalHeaderBtn = styled.button`
  margin-left: auto;
  background: none;
  border: solid 1px;
  border-radius: 20px;
  font-size: 15px;
  height: 30px;
  width: 90px;
  cursor: pointer;
`;

const ModalContents = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: 'ONE-Mobile-Regular';
`;

const AddImage = styled.form`
  border-right: solid 1px lightgray;
`;

const AddWriting = styled.div`
  display: flex;
  flex-direction: column;

  .user-name {
    height: 70px;
    line-height: 75px;
    padding-left: 3%;
  }

  .writing {
    border: solid 1px lightgray;
    padding-left: 3%;
    padding-top: 3%;
    height: 70%;
  }
`;

const CloseButton = styled.button`
  float: right;
  border: none;
  background: none;
  margin: 30px 40px;
  height: 40px;
  width: 40px;
  font-size: 35px;
  color: white;
  cursor: pointer;
  font-family: 'ONE-Mobile-Title';
`;

export default CreateModal;
