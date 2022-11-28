import { useState } from 'react';
import styled from 'styled-components';

function ResultCard({ img }: any) {
  // 삭제버튼 클릭 시 확인창 함수
  // TODO 확인창 함수를 공통컴포넌트로 뺄까?
  const useConfirm = (message: any, onConfirm: any, onCancel: any) => {
    if (!onConfirm || typeof onConfirm !== 'function') {
      return;
    }
    if (onCancel && typeof onCancel !== 'function') {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
    return confirmAction;
  };

  const deleteConfirm = () => console.log('삭제했습니다.');
  const cancelConfirm = () => console.log('취소했습니다.');

  const confirmDelete = useConfirm(
    '삭제하시겠습니까?',
    deleteConfirm,
    cancelConfirm,
  );
  return (
    <CardContainer>
      <Img src={img} alt="dog_img"></Img>
      <div>강아지이름</div>
      <div>종류 100%</div>
      {/* TODO 마우스 호버 시 버튼 컴포넌트가 카드 앞에 등장하게끔 어떻게할까*/}
      <ButtonContainer id="ButtonContainer">
        <Button color="#000000">상세</Button>
        <Button color="#ff0000" onClick={confirmDelete}>
          삭제
        </Button>
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
  border: none;
  border-radius: 20px;
  box-shadow: 2px 2px 5px gray;
  padding: 20px;
  transition: all 0.05s linear;
  :hover {
    transform: scale(1.05);
  }

  :hover #ButtonContainer {
    // 마우스 호버 시 버튼 표시
    visibility: visible;
  }
`;

const Img = styled.img`
  width: 120px;
  height: 120px;
  border: none;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 3px gray;
`;

const ButtonContainer = styled.div`
  visibility: hidden;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Button = styled.button`
  padding: 5px 30px;
  border: 1.5px solid ${(props) => props.color || 'black'};
  border-radius: 5px;
  background-color: white;
  color: ${(props) => props.color || 'black'};
  :hover {
    background-color: ${(props) => props.color || 'black'}20;
  }
`;

export default ResultCard;
