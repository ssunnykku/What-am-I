import { useState, useEffect } from 'react';
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
import { getCurrentCommunityRequest } from '../apis/communityFetcher';
import {
  CommunityType,
  CurrentCommuPostsType,
} from '../types/community/communityType';
import CommuLikeBtn from '../components/community/CommuLikeBtn';

const LikedCommuPage = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [commuPosts, setCommuPosts] = useState<CurrentCommuPostsType[]>([]);
  const [commuInfo, setCommuInfo] = useState<CommunityType>();
  const [currentUser, setCurrentUser] = useState<string>('');

  // 쿼리 스트링에 값 넣어주기
  let getParameter = (key: string) => {
    return new URLSearchParams(location.search).get(key);
  };
  const id = getParameter('id');
  const getCommunityData = async () => {
    const res = await getCurrentCommunityRequest(`communities/posts/${id}`);
    setCommuInfo(res);
  };

  // 커뮤니티 전체 게시글 받아오기
  const getPosts = async () => {
    const res = await getCurrentCommunityRequest(
      `communityPost/${id}?page=${page}`,
    );
    setCommuPosts(res.result.selectedCommunityPost);
    setTotalPages(res.result.communityPostCount);
  };

  useEffect(() => {
    getCommunityData();
    getPosts();
  }, [page]);

  return (
    <BigBox>
      <CommunityBox>
        <IntroBox>
          <ImageBox>
            <img src={commuInfo?.communityImage} />
          </ImageBox>
          <NameBox>
            <CommuName>
              {commuInfo?.name}
              <EditDelBtn style={{ margin: '0 10px' }}>수정</EditDelBtn>
            </CommuName>
            <CommuIntro>{commuInfo?.introduction}</CommuIntro>
          </NameBox>
          <WritingBtnBox>
            <CommuWritingModal />
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
            <CommuContentsModal key={commuPost.id} commuPost={commuPost} />
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
  width: 29rem;
  height: 75%;
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
`;

const CommuIntro = styled.div`
  display: flex;
  width: 480px;
  height: 5rem;
  font-family: ${font.normal};
  font-size: 16.5px;
  margin-top: 5px;
  line-height: 22px;
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
  width: 60rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1.5rem;
`;
