import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CommunityCard from './CommunityCard';

export interface CommunityProps {
  id: number;
  img: string;
  title: string;
}

function MyCommunity() {
  const [communityLists, setCommunityLists] = useState<CommunityProps[]>([]);

  useEffect(() => {
    async function getLists() {
      try {
        const response = await axios.get('./mockdata/MyCommunity.json');
        setCommunityLists(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getLists();
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
