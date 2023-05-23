import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import {
  CreateBtn,
  SearchBox,
  WritingProfile,
} from '../assets/styles/common/commonComponentStyle';
import { theme } from '../assets/styles/common/palette';
import { useEffect, useState } from 'react';
import { getReviewRequest } from '../apis/reviewFetcher';
import ReviewContentsModal from '../components/modal/ReviewContentsModal';
import usePaginate from '../hooks/usePaginate/usePaginate';
import { AIresultType, ReviewType } from '../types/reviewboard/reviewType';
import {
  getFollowingBuddyData,
  getPuppiesData,
  getUserData,
} from '../apis/mypageFetcher';
import { UserInfoType } from '../types/auth/authType';
import { useNavigate } from 'react-router-dom';
import MyDiary from '../components/reviewBoard/MyDiary';
import YourDiary from '../components/reviewBoard/YourDiary';
import DiaryPanel from '../components/reviewBoard/DiaryTabPanel';
import { BuddyType } from '../types/community/communityType';

export const enum DIARYVALUE {
  MYDIARY = 'Mydiary',
  YOURDIARY = 'Yourdiary',
}

const ReviewBoardPage = () => {
  const [pages, setPages] = useState<number>(1);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [search, setSearch] = useState<string>('');
  const { isFirst, isLast, handleNextBtnClick, handlePrevBtnClick } =
    usePaginate(pages, setPages, totalPages, 1);

  const [value, setValue] = useState<DIARYVALUE>(DIARYVALUE.MYDIARY);
  const [followingInfo, setFollowingInfo] = useState<BuddyType[]>();

  const PageHandler = () => {
    switch (value) {
      case DIARYVALUE.MYDIARY:
        return <MyDiary />;

      case DIARYVALUE.YOURDIARY:
        return <YourDiary />;
    }
  };

  // 내가 추가한 친구
  const getFollowingData = async () => {
    const res = await getFollowingBuddyData(pages);
    setFollowingInfo(res);
  };

  // 현재 로그인 정보 받기
  const getCurrentUser = async () => {
    try {
      const res = await getUserData();
      setCurrentUser(res.userId);
      setUserInfo(res);
    } catch (err) {
      alert('로그인이 필요한 서비스입니다. 로그인하러 가볼까요?');
      document.location.href = '/login';
    }
  };

  useEffect(() => {
    getCurrentUser();
    getPuppiesData();
    getFollowingData();
  }, []);

  // 전체 리뷰 받기
  const getReviews = async () => {
    const res = await getReviewRequest(`reviews?page=${pages}`);
    setReviews(res.result.selectedReviews);
    setTotalPages(res.result.reviewCount);
  };
  useEffect(() => {
    getReviews();
  }, [handleNextBtnClick, handlePrevBtnClick]);

  // 리뷰 검색 기능 --- 추가 작업 필요 --- 완성 ㄴㄴㄴ
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (search !== null || search !== '') {
      const res = await getReviewRequest(`review/search?${search}`);
      console.log(res);
    }
  };

  return (
    <BoardBox>
      <header>
        <DiaryPanel value={value} setValue={setValue} />
      </header>

      <BoardContainer>
        <BoardContent>
          <ProfileContainer>
            <ProfileBox>여기</ProfileBox>
          </ProfileContainer>
          <CardContainer>
            <SlideLeftBtn disabled={isFirst} onClick={handlePrevBtnClick} />
            <CardBox>
              {PageHandler()}

              <div className="card-box">
                {reviews &&
                  reviews?.map((review) => (
                    <ReviewContentsModal
                      key={review.id}
                      review={review}
                      getReviews={getReviews}
                      currentUser={currentUser}
                      userInfo={userInfo}
                    />
                  ))}
              </div>
            </CardBox>
            <SlideRightBtn disabled={isLast} onClick={handleNextBtnClick} />
          </CardContainer>
        </BoardContent>
        <BuddyBox>
          <div className="list-header">my buddies 🐶</div>
          {followingInfo?.map((buddy) => (
            <div className="list-buddy">
              <NicknamePlace>
                <div key={buddy.id} className="profile">
                  <img src={buddy.FriendList.profileImg} />
                </div>
                <div>{buddy.FriendList.nickname}</div>
              </NicknamePlace>
            </div>
          ))}
        </BuddyBox>
      </BoardContainer>
      {/* <SearchBox style={{ marginTop: '7vh' }} onSubmit={(e) => onSearch(e)}>
        <input
          type="text"
          value={search}
          placeholder="글 내용 검색"
          onChange={onChangeSearch}
        />
        <button type="submit">검색</button>
      </SearchBox> */}
    </BoardBox>
  );
};

export default ReviewBoardPage;

const BoardBox = styled.div`
  width: 100%;
  height: 85vh;
  font-family: ${font.bold};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 45rem;
`;

const BoardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
  width: 50rem;
`;

const ProfileBox = styled.div`
  border: solid 1px purple;
  width: 35rem;
  height: 95%;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CardBox = styled.div`
  display: flexbox;
  justify-content: center;
  justify-content: space-evenly;
  width: 50rem;
  min-width: 50rem;
  min-height: 30rem;
  border: solid 1px purple;

  .card-box {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    place-items: center;
    width: 65rem;
    min-width: 65rem;
    height: 30rem;
  }
`;

const BuddyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px lightgray;
  width: 13rem;
  height: 90%;
  font-size: 17px;
  font-family: ${font.normal};
  margin-left: 20px;
  border-radius: 10px;

  .list-header {
    padding: 15px 0;
    border-bottom: solid 1px ${theme.backColor};
  }

  .list-buddy {
    height: 55px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
  }
`;

const NicknamePlace = styled(WritingProfile)`
  font-size: 14px;
  display: flex;

  .profile {
    width: 35px;
    height: 35px;
    margin-right: 15px;
  }
`;

const SlideLeftBtn = styled.button`
  background: 0;
  width: 0;
  height: 0;
  border-bottom: 1rem solid transparent;
  border-top: 1rem solid transparent;
  border-left: 1rem solid transparent;
  border-right: 1rem solid lightgray;

  :hover {
    border-bottom: 1rem solid transparent;
    border-top: 1rem solid transparent;
    border-left: 1rem solid transparent;
    border-right: 1rem solid ${theme.pointColor};
    cursor: pointer;
  }

  &[disabled] {
    border-bottom: 1rem solid transparent;
    border-top: 1rem solid transparent;
    border-left: 1rem solid transparent;
    border-right: 1rem solid lightgray;
    cursor: revert;
    transform: revert;
  }
`;

const SlideRightBtn = styled.button`
  background: 0;
  width: 0;
  height: 0;
  border-bottom: 1rem solid transparent;
  border-top: 1rem solid transparent;
  border-left: 1rem solid lightgray;
  border-right: 1rem solid transparent;

  :hover {
    border-bottom: 1rem solid transparent;
    border-top: 1rem solid transparent;
    border-left: 1rem solid ${theme.pointColor};
    border-right: 1rem solid transparent;
    cursor: pointer;
  }

  &[disabled] {
    border-bottom: 1rem solid transparent;
    border-top: 1rem solid transparent;
    border-left: 1rem solid lightgray;
    border-right: 1rem solid transparent;
    cursor: revert;
    transform: revert;
  }
`;
