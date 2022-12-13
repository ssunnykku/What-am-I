import { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled, { keyframes } from 'styled-components';
import { ReviewTypeProps } from '../modal/ReviewContentsModal';
import { LikeGetType } from '../../types/reviewboard/reviewType';
import { likeRequest } from '../../apis/reviewFetcher';

// 프롭스로 좋아요를 누른 유저와 받은 유저 id를 받아와야 한다.
// 내가 좋아요를 누른 것과 별개로 좋아요 숫자가 떠 있어야 함.

const ReviewLikeBtn = ({ review, currentUser }: ReviewTypeProps) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [dislikeCount, setDislikeCount] = useState<number>(0);

  const onClickLikeBtn = async () => {
    if (review && currentUser) {
      const res = await likeRequest(`reviewLike/${review?.id}`, {
        userId: currentUser,
        reviewId: review?.id,
      });

      console.log(res);
      setLikeCount(res.totalLikes);
      setDislikeCount(res.myLikedeleted_totalLike);

      if (res.totalLikes) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  };

  return (
    <LikeBox
      onClick={() => {
        onClickLikeBtn();
      }}
    >
      {liked ? (
        <>
          <FavoriteIcon
            style={{ color: 'red', fontSize: '25px', marginRight: '3px' }}
          />
          {likeCount}
        </>
      ) : (
        <>
          <FavoriteBorderIcon
            style={{ fontSize: '25px', marginRight: '3px' }}
          />
          {dislikeCount}
        </>
      )}
    </LikeBox>
  );
};

export default ReviewLikeBtn;

const animation = keyframes`
  50% {
    transform: scale(1.2);
  }
`;

const LikeBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;

  :hover {
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-name: ${animation};
  }
`;
