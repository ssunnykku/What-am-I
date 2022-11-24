import styled from 'styled-components';

function ResultCard() {
  return (
    <Card>
      <img alt="dog_img"></img>
      <div>강아지이름</div>
      <div>종류 100%</div>
    </Card>
  );
}

const Card = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
`;
export default ResultCard;
