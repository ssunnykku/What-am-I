import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import { EditDelBtn } from '../../assets/styles/common/commonComponentStyle';
import MyModal from '../modal/MyModal';
import useModal from '../../hooks/modal/useModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CommuLikeBtn from '../community/CommuLikeBtn';
import { CurrentCommuityProps } from '../modal/CommuContentsModal';
import CommuWritingEditor from '../writingeditor/CommuWritingEditor';
import {
  deleteCurrCommuRequest,
  editCurrCommuCommentsRequest,
  getCurrentCommunityRequest,
  postCurrCommuCommentsRequest,
} from '../../apis/communityFetcher';
import { CurrCommuCommentsType } from '../../types/community/communityType';

const CommuContentsViewer = (props: CurrentCommuityProps) => {
  const [isOpen, modalHandler] = useModal();
  const [pages, setPages] = useState<number>(1);
  const [description, setDescription] = useState<string>('');
  const [comments, setComments] = useState<CurrCommuCommentsType[]>([]);
  const [date, setDate] = useState(props.commuPost?.createdAt);
  const newDate = date?.split(' ')[0];
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [editing, setEditing] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');
  const editInputRef = useRef<HTMLInputElement>(null);

  // 포스팅 하나 가져오기 (수정/삭제 가리기)

  // 포스팅 수정

  //포스팅 삭제

  // 포스팅 전체 댓글 가져오기
  const getCurrCommuComments = async () => {
    const res = await getCurrentCommunityRequest(
      `communityComment/${props.commuPost?.id}`,
    );
    setComments(res.reverse());
  };
  useEffect(() => {
    getCurrCommuComments();
  }, []);

  // 포스팅 댓글 쓰기
  const postCurrCommuComments = async (e: React.FormEvent) => {
    e.preventDefault();
    if (props.commuPost) {
      await postCurrCommuCommentsRequest(props.commuPost?.id, description);

      const result = await getCurrentCommunityRequest(
        `communityComment/${props.commuPost?.id}`,
      );
      setComments(result.reverse());
      setDescription('');
    }
  };

  // 댓글 수정
  const onClickCommentEditBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditing(true);
  };

  const onChangeCommentEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentEditButton = async (
    e: React.FormEvent,
    comment: CurrCommuCommentsType,
  ) => {
    e.preventDefault();
    if (props.commuPost) {
      await editCurrCommuCommentsRequest(comment.id, newComment);
      setEditing(false);

      const result = await getCurrentCommunityRequest(
        `communityComment/${props.commuPost?.id}`,
      );
      setComments(result.reverse());
    }
  };

  // 댓글 삭제
  const handleDeleteMyComment = async (
    e: React.MouseEvent,
    comment: CurrCommuCommentsType,
  ) => {
    e.preventDefault();
    await deleteCurrCommuRequest(`communityComment/${comment.id}`);

    const result = await getCurrentCommunityRequest(
      `communityComment/${props.commuPost?.id}`,
    );
    setComments(result.reverse());
  };

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <CommuWritingEditor
          commuPost={props.commuPost}
          mode="edit"
          modalHandler={modalHandler}
        />
      </MyModal>
      <ContentsModalWrapper>
        <AddImage>
          <ImagePlace>
            <img
              src={`${import.meta.env.VITE_PUBLIC_URL}/img/default_image3.png`}
            />
          </ImagePlace>
        </AddImage>
        <AddWriting>
          <TopDiv>
            <div className="user-name">
              <ProfileBox>
                <div className="profile">
                  <img src={props.currentUserInfo?.profileImg} />
                </div>
                <div>{props.currentUserInfo?.nickname}</div>
              </ProfileBox>
            </div>

            <ButtonBox>
              <EditDelBtn
                onClick={(e) => {
                  e.preventDefault();
                  modalHandler();
                }}
              >
                수정
              </EditDelBtn>
              <EditDelBtn>삭제</EditDelBtn>
            </ButtonBox>
          </TopDiv>

          <ContentsBox>
            <div className="user-contents">{props.commuPost?.description}</div>
            {comments?.map((comment, idx) => (
              <div key={comment.id} className="user-comments">
                <div className="profile-image">
                  <img src={comment.profileImg} />
                </div>
                {selectedIdx === idx && editing ? (
                  <input
                    ref={editInputRef}
                    value={newComment}
                    onChange={onChangeCommentEditInput}
                    autoFocus={true}
                  />
                ) : (
                  <div className="comment">
                    <span>{comment.nickname}</span>
                    {comment.description}
                  </div>
                )}
                {props.currentUserInfo?.userId === comment.userId ? (
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
                            onClickCommentEditBtn(e);
                            setSelectedIdx(idx);
                          }}
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={(e) => {
                            handleDeleteMyComment(e, comment);
                          }}
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
              <CommuLikeBtn />
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
                disabled={description.length === 0}
                onClick={postCurrCommuComments}
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

export default CommuContentsViewer;

const ContentsModalWrapper = styled.form`
  width: 70%;
  height: 85%;
  max-width: 70rem;
  min-width: 50rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  border-radius: 10px;
  font-family: ${font.normal};
`;

const AddImage = styled.div`
  border-right: solid 1px lightgray;
  display: flex;
  align-items: center;
`;

const ImagePlace = styled.div`
  width: 100%;
  height: 85%;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AddWriting = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

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
  font-size: 17px;
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

const ContentsBox = styled.div`
  border-top: solid 1px lightgray;
  padding: 3% 2%;
  height: 65%;
  max-width: 33rem;
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
    padding: 10px 0;
    width: 100%;
    line-height: 20px;
    font-size: 14px;

    .profile-image {
      height: 37px;
      width: 37px;
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
      width: 88%;
      margin-top: 3px;
      margin-left: 3px;

      span {
        font-family: ${font.bold};
        margin-right: 5px;
      }
    }

    :hover {
      background-color: rgba(0, 0, 0, 0.1);
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
      bottom: 15px;
      width: 35px;
      background-color: white;
      border: solid 1px black;
    }
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

const BottomDiv = styled.div`
  border-top: solid 1px lightgray;

  .like {
    float: left;
    margin: 3px 7px;
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
