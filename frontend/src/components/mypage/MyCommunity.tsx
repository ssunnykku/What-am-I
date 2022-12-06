import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserCommunites } from '../../apis/mypageFetcher';
import CommunityCard from './CommunityCard';

export interface CommunityProps {
  id: number;
  img: string;
  title: string;
}

function MyCommunity() {
  const [communityLists, setCommunityLists] = useState<CommunityProps[]>([]);

  // useEffect(() => {
  //   async function getLists() {
  //     try {
  //       const response = await axios.get('./mockdata/MyCommunity.json');
  //       console.log(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getLists();
  // }, []);

  // TODO 아래 코드 response에 커뮤니티 이미지와 커뮤니티 방 이름이 있어야 할 것 같다.
  useEffect(() => {
    async function getData() {
      const response = await getUserCommunites();
      console.log(response);
      // setCommunityLists(response);
    }
    getData();
  }, []);

  return (
    <Div>
      {communityLists.map((value) => (
        <CommunityCard value={value} mode={'MyCommunity'} key={value.id} />
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

export default MyCommunity;
