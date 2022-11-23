import styled from 'styled-components';
import { CommonComponentType } from '../../types/common/commonComponentType';

interface ContentsModalProps extends CommonComponentType {
  isOpen: boolean;
  onModalStateChangeEvent: () => void;
}

const ContentsModal = ({
  isOpen,
  onModalStateChangeEvent,
  children,
}: ContentsModalProps) => {
  return (
    <ContentsModalBackdrop isOpen={isOpen}>
      <ContentsModalWrapper>
        <AddImage>{children}</AddImage>
        <AddWriting>
          <div className="user-name">유저 프로필 사진 + 닉네임</div>
          <div className="user-contents">글 보이는 창</div>
          <BottomDiv>
            <div className="like">🤍</div>
            <div className="date">12월 17일</div>
            <form className="comment">
              댓글 달기
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(e);
                }}
              >
                게시
              </button>
            </form>
          </BottomDiv>
        </AddWriting>
      </ContentsModalWrapper>
      <CloseButton onClick={onModalStateChangeEvent}>X</CloseButton>
    </ContentsModalBackdrop>
  );
};

export default ContentsModal;

const ContentsModalBackdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  ${(props) => (props.isOpen ? 'display: block' : 'display: none')};
`;

const ContentsModalWrapper = styled.div`
  width: 70%;
  height: 80%;
  max-width: 1100px;
  min-width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 2%;
  font-family: 'ONE-Mobile-Regular';
`;

const AddImage = styled.div`
  border-right: solid 1px lightgray;
`;

const AddWriting = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .user-name {
    height: 70px;
    line-height: 75px;
    padding-left: 3%;
  }

  .user-contents {
    border: solid 1px lightgray;
    padding-left: 3%;
    padding-top: 3%;
    height: 70%;
  }
`;

const BottomDiv = styled.div`
  .like {
    float: left;
    margin: 0 1%;
    font-size: 22px;
  }
  .date {
    font-size: 14px;
    float: right;
    margin: 1% 2%;
  }
  .comment {
    border-top: solid 1px lightgray;
    position: absolute;
    bottom: 0;
    width: 97%;
    height: 50px;
    line-height: 50px;
    padding-left: 3%;
    button {
      float: right;
      background: none;
      border: none;
      cursor: pointer;
      height: 50px;
      line-height: 50px;
      font-family: 'ONE-Mobile-Title';
      padding: 0 25px;
      border-left: 1px solid lightgray;
    }
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
