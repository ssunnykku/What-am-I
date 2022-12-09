import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import {
  EditDelBtn,
  SearchBox,
} from '../assets/styles/common/commonComponentStyle';
import { theme } from '../assets/styles/common/palette';
import LikeBtn from '../components/common/LikeBtn';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PaginateButton from '../components/pagination/PaginateButton';
import CommuWritingModal from '../components/modal/CommuWritingModal';
import CommuContentsModal from '../components/modal/CommuContentsModal';
import { getCurrentCommuListRequest } from '../apis/communityFetcher';
import { CommunityType } from '../types/community/communityType';

const LikedCommuPage = (props: CommunityType) => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [commuInfo, setCommuInfo] = useState<CommunityType>();

  useEffect(() => {
    let getParameter = (key: string) => {
      return new URLSearchParams(location.search).get(key);
    };
    const id = getParameter('id');
    const getCommunityData = async () => {
      const res = await getCurrentCommuListRequest(`communities/posts/${id}`);
      setCommuInfo(res);
    };
    getCommunityData();
  }, []);

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
              <EditDelBtn style={{ marginLeft: '10px' }}>수정</EditDelBtn>
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
              <LikeBtn />
              &nbsp;10
            </div>
            <div>
              <StickyNote2Icon />
              &nbsp;10
            </div>
          </InfoBox>
        </SmallBox>
        <ContentsBox>
          <CommuContentsModal />
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
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.3);
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
  border-radius: 50%;
  height: 9rem;
  width: 9rem;
  margin-right: 15px;
  margin-left: 5rem;
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
  width: 500px;
  height: 3rem;
  font-family: ${font.bold};
  font-size: 22px;
  letter-spacing: 0.1rem;
`;

const CommuIntro = styled.div`
  display: flex;
  width: 500px;
  height: 4rem;
  font-family: ${font.normal};
  font-size: 17px;
  margin-top: 5px;
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
