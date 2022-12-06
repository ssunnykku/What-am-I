import axios from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';
import { getUserLiked } from '../../apis/mypageFetcher';
import CommunityCard from './CommunityCard';

export interface CommunityProps {
  img: string;
  title: string;
}

function Community() {
  const value: CommunityProps = {
    img: '../img/pepsi.jpg',
    title: '댕댕이를 사랑하는 모임',
  };

  // TODO 아래 코드 response에 커뮤니티 이미지와 커뮤니티 방 이름이 있어야 할 것 같다.
  useEffect(() => {
    async function getData() {
      const response = await getUserLiked();
      console.log(response);
    }
    getData();
  }, []);

  return (
    <Div>
      <CommunityCard value={value} mode={'Community'} />
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
