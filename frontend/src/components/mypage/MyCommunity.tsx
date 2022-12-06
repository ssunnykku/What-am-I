import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserCommunites } from '../../apis/mypageFetcher';
import { CommunityProps } from './Community';
import CommunityCard from './CommunityCard';

function MyCommunity() {
  const [communityLists, setCommunityLists] = useState<CommunityProps[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await getUserCommunites();
      setCommunityLists(response);
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
