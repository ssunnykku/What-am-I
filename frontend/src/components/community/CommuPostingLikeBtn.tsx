import { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled, { keyframes } from 'styled-components';
import { CurrentCommuityProps } from '../modal/CommuContentsModal';
import { postCommuLikeRequest } from '../../apis/communityFetcher';

const CommuPostingLikeBtn = ({ commuPost }: CurrentCommuityProps) => {
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const onClickLikeBtn = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (commuPost) {
      const res = await postCommuLikeRequest(
        `communityPostLike/${commuPost?.id}`,
      );

      if (res.newLike) {
        setLike(true);
        setLikeCount(likeCount + 1);
      } else if (res.deletedLike) {
        setLike(false);
        setLikeCount(likeCount - 1);
      }
    }
  };

  const getLikeInfo = () => {
    if (commuPost) {
      setLikeCount(commuPost.likeCount);

      if (commuPost.likeStatus === 1) {
        setLike(true);
      } else if (commuPost.likeStatus === 0) {
        setLike(false);
      }
    }
  };
  useEffect(() => {
    getLikeInfo();
  }, []);

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

export default CommuPostingLikeBtn;

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
