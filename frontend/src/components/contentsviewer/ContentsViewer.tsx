import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import { EditDelBtn } from '../../assets/styles/common/commonComponentStyle';
import LikeBtn from '../common/LikeBtn';
import { ReviewTypeProps } from '../modal/ContentsModal';
import {
  deleteReviewRequest,
  editReviewRequest,
  getOneReviewRequest,
  getReviewCommentsRequest,
} from '../../apis/reviewFetcher';
import MyModal from '../modal/MyModal';
import useModal from '../../hooks/modal/useModal';
import WritingEditor from '../writingeditor/WritingEditor';
import { useNavigate } from 'react-router-dom';

const ContentsViewer = ({ review }: ReviewTypeProps) => {
  // useEffect로 get 함수 넣어주기
  // 그럼 필요한 거 아이디, 사진, 글 프롭스로 보내기
  // 댓글/ 수정/ 삭제

  const [isOpen, modalHandler] = useModal();
  const [pages, setPages] = useState<number>(1);
  const [comments, setComments] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const navigate = useNavigate();

  // 리뷰 창 하나 누르면 내용 가져오기 이걸 굳이 받아올 필요가 있어? 이미 리뷰를 보여주는데
  // const getOneReview = async () => {
  //   await getOneReviewRequest(`review/show/${value.reviewId}`);
  // };

  // 리뷰 전체 댓글 가져오기
  // const getReviewComments = async () => {
  //   const res = await getReviewCommentsRequest(
  //     `reviewComment/${review.reviewId}?page=${pages}`,
  //   );
  //   console.log(res.data);
  //   // *** setComments(res.data); console로 뜨는 거 보고 수정
  // };

  // useEffect(() => {
  //   getReviewComments();
  // }, []);

  // 리뷰 수정
  const handleEditMyReview = async (e: React.MouseEvent) => {
    e.preventDefault();

    await editReviewRequest(`review/${review.reviewId}`, description);
  };

  // 리뷰 삭제
  const handleDeleteMyReview = async (e: React.MouseEvent) => {
    e.preventDefault();
    alert('작성하신 리뷰를 삭제하시겠습니까?');
    if (confirm('작성하신 리뷰를 삭제하시겠습니까?') === true) {
      await deleteReviewRequest(`review/${review.reviewId}`);
      navigate('/reviewboard');
    }
  };

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <WritingEditor />
      </MyModal>
      <ContentsModalWrapper>
        <AddImage></AddImage>
        <AddWriting>
          <TopDiv>
            <div className="user-name">유저 프로필 사진 + 닉네임</div>
            <ButtonBox>
              <EditDelBtn
                onClick={(e) => {
                  e.preventDefault();
                  modalHandler;
                  handleEditMyReview;
                }}
              >
                수정
              </EditDelBtn>
              <EditDelBtn onClick={handleDeleteMyReview}>삭제</EditDelBtn>
            </ButtonBox>
          </TopDiv>
          <ContentsBox className="user-contents">
            {review.description}
            <div className="user-comments">{comments}</div>
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
    </>
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
