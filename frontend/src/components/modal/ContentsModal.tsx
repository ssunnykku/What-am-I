import styled from '@emotion/styled';
import useModal from '../../hooks/modal/useModal';
import MyModal from './MyModal';
import { font } from '../../assets/styles/common/fonts';
import PuppyCard from '../reviewBoard/PuppyCard';
import { theme } from '../../assets/styles/common/palette';
import { EditDelBtn } from '../../assets/styles/common/commonComponentStyle';

export const ContentsModal = () => {
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

const ContentsViewer = () => {
  return (
    <ContentsModalWrapper>
      <AddImage></AddImage>
      <AddWriting>
        <TopDiv>
          <div className="user-name">유저 프로필 사진 + 닉네임</div>
          <ButtonBox>
            <EditDelBtn>수정</EditDelBtn>
            <EditDelBtn>삭제</EditDelBtn>
          </ButtonBox>
        </TopDiv>
        <div className="user-contents">글 보이는 창</div>
        <BottomDiv>
          <div className="like">🤍10</div>
          <div className="date">12월 17일</div>
          <CommentBox>
            <input type="text" placeholder="댓글 달기..." />
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(e);
              }}
            >
              게시
            </button>
          </CommentBox>
        </BottomDiv>
      </AddWriting>
    </ContentsModalWrapper>
  );
};

export default ContentsViewer;

const ContentsModalWrapper = styled.div`
  width: 65%;
  height: 80%;
  max-width: 57rem;
  min-width: 40rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 2%;
  font-family: ${font.normal};
`;

const AddImage = styled.div`
  border-right: solid 1px lightgray;
`;

const AddWriting = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .user-name {
    height: 4.3rem;
    line-height: 5rem;
    padding-left: 3%;
  }

  .user-contents {
    border: solid 1px lightgray;
    padding-left: 3%;
    padding-top: 3%;
    height: 70%;
  }
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ButtonBox = styled.div`
  width: 8rem;
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const BottomDiv = styled.div`
  .like {
    float: left;
    margin: 0 1%;
    font-size: 1rem;
  }
  .date {
    font-size: 1rem;
    float: right;
    margin: 1% 2%;
  }
`;

const CommentBox = styled.div`
  border-top: solid 1px lightgray;
  position: absolute;
  bottom: 0;
  width: 100%;
  min-width: 19rem;
  max-width: 50rem;
  height: 3rem;
  line-height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  input {
    height: 2.5rem;
    width: 100%;
    padding: 0 2%;
    border: 0;
    outline: 0;
  }
  button {
    width: 5.5rem;
    background: none;
    border: none;
    cursor: pointer;
    height: 3rem;
    line-height: 3rem;
    font-family: ${font.bold};
    border-left: 1px solid lightgray;
    color: ${theme.mainColor};
    font-size: 1rem;
  }
`;
