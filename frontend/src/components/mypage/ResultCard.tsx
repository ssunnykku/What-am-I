import styled from 'styled-components';

function ResultCard() {
  return (
    <CardContainer>
      <Img alt="dog_img"></Img>
      <div>강아지이름</div>
      <div>종류 100%</div>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
  height: 200px;
  border: 1px solid black;
  border-radius: 20px;
  padding: 20px;
`;

const Img = styled.img`
  width: 120px;
  height: 120px;
  border: 1px solid gray;
  border-radius: 10px;
`;
export default ResultCard;
