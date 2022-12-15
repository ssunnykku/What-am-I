import { Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserLikedPosts } from '../../apis/mypageFetcher';
import { EntryBtn } from '../../assets/styles/common/commonComponentStyle';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import {
  CommunityType,
  CurrentCommuPostsType,
} from '../../types/community/communityType';
import CommuContentsModal from '../modal/CommuContentsModal';
import { CommunityProps } from './Community';

interface ReceiveProps {
  commuInfo?: CommunityType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CommunityMyList({ commuInfo, setOpen }: ReceiveProps) {
  const [userPosts, setUserPosts] = useState<CurrentCommuPostsType[]>([]);

  useEffect(() => {
    async function getLikedPosts() {
      if (commuInfo) {
        const response = await getUserLikedPosts(commuInfo.id);
        setUserPosts(response);
      }
    }
    getLikedPosts();
  }, []);

  return (
    <div>
      <ButtonContainer>
        <BackButton onClick={() => setOpen(false)}>돌아가기</BackButton>
      </ButtonContainer>
      {userPosts.length ? (
        <CardContainer>
          {userPosts.map((value) => (
            <CommuContentsModal
              commuInfo={commuInfo}
              commuPost={value}
              key={value.id}
            />
          ))}
        </CardContainer>
      ) : (
        <div
          style={{
            textAlign: 'center',
            fontFamily: font.bold,
            width: '738px',
          }}
        >
          내 작성글이 없습니다
        </div>
      )}
    </div>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const BackButton = styled(EntryBtn)`
  width: 150px;
  margin-left: 10px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export default CommunityMyList;
