import styled from 'styled-components';
import ResultCard from './ResultCard';

function Result() {
  return (
    <ResultContainer>
      <ResultCard />
      <ResultCard />
      <ResultCard />
      <ResultCard />
      <ResultCard />
    </ResultContainer>
  );
}

const ResultContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 50px;
  place-items: center; // grid 시 가로 가운데정렬
  margin-top: 50px;
`;
export default Result;
