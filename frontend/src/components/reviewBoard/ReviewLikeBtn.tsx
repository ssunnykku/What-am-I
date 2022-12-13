import { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled, { keyframes } from 'styled-components';
import { ReviewTypeProps } from '../modal/ReviewContentsModal';
import { likeRequest } from '../../apis/reviewFetcher';

const ReviewLikeBtn = ({ review }: ReviewTypeProps) => {
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const getLikeInfo = () => {
    if (review) {
      setLikeCount(review.likeCount);

      if (review.likeStatus === 1) {
        setLike(true);
      } else if (review.likeStatus === 0) {
        setLike(false);
      }
    }
  };
  useEffect(() => {
    getLikeInfo();
  }, []);

  const onClickLikeBtn = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (review) {
      const res = await likeRequest(review?.id);

      if (res.likeInformation) {
        setLike(true);
        setLikeCount(likeCount + 1);
      } else if (res.myLikedeleted) {
        setLike(false);
        setLikeCount(likeCount - 1);
      }
    }
  };

  return (
    <LikeBox
      onClick={(e) => {
        onClickLikeBtn(e);
      }}
    >
      {like ? (
        <FavoriteIcon
          style={{ color: 'red', fontSize: '25px', marginRight: '3px' }}
        />
      ) : (
        <FavoriteBorderIcon style={{ fontSize: '25px', marginRight: '3px' }} />
      )}
      {likeCount}
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
