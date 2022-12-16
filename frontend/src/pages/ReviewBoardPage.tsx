import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import {
  CreateBtn,
  SearchBox,
} from '../assets/styles/common/commonComponentStyle';
import ReviewWritingModal from '../components/modal/ReviewWritingModal';
import { theme } from '../assets/styles/common/palette';
import { useEffect, useState } from 'react';
import { getReviewRequest } from '../apis/reviewFetcher';
import ReviewContentsModal from '../components/modal/ReviewContentsModal';
import usePaginate from '../hooks/usePaginate/usePaginate';
import {
  AIresultType,
  ReviewPostType,
  ReviewType,
} from '../types/reviewboard/reviewType';
import { getPuppiesData, getUserData } from '../apis/mypageFetcher';
import { UserInfoType } from '../types/auth/authType';
import { useNavigate } from 'react-router-dom';

const ReviewBoardPage = () => {
  const [pages, setPages] = useState<number>(1);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [aiResult, setAiResult] = useState<AIresultType>();

  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();

  const { isFirst, isLast, handleNextBtnClick, handlePrevBtnClick } =
    usePaginate(pages, setPages, totalPages, 1);

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

  const getAiTestResult = async () => {
    await getPuppiesData();
  };
  useEffect(() => {
    getCurrentUser();
    getAiTestResult();
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
      <BoardHeader>
        사람들과 AI 분석 결과를 공유해보세요.
        <CreateBtn onClick={() => navigate('/airesultcard')}>
          {' '}
          글쓰기{' '}
        </CreateBtn>
      </BoardHeader>
      <BoardContent>
        <SlideLeftBtn disabled={isFirst} onClick={handlePrevBtnClick} />

        <CardBox>
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
      </BoardContent>
      <SearchBox style={{ marginTop: '7vh' }} onSubmit={(e) => onSearch(e)}>
        <input
          type="text"
          value={search}
          placeholder="글 내용 검색"
          onChange={onChangeSearch}
        />
        <button type="submit">검색</button>
      </SearchBox>
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

const BoardHeader = styled.div`
  font-size: 20px;
  display: flexbox;
  justify-content: center;
  margin-top: 8vh;
  letter-spacing: 1px;
`;

const BoardContent = styled.div`
  display: flexbox;
  justify-content: center;
  align-items: center;
  height: 30rem;
  margin-top: 5vh;
`;

const CardBox = styled.div`
  display: flexbox;
  justify-content: center;
  justify-content: space-evenly;
  width: 75rem;
  min-width: 75rem;
  min-height: 27rem;

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

const SlideLeftBtn = styled.button`
  background: 0;
  width: 0;
  height: 0;
  border-bottom: 1.5rem solid transparent;
  border-top: 1.5rem solid transparent;
  border-left: 1.5rem solid transparent;
  border-right: 1.5rem solid lightgray;

  :hover {
    border-bottom: 1.5rem solid transparent;
    border-top: 1.5rem solid transparent;
    border-left: 1.5rem solid transparent;
    border-right: 1.5rem solid ${theme.pointColor};
    cursor: pointer;
  }

  &[disabled] {
    border-bottom: 1.5rem solid transparent;
    border-top: 1.5rem solid transparent;
    border-left: 1.5rem solid transparent;
    border-right: 1.5rem solid lightgray;
    cursor: revert;
    transform: revert;
  }
`;

const SlideRightBtn = styled.button`
  background: 0;
  width: 0;
  height: 0;
  border-bottom: 1.5rem solid transparent;
  border-top: 1.5rem solid transparent;
  border-left: 1.5rem solid lightgray;
  border-right: 1.5rem solid transparent;

  :hover {
    border-bottom: 1.5rem solid transparent;
    border-top: 1.5rem solid transparent;
    border-left: 1.5rem solid ${theme.pointColor};
    border-right: 1.5rem solid transparent;
    cursor: pointer;
  }

  &[disabled] {
    border-bottom: 1.5rem solid transparent;
    border-top: 1.5rem solid transparent;
    border-left: 1.5rem solid lightgray;
    border-right: 1.5rem solid transparent;
    cursor: revert;
    transform: revert;
  }
`;
