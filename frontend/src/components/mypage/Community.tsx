import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserLiked } from '../../apis/mypageFetcher';
import CommunityCard from './CommunityCard';

export interface CommunityProps {
  id: number;
  userId: string;
  communityId: number;
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
      setUserLikedList(response);
      console.log(response);
    }
    getData();
  }, []);

  return (
    <Div>
      {userLikedList.map((value) => (
        <CommunityCard value={value} mode={'Community'} key={value.id} />
      ))}
    </Div>
  );
}
const Div = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  justify-items: center;
  grid-gap: 20px;
`;

export default Community;
