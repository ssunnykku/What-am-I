import { useEffect } from 'react';
import styled from 'styled-components';
import { MarkerProps } from './WaterMap';

interface PropsType {
  list: MarkerProps[];
}

function MarkerList({ list }: PropsType) {
  return (
    <ListContainer>
      {list.map((value) => {
        return <List>{value.content}</List>;
      })}
    </ListContainer>
  );
}
export default MarkerList;

const ListContainer = styled.div`
  height: 700px;
  width: 300px;
  border: 2px solid rgba(100, 100, 100, 0.5);
  overflow-x: hidden;
  overflow-y: auto;
`;

const List = styled.div`
  border-bottom: 1px solid rgba(100, 100, 100, 0.5);
  padding: 20px 0px;
  margin: 0px 20px;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
`;
