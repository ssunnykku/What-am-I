import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { CommunityTypeProps } from './CommuRankingCard';
import {
  getCurrentCommunityRequest,
  postCommuRequest,
} from '../../apis/communityFetcher';

const CheckPinBtn = ({ listInfo }: CommunityTypeProps) => {
  const [pinned, setPinned] = useState<boolean>(false);

  // 주소에서 id 가져오기
  let getParameter = (key: string) => {
    return new URLSearchParams(location.search).get(key);
  };
  const id = getParameter('id') ? getParameter('id') : listInfo?.id;

  // 고정 커뮤 정보 불러오기
  const getPinnedCommu = async () => {
    const res = await getCurrentCommunityRequest(`communities/posts/${id}`);

    if (res.pinStatus === 1) {
      setPinned(true);
    } else if (res.pinStatus === 0) {
      setPinned(false);
    }
  };

  useEffect(() => {
    getPinnedCommu();
  }, []);

  // 핀 버튼 체크
  const onClickPinBtn = async (e: React.MouseEvent) => {
    e.preventDefault();

    const res = await postCommuRequest(`pinnedcommunities/${id}`);
    console.log(res.result);

    if (listInfo) {
      if (res.result === 'Pin has been created') {
        setPinned(true);
      } else if (res.result === 'Pin has been canceled') {
        setPinned(false);
      } else {
        setPinned(true);
      }
    }
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
