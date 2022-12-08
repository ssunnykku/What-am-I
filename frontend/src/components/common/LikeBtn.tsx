import { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled, { keyframes } from 'styled-components';
import { style } from '@mui/system';

// 프롭스로 좋아요를 누른 유저와 받은 유저 id를 받아와야 한다.
// 내가 좋아요를 누른 것과 별개로 좋아요 숫자가 떠 있어야 함.
// 체크 버튼과 같이 쓸 수 있는가?

const LikeBtn = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const onClickLikeBtn = () => {
    // const body = {
    //   // 내 아이디와 상대방 아이디
    // };

    // if (like) {
    //   Api.post('like/unlike', body).then((res) => {
    //     if (res.data.unLike) {
    //       setLike(false);
    //     } else {
    //       console.log(res.data.err);
    //     }
    //   });
    // } else {
    //   Api.post('like/uplike', body).then((res) => {
    //     if (res.data.upLike) {
    //       setLike(true);
    //     } else {
    //       console.log(res.data.err);
    //     }
    //   });
    // }
    setLiked((prev) => !prev);
  };

  // useEffect(() => {
  //   Api.get('like/getLike', user).then((res) => {
  //     if (res.data) {
  //       res.data.map((like) => {
  //         if (like.commentId === portfolioOwnerId) {
  //           setLike(true);
  //         }
  //       });
  //     }
  //   });
  // }, []);

  // const handleClickedLike = () => {
  //   setLike((prev) => !prev);
  // };

  return (
    <LikeBox
      onClick={() => {
        onClickLikeBtn();
      }}
    >
      {liked ? (
        <FavoriteIcon style={{ color: 'red', fontSize: '25px' }} />
      ) : (
        <FavoriteBorderIcon style={{ fontSize: '25px' }} />
      )}
    </LikeBox>
  );
};

export default LikeBtn;

const animation = keyframes`
  50% {
    transform: scale(1.2);
  }
`;

const LikeBox = styled.div`
  cursor: pointer;

  :hover {
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-name: ${animation};
  }
`;
