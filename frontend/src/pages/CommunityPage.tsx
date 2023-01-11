import { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import CommuRankingCard from '../components/community/CommuRankingCard';
import CommuListCard from '../components/community/CommuListCard';
import { SearchBox } from '../assets/styles/common/commonComponentStyle';
import { theme } from '../assets/styles/common/palette';
import MakingCommuModal from '../components/modal/MakingCommuModal';
import {
  getCommunitiesRequest,
  getPinnedCommunityRequest,
  getRankingCommunityRequest,
} from '../apis/communityFetcher';
import {
  CommunityRankingType,
  CommunityType,
} from '../types/community/communityType';
import { useInView } from 'react-intersection-observer';
import { CommuSpinner } from '../components/loader/CustomSpinner';
import Storage from '../storage/storage';
import CommuPinCard from '../components/community/CommuPinCard';

const CommunityPage = () => {
  const [rankings, setRankings] = useState<CommunityType[]>([]);
  const [commuList, setCommuList] = useState<CommunityType[]>([]);
  const [pinned, setPinned] = useState<CommunityType[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [ref, inView] = useInView();

  // 무한 스크롤
  const handleScroll = useCallback(async () => {
    setLoading(true);
    await getCommunitiesRequest(pages).then((res) => {
      setCommuList((prevList) => [...prevList, ...res.selectedCommunity]);
    });
    setLoading(false);
  }, [pages]);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    if (inView && !loading) {
      setTimeout(() => {
        setPages((page) => page + 1);
      }, 1500);
    }
  }, [inView]);

  // 로그인 여부
  if (!Storage.getUserIdItem()) {
    alert('로그인이 필요한 서비스입니다. 로그인하러 가볼까요?');
    document.location.href = '/login';
  }

  // 베스트 커뮤니티
  const getRankingCommunity = async () => {
    const res = await getRankingCommunityRequest();
    const rankingMap = res.map(
      (ranking: CommunityRankingType) => ranking.Community,
    );
    setRankings(rankingMap);
  };

  // 고정 커뮤니티
  // const getPinnedCommunity = async () => {
  //   const res = await getPinnedCommunityRequest();
  // };

  // 전체 커뮤니티 목록
  const getCommunitiesList = async () => {
    const res = await getCommunitiesRequest(pages);
    setCommuList(res.selectedCommunity);
    console.log(res);
  };

  useEffect(() => {
    getRankingCommunity();
    getCommunitiesList();
    // getPinnedCommunity();
  }, []);

  return (
    <CommuBox>
      <Header>
        다양한 댕댕이와 만나 보세요.
        <MakingCommuModal />
      </Header>
      <CommuContainer>
        <PopularCommuBox>
          <RankingHeader>인기 커뮤니티</RankingHeader>
          <RankingBox>
            {rankings?.map((ranking) => (
              <CommuRankingCard key={ranking.id} listInfo={ranking} />
            ))}
          </RankingBox>
          <PinHeader>고정 커뮤니티</PinHeader>
          <PinBox></PinBox>
        </PopularCommuBox>
        <ListsBox>
          <CommuListHeader>
            커뮤니티 목록
            <SearchBox style={{ marginLeft: '20px', width: '20rem' }}>
              <input type="text" placeholder="댕댕이 커뮤니티 찾아보기" />
              <button>검색</button>
            </SearchBox>
          </CommuListHeader>
          <CommuListsBox>
            <ScrollBox>
              {commuList?.map((commu, idx) => {
                const observerRef =
                  commuList.length - 1 === idx ? ref : undefined;
                return (
                  <div ref={observerRef}>
                    <CommuListCard key={commu.id} listInfo={commu} />
                  </div>
                );
              })}
              <div className="spinner">{loading ? <CommuSpinner /> : null}</div>
            </ScrollBox>
          </CommuListsBox>
        </ListsBox>
      </CommuContainer>
    </CommuBox>
  );
};

export default CommunityPage;

const CommuBox = styled.div`
  width: 100%;
  height: 87vh;
  font-family: ${font.bold};
`;

const Header = styled.div`
  font-size: 20px;
  display: flexbox;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
  letter-spacing: 1px;
`;

const CommuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PopularCommuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px purple;
`;

const RankingHeader = styled.div`
  width: 23rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  margin-top: 3rem;
  color: ${theme.mainColor};
  font-size: 20px;
`;

const RankingBox = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  margin-top: 1.5rem;
`;

const PinHeader = styled(RankingHeader)``;
const PinBox = styled(RankingBox)``;

const ListsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommuListHeader = styled.div`
  width: 47rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 3rem;
  color: ${theme.mainColor};
  font-size: 20px;
`;

const CommuListsBox = styled.div`
  height: 100%;
  width: 50rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* align-items: flex-end; */
  margin-top: 12px;
`;

const ScrollBox = styled.div`
  border: solid 2px ${theme.mainColor};
  border-radius: 10px;
  width: 47rem;
  height: 32rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  padding-top: 20px;

  // 스크롤 조절
  overflow-x: hidden;
  -ms-overflow-style: none;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  .spinner {
    display: flex;
    align-items: center;
    height: 15px;
  }
`;
