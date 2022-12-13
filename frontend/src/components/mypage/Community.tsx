import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserLiked } from '../../apis/mypageFetcher';
import CommunityCard from './CommunityCard';
import {
  deleteUserCommunites,
  getUserCommunites,
} from '../../apis/mypageFetcher';
import {
  EntryBtn,
  CreateBtn,
} from '../../assets/styles/common/commonComponentStyle';
import { postCommuLikeRequest } from '../../apis/communityFetcher';

export interface CommunityProps {
  Community: CommunityProps;
  id: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  name?: string;
  introduction?: string;
  communityImage?: string;
}

function Community() {
  const [userLikedList, setUserLikedList] = useState<CommunityProps[]>([]);

  // TODO 아래 코드 response에 커뮤니티 이미지와 커뮤니티 방 이름이 있어야 할 것 같다.
  useEffect(() => {
    async function getData() {
      const response = await getUserLiked();
      setUserLikedList(response.rows);
      console.log(response);
    }
    getData();
  }, []);

  async function cancelLike(id: number) {
    await postCommuLikeRequest(`communitieslikes/${id}`);
    const response = await getUserLiked();
    setUserLikedList(response.rows);
    window.alert('좋아요를 취소했습니다.');
  }

  return (
    <Div>
      {userLikedList.length ? (
        userLikedList.map((value) => (
          <CommunityCard value={value.Community} key={value.Community.id}>
            <ButtonContainer>
              <EntryBtn>내가 쓴 글</EntryBtn>
              <CreateBtn onClick={() => cancelLike(value.Community.id)}>
                좋아요 취소
              </CreateBtn>
            </ButtonContainer>
          </CommunityCard>
        ))
      ) : (
        <div>내가 좋아요 한 커뮤니티가 없습니다</div>
      )}
    </Div>
  );
}
const Div = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  justify-items: center;
  grid-gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default Community;
