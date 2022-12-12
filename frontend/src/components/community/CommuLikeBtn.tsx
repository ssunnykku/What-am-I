import { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled, { keyframes } from 'styled-components';
import { postCommuLikeRequest } from '../../apis/communityFetcher';
import { CommunityListsTypeProps } from './CommuListCard';

const CommuLikeBtn = ({ commu }: CommunityListsTypeProps) => {
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const getLikeInfo = async () => {
    if (commu) {
      setLikeCount(commu.likeCount);
      if (commu.likeStatus == 1) {
        setLike(true);
      } else if (commu.likeStatus == 0) {
        setLike(false);
      }
    }
  };
  useEffect(() => {
    getLikeInfo();
  }, []);

  const onClickLikeBtn = async (e: React.MouseEvent) => {
    e.preventDefault();

    const res = await postCommuLikeRequest(`communitieslikes/${commu?.id}`);

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
