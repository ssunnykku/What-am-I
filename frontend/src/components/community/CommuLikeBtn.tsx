import { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled, { keyframes } from 'styled-components';
import { postCommuLikeRequest } from '../../apis/communityFetcher';
import { CommunityListsTypeProps } from './CommuListCard';

// 프롭스로 좋아요를 누른 유저와 받은 유저 id를 받아와야 한다.
// 내가 좋아요를 누른 것과 별개로 좋아요 숫자가 떠 있어야 함.

const CommuLikeBtn = ({ commu, currentUser }: CommunityListsTypeProps) => {
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const onClickLikeBtn = async (e: React.MouseEvent) => {
    e.preventDefault();

    // if (commu?.likeStatus) {
    //   setLike(true);
    // } else {
    //   setLike(false);
    // }

    console.log(commu?.likeCount);
    console.log(commu?.likeStatus);

    // if (commu && currentUser) {
    //   const res = await postCommuLikeRequest(`communitieslikes/${commu?.id}`, {
    //     id: commu?.id,
    //     userId: currentUser,
    //   });
    //   console.log(res);

    //   setLikeCount(res.countLikes);

    //   if (!res.deletedLike) {
    //     setLiked(true);
    //   } else {
    //     setLiked(false);
    //   }
    // }
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
