import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { createReviewRequest } from '../../apis/reviewFetcher';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import { ReviewTypeProps } from '../modal/ReviewContentsModal';
import { editReviewRequest } from '../../apis/reviewFetcher';
import { getUserData } from '../../apis/mypageFetcher';
import { UserInfoType } from '../../types/auth/authType';

const ReviewWritingEditor = (props: ReviewTypeProps) => {
  const [images, setImages] = useState<string>('');
  const [description, setDescription] = useState<string>(
    props.review?.description ?? '',
  );
  const [userInfo, setUserInfo] = useState<UserInfoType>();

  const handleUploadResultCard = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const getCurrentUserInfo = async () => {
    const res = await getUserData();
    setUserInfo(res);
  };
  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  const handleWritingEditorClick = async () => {
    await createReviewRequest('review', {
      description,
      images,
    });
  };

  const handleEditMyReview = async (e: React.FormEvent) => {
    e.preventDefault();
    await editReviewRequest(`review/${props.review?.id}`, description);

    if (props.modalHandler) {
      props.modalHandler();
    }
  };

  return (
    <CreateModalWrapper
      onSubmit={(e: React.FormEvent) => {
        props.mode === 'edit'
          ? handleEditMyReview(e)
          : handleWritingEditorClick();
      }}
    >
      <ModalHeader>
        게시물 작성하기
        <ModalHeaderBtn disabled={description.length === 0} type="submit">
          공유하기
        </ModalHeaderBtn>
      </ModalHeader>
      <ModalContents>
        <AddImage>
          <div>{images}</div>
        </AddImage>
        <AddWriting>
          <div className="user-name">
            <ProfileBox>
              <div className="profile">
                <img src={userInfo?.profileImg} />
              </div>
              <div>{userInfo?.nickname}</div>
            </ProfileBox>
          </div>
          <div className="writing">
            <textarea
              maxLength={300}
              placeholder="여러분의 댕댕이가 궁금해요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </AddWriting>
      </ModalContents>
    </CreateModalWrapper>
  );
};

export default ReviewWritingEditor;

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

  &[disabled] {
    background: rgba(0, 0, 0, 0.1);
    cursor: revert;
  }
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
    width: 100%;
    height: 4.3rem;
    padding-left: 3%;
    display: flex;
    align-items: center;
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
    }
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  height: 3.5rem;
  line-height: 4.3rem;
  padding-left: 3%;
  font-size: 16px;
  font-family: ${font.bold};

  .profile {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
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
