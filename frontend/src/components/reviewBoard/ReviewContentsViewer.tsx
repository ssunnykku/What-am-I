import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import { EditDelBtn } from '../../assets/styles/common/commonComponentStyle';
import { ReviewTypeProps } from '../modal/ReviewContentsModal';
import {
  createReviewCommentRequest,
  deleteReviewRequest,
  editReviewRequest,
  getReviewRequest,
} from '../../apis/reviewFetcher';
import MyModal from '../modal/MyModal';
import useModal from '../../hooks/modal/useModal';
import ReviewWritingEditor from './ReviewWritingEditor';
import {
  AITestType,
  OneReviewType,
  ReviewCommentType,
  ReviewType,
} from '../../types/reviewboard/reviewType';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useConfirm } from '../../hooks/confirm/useConfirm';
import ReviewLikeBtn from './ReviewLikeBtn';
import { getPuppyData } from '../../apis/mypageFetcher';

const ReviewContentsViewer = (props: ReviewTypeProps) => {
  const [isOpen, modalHandler] = useModal();
  const [pages, setPages] = useState<number>(1);
  const [description, setDescription] = useState<string>('');
  const [comments, setComments] = useState<ReviewCommentType[]>([]);
  const [reviewer, setReviewer] = useState<OneReviewType>();
  const [date, setDate] = useState(props.review?.createdAt);
  const newDate = date?.split(' ')[0];
  const [editing, setEditing] = useState<boolean>(false);
  const [newComments, setNewComments] = useState<string>('');
  const [selectedIdx, setSelectedIdx] = useState<number | boolean>(false);
  const [result, setResult] = useState<AITestType[]>([]);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      if (editInputRef.current) {
        editInputRef.current.focus();
      }
    }
  }, [editing]);

  // 리뷰 하나 가져오기
  const getOneReview = async () => {
    const res = await getReviewRequest(`review/show/${props.review?.id}`);
    setReviewer(res);
  };

  // 리뷰 전체 댓글 가져오기
  const getReviewComments = async () => {
    const res = await getReviewRequest(
      `reviewComment/${props.review?.id}?page=${pages}`,
    );
    setComments(res.reverse());
  };

  const getAiResultData = async () => {
    if (props.review) {
      const res = await getPuppyData(props.review?.id);
      setResult(res.Predictions);
    }
  };
  useEffect(() => {
    getOneReview();
    getReviewComments();
    getAiResultData();
  }, []);

  // 리뷰 댓글 쓰기
  const postReviewComments = async (e: React.FormEvent) => {
    e.preventDefault();
    const post = await createReviewCommentRequest(
      `reviewComment/${props.review?.id}`,
      description,
    );

    const res = await getReviewRequest(
      `reviewComment/${post.reviewId}/${post.id}`,
    );
    setComments([...res, ...comments]);
    setDescription('');
  };

  useEffect(() => {
    if (props.getReviews) {
      props.getReviews();
    }
  }, [isOpen]);

  // 리뷰 삭제
  const handleDeleteMyReview = async () => {
    await deleteReviewRequest(`review/${props.review?.id}`);
  };

  const deleteConfirm = () => (
    handleDeleteMyReview(), window.alert('삭제했습니다.')
  );
  const cancelConfirm = () => window.alert('취소했습니다.');

  const confirmDelete = useConfirm(
    '삭제하시겠습니까?',
    deleteConfirm,
    cancelConfirm,
  );

  // 댓글 수정
  const onClickCommentEditButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditing(true);
  };

  const onChangeCommentEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComments(e.target.value);
  };

  const handleCommentEditButton = async (
    e: React.FormEvent,
    comment: ReviewCommentType,
  ) => {
    e.preventDefault();
    await editReviewRequest(`reviewComment/${comment.id}`, newComments);
    setEditing(false);

    const result = await getReviewRequest(
      `reviewComment/${props.review?.id}?page=${pages}`,
    );
    setComments(result.reverse());
  };

  // 댓글 삭제
  const handleDeleteMyComment = async (
    e: React.MouseEvent,
    comment: ReviewCommentType,
  ) => {
    e.preventDefault();
    await deleteReviewRequest(`reviewComment/${comment.id}
    `);

    const result = await getReviewRequest(
      `reviewComment/${props.review?.id}?page=${pages}`,
    );
    setComments(result.reverse());
  };

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <ReviewWritingEditor
          review={props.review}
          mode="edit"
          modalHandler={modalHandler}
        />
      </MyModal>
      <ContentsModalWrapper>
        <AddImage>
          <div className="result-card-box">
            <img src={props.review?.AiSearchResult.aiImage} />
            <div className="result-desc">
              <ResultText>
                {result &&
                  result.map((value) => (
                    <Breed key={value.id}>
                      <BreedText>{value.label}</BreedText>
                      <BreedText>{(value.score * 100).toFixed(1)}%</BreedText>
                    </Breed>
                  ))}
              </ResultText>
            </div>
          </div>
        </AddImage>
        <AddWriting>
          <TopDiv>
            <div className="user-name">
              <ProfileBox>
                <div className="profile">
                  <img src={reviewer?.User.profileImg} />
                </div>
                <div>{reviewer?.User.nickname}</div>
              </ProfileBox>
            </div>
            {props.currentUser === reviewer?.userId ? (
              <ButtonBox>
                <EditDelBtn
                  onClick={(e) => {
                    e.preventDefault();
                    modalHandler();
                  }}
                >
                  수정
                </EditDelBtn>
                <EditDelBtn onClick={confirmDelete}>삭제</EditDelBtn>
              </ButtonBox>
            ) : null}
          </TopDiv>

          <ContentsBox>
            <div className="user-contents">{props.review?.description}</div>
            {comments?.map((comment, idx) => (
              <div key={comment.id} className="user-comments">
                <div className="profile-image">
                  <img src={comment.profileImg} />
                </div>
                {selectedIdx === idx && editing ? (
                  <input
                    ref={editInputRef}
                    value={newComments}
                    onChange={onChangeCommentEditInput}
                    autoFocus={true}
                    onFocus={() => setNewComments(comment.description)}
                  />
                ) : (
                  <div className="comment">
                    <span>{comment.nickname}</span>
                    {comment.description}
                  </div>
                )}
                {comment.userId === props.currentUser ? (
                  <BtnContainer className="btn-box">
                    {selectedIdx === idx && editing ? (
                      <button
                        className="edit-button"
                        onClick={(e) => handleCommentEditButton(e, comment)}
                      >
                        edit
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={(e) => {
                            onClickCommentEditButton(e);
                            setSelectedIdx(idx);
                          }}
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={(e) => handleDeleteMyComment(e, comment)}
                        >
                          <DeleteIcon />
                        </button>
                      </>
                    )}
                  </BtnContainer>
                ) : null}
              </div>
            ))}
          </ContentsBox>

          <BottomDiv>
            <div className="like">
              <ReviewLikeBtn review={props.review} />
            </div>
            <div className="date">{newDate}</div>
            <CommentBox>
              <input
                type="text"
                placeholder="댓글 달기..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                onClick={postReviewComments}
                disabled={description.length === 0}
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

export default ReviewContentsViewer;

const ContentsModalWrapper = styled.form`
  width: 65%;
  height: 85%;
  max-width: 58rem;
  min-width: 40rem;
  min-height: 30rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  border-radius: 10px;
  font-family: ${font.normal};
`;

const AddImage = styled.div`
  border-right: solid 1px lightgray;
  display: flex;
  align-items: center;

  .result-card-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 85%;

    img {
      width: 100%;
      height: 70%;
      object-fit: cover;
    }

    .result-desc {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 25%;
      border-bottom: solid 1px lightgray;
    }
  }
`;

const ResultText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 10px;
  height: 8rem;
  width: 20rem;
`;

const Breed = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  place-items: center;
`;

const BreedText = styled.div`
  font-size: 16px;
`;

const AddWriting = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }

  .user-name {
    width: 100%;
    height: 80px;
    padding-left: 20px;
    display: flex;
    align-items: center;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  height: 3.5rem;
  line-height: 4.3rem;
  font-size: 16px;
  font-family: ${font.bold};

  .profile {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    position: relative;
    overflow: hidden;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BtnContainer = styled.div`
  visibility: hidden;
  display: inline-flex;
  flex-direction: row;
  position: absolute;
  right: 0;
  bottom: 3px;

  button {
    border: 0;
    background: 0;
    cursor: pointer;
    font-size: small;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
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
  padding-right: 5px;
`;

const ContentsBox = styled.div`
  border-top: solid 1px lightgray;
  padding: 3% 2%;
  height: 68%;
  max-width: 29rem;
  max-height: 35rem;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  -ms-overflow-style: none;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  .user-contents {
    border-bottom: solid 1px lightgray;
    padding-bottom: 10px;
    margin-bottom: 5px;
    line-height: 22px;
    white-space: pre-wrap;
  }

  .user-comments {
    display: inline-flex;
    justify-content: space-between;
    position: relative;
    margin: 5px 0;
    padding: 5px 0;
    width: 100%;
    line-height: 20px;
    font-size: 14px;

    .profile-image {
      height: 35px;
      width: 35px;
      border-radius: 50%;
      margin: 0 10px;
      position: relative;
      overflow: hidden;

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .comment {
      width: 90%;
      margin-top: 3px;

      span {
        font-family: ${font.bold};
        margin-right: 6px;
      }
    }

    :hover {
      background-color: rgba(0, 0, 0, 0.06);
    }

    :hover .btn-box {
      visibility: visible;
    }

    input {
      width: 88%;
      height: 30px;
      font-size: 15px;
    }

    .edit-button {
      font-size: 16px;
      position: absolute;
      right: 5px;
      bottom: 10px;
      width: 35px;
      background-color: white;
      border: solid 1px black;
    }
  }
`;

const BottomDiv = styled.div`
  border-top: solid 1px lightgray;
  height: 8rem;

  .like {
    float: left;
    margin: 5px 7px;
    font-size: 1rem;
  }
  .date {
    font-size: 1rem;
    float: right;
    margin: 5px 7px;
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

    &[disabled] {
      background: rgba(0, 0, 0, 0.1);
      cursor: revert;
    }
  }
`;
