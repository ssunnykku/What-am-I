import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  createReviewRequest,
  getReviewRequest,
} from '../../apis/reviewFetcher';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import { editReviewRequest } from '../../apis/reviewFetcher';
import { getUserData } from '../../apis/mypageFetcher';
import { UserInfoType } from '../../types/auth/authType';
import { ReviewType } from '../../types/reviewboard/reviewType';
import { useNavigate } from 'react-router-dom';

interface ReviewReceiveProps {
  id?: number;
  review?: ReviewType;
  mode?: string;
  modalHandler?: () => void;
}

const ReviewWritingEditor = (props: ReviewReceiveProps) => {
  const [description, setDescription] = useState<string>(
    props.review?.description ?? '',
  );
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [puppyImage, setPuppyImage] = useState<string>('');
  const navigate = useNavigate();

  const getCurrentUserInfo = async () => {
    const res = await getUserData();
    setUserInfo(res);

    const result = await getReviewRequest(`airesult/${props.id}`);
    setPuppyImage(result.aiImage);
  };
  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  // 리뷰 포스팅
  const handleWritingEditorClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createReviewRequest(`review/${props.id}`, {
      description,
    });
    navigate('/reviewboard');
  };

  // 수정하기 버튼
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
          : handleWritingEditorClick(e);
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
          <div>
            <img src={puppyImage} />
          </div>
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
  max-width: 48rem;
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

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 3.5rem;
  font-size: 16px;
  font-family: ${font.bold};
  padding-left: 5px;

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

const ModalContents = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-family: ${font.normal};
  font-size: 16px;
`;

const AddImage = styled.div`
  border-right: solid 1px lightgray;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
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
