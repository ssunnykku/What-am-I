import styled from 'styled-components';
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
  return (
    <Div>
      <CommunityCard value={value} />
      <CommunityCard value={value} />
      <CommunityCard value={value} />
      <CommunityCard value={value} />
      <CommunityCard value={value} />
      <CommunityCard value={value} />
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
