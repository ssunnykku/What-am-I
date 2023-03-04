import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from 'react';
import styled, { css } from 'styled-components';
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
  getSearchRequest,
} from '../apis/communityFetcher';
import {
  CommunityRankingType,
  CommunityType,
  PinnedCommunityType,
} from '../types/community/communityType';
import { useInView } from 'react-intersection-observer';
import { CommuSpinner } from '../components/loader/CustomSpinner';
import Storage from '../storage/storage';
import CommuPinCard from '../components/community/CommuPinCard';
import useDetectClose from '../hooks/dropdown/useDetectClose';

interface DropdownProps {
  isDropped: boolean;
}

const CommunityPage = () => {
  const [rankings, setRankings] = useState<CommunityType[]>([]);
  const [commuList, setCommuList] = useState<CommunityType[]>([]);
  const [pinned, setPinned] = useState<CommunityType[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [ref, inView] = useInView();

  const [menu, setMenu] = useState<string>('최신 순');
  const [sortIsOpen, sortRef, sortHandler] = useDetectClose(false);

  const [userInput, setUserInput] = useState<string>('');
  const [searchLists, setSearchLists] = useState<CommunityType[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // 커뮤니티 검색
  const getSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value.toLowerCase());

    if (userInput.length === 1) {
      setIsSearching(false);
    }
  };
  const searchedData = searchLists.filter((item) =>
    item.name
      .replace(' ', '')
      .toLocaleLowerCase()
      .includes(userInput.toLocaleLowerCase().replace(' ', '')),
  );

  const onClickSearchInput = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res = await getSearchRequest(userInput);
    setSearchLists(res.rows);
    setIsSearching(true);
  };

  // 로그인 여부
  if (!Storage.getUserIdItem()) {
    alert('로그인이 필요한 서비스입니다. 로그인하러 가볼까요?');
    document.location.href = '/login';
  }

  // 무한 스크롤
  const handleScroll = useCallback(async () => {
    setLoading(true);
    await getCommunitiesRequest(pages).then((res) => {
      setCommuList((prevList) => [...prevList, ...res.getCommunities]);
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

  // 전체 커뮤니티 목록
  useEffect(() => {
    const getCommunitiesList = async () => {
      const res = await getCommunitiesRequest(pages);
      setCommuList(res.getCommunities);
    };
    getCommunitiesList();
  }, []);

  // 커뮤니티 목록 드롭다운
  const onChangeReverse = () => {
    if (menu === '최신 순') {
      setMenu('오래된 순');
      commuList.sort((x, y) => {
        return +new Date(x.createdAt) - +new Date(y.createdAt);
      });
    } else {
      setMenu('최신 순');
      commuList.sort((x, y) => {
        return +new Date(y.createdAt) - +new Date(x.createdAt);
      });
    }
  };

  const onChangeName = () => {
    setMenu('이름 순');
    commuList.sort((x, y) => {
      return x.name < y.name ? -1 : x.name > y.name ? 1 : 0;
    });

    if (menu === '이름 순') {
      setMenu('오래된 순');
      commuList.sort((x, y) => {
        return +new Date(x.createdAt) - +new Date(y.createdAt);
      });
    }
  };

  const onChangeLike = () => {
    setMenu('좋아요 순');
    commuList.sort((x, y) => {
      return x.likeCount < y.likeCount ? 1 : x.likeCount > y.likeCount ? -1 : 0;
    });

    if (menu === '좋아요 순') {
      setMenu('오래된 순');
      commuList.sort((x, y) => {
        return +new Date(x.createdAt) - +new Date(y.createdAt);
      });
    }
  };

  // 베스트 커뮤니티
  const getRankingCommunity = useCallback(async () => {
    const res = await getRankingCommunityRequest();
    const rankingMap = res.map(
      (ranking: CommunityRankingType) => ranking.Community,
    );
    return setRankings(rankingMap);
  }, []);
  useEffect(() => {
    getRankingCommunity();
  }, []);

  // 고정 커뮤니티
  useEffect(() => {
    const getPinnedCommunity = async () => {
      const res = await getPinnedCommunityRequest();
      const pinnedMap = res.map(
        (pinned: PinnedCommunityType) => pinned.Community,
      );
      setPinned(pinnedMap);
    };
    getPinnedCommunity();
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
          <PinBox>
            {pinned?.map((pin) => {
              return (
                <div
                  draggable={true}
                  // style={{ border: 'solid 1px blue' }}
                >
                  <CommuPinCard key={pin.id} listInfo={pin} />
                </div>
              );
            })}
          </PinBox>
        </PopularCommuBox>
        <ListsBox>
          <CommuListHeader>
            <DropdownPlace>
              <DropdownContainer>
                <li onClick={sortHandler} ref={sortRef}>
                  {menu}
                </li>
                <ListMenu isDropped={sortIsOpen}>
                  <ListBox>
                    <li onClick={onChangeReverse}>
                      {menu === '최신 순' ? '오래된 순' : '최신 순'}
                    </li>
                    <li onClick={onChangeName}>
                      {menu === '이름 순' ? '오래된 순' : '이름 순'}
                    </li>
                    <li onClick={onChangeLike}>
                      {menu === '좋아요 순' ? '오래된 순' : '좋아요 순'}
                    </li>
                  </ListBox>
                </ListMenu>
              </DropdownContainer>
            </DropdownPlace>
            커뮤니티 목록
            <SearchBox style={{ marginLeft: '20px', width: '20rem' }}>
              <input
                onChange={getSearchData}
                type="text"
                placeholder="커뮤니티 이름 또는 소개글로 검색됩니다"
              />
              <button
                onClick={onClickSearchInput}
                disabled={userInput.length === 0}
              >
                검색
              </button>
            </SearchBox>
          </CommuListHeader>
          <CommuListsBox>
            <ScrollBox>
              <>
                {!isSearching ? (
                  <>
                    {commuList?.map((commu, idx) => {
                      const observerRef =
                        commuList.length - 1 === idx ? ref : undefined;
                      return (
                        <div ref={observerRef}>
                          <CommuListCard key={commu.id} listInfo={commu} />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {searchLists.length === 0 ? (
                      <span>검색 결과가 없습니다.</span>
                    ) : (
                      <div>
                        {searchLists.map((item) => (
                          <CommuListCard listInfo={item} />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
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
  /* width: 100%;
  height: 87vh; */
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
  flex-wrap: wrap;
`;

const PopularCommuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
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

const PinHeader = styled(RankingHeader)`
  margin-top: 4rem;
`;

const PinBox = styled(RankingBox)`
  /* border: solid 1px red; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const ListsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
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
  position: relative;
`;

const DropdownPlace = styled.div`
  position: absolute;
  left: 0;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  line-height: 1.5rem;
  font-size: 0.9rem;
  background-color: ${theme.backColor};
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  li {
    width: 5rem;
    height: 1.5rem;
  }
`;

const ListMenu = styled.div<DropdownProps>`
  background: ${theme.backColor};
  position: absolute;
  top: 1.6rem;
  left: 50%;
  width: 5rem;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
  z-index: 9;

  &:after {
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    /* border: 12px solid transparent; */
    /* border: 1rem solid transparent; */
    border-bottom-color: ${theme.backColor};
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
      border-radius: 5px;
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    `};
`;

const ListBox = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  li {
    width: 5rem;
    border-bottom: solid 1px lightgray;
  }
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
