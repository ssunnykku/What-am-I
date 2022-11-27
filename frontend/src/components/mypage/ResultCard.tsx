import { useState } from 'react';
import styled from 'styled-components';

function ResultCard() {
  return (
    <CardContainer>
      <Img alt="dog_img"></Img>
      <div>강아지이름</div>
      <div>종류 100%</div>
      <ButtonContainer id="ButtonContainer">
        <button>상세보기</button>
        <button>삭제</button>
      </ButtonContainer>
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

  :hover #ButtonContainer {
    // 마우스 호버 시 버튼 표시
    visibility: visible;
  }
`;

const Img = styled.img`
  width: 120px;
  height: 120px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  visibility: hidden;
`;

export default ResultCard;
