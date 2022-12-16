import { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled, { keyframes } from 'styled-components';
import {
  getCurrentCommunityRequest,
  postCommuLikeRequest,
} from '../../apis/communityFetcher';
import { CommunityTypeProps } from './CommuRankingCard';

const CommuLikeBtn = ({ listInfo }: CommunityTypeProps) => {
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const getCurrCommu = async () => {
    const res = await getCurrentCommunityRequest(
      `communities/posts/${listInfo?.id}`,
    );
    setLikeCount(res.likeCount);

    if (res.likeStatus === 1) {
      setLike(true);
    } else if (res.likeStatus === 0) {
      setLike(false);
    }
  };

  // const getCurrCommuPost = async () => {
  //   if (postingInfo) {
  //     const res = await getCurrentCommunityRequest(
  //       `communitypost/${postingInfo?.communityId}`,
  //     );
  //     setLikeCount(res.countCommunityLike);

  //     if (res.myCommunityLikeStatus === 1) {
  //       setLike(true);
  //     } else {
  //       setLike(false);
  //     }
  //   }
  // };
  useEffect(() => {
    getCurrCommu();
  }, []);

  const onClickCommuLikeBtn = async (e: React.MouseEvent) => {
    e.preventDefault();

    const res = await postCommuLikeRequest(`communitieslikes/${listInfo?.id}`);

    if (res.newLike) {
      setLike(true);
      setLikeCount(likeCount + 1);
      console.log(likeCount as number);
    }
    if (res.deletedLike) {
      setLike(false);
      setLikeCount(likeCount - 1);
    }
  };

  // const onClickPostLikeBtn = async (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   const res = await postCommuLikeRequest(
  //     `communityPostLike/${postingInfo?.id}`,
  //   );
  // };

  return (
    <LikeBox
      onClick={(e) => {
        onClickCommuLikeBtn(e);
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

export default CommuLikeBtn;

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
