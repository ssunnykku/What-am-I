import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import {
  EditDelBtn,
  EntryBtn,
  SearchBox,
} from '../assets/styles/common/commonComponentStyle';
import WritingModal from '../components/modal/WritingModal';
import ContentsModal from '../components/modal/ContentsModal';
import { theme } from '../assets/styles/common/palette';
import LikeBtn from '../components/common/LikeBtn';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PaginateButton from '../components/pagination/PaginateButton';

const LikedCommuPage = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // const fetchData = async () => {
  //   const res = await currentCommuListRequest('community?page="page"');
  //   setPosts(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      <BigBox>
        <CommunityBox>
          <IntroBox>
            <ImageBox />
            <NameBox>
              <CommuName>커뮤니티 이름 [체크 버튼]</CommuName>
              <CommuIntro>
                커뮤니티 소개가 들어가는 칸입니다. 귀여운 내 새끼 나만 볼 수는
                없죠! 마구마구 자랑해주시길 바랍니다. 그래서 만든 커뮤니티예요.
                여러분 마구마구 자랑을 갈겨 주세요!
              </CommuIntro>
              <EditDelBtn>수정</EditDelBtn>
            </NameBox>
            <BtnBox>
              <EntryBtn style={{ marginBottom: '1rem' }}>채팅방 입장</EntryBtn>
              <WritingModal />
            </BtnBox>
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
            <ContentsModal />
          </ContentsBox>
          <PaginateButton
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </CommunityBox>
      </BigBox>
    </>
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
  justify-content: center;
  margin-top: 1.5rem;
`;

const ImageBox = styled.div`
  border: solid 1px black;
  border-radius: 50%;
  height: 9rem;
  width: 9rem;
  margin: 0rem 2rem;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30rem;
  height: 75%;
`;

const CommuName = styled.div`
  display: flex;
  align-items: center;
  width: 25rem;
  height: 3rem;
  font-family: ${font.bold};
  font-size: 1.3rem;
  letter-spacing: 0.1rem;
`;

const CommuIntro = styled.div`
  display: flex;
  align-items: center;
  width: 30rem;
  height: 4rem;
  font-family: ${font.normal};
  font-size: 0.85rem;
  line-height: 1.3rem;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 11rem;
`;

const SmallBox = styled.div`
  height: 2rem;
  width: 50rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-right: 1rem;
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
