import React, { useState } from 'react';
import styled from '@emotion/styled';
import { createReviewRequest } from '../../apis/reviewFetcher';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import { ReviewTypeProps } from '../modal/ReviewContentsModal';
import { editReviewRequest } from '../../apis/reviewFetcher';

const CommuWritingEditor = (props: ReviewTypeProps) => {
  const [images, setImages] = useState<string>('');
  const [description, setDescription] = useState<string>(
    props.review?.description ? props.review?.description : '',
  );

  const handleWritingEditorClick = async () => {
    const res = await createReviewRequest('review', {
      description,
      images,
    });
    console.log(res);
  };

  const handleEditMyReview = async (e: React.MouseEvent) => {
    e.preventDefault();
    await editReviewRequest(`review/${props.review?.id}`, description);

    if (props.modalHandler) {
      props.modalHandler();
    }
  };

  return (
    <>
      <CreateModalWrapper
        onSubmit={(e: any) => {
          props.mode === 'edit'
            ? handleEditMyReview(e)
            : handleWritingEditorClick();
        }}
      >
        <ModalHeader>
          게시물 작성하기
          <ModalHeaderBtn type="submit">공유하기</ModalHeaderBtn>
        </ModalHeader>
        <ModalContents>
          <AddImage>
            <div>{images}</div>
          </AddImage>
          <AddWriting>
            <div className="user-name">유저 프로필 사진 + 닉네임</div>
            <div className="writing">
              <textarea
                maxLength={300}
                placeholder="여러분의 댕댕이를 마음껏 뽐내 주세요."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </AddWriting>
        </ModalContents>
      </CreateModalWrapper>
    </>
  );
};

export default CommuWritingEditor;

const CreateModalWrapper = styled.form`
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
  border-radius: 20px;
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

const AddImage = styled.div`
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
    textarea {
      width: 96%;
      height: 98%;
      border: none;
      outline: none;
      font-size: 16px;
      font-family: ${font.normal};
      line-height: 22px;
      resize: none;
      white-space: pre-wrap;
    }
  }
`;
