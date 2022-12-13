import { Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserLikedPosts } from '../../apis/mypageFetcher';
import { EntryBtn } from '../../assets/styles/common/commonComponentStyle';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import { CurrentCommuPostsType } from '../../types/community/communityType';
import CommuContentsModal from '../modal/CommuContentsModal';

interface ReceiveProps {
  id: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CommunityMyList({ id, setOpen }: ReceiveProps) {
  const [userPosts, setUserPosts] = useState<CurrentCommuPostsType[]>([]);

  useEffect(() => {
    async function getLikedPosts() {
      const response = await getUserLikedPosts(id);
      setUserPosts(response);
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
            <CommuContentsModal commuPost={value} key={value.id} />
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
