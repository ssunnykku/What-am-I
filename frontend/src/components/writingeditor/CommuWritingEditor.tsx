import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import { CreateCurrentCommunityPostRequest } from '../../apis/communityFetcher';
import { CurrentCommuPostsTypeProps } from '../modal/CommuContentsModal';
import { commuInfoTypeProps } from '../modal/CommuWritingModal';
import { getUserData } from '../../apis/mypageFetcher';
import { UserInfoType } from '../../types/auth/authType';

const CommuWritingEditor = (props: commuInfoTypeProps) => {
  const [images, setImages] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [userInfo, setUserInfo] = useState<UserInfoType>();

  const [postImages, setPostImages] = useState<File[]>([]);
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);

  // 포스팅할 사진 미리보기
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      setPostImages([...postImages, e.target.files[0]]);

      reader.onload = () => {
        const previewUrl = reader.result as string;

        if (previewUrl) {
          setPreviewImgs([...previewImgs, previewUrl]);
        }
      };
    }

    // const fileArr = e.target.files;
    //   setPostImages(Array.from(fileArr));
    //   const fileUrls: any = [];
    //   const fileLength = fileArr?.length > 5 ? 5 : fileArr?.length;

    //   for (let i = 0; i < fileLength; i++) {
    //     const file = fileArr[i];
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       fileUrls[i] = reader.result as string;
    //       setPreviews([...fileUrls]);
    //     };
    //     reader.readAsDataURL(file);
    //   }

    // if (e.target.files) {
    //   const files = e.target.files;
    //   let filesUrl = [...postImages];

    //   for (let i = 0; i < files.length; i++) {
    //     const currentImgUrl = URL.createObjectURL(files[i]);
    //     filesUrl.push(currentImgUrl);

    //     const reader = new FileReader();
    //     reader.onload = () => {
    //     filesUrl[i] = reader.result
    //     setPostImages([...filesUrl])
    //   }
    //   }
    //   if (filesUrl.length > 5) {
    //     filesUrl = filesUrl.slice(0, 5);
    //   }
    // }

    // if (e.target.files) {
    //   const file = e.target.files[0];
    //   setImages(file);
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);

    //   console.log(file);

    //   reader.onload = () => {
    //     setPreview(reader.result as string);
    //   };
    // }
  };

  // 미리보기 삭제
  const handleDeletePreviewFile = (e: React.MouseEvent) => {
    e.preventDefault();
    if (previewImgs) {
      setPreviewImgs([]);
    }
  };

  const getCurrentUser = async () => {
    const res = await getUserData();
    setUserInfo(res);
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  // 커뮤니티 내에 포스팅
  const handleWritingEditorClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (postImages) {
      const res = await CreateCurrentCommunityPostRequest(
        `communitypost/${props.commuInfo?.id}`,
        {
          images: postImages,
          description,
        },
      );
    } else {
      alert('사진은 필수입니다. 귀여운 댕댕이를 마음껏 보여 주세요!');
    }
  };

  //게시물 수정
  const handleEditCurrentCommuPost = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('컨텐츠를 수정할 거여요.');

    // if (props.modalHandler) {
    //   props.modalHandler();
    // }
  };

  return (
    <>
      <CreateModalWrapper
        // onSubmit={(e: any) => {
        //   props.mode === 'edit'
        //     ? handleEditCurrentCommuPost(e)
        //     : handleWritingEditorClick(e);
        // }}
        onSubmit={handleWritingEditorClick}
      >
        <ModalHeader>
          게시물 작성하기
          <ModalHeaderBtn type="submit">공유하기</ModalHeaderBtn>
        </ModalHeader>
        <ModalContents>
          <AddImage>
            {previewImgs.map((pre, idx) => (
              <ImagePlace key={idx}>
                <img src={pre} alt={`${pre}-${idx}`} />
              </ImagePlace>
            ))}
            <InputBox>
              <div className="upload-box">
                <label htmlFor="file">사진 업로드</label>
              </div>
              <input
                hidden
                type="file"
                id="file"
                multiple
                ref={imageInputRef}
                accept="image/*"
                onChange={handleChangeFile}
              />
              <button onClick={handleDeletePreviewFile}>삭제</button>
            </InputBox>
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
  min-width: 35rem;
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
  font-family: ${font.bold};
  font-size: 15px;
`;

const AddImage = styled.div`
  border-right: solid 1px lightgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImagePlace = styled.div`
  border-top: solid 1px lightgray;
  border-bottom: solid 1px lightgray;
  width: 100%;
  height: 70%;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;

  .upload-box {
    border: solid 1px ${theme.boldColor};
    background-color: ${theme.lightColor};
    color: ${theme.boldColor};
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 15px;
    font-family: ${font.normal};
    border-radius: 10px;
    margin-left: 5px;
    :hover {
      transform: translateY(-2px);
    }
  }

  label {
    cursor: pointer;
    width: 6rem;
    height: 2rem;
  }

  button {
    background-color: ${theme.backColor};
    border: solid 1px ${theme.boldColor};
    color: ${theme.boldColor};
    font-family: ${font.normal};
    cursor: pointer;
    border-radius: 10px;
    margin-left: 5px;

    :hover {
      transform: translateY(-2px);
    }
  }
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
      font-size: 15px;
      font-family: ${font.normal};
      line-height: 22px;
      resize: none;
    }
  }
`;
