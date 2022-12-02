import styled from '@emotion/styled';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import { EditDelBtn } from '../../assets/styles/common/commonComponentStyle';
import LikeBtn from '../common/LikeBtn';
import { ReviewsListTypeProps } from '../modal/ContentsModal';

const ContentsViewer = ({ value }: ReviewsListTypeProps) => {
  // {value}
  // 뷰어에 딸린 아이디 기반으로 사진, 글, 글쓴이 아이디 불러지고
  // useEffect로 get 함수 넣어주기
  // 그럼 필요한 거 아이디, 사진, 글 프롭스로 보내기
  // 댓글/ 수정/ 삭제
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
        <ContentsBox className="user-contents">
          {value.description}
          <div className="user-comments">댓 보이는 창</div>
        </ContentsBox>
        <BottomDiv>
          <div className="like">
            <LikeBtn />
          </div>
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

const ContentsModalWrapper = styled.form`
  width: 65%;
  height: 80%;
  max-width: 60rem;
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
`;

const ContentsBox = styled.div`
  border: solid 1px lightgray;
  padding: 3% 2%;
  height: 70%;
  max-width: 29rem;

  .user-comments {
    border-top: solid 1px lightgray;
    margin-top: 10px;
    padding-top: 10px;
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
    margin: 3px 5px;
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
    font-size: 15px;
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
    font-size: 17px;
  }
`;
