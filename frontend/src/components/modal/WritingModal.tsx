import styled from '@emotion/styled';
import MyModal from './MyModal';
import useModal from '../../hooks/modal/useModal';
import { CreateBtn } from '../../assets/styles/common/commonComponentStyle';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';

export const WritingModal = () => {
  const [isOpen, modalHandler] = useModal();

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <WritingEditor />
      </MyModal>
      <CreateBtn onClick={modalHandler}> 글쓰기 </CreateBtn>
    </>
  );
};

const WritingEditor = () => {
  return (
    <CreateModalWrapper>
      <ModalHeader>
        새 게시물 작성하기
        <ModalHeaderBtn>공유하기</ModalHeaderBtn>
      </ModalHeader>
      <ModalContents>
        <AddImage>
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log(e);
            }}
          >
            이미지 선택
          </button>
        </AddImage>
        <AddWriting>
          <div className="user-name">유저 프로필 사진 + 닉네임</div>
          <form className="writing">글쓰는 인풋창 + 이모티콘 삽입</form>
        </AddWriting>
      </ModalContents>
    </CreateModalWrapper>
  );
};

const CreateModalWrapper = styled.div`
  width: 55%;
  height: 80%;
  max-width: 47rem;
  min-width: 30rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: grid;
  grid-template-rows: 4rem 1fr;
  border-radius: 3%;
  font-family: ${font.bold};
`;

const ModalHeader = styled.div`
  border-bottom: solid 1px lightgray;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  padding: 0 5%;
  color: ${theme.mainColor};
`;

const ModalHeaderBtn = styled.button`
  margin-left: auto;
  background: none;
  border: solid 2px ${theme.mainColor};
  border-radius: 20px;
  font-size: 0.9rem;
  height: 2rem;
  width: 6.2rem;
  cursor: pointer;
  color: ${theme.mainColor};
`;

const ModalContents = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: ${font.normal};
  font-size: 16px;
`;

const AddImage = styled.form`
  border-right: solid 1px lightgray;
`;

const AddWriting = styled.div`
  display: flex;
  flex-direction: column;

  .user-name {
    height: 4.3rem;
    line-height: 4.5rem;
    padding-left: 3%;
  }

  .writing {
    border: solid 1px lightgray;
    padding-left: 3%;
    padding-top: 3%;
    height: 70%;
  }
`;
