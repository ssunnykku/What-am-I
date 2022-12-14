import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import {
  EditDelBtn,
  SearchBox,
} from '../assets/styles/common/commonComponentStyle';
import { theme } from '../assets/styles/common/palette';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PaginateButton from '../components/pagination/PaginateButton';
import CommuWritingModal from '../components/modal/CommuWritingModal';
import CommuContentsModal from '../components/modal/CommuContentsModal';
import {
  editCommunityRequest,
  getCurrentCommunityRequest,
} from '../apis/communityFetcher';
import {
  CommunityType,
  CurrentCommuPostsType,
} from '../types/community/communityType';
import CommuLikeBtn from '../components/community/CommuLikeBtn';
import { UserInfoType } from '../types/auth/authType';
import { getUserData } from '../apis/mypageFetcher';

const LikedCommuPage = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [commuPosts, setCommuPosts] = useState<CurrentCommuPostsType[]>([]);
  const [commuInfo, setCommuInfo] = useState<CommunityType>();
  const [currentUserInfo, setCurrentUserInfo] = useState<UserInfoType>();
  const [editing, setEditing] = useState<Boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newIntroduction, setNewIntroduction] = useState<string>('');
  const [newCommuImg, setNewCommuImg] = useState<File | null>(null);
  const [newPreview, setNewPreview] = useState<string>('');
  const editImgRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const editTextAreaRef = useRef<HTMLTextAreaElement>(null);

  // const [postImages, setPostImages] = useState<string>('');

  // 쿼리 스트링에 값 넣어주기
  let getParameter = (key: string) => {
    return new URLSearchParams(location.search).get(key);
  };
  const id = getParameter('id');
  const getCommunityData = async () => {
    const res = await getCurrentCommunityRequest(`communities/posts/${id}`);
    setCommuInfo(res);
  };

  // 현재 로그인 중인 유저 닉네임 받기
  const getCurrentUserInfo = async () => {
    const res = await getUserData();
    setCurrentUserInfo(res);
  };

  // 커뮤니티 내 전체 게시글 받아오기
  const getPosts = async () => {
    const res = await getCurrentCommunityRequest(
      `communityPost/${id}?page=${page}`,
    );
    console.log(res);
    setCommuPosts(res.result.selectedCommunityPost);
    setTotalPages(res.result.communityPostCount);

    // const postImgMap = res.result.selectedCommunityPost.map(
    //   (post: any) => post.images.split(',')[0],
    // );
    // setPostImages(postImgMap);
  };

  useEffect(() => {
    getCommunityData();
    getPosts();
    getCurrentUserInfo();
  }, [page]);

  // 커뮤니티 수정
  useEffect(() => {
    if (editing) {
      if (editTextAreaRef.current) {
        editTextAreaRef.current.focus();
      }
    }
  }, [editing]);

  const onClickCommuintyEditBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditing(true);
  };

  const onChangeCommunityEditInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewName(e.target.value);
  };

  const onChangeCommunityEditTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNewIntroduction(e.target.value);
  };

  // 사진 미리보기
  const handleChangeImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setNewCommuImg(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setNewPreview(reader.result as string);
      };
    }
  };

  // 커뮤니티 수정
  const handleCommunityEditButton = async (e: React.FormEvent) => {
    e.preventDefault();

    if (commuInfo?.communityImage) {
      await editCommunityRequest(`communities/${id}`, {
        name: newName,
        introduction: newIntroduction,
        communityImage: newCommuImg ? newCommuImg : commuInfo?.communityImage,
      });
      setEditing(false);

      const result = await getCurrentCommunityRequest(
        `communities/posts/${id}`,
      );
      setCommuInfo(result);
    }
  };
  return (
    <BigBox>
      <CommunityBox>
        <IntroBox>
          {commuInfo && editing ? (
            <ImageBox>
              <label htmlFor="img_file">
                {newPreview && <img src={newPreview} />}
                이미지 수정
              </label>
              <input
                hidden
                ref={editImgRef}
                type="file"
                id="img_file"
                accept="image/*"
                onChange={handleChangeImgFile}
              />
            </ImageBox>
          ) : (
            <ImageBox>
              <img src={commuInfo?.communityImage} />
            </ImageBox>
          )}

          <NameBox>
            <CommuName>
              {commuInfo && editing ? (
                <>
                  <input
                    className="newname-text"
                    ref={editInputRef}
                    value={newName}
                    onChange={onChangeCommunityEditInput}
                    autoFocus={true}
                    onFocus={() => setNewName(commuInfo.name)}
                  />
                  <EditDelBtn
                    style={{ margin: '0 10px' }}
                    onClick={handleCommunityEditButton}
                  >
                    완료
                  </EditDelBtn>
                </>
              ) : (
                <>
                  <div>{commuInfo?.name}</div>
                  {commuInfo?.userId === currentUserInfo?.userId ? (
                    <EditDelBtn
                      style={{ margin: '0 10px' }}
                      onClick={onClickCommuintyEditBtn}
                    >
                      수정
                    </EditDelBtn>
                  ) : null}
                </>
              )}
            </CommuName>
            <CommuIntro>
              {commuInfo && editing ? (
                <textarea
                  className="newintro-text"
                  ref={editTextAreaRef}
                  value={newIntroduction}
                  onChange={onChangeCommunityEditTextArea}
                  autoFocus={true}
                  onFocus={() => setNewIntroduction(commuInfo.introduction)}
                />
              ) : (
                <div>{commuInfo?.introduction}</div>
              )}
            </CommuIntro>
          </NameBox>
          <WritingBtnBox>
            <CommuWritingModal commuInfo={commuInfo} />
          </WritingBtnBox>
        </IntroBox>
        <SmallBox>
          <SearchBox style={{ height: '1.8rem' }}>
            <input></input>
            <button>검색</button>
          </SearchBox>
          <InfoBox>
            <div>
              <CommuLikeBtn />
            </div>
            <div>
              <StickyNote2Icon style={{ marginRight: '3px' }} />
            </div>
          </InfoBox>
        </SmallBox>
        <ContentsBox>
          {commuPosts?.map((commuPost) => (
            <CommuContentsModal
              key={commuPost.id}
              commuPost={commuPost}
              currentUserInfo={currentUserInfo}
            />
          ))}
        </ContentsBox>
        <PaginateButton page={page} setPage={setPage} totalPages={totalPages} />
      </CommunityBox>
    </BigBox>
  );
};

export default LikedCommuPage;

const BigBox = styled.div`
  width: 100%;
  height: 87.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${font.normal};
  margin-top: 10px;
`;

const CommunityBox = styled.div`
  background-color: ${theme.backColor};
  width: 60rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const IntroBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
  position: relative;
`;

const ImageBox = styled.div`
  border: solid 1px black;
  border-radius: 5px;
  height: 9rem;
  width: 10rem;
  margin-right: 15px;
  margin-left: 75px;
  position: relative;
  overflow: hidden;

  label {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* height: 75%; */
  margin-left: 10px;
`;

const CommuName = styled.div`
  display: flex;
  align-items: center;
  width: 550px;
  height: 3rem;
  font-family: ${font.bold};
  font-size: 22px;
  letter-spacing: 0.1rem;

  .newname-text {
    width: 480px;
    height: 60%;
    font-family: ${font.bold};
    font-size: 18px;
    letter-spacing: 0.1rem;
    resize: none;
  }
`;

const CommuIntro = styled.div`
  display: block;
  width: 480px;
  height: 5rem;
  font-family: ${font.normal};
  font-size: 16.5px;
  /* margin-top: 5px; */
  line-height: 22px;
  white-space: pre-wrap;

  .newintro-text {
    width: 475px;
    height: 4rem;
    font-family: ${font.normal};
    font-size: 15px;
    letter-spacing: 0.1rem;
    resize: none;
  }
`;

const WritingBtnBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  right: 80px;
`;

const SmallBox = styled.div`
  height: 2rem;
  width: 50rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-right: 20px;
`;

const InfoBox = styled.div`
  height: 2rem;
  width: 13rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  div {
    margin-left: 10px;
    font-size: 1rem;
    display: flex;
    align-items: center;
  }
`;

const ContentsBox = styled.div`
  justify-content: center;
  margin: 1rem;
  width: 47rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;
