import styled from 'styled-components';
import ResultCard from '../components/mypage/ResultCard';

const AIResultPage = () => {
  return (
    <>
      <ResultCardBox>
        AIRESULTCARDS
        {/* <ResultCard></ResultCard> */}
      </ResultCardBox>
    </>
  );
};

export default AIResultPage;

const ResultCardBox = styled.div`
  border: solid 1px red;
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
`;
