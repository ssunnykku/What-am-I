import { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled, { keyframes } from 'styled-components';
import {
  getCurrentCommunityRequest,
  postCommuLikeRequest,
} from '../../apis/communityFetcher';
import { CommunityTypeProps } from './CommuRankingCard';
import { CommunityType } from '../../types/community/communityType';

const CommuLikeBtn = ({ id }: CommunityTypeProps) => {
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [info, setInfo] = useState<CommunityType>();

  const getCurrCommu = async () => {
    const res = await getCurrentCommunityRequest(`communities/posts/${id}`);
    setInfo(res);
    console.log(res);
  };
  useEffect(() => {
    getCurrCommu();
  }, []);

  const getLikeInfo = () => {
    if (info) {
      setLikeCount(info.likeCount);
      if (info.likeStatus === 1) {
        setLike(true);
      } else if (info.likeStatus === 0) {
        setLike(false);
      }
    }
  };
  useEffect(() => {
    getLikeInfo();
  }, []);

  const onClickLikeBtn = async (e: React.MouseEvent) => {
    e.preventDefault();

    const res = await postCommuLikeRequest(`communitieslikes/${info?.id}`);

    if (res.newLike) {
      setLike(true);
      setLikeCount(likeCount + 1);
    }
    if (res.deletedLike) {
      setLike(false);
      setLikeCount(likeCount - 1);
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
