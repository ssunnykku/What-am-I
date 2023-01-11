import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { CommunityTypeProps } from './CommuRankingCard';

const CheckPinBtn = ({ listInfo }: CommunityTypeProps) => {
  const [pinned, setPinned] = useState<boolean>(false);

  const onClickPinBtn = (e: React.MouseEvent) => {
    e.preventDefault();

    // 정리만 해두자 어떻게 해야 할지
    // 일단 포스트로 할 수 있게 해야 하고 포스트를 하면~!
    // result 값이 달라지네 이걸로 pinned = true / false로 하면 됨
    // get으로 보여주기 like-button이랑 똑같이 하면 됨

    if (listInfo) {
      if (listInfo?.pinStatus === 0) {
        setPinned(true);
      }
      if (listInfo?.pinStatus === 1) {
        setPinned(false);
      }
    }
    console.log(listInfo?.pinStatus);
  };

  return (
    <PinBox onClick={onClickPinBtn}>
      {pinned ? (
        <BookmarkOutlinedIcon style={{ fontSize: '27px' }} />
      ) : (
        <BookmarkBorderOutlinedIcon style={{ fontSize: '27px' }} />
      )}
    </PinBox>
  );
};

export default CheckPinBtn;

const PinBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 5px;
`;
